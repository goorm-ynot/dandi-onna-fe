/**
 * localStorage를 사용한 예약 데이터 관리 유틸리티
 * Single source of truth로 localStorage 사용
 */

import { Reservation, QueueScheduleStatus } from '@/types/boardData';

export interface QueueScheduleItem {
  reservationNo: string;
  menuName: string;
  quantity: number;
  discountPercent: number;
  unitPrice?: number;
  visitTime?: string;
}

export interface QueuePollItem {
  scheduleId: string | number;
  presetId: string | number;
  status: QueueScheduleStatus;
  createdAt: string;
  publishAt?: string;
  items: QueueScheduleItem[];
}

export interface QueueInfo {
  scheduleId: string | number;
  state?: QueueScheduleStatus;
  discountPercent?: number;
  visitAvailableMinutes?: number;
  saleDelayMinutes?: number;
  startAt?: string;
  expireAt?: string;
  requestedAt?: string;
}

const STORAGE_KEY = 'mockReservations';

export const reservationStorage = {
  /**
   * localStorage에서 모든 예약 데이터 가져오기
   */
  getAll: (): Reservation[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to parse reservations from localStorage:', error);
      return [];
    }
  },

  /**
   * localStorage에 예약 데이터 저장
   */
  setAll: (reservations: Reservation[]): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
    } catch (error) {
      console.error('Failed to save reservations to localStorage:', error);
    }
  },

  /**
   * 특정 예약을 LATE 상태로 업데이트
   */
  markAsExpired: (reservationNo: string): Reservation[] => {
    const reservations = reservationStorage.getAll();
    const updated = reservations.map((res) =>
      res.reservationNo === reservationNo ? { ...res, status: 'LATE' as const, expired: true } : res
    );
    reservationStorage.setAll(updated);
    return updated;
  },

  /**
   * 특정 예약의 상태 업데이트
   */
  updateStatus: (reservationNo: string | undefined, status: Reservation['status']): Reservation[] => {
    if (!reservationNo) return reservationStorage.getAll();
    const reservations = reservationStorage.getAll();
    const updated = reservations.map((res) =>
      res.reservationNo === reservationNo ? { ...res, status, expired: false } : res
    );
    reservationStorage.setAll(updated);
    return updated;
  },

  /**
   * 만료된 예약 필터링
   */
  getExpired: (): Reservation[] => {
    const reservations = reservationStorage.getAll();
    return reservations.filter((res) => res.expired);
  },

  /**
   * 상태별 필터링
   */
  filterByStatus: (status: string): Reservation[] => {
    const reservations = reservationStorage.getAll();
    
    if (status === 'all' || !status) {
      return reservations;
    }
    
    if (status === 'LATE') {
      return reservations.filter((res) => res.expired || res.status === 'LATE');
    }
    
    return reservations.filter((res) => res.status === status);
  },

  /**
   * localStorage 초기화 (테스트용)
   */
  clear: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  },

  /**
   * 큐 등록 응답을 예약에 적용 (status=QUEUED로 설정 및 큐 정보 저장)
   */
  applyQueueRegister: (reservationNo: string, queueData: QueueInfo): Reservation[] => {
    const reservations = reservationStorage.getAll();
    const updated = reservations.map((res) => {
      if (res.reservationNo === reservationNo) {
        return {
          ...res,
          status: 'QUEUED' as const,
          expired: false,
          queue: queueData,
        };
      }
      return res;
    });
    reservationStorage.setAll(updated);
    return updated;
  },

  /**
   * 폴링 응답을 정규화하여 QueuePollItem[] 배열로 변환
   * 다양한 입력 형식을 안전하게 처리
   */
  normalizePollResponse: (poll: any): QueuePollItem[] => {
    // null/undefined 체크
    if (!poll) {
      console.warn('Poll data is null or undefined');
      return [];
    }

    // 이미 배열인 경우
    if (Array.isArray(poll)) {
      return poll.every((item: any) => item?.scheduleId) ? poll : [];
    }

    // { data: { schedules: [...] } } 형태인 경우 (실제 API 응답)
    if (poll.data?.schedules && Array.isArray(poll.data.schedules)) {
      return poll.data.schedules.every((item: any) => item?.scheduleId)
        ? poll.data.schedules
        : [];
    }

    // { data: [...] } 형태인 경우
    if (poll.data && Array.isArray(poll.data)) {
      return poll.data.every((item: any) => item?.scheduleId) ? poll.data : [];
    }

    // { schedules: [...] } 형태인 경우 (대안 형식)
    if (poll.schedules && Array.isArray(poll.schedules)) {
      return poll.schedules.every((item: any) => item?.scheduleId)
        ? poll.schedules
        : [];
    }

    console.warn('Unable to normalize poll response, invalid structure:', poll);
    return [];
  },

  /**
   * 큐 폴링 결과를 예약 목록에 병합
   * - VISIT_DONE은 절대 덮어쓰지 않음
   * - PROCESSING: 상태 변경 없음 (queue.state만 업데이트)
   * - PUBLISHED: status = 'NOSHOW'
   * - CANCELLED/FAILED: status = 'PENDING' → normalizeLate로 LATE 판단
   * - QUEUED: status = 'QUEUED' 유지
   */
  applyQueuePolling: (poll: unknown): Reservation[] => {
  console.log('[applyQueuePolling] Raw poll data:', poll);
  const schedules = reservationStorage.normalizePollResponse(poll);

  if (!Array.isArray(schedules) || schedules.length === 0) {
    return reservationStorage.getAll();
  }

  // scheduleId -> schedule
  const byScheduleId = new Map(schedules.map((s) => [String(s.scheduleId), s]));

  const reservations = reservationStorage.getAll();

  const updated = reservations.map((res) => {
    // VISIT_DONE 보호
    if (res.status === 'VISIT_DONE') return res;

    // queue.scheduleId 없는 예약은 폴링 대상 아님
    const qid = res.queue?.scheduleId;
    if (!qid) return res;

    const matched = byScheduleId.get(String(qid));
    if (!matched) return res;

    const updatedQueue: QueueInfo = {
      ...res.queue,
      scheduleId: matched.scheduleId, // server truth
      state: matched.status,          // IMPORTANT: queue state sync
    };

    switch (matched.status) {
      case 'PROCESSING':
        return { ...res, queue: updatedQueue };

      case 'PUBLISHED':
        return { ...res, status: 'NOSHOW' as const, expired: false, queue: updatedQueue };

      case 'CANCELLED':
      case 'FAILED': {
        const reverted: Reservation = {
          ...res,
          status: 'PENDING' as const,
          expired: false,
          queue: updatedQueue,
        };
        return reservationStorage.normalizeLate(reverted);
      }

      case 'QUEUED':
      default:
        return { ...res, status: 'QUEUED' as const, expired: false, queue: updatedQueue };
    }
  });

  reservationStorage.setAll(updated);
  return updated;
  },

  /**
   * 큐에 등록된 스케줄이 하나라도 있는지 확인
   */
  hasAnyQueuedSchedule: (): boolean => {
    const reservations = reservationStorage.getAll();
    return reservations.some(
      (res) => res.status === 'QUEUED' || (res.queue && res.queue.scheduleId)
    );
  },

  /**
   * PENDING 상태의 예약을 LATE로 정규화 (시간 초과 시)
   * TODO: 실제 비즈니스 로직에 맞게 시간 비교 구현 필요
   */
  normalizeLate: (reservation: Reservation): Reservation => {
    if (reservation.status !== 'PENDING') {
      return reservation;
    }

    // TODO: 예약 시간(reservation.time)과 현재 시간 비교
    // 예시: const isExpired = new Date(reservation.time) < new Date();
    // if (isExpired) {
    //   return { ...reservation, status: 'LATE', expired: true };
    // }

    return reservation;
  },
};
