// 사장님 화면에 들어가는 대시보드 포맷들

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
