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

//----- 결제 및 쳥구 타입 start ------ 
export type BillingType = {
  invoiceId: string;
  duringDate: string;
  paymentDate: string;
  amount: number;
  paymentStatus: 'PENDING' | 'COMPLETED' | 'CANCELLED'; // 주문 상태
  paymentMethod: string;
  cardCompany?: string; // 카드사명
  cardNumber?: string; // 카드번호
}


export type billingInvoiceType = {
  invoiceId: string;
  // 공급자 정보
  supplierName: string; // 공급자 상호명
  supplierCeoName: string; // 대표자 이름
  supplierBusinessNumber: string; // 사업자 등록번호
  supplierAddress: string; // 공급자 주소
  supplierContact: string; // 고객센터
  // 결제 상세 정보
  duringDate: Date; // 결제 일시
  paymentDate: Date; // 청구 기간
  productName: string; // 상품명
  unitPrice: number; //공급가액
  taxAmount: number; // 부가세
  totalAmount: number; // 총 결제 금액
  // 결제 수단 정보
  paymentMethod: string; // 결제 수단
  cardCompany?: string; // 카드사명
  cardNumber?: string; // 카드번호
  installment: string; // 할부 개월 수
  paymentId: string; // 승인번호
}

//----- 결제 및 청구 타입 end ------