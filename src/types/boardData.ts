// 사장님 화면에 들어가는 대시보드 포맷들

import { PanelMode, PanelType } from './PanleTypes';

/** 메뉴 아이템 타입 */
export interface MenuMini {
  menuId: string;
  name: string;
  qty: number;
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

  leftClassName?: string;
  rightClassName?: string;
  showTitles?: boolean;
}
