// 상품 카드 타입
export interface ProductCardProps {
  image: string;
  title?: string;
  description?: string;
  originalPrice?: number;
  discountRate?: number;
  salePrice?: number;
  stock?: number;
  state?: 'selected' | 'default' | 'disabled';
  onClick?: () => void;
}

// 칩 컴포넌트 타입
export interface ChipProps {
  label: string;
  state?: 'selected' | 'default';
  onClick?: () => void;
}
