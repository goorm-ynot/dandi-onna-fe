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

export interface SingleColumnLayoutProps {
  title: string;
  showDate?: boolean;
  dateString?: string;

  // 필터 관련 (조건부)
  showFilters?: boolean;
  tabs?: { id: string; label: string }[];
  activeTab?: string;
  onTabChange?: (tabId: string) => void;

  // 테이블 관련
  columns: { key: string; header: string }[];
  reservations: Reservation[];
  onSelectReservation?: (reservation: Reservation) => void;
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
  expiredReservations?: Reservation[];
  onBatchNoShow?: (reservationIds: string[]) => void;
}

/** TwoColumnLayout의 props types */
export interface TwoColumnLayoutProps {
  leftTitle?: string;
  rightTitle?: string;
  leftContent: React.ReactNode;

  // 오른쪽 패널 설정
  panelType: PanelType;
  panelMode: PanelMode;
  selectedData: any;

  // 이벤트 핸들러들
  onBack?: () => void;
  onModeChange?: (mode: PanelMode) => void;
  onDataUpdate?: (data: any) => void;
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
}

export type SortOrder = 'asc' | 'desc' | null;

export interface SortState {
  key: string;
  order: SortOrder;
}
