export interface PaymentDataType {
  storeId: string; // 가게 ID
  visitTime: string; // 방문 예정 시간
  paymentMethod: 'CARD' | 'KAKAO_PAY' | 'NAVER_PAY' | 'TOSS_PAY'; // 결제 수단
  totalAmount: number; // 총 결제 금액
  appliedDiscountAmount: number; // 적용된 할인 금액
  items: {
    noShowPostId: number; // 메뉴 ID
    menuName: string; // 메뉴 이름
    quantity: number; // 수량
    originalPrice: number; // 원래 가격
    discountRate: number; // 할인율
  }[];
}

export interface PaymentResponse {
  orderId: number; // 주문 ID
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED'; // 주문 상태
  paymentStatus: 'PENDING' | 'PAID' | 'FAILED'; // 결제 상태
  paidAmount: number; // 결제된 금액
  visitTime: string; // 방문 예정 시간
  menuSummary: string; // 주문한 메뉴 요약
}
