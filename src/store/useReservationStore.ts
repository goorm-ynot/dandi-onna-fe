// src/stores/useReservationStore.ts

/**
 * ✅ UI 상태 관리 전용 Store (Reservation UI State Management)
 * - localStorage를 단일 소스로 사용하고, React Query로 캐싱
 * - Zustand는 UI 상태만 관리 (선택된 항목, 탭, 페이지네이션 UI, 편집 모드)
 * - subscribeWithSelector: 특정 상태 변경에만 반응하도록 최적화
 */
import { Reservation } from '@/types/boardData';
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

/**
 * ReservationStore 인터페이스
 * - UI 상태만 관리 (데이터는 React Query + localStorage)
 */
interface ReservationStore {
  // ===== UI 상태 (UI State) =====
  selectedReservation: Reservation | null; // 현재 선택된 예약
  activeTab?: string; // 필터 탭
  selectItemId?: string; // 선택한 아이템 id
  selectItemStatus?: string; // 선택한 아이템 상태
  activeEdit?: boolean; // 편집 모드 활성화 여부

  // ===== 액션 (Actions) =====
  /**
   * 현재 선택된 예약을 지정 (ex. 상세 패널용)
   */
  setSelectedReservation: (reservation: Reservation | null) => void;

  /**
   * 필터 탭 선택
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
 * - 데이터는 localStorage + React Query로 관리하므로 UI 상태만 보관
 */
export const useReservationStore = create<ReservationStore>()(
  subscribeWithSelector((set) => ({
    // 초기 상태값
    selectedReservation: null,
    activeTab: 'all',
    selectItemId: '',
    selectItemStatus: '',
    activeEdit: false,

    // ===== 액션들 =====
    setSelectedReservation: (reservation) =>
      set({
        selectedReservation: reservation,
        selectItemId: reservation?.reservationNo,
        selectItemStatus: reservation?.status,
      }),

    setActiveTab: (activeTab) => set({ activeTab }),

    setActiveEdit: (activeEdit) => set({ activeEdit }),
  }))
);
