// 사업자의 노쇼 주문내역 확인 zustand
import { OrderItem, OrderItemList, OrderDetail } from '@/types/boardData';
import { Pagination } from '@/types/noShowPanelType';
import { create } from 'zustand';

interface SellerOrderState {
  // ======= 상태 (State) =======
  orders: OrderItemList[]; // 노쇼 주문내역 리스트
  pagination: Pagination; // 페이지네이션 정보
  selectOrderItem: OrderDetail | null; // 선택한 주문내역 상세정보
  selectItemId?: string; // 선택한 아이템 id
  filterStatus?: 'ALL' | 'PENDING' | 'COMPLETED'; // 필터 상태

  // ======= 액션 (Actions) =======
  /**
   * API 응답으로부터 주문내역 리스트를 스토어에 세팅
   */
  setOrders: (orders: OrderItemList[]) => void;

  /**
   * 전체 페이지 및 현재 페이지 세팅
   * @returns
   */
  setPages: (pagination: Pagination) => void;

  /**
   * 선택한 주문내역 상세정보 세팅
   */
  setSelectOrderItem: (selectItem: OrderDetail | null) => void;

  /**
   * 선택한 주문내역의 orderId 세팅
   * @param 선택한 부분 구분값 orderId
   */
  setSelectItem: (selectItem: string) => void;

  /**
   * 필터 상태 세팅
   * INFO: 당장 필요없음
   * 'ALL' | 'PENDING' | 'COMPLETED'
   */
  setFilterStatus: (filterStatus: string) => void; 
}

export const useSellerOrderStore = create<SellerOrderState>((set) => ({
  orders: [],
  pagination: {
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 1,
    hasNext: false,
  },
  selectOrderItem: null,
  selectItemId: '',
  filterStatus: 'ALL',

  setOrders: (orders) =>
    set({
      orders,
    }),

  setPages: (pagination) =>
    set({
      pagination,
    }),

  setSelectOrderItem: (selectItem) =>
    set({
      selectOrderItem: selectItem,
    }),

  setSelectItem: (selectItemId) =>
    set({
      selectItemId: selectItemId,
    }),

  setFilterStatus: (filterStatus: string) =>
    set({
      filterStatus: filterStatus as 'ALL' | 'PENDING' | 'COMPLETED',
    }),
}));
