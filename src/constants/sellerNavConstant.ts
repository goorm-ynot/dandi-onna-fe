// src/constants/menu.ts
import { DynamicIcon } from '@/lib/iconMapper';

export interface MenuItem {
  id: string; // 고유 식별자
  label: string; // 화면에 표시될 텍스트
  path?: string; // 클릭 시 이동 경로 (선택)
  icon?: React.ReactNode; // 아이콘
  children?: MenuItem[]; // 하위 메뉴
  roles?: string[]; // 권한 제한
  external?: boolean; // 외부 링크 여부
}

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'order-management',
    label: '주문 관리',
    path: '/',
    children: [
      { id: 'order-list', label: '주문 내역', path: '/' },
      { id: 'no-show-order-list', label: '노쇼 주문 내역', path: '/order' },
    ],
  },
  {
    id: 'sales-management',
    label: '매출 관리',
    children: [
      { id: 'settlement-management', label: '정산관리', icon: 'Lock' },
      { id: 'tax-invoice', label: '세금계산서', icon: 'Lock' },
      { id: 'vat-management', label: '부가가치세', icon: 'Lock' },
    ],
  },
  {
    id: 'product-stock-management',
    label: '상품/재고',
    children: [
      { id: 'product-management', label: '상품 관리' },
      { id: 'stock-management', label: '재고 관리' },
      { id: 'menu-management', label: '메뉴 관리' },
      { id: 'noshow-menu-management', label: '노쇼 메뉴 관리', path: '/no-show' },
      { id: 'noshow-menu-create', label: '노쇼 메뉴 등록' },
    ],
  },
];

export const reservationStatus = {
  PROCESSING: '방문예정',
  PENDING: '방문예정',
  NOSHOW: '노쇼',
  DISABLED: '방문완료',
  VISIT_DONE: '방문완료',
  // TODO: 아래 OrderListResponse 의 status 어떤건지 확인 필요
  CONFIRMED: '노쇼 등록 완료',
  COMPLETED: '노쇼 주문 완료',
  CANCELLED: '노쇼 방문 완료',
};

export const orderStatus = {
  PENDING: '노쇼 주문 완료',
  COMPLETED: '노쇼 방문 완료',
};
