import { PaginationInfo } from '@/types/boardData';
import { Post, StoreDetailResponse, StoreInfo } from '@/types/storeType';
import { create } from 'zustand';

// store 상태 타입
interface StoreDetailState {
  // data
  currentStore: StoreInfo | null;
  posts: Post[];
  pagination: PaginationInfo | null;

  // UI 상태
  isLoading: boolean;
  error: string | null;

  // 장바구니 (선택된 메뉴들)
  selectedMenus: { postId: number; quantity: number }[];

  // 액션
  setCurrentStore: (store: StoreInfo) => void;
  setPosts: (posts: Post[]) => void;
  setPagination: (pagination: PaginationInfo) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  // 장바구니 관리
  addMenuToCart: (postId: number, quantity: number) => void;
  removeMenuFromCart: (postId: number) => void;
  clearCart: () => void;

  // 무한 스크롤 페이지네이션
  appendPosts: (newPosts: Post[], newPagination: PaginationInfo) => void;

  // utilities
  getTotalCartItems: () => number;
  getTotalCartPrice: () => number;
}

export const useStoreDetailStore = create<StoreDetailState>((set, get) => ({
  currentStore: null,
  posts: [],
  pagination: null,
  isLoading: false,
  error: null,
  selectedMenus: [],

  setCurrentStore: (store) => set({ currentStore: store }),
  setPosts: (posts) => set({ posts }),
  setPagination: (pagination) => set({ pagination }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  addMenuToCart: (postId, quantity) => {
    const existingMenu = get().selectedMenus.find((menu) => menu.postId === postId);
    if (existingMenu) {
      // 이미 장바구니에 있는 경우 수량 업데이트
      get().selectedMenus = get().selectedMenus.map((menu) => (menu.postId === postId ? { ...menu, quantity } : menu));
    } else {
      // 새로 추가
      get().selectedMenus.push({ postId, quantity });
    }
    set({ selectedMenus: get().selectedMenus });
  },

  removeMenuFromCart: (postId) => {
    const updatedMenus = get().selectedMenus.filter((menu) => menu.postId !== postId);
    set({ selectedMenus: updatedMenus });
  },

  clearCart: () => set({ selectedMenus: [] }),

  appendPosts: (newPosts, newPagination) => {
    set((state) => ({
      posts: [...state.posts, ...newPosts],
      pagination: newPagination,
    }));
  },

  getTotalCartItems: () => {
    return get().selectedMenus.reduce((total, menu) => total + menu.quantity, 0);
  },

  getTotalCartPrice: () => {
    // 이 함수는 실제 가격 계산 로직이 필요합니다.
    // 예를 들어, posts 배열에서 각 postId에 해당하는 가격을 찾아 곱셈 후 합산하는  로직이 필요합니다.
    let totalPrice = 0;
    const posts = get().posts;
    get().selectedMenus.forEach((menu) => {
      const post = posts.find((p) => p.postId === menu.postId);
      if (post) {
        const discountedPrice = post.discountedPrice;
        totalPrice += discountedPrice * menu.quantity;
      }
    });
    return totalPrice;
  },
}));
