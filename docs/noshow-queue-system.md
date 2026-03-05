# 노쇼(No-Show) 큐 시스템 구현 문서

## 개요

노쇼 지연 등록 기능을 위한 큐 시스템을 구현했습니다. 이 시스템은 예약 상태를 `QUEUED` → `PROCESSING` → `PUBLISHED` 또는 `CANCELLED`/`FAILED`로 자동 전환하며, 30초마다 백엔드 스케줄 상태를 폴링하여 로컬 예약 데이터와 동기화합니다.

## 주요 기능

### 1. 큐 상태 관리

#### 예약 상태 확장
- 기존: `PENDING`, `LATE`, `NOSHOW`, `VISIT_DONE`
- 추가: `QUEUED`, `PROCESSING`, `PUBLISHED`, `CANCELLED`, `FAILED`

#### 큐 정보 타입 (QueueInfo)
```typescript
interface QueueInfo {
  scheduleId: string | number;        // 스케줄 고유 ID
  state?: QueueScheduleStatus;        // 큐 상태
  discountPercent?: number;           // 할인율
  visitAvailableMinutes?: number;     // 방문 가능 시간
  saleDelayMinutes?: number;          // 판매 지연 시간
  startAt?: string;                   // 시작 시간
  expireAt?: string;                  // 만료 시간
  requestedAt?: string;               // 요청 시간
}
```

### 2. 핵심 컴포넌트

#### reservationStorage (lib/reservationStorage.ts)

**새로 추가된 함수:**

1. **`applyQueueRegister(reservationNo, queueData)`**
   - 지연 등록 API 성공 시 호출
   - 예약 상태를 `QUEUED`로 설정
   - 큐 정보 저장
   ```typescript
   reservationStorage.applyQueueRegister('R001', {
     scheduleId: 'S123',
     state: 'QUEUED',
     discountPercent: 20,
     saleDelayMinutes: 30,
     // ...
   });
   ```

2. **`applyQueuePolling(pollResponse)`**
   - 폴링 결과를 예약 목록에 병합
   - 상태 전환 규칙:
     - `PROCESSING`: 상태 변경 없음, `queue.state`만 업데이트
     - `PUBLISHED`: 상태를 `NOSHOW`로 전환
     - `CANCELLED`/`FAILED`: 상태를 `PENDING`으로 되돌림 (필요시 `LATE`로 정규화)
     - `QUEUED`: `QUEUED` 상태 유지
   - `VISIT_DONE` 상태는 절대 덮어쓰지 않음

3. **`hasAnyQueuedSchedule()`**
   - 큐에 등록된 예약이 있는지 확인
   - 폴링 활성화 조건으로 사용

4. **`normalizeLate(reservation)`**
   - `PENDING` 상태를 시간 초과 시 `LATE`로 전환
   - TODO: 실제 시간 비교 로직 구현 필요

#### queuePolling (lib/queuePolling.ts)

**`fetchNoshowSchedules(params?)`**
- 클라이언트 측 폴링 헬퍼 함수
- 엔드포인트: `GET /api/v1/seller/noshow/schedules`
- 파라미터:
  - `page?: number`
  - `size?: number`
  - `status?: QueueScheduleStatus`
- 반환: `QueuePollResponse`
- 옵션: `cache: 'no-store'` (항상 최신 데이터)

#### useReservationManager (hooks/useReservationManger.ts)

**큐 폴링 쿼리 추가:**
```typescript
useQuery({
  queryKey: ['queuePolling'],
  queryFn: async () => await fetchNoshowSchedules(),
  enabled: !!userId && reservationStorage.hasAnyQueuedSchedule(),
  refetchInterval: 30000, // 30초
  refetchIntervalInBackground: false,
  staleTime: 0,
});
```

**활성화 조건:**
- 사용자 인증 완료 (`userId` 존재)
- 큐에 등록된 예약이 하나라도 존재

**폴링 데이터 병합:**
```typescript
useEffect(() => {
  if (queuePollData) {
    reservationStorage.applyQueuePolling(queuePollData);
    queryClient.invalidateQueries({ queryKey: ['reservations'] });
  }
}, [queuePollData, queryClient]);
```

#### useReservationApi (hooks/useReservationApi.ts)

**지연 등록 응답 처리:**
```typescript
onSuccess: (data, variables) => {
  // 지연 등록 성공 시
  if (data.scheduleId && data.status === 'QUEUED') {
    const reservationNo = variables.reservationNo;
    if (reservationNo) {
      reservationStorage.applyQueueRegister(reservationNo, {
        scheduleId: data.scheduleId,
        state: data.status,
        discountPercent: data.discountPercent,
        visitAvailableMinutes: data.visitAvailableMinutes,
        saleDelayMinutes: data.saleDelayMinutes,
        startAt: data.startAt,
        expireAt: data.expireAt,
        requestedAt: data.requestedAt,
      });
    }
  }
  
  queryClient.invalidateQueries({ queryKey: ['reservations'] });
}
```

#### useNoShowForm (hooks/useNoShowForm.ts)

**제출 데이터에 reservationNo 추가:**
```typescript
const finalData = {
  items: items,
  discountPercent: pendingFormData.discount,
  expireAfterMinutes: visitAt,
  saleDelayMinutes: pendingFormData.saleDelayMinutes,
  isNoShowSale: pendingFormData.isNoShowSale,
  reservationNo: selectedReservation?.reservationNo, // 큐 매칭용
};
```

**localStorage 업데이트:**
- 즉시 판매 (`isNoShowSale: true`): 기존대로 `NOSHOW` 직접 업데이트
- 지연 등록 (`isNoShowSale: false`): `useReservationApi`의 `onSuccess`에서 `applyQueueRegister` 호출

## 데이터 플로우

### 지연 등록 (Delay Registration)

```
1. 사용자가 노쇼 폼 제출 (isNoShowSale: false)
   ↓
2. useNoShowForm에서 reservationNo 포함하여 API 호출
   ↓
3. POST /api/v1/seller/reservations
   ↓
4. 백엔드가 스케줄 생성 후 응답:
   { scheduleId, status: 'QUEUED', discountPercent, ... }
   ↓
5. useReservationApi.onSuccess에서 감지
   ↓
6. reservationStorage.applyQueueRegister() 호출
   - status: 'QUEUED'
   - queue 정보 저장
   ↓
7. queryClient.invalidateQueries(['reservations'])
   ↓
8. UI 업데이트: 예약 상태 = "노쇼등록대기중"
```

### 큐 폴링 (Queue Polling)

```
[30초마다 자동 실행]

1. useReservationManager의 useQuery 트리거
   ↓
2. fetchNoshowSchedules() 호출
   ↓
3. GET /api/v1/seller/noshow/schedules
   ↓
4. 백엔드에서 스케줄 목록 반환:
   {
     data: [
       {
         scheduleId: 'S123',
         status: 'PROCESSING' | 'PUBLISHED' | 'CANCELLED' | 'FAILED',
         items: [{ reservationNo: 'R001', ... }]
       }
     ]
   }
   ↓
5. useEffect에서 queuePollData 감지
   ↓
6. reservationStorage.applyQueuePolling(queuePollData)
   - reservationNo로 예약 매칭
   - 상태 전환 규칙 적용:
     * PROCESSING → queue.state만 업데이트
     * PUBLISHED → status = 'NOSHOW'
     * CANCELLED/FAILED → status = 'PENDING' (→ LATE)
     * QUEUED → status = 'QUEUED' 유지
   ↓
7. queryClient.invalidateQueries(['reservations'])
   ↓
8. UI 자동 업데이트
```

### 즉시 판매 (Immediate Sale)

```
1. 사용자가 노쇼 폼 제출 (isNoShowSale: true)
   ↓
2. POST /api/v1/seller/reservations
   ↓
3. useNoShowForm에서 직접 상태 업데이트:
   reservationStorage.updateStatus(reservationNo, 'NOSHOW')
   ↓
4. UI 업데이트: 예약 상태 = "노쇼"
```

## 타입 정의

### 주요 인터페이스

```typescript
// 큐 스케줄 상태
export type QueueScheduleStatus = 
  | 'QUEUED'      // 대기중
  | 'PROCESSING'  // 처리중
  | 'PUBLISHED'   // 게시됨
  | 'CANCELLED'   // 취소됨
  | 'FAILED';     // 실패

// 예약 타입 (확장)
export interface Reservation {
  reservationNo: string;
  time: string;
  status: ReservationStatus;
  contact: string;
  expired: boolean;
  menus: MenuMini[];
  queue?: QueueInfo; // 큐 정보 추가
}

// 노쇼 생성 요청 (확장)
export interface NoShowCreate {
  items: { 
    menuId: string; 
    quantity: number;
    reservationNo?: string; // 큐 매칭용
  }[];
  discountPercent: number;
  expireAfterMinutes: Date;
  reservationNo?: string; // 큐 매칭용
}

// 폴링 응답
export interface QueuePollResponse {
  data: QueuePollItem[];
  totalPages?: number;
  currentPage?: number;
  totalElements?: number;
}

export interface QueuePollItem {
  scheduleId: string | number;
  presetId: string | number;
  status: QueueScheduleStatus;
  createdAt: string;
  publishAt?: string;
  items: QueueScheduleItem[];
}

export interface QueueScheduleItem {
  reservationNo: string;
  menuName: string;
  quantity: number;
  discountPercent: number;
  unitPrice?: number;
  visitTime?: string;
}
```

## API 엔드포인트

### POST /api/v1/seller/reservations
노쇼 등록 (즉시 판매 또는 지연 등록)

**Request:**
```json
{
  "reservation": {
    "items": [{ "menuId": "M1", "quantity": 2 }],
    "discountPercent": 20,
    "expireAfterMinutes": "2026-03-05T15:30:00Z",
    "saleDelayMinutes": 30,
    "isNoShowSale": false,
    "reservationNo": "R001"
  }
}
```

**Response (지연 등록):**
```json
{
  "scheduleId": "S123",
  "status": "QUEUED",
  "discountPercent": 20,
  "visitAvailableMinutes": 60,
  "saleDelayMinutes": 30,
  "startAt": "2026-03-05T15:00:00Z",
  "expireAt": "2026-03-05T16:00:00Z",
  "requestedAt": "2026-03-05T14:30:00Z"
}
```

### GET /api/v1/seller/noshow/schedules
큐 스케줄 목록 조회 (폴링용)

**Query Parameters:**
- `page?: number`
- `size?: number`
- `status?: QueueScheduleStatus`

**Response:**
```json
{
  "data": [
    {
      "scheduleId": "S123",
      "presetId": "P001",
      "status": "PROCESSING",
      "createdAt": "2026-03-05T14:30:00Z",
      "publishAt": "2026-03-05T15:00:00Z",
      "items": [
        {
          "reservationNo": "R001",
          "menuName": "김치찌개",
          "quantity": 2,
          "discountPercent": 20
        }
      ]
    }
  ],
  "totalPages": 1,
  "currentPage": 1,
  "totalElements": 1
}
```

## 상태 전환 다이어그램

```
[초기 상태]
PENDING / LATE
    ↓
[사용자 노쇼 등록]
    ↓
┌─────────────────────┐
│  isNoShowSale?      │
└─────────────────────┘
    ↓           ↓
   Yes          No
    ↓           ↓
 NOSHOW      QUEUED ─────┐
              ↓          │ (30초 폴링)
         PROCESSING ─────┤
              ↓          │
         PUBLISHED ──────┤
              ↓          │
          NOSHOW         │
                         │
         CANCELLED ──────┤
         FAILED ─────────┘
              ↓
          PENDING
              ↓
          (LATE)
```

## 주의사항

1. **VISIT_DONE 보호**: 폴링 병합 시 `VISIT_DONE` 상태는 절대 덮어쓰지 않습니다.

2. **폴링 활성화 조건**: 
   - 사용자 인증 필수
   - 큐에 등록된 예약이 최소 1개 이상

3. **reservationNo 매칭**: 
   - 폴링 응답의 `items[].reservationNo`로 로컬 예약과 매칭
   - 정확한 매칭을 위해 항상 `reservationNo` 전달 필수

4. **localStorage 동기화**: 
   - 모든 상태 변경은 `reservationStorage`를 통해 처리
   - React Query 캐시 무효화로 UI 자동 업데이트

5. **에러 처리**: 
   - API 실패 시 알람 표시 (`useAlarmStore`)
   - 폴링 실패는 다음 주기에 재시도

## 향후 개선 사항

- [ ] `normalizeLate()` 함수에 실제 시간 비교 로직 구현
- [ ] 폴링 에러 핸들링 강화 (재시도 전략, 백오프)
- [ ] 큐 상태별 UI 인디케이터 추가
- [ ] 폴링 간격 동적 조정 (예: PROCESSING 시 10초로 단축)
- [ ] 다중 예약 일괄 지연 등록 지원
- [ ] 스케줄 취소/재시도 기능 추가

## 관련 파일

### 신규 파일
- `src/lib/queuePolling.ts`

### 수정 파일
- `src/lib/reservationStorage.ts`
- `src/hooks/useReservationManger.ts`
- `src/hooks/useReservationApi.ts`
- `src/hooks/useNoShowForm.ts`
- `src/types/boardData.ts`

## 테스트 시나리오

### 1. 지연 등록 성공
1. 예약 선택 → 노쇼 폼 열기
2. "즉시 판매로 등록" 체크박스 **해제**
3. 판매 대기 시간 설정 (예: 30분)
4. 제출
5. 예약 상태가 "노쇼등록대기중"으로 변경 확인
6. 30초 대기 후 상태가 "처리중"으로 자동 업데이트 확인

### 2. 즉시 판매
1. 예약 선택 → 노쇼 폼 열기
2. "즉시 판매로 등록" 체크박스 **체크**
3. 제출
4. 예약 상태가 즉시 "노쇼"로 변경 확인

### 3. 폴링 자동 업데이트
1. 지연 등록된 예약 존재 (QUEUED 상태)
2. 백엔드에서 스케줄 상태를 PUBLISHED로 변경
3. 최대 30초 대기
4. UI에서 예약 상태가 자동으로 "노쇼"로 변경 확인

### 4. 폴링 비활성화
1. 모든 예약을 VISIT_DONE 또는 NOSHOW로 처리
2. 개발자 도구 Network 탭 확인
3. `/api/v1/seller/noshow/schedules` 호출이 멈춤 확인

---

**작성일**: 2026-03-05  
**버전**: 1.0.0  
**작성자**: GitHub Copilot
