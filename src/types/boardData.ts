// 사장님 화면에 들어가는 대시보드 포맷들

import { PanelMode, PanelType } from './PanleTypes';

/** 메뉴 아이템 타입 */
export interface MenuMini {
  menuId: string;
  name: string;
  qty: number;
  price: number;
}

/** 일반 예약 타입 */
export interface Reservation {
  reservationNo: string; // 예약 번호
  time: string; // 예약 시간
  status: 'PENDING' | 'NOSHOW' | 'VISIT_DONE'; // 예약 상태
  contact: string; // 고객 연락처
  expired: boolean; // 예약 시간 초과 여부 확인
  menus: MenuMini[]; // 메뉴
}

export interface SingleColumnLayoutProps<T = any> {
  title: string;
  showDate?: boolean;
  dateString?: string;

  // 필터 관련 (조건부)
  showFilters?: boolean;
  tabs?: { id: string; label: string }[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;

  // 테이블 관련
  columns: Column<T>[];
  data: T[];
  onSelected?: (item: T) => void;
  isUpdating?: boolean;
  emptyMessage?: string;
  selectItemId?: string;
  // ✅ 정렬 관련 props 추가
  sortState?: SortState;
  onSort?: (key: string) => void;

  // 페이지네이션 관련
  totalPages?: number;
  page?: number;
  onPageChange: (page: number) => void;

  // 기타
  expiredData?: T[];
  onBatchNoShow?: (ids: string[]) => void;
}

/** TwoColumnLayout의 props types */
export interface TwoColumnLayoutProps<T = any> {
  leftTitle?: string;
  rightTitle?: string;
  leftContent: React.ReactNode;

  // 오른쪽 패널 설정
  panelType: PanelType;
  panelMode: PanelMode;
  selectedData: T;

  // 이벤트 핸들러들
  onBack?: () => void;
  onModeChange?: (mode: PanelMode) => void;
  onDataUpdate?: (data: T) => void;
  onStatusUpdate?: (id: string, status: string) => void;
  onEditMode?: (active: boolean) => void;

  leftClassName?: string;
  rightClassName?: string;
  showTitles?: boolean;
}

// table 컬럼 타입
export interface Column<T> {
  key: string;
  header: string;
  className?: string;
  isWide?: boolean;
  sortable?: boolean; // ✅ 정렬 가능한 컬럼인지
  sortKey?: string; // ✅ 실제 정렬에 사용할 키 (key와 다를 수 있음)
  render?: (item: T) => React.ReactNode;
  location?: 'left' | 'center' | 'right'; // ✅ 텍스트 정렬 위치
}

export type SortOrder = 'asc' | 'desc' | null;

export interface SortState {
  key: string;
  order: SortOrder;
}

// 노쇼 등록 타입
export interface NoShowCreate {
  items: { menuId: string; quantity: number }[];
  discountPercent: number;
  expireAfterMinutes: Date;
}

// 노쇼 메뉴 데이터 타입
export interface NoShowMenu {
  noshowPostsId: number;
  name: string;
  quantity: number;
  menuId: string;
  visitTime: Date; // ISO 8601 형식 문자열
  price: number;
  discountPercent: number;
}

// ===== 사업자 노쇼 주문내역 관리 타입 =====
export interface OrderItemList {
  orderId: number;
  visitTime: string;
  status: OrderStatus;
  menuNames: string;
  consumerPhone: string;
}

export interface PaginationInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

export interface OrderListResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    orders: OrderItem[];
    pagination: PaginationInfo;
  };
}

export interface OrderDetailResponse {
  success: boolean;
  code: string;
  message: string;
  data: OrderDetail;
}

export interface OrderDetail {
  orderId: number;
  consumerId: string;
  storeId: string;
  visitTime: string;
  totalPrice: number;
  paidAmount: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: string;
  paymentTxId: string;
  paymentMemo: string;
  paidAt: string | null;
  failedAt: string | null;
  refundedAt: string | null;
  storeMemo: string;
  createdAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  orderItemId: number;
  menuName: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  visitTime: string;
}

// 상태 관련 타입들
export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export type PaymentStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'CANCELLED';

// export type PaymentMethod = 'CARD' | 'TEST_CARD' | 'CASH' | 'KAKAO_PAY' | 'NAVER_PAY';

// 선택적으로 사용할 수 있는 유틸리티 타입들
export type OrderItemWithCalculatedPrice = OrderItem & {
  discountedPrice: number;
  totalItemPrice: number;
};

export type OrderSummary = Pick<OrderDetail, 'orderId' | 'visitTime' | 'status' | 'totalPrice' | 'paidAmount'>;
