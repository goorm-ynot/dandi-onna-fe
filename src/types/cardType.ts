// 가게 리스트 타입
export interface StoreCardProps {
  store: {
    id: string;
    name: string;
    image: string;
    rating: number;
    category: string;
    // 나중에 필드 추가 가능
  };
  onFavorite?: (id: string) => void;
}

// 가게 프로필 타입
export interface StoreProfileProps {
  name: string;
  image: string;
  openTime: string;
  closeTime: string;
  distance: number;
}

// 예약 메뉴 타입
export interface MenuItem {
  name: string;
  count: number;
}

export interface ReservedMenuProps {
  image: string;
  storeName: string;
  badge?: string;
  menuItems: MenuItem[];
  totalPrice: string;
  timeRemaining: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

// 예약 카드 타입
export interface ReservationCardProps {
  reservation: {
    id: string;
    storeName: string;
    date: string;
    status: 'confirmed' | 'pending' | 'cancelled';
    // 나중에 필드 추가 가능
  };
  onCancel?: (id: string) => void;
}
