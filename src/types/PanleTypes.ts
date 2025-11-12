// types/panelTypes.ts
export type PanelMode = 'view' | 'edit' | 'noshow-form';

export type PanelType =
  | 'reservation-detail' // 예약 상세 (View → 노쇼폼/방문완료)
  | 'noshow-edit' // 노쇼 메뉴 수정
  | 'noshow-order-view'; // 노쇼 주문 확인

export interface PanelState {
  type: PanelType;
  mode: PanelMode;
  data: any; // 선택된 데이터
}
