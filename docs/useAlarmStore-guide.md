# useAlarmStore 사용 가이드

## 개요

`useAlarmStore`는 Zustand를 기반으로 한 전역 알람 상태 관리 스토어입니다. 애플리케이션 전역에서 일관된 방식으로 사용자에게 알림을 표시할 수 있습니다.

## 설치 위치

```
src/store/useAlarmStore.ts
```

## 주요 기능

### 1. 알람 타입
- `success`: 성공 메시지 (녹색)
- `error`: 에러 메시지 (빨간색)
- `warning`: 경고 메시지 (노란색)
- `info`: 정보 메시지 (파란색)

### 2. 제공 메서드

#### `showAlarm()`
알람을 표시합니다.

**파라미터:**
```typescript
showAlarm(
  message: string,           // 필수: 알람 메시지
  type?: 'success' | 'error' | 'warning' | 'info',  // 선택: 알람 타입 (기본값: 'info')
  title?: string,            // 선택: 알람 제목
  autoClose?: boolean,       // 선택: 자동 닫힘 여부 (기본값: true)
  deepLink?: string          // 선택: 클릭 시 이동할 URL
)
```

#### `hideAlarm()`
현재 표시된 알람을 숨깁니다.

```typescript
hideAlarm()
```

#### `handleAlarmClick()`
알람 클릭 시 동작을 처리합니다. `deepLink`가 설정된 경우 해당 URL로 이동합니다.

```typescript
handleAlarmClick()
```

## 사용 예시

### 1. 기본 사용법

```typescript
import { useAlarmStore } from '@/store/useAlarmStore';

function MyComponent() {
  const { showAlarm } = useAlarmStore();

  const handleSuccess = () => {
    showAlarm('작업이 성공적으로 완료되었습니다.', 'success', '성공');
  };

  return (
    <button onClick={handleSuccess}>
      작업 실행
    </button>
  );
}
```

### 2. 에러 처리

```typescript
import { useAlarmStore } from '@/store/useAlarmStore';

function MyComponent() {
  const { showAlarm } = useAlarmStore();

  const handleError = () => {
    showAlarm(
      '작업 처리 중 오류가 발생했습니다. 다시 시도해주세요.',
      'error',
      '실패',
      true
    );
  };

  return (
    <button onClick={handleError}>
      에러 발생
    </button>
  );
}
```

### 3. DeepLink와 함께 사용 (FCM 알림)

```typescript
import { useAlarmStore } from '@/store/useAlarmStore';

function NotificationHandler() {
  const { showAlarm } = useAlarmStore();

  const handleNotification = (payload: any) => {
    const link = payload.fcmOptions?.link || payload.data?.link;
    
    showAlarm(
      payload.data?.body || '새로운 메시지가 도착했습니다.',
      'info',
      payload.data?.title || '알림',
      true,
      link  // 클릭 시 이동할 URL
    );
  };

  return (
    // ... 컴포넌트 로직
  );
}
```

### 4. React Query와 함께 사용

```typescript
import { useMutation } from '@tanstack/react-query';
import { useAlarmStore } from '@/store/useAlarmStore';
import axios from 'axios';

export function usePresetUpdate() {
  const { showAlarm } = useAlarmStore();

  return useMutation({
    mutationFn: async (preset: PresetData) => {
      const response = await axios.put('/api/v1/seller/noshow/preset/default', preset);
      return response.data;
    },
    onSuccess: (data) => {
      showAlarm('프리셋이 성공적으로 저장되었습니다.', 'success', '성공', true);
    },
    onError: (error: any) => {
      showAlarm('프리셋 저장에 실패했습니다. 다시 시도해주세요.', 'error', '실패', true);
      console.error("Error updating preset:", error);
    }
  });
}
```

### 5. 수동으로 알람 닫기

```typescript
import { useAlarmStore } from '@/store/useAlarmStore';

function MyComponent() {
  const { showAlarm, hideAlarm } = useAlarmStore();

  const handleAction = () => {
    // autoClose를 false로 설정하여 수동으로만 닫히도록 설정
    showAlarm('이 알람은 수동으로 닫아야 합니다.', 'warning', '경고', false);
    
    // 3초 후 수동으로 닫기
    setTimeout(() => {
      hideAlarm();
    }, 3000);
  };

  return (
    <button onClick={handleAction}>
      알람 표시
    </button>
  );
}
```

## 실제 사용 사례

### 1. 프리셋 업데이트 (usePresetQueries.ts)
```typescript
showAlarm('프리셋이 성공적으로 저장되었습니다.', 'success', '성공', true);
showAlarm('프리셋 저장에 실패했습니다. 다시 시도해주세요.', 'error', '실패', true);
```

### 2. FCM 알림 처리 (useFcmToken.tsx)
```typescript
showAlarm(
  `${payload.data?.body || 'This is a new message'}`,
  'info',
  payload.data?.title || 'New message',
  isConsumer,
  link  // deepLink
);
```

### 3. 주문 관리 (useSellerOrderManage.ts)
```typescript
showAlarm('방문 완료 처리가 완료되었습니다.', 'success', '성공', true);
showAlarm('방문 완료 처리에 실패했습니다.', 'error', '실패', true);
```

### 4. 예약 API (useReservationApi.ts)
```typescript
showAlarm('노쇼 메뉴 처리가 완료되었습니다.', 'success', '성공', true);
showAlarm(errorMessage, 'error', '실패', true);
```

## 주의사항

1. **전역 상태**: `useAlarmStore`는 전역 상태를 관리하므로, 한 번에 하나의 알람만 표시됩니다.

2. **자동 닫힘**: `autoClose`가 `true`로 설정된 경우, 일정 시간 후 자동으로 알람이 닫힙니다. (구현된 컴포넌트에서 타이머 설정 필요)

3. **DeepLink 동작**: `deepLink`가 설정된 경우, `handleAlarmClick()`이 호출되면 `window.location.href`를 통해 페이지 이동이 발생합니다.

4. **타입 안정성**: TypeScript를 사용하므로 파라미터 타입을 정확히 지켜야 합니다.

## 스토어 인터페이스

```typescript
export interface AlarmState {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  isVisible: boolean;
  autoClose?: boolean;
  deepLink?: string;
}

interface AlarmStore {
  alarm: AlarmState;
  showAlarm: (
    message: string,
    type?: 'success' | 'error' | 'warning' | 'info',
    title?: string,
    autoClose?: boolean,
    deepLink?: string
  ) => void;
  hideAlarm: () => void;
  handleAlarmClick: () => void;
}
```

## 관련 컴포넌트

알람 UI를 렌더링하는 컴포넌트는 다음 위치에서 찾을 수 있습니다:
- `src/components/ui/alarm.tsx` (예상 경로)
- `src/components/common/Alarm.tsx` (예상 경로)

해당 컴포넌트에서 `useAlarmStore`를 구독하여 알람 상태를 렌더링합니다.

## 참고

- Zustand 공식 문서: https://github.com/pmndrs/zustand
- 프로젝트에서 전역 알람 UI 컴포넌트와 함께 사용됩니다.
