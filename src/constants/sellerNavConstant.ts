// src/constants/menu.ts
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
    path: '/mypage/analytics',
  },
  {
    id: 'product-stock-management',
    label: '상품/재고',
    path: '/no-show',
    children: [
      // { id: 'product-management', label: '상품 관리' },
      // { id: 'stock-management', label: '재고 관리' },
      { id: 'menu-management', label: '메뉴 관리', path:'/menu' },
      { id: 'noshow-menu-management', label: '노쇼 메뉴 관리', path: '/no-show' },
      // { id: 'noshow-menu-create', label: '노쇼 메뉴 등록' },
    ],
  },
  {
    id: 'mypage',
    label: '마이페이지',
    path: '/mypage',
    children: [
      { id: 'mypage-business-info', label: '가게 설정', path: '/mypage' },
      // { id: 'business-management', label: '매출 관리', path:'/mypage/analytics' },
      { id: 'noshow-preset', label: '노쇼 프리셋', path: '/mypage/preset' },
      { id: 'billing-management', label: '청구 및 결제', path:'/mypage/billing' },
    ],
  },
];

export const reservationStatus = {
  PENDING: '방문예정',
  LATE: '방문시간초과',
  NOSHOW: '노쇼 등록 완료 ',
  VISIT_DONE: '방문완료',
  QUEUED: '노쇼등록대기중',
  PROCESSING: '노쇼등록처리중',
  PUBLISHED: '노쇼등록완료',
  CANCELLED: '취소됨',
  FAILED: '실패',
};

export const orderStatus = {
  PENDING: '노쇼 주문 완료',
  COMPLETED: '노쇼 방문 완료',
};


export const saleStatus = {
  COMPLETED: '일반 주문',
  CANCELLED: '주문 취소',
  NO_SHOW: '노쇼 판매',
}