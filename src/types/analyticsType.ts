/** 매출 페이지에서 사용되는 타입 모음 */

export interface SalesDataColumn {
  key: string;
  header: string;
  location?: 'left' | 'center' | 'right';
  render?: (data: SalesData) => React.ReactNode;
  isWide?: boolean; // ✅ 넓게 표시
}

export interface SalesData {
  saleDateTime: string;
  orderNo: string;
  orderType: 'COMPLETED' | 'CANCELLED' | 'NO_SHOW';
  menuNames: string;
  paidAmount: number;
  paymentMethod: string;
  status: 'COMPLETED' | 'PENDING' | 'CANCELLED';
}

export interface AnalyticsFilter {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
}

export interface SalesSummary {
  totalSales: number;        // 총 매출
  totalOrders: number;       // 총 주문 수
  averageOrderValue: number; // 평균 주문 금액
  noshowOrders?: number;     // 노쇼 주문 수 (선택적)
}

export interface SalesTableResponse {
    salesData: SalesData[];
    column: SalesDataColumn[];
    filter?: AnalyticsFilter;
    // 추가되야할거 있으면 여기 작성
}