import { OrderStatus, PaginationInfo } from './boardData';

// 노쇼 주문 가능한 가게 타입
export interface Stores {
  storeId: string;
  name: string;
  imageUrl: string;
  openTime: string;
  closeTime: string;
  distanceMeters: number;
}

// 주문한 가게 타입
export interface MyOrderStore {
  orderId: number;
  storeId: string;
  storeName: string;
  storeImageKey: string;
  menuSummary: string;
  totalPrice: number;
  paidAmount: number;
  status: OrderStatus;
  visitTime: string; // ISO 8601 형식 문자열
}

// 가게 상세 정보 타입
export interface StoreInfo {
  storeId: string;
  name: string;
  description: string;
  addressRoad: string;
  imageUrl: string;
}

// 글 데이터 타입
export interface Post {
  postId: number;
  expireAt: string;
  menuName: string;
  menuDescription: string;
  originalPrice: number;
  discountPercent: number;
  discountedPrice: number;
  qtyRemaining: number;
  menuImageUrl: string;
}

// 가게 상세 응답 타입
export interface StoreDetailResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    store: StoreInfo;
    posts: Post[];
    page: PaginationInfo;
  };
}

// 가게 요약 타입
export interface StoreSummary {
  storeName: string;
  addressRoad: string;
}
