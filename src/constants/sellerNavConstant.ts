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
    children: [
      { id: 'order-list', label: '주문 내역', path: '/dashboard' },
      { id: 'no-show-order-list', label: '노쇼 주문 내역', path: '' },
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
    ],
  },
];

export const reservationStatus = {
  PROCESSING: '방문예정',
  NOSHOW: '노쇼',
  DISABLED: '방문완료',
};
