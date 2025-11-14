// src/stores/useReservationStore.ts

/**
 * ✅ 일반 예약 상태 (Reservation State Management)
 * - 예약 목록, 선택된 예약, 상태 변경, 만료 처리 등을 관리하는 전역 Zustand Store
 * - subscribeWithSelector: 특정 상태 변경에만 반응하도록 최적화
 */
import { Reservation } from '@/types/boardData';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

/**
 * ReservationStore 인터페이스
 * - 상태 필드 (reservations, selectedReservation)
 * - 액션 (setReservations, markAsExpired 등)
 * - 셀렉터 (getExpiredReservations 등)
 */
interface ReservationStore {
  // ===== 상태 (State) =====
  reservations: Reservation[]; // 예약 목록 전체
  selectedReservation: Reservation | null; // 현재 선택된 예약
  totalPage: number; // 전체 페이지
  cursor: number; // 현재 페이지
  activeTab?: string; // 필터 탭
  selectItemId?: string; // 선택한 아이템 id
  selectItemStatus?: string; // 선택한 아이템 상태
  activeEdit?: boolean;

  // ===== 액션 (Actions) =====
  /**
   * API 응답으로부터 예약 목록을 스토어에 세팅
   * (⚠️ 정렬은 서버 API 단에서 수행하도록 변경됨)
   */
  setReservations: (reservations: Reservation[]) => void;

  /**
   * 전체 페이지 및 현재 페이지 세팅
   * 추후 페이지 변경이 일어날 때, (cursor) API 호출용
   */
  setPages: (totalPage: number, cursor: number) => void;

  /**
   * 현재 선택된 예약을 지정 (ex. 상세 모달용)
   */
  setSelectedReservation: (reservation: Reservation | null) => void;

  /**
   * 15분이 지난 예약을 만료 처리 (expired=true, status=NOSHOW)
   */
  markAsExpired: (reservationId: string) => void;

  /**
   * 예약 상태를 업데이트 (예: 글 등록 시 PENDING → VISIT_DONE)
   */
  updateReservationStatus: (reservationId: string, status: Reservation['status']) => void;

  // ===== 셀렉터 (Selectors) =====
  /**
   * 만료된 예약만 필터링하여 반환
   */
  getExpiredReservations: () => Reservation[];

  /**
   * 예약 목록을 시간 순으로 정렬하여 반환
   * (⚠️ 단, 실제 정렬 로직은 서버 API에서 수행하도록 예정)
   */
  getSortedReservations: () => Reservation[];

  /**
   * 필터 선택
   * (필터링을 할 때, 서버 API 호출)
   */
  setActiveTab: (activeTab: string) => void;

  /**
   * edit 모드 세팅용
   */
  setActiveEdit: (activeEdit: boolean) => void;
}

/**
 * Zustand Store 생성
 * - subscribeWithSelector: 특정 selector만 구독 가능 (리렌더링 최적화)
 */
export const useReservationStore = create<ReservationStore>()(
  subscribeWithSelector((set, get) => ({
    // 초기 상태값
    reservations: [],
    selectedReservation: null,
    totalPage: 0,
    cursor: 1,
    activeTab: 'all',
    selectItemId: '',
    selectItemStatus: '',
    activeEdit: false,

    // ===== 액션들 =====
    setReservations: (reservations) =>
      set({
        // ⚠️ 기존: 클라이언트에서 sort 처리
        // 개선: 서버 정렬된 데이터를 그대로 사용
        reservations,
      }),

    setPages: (totalPage, cursor) =>
      set({
        totalPage,
        cursor,
      }),
    setSelectedReservation: (reservation) =>
      set({
        selectedReservation: reservation,
        selectItemId: reservation?.reservationNo,
        selectItemStatus: reservation?.status,
      }),

    markAsExpired: (reservationId) =>
      set((state) => ({
        reservations: state.reservations.map((res) =>
          res.reservationNo === reservationId ? { ...res, expired: true } : res
        ),
      })),

    updateReservationStatus: (reservationId, status) =>
      set((state) => ({
        reservations: state.reservations.map((res) =>
          res.reservationNo === reservationId ? { ...res, status, expired: false } : res
        ),
      })),

    // ===== 셀렉터들 =====
    getExpiredReservations: () => get().reservations.filter((res) => res.expired),

    getSortedReservations: () =>
      // ✅ 실제 정렬은 서버 API 호출로 대체 예정
      // 예: onSortChange 이벤트 → fetchSortedReservations() 호출
      get().reservations.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()),

    setActiveTab: (activeTab) => set({ activeTab }),

    setActiveEdit: (activeEdit) => set({ activeEdit }),
  }))
);
