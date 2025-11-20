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

  // 액션
  setStoreData: (data: StoreDetailResponse['data']) => void;
  setCurrentStore: (store: StoreInfo) => void;
  setPosts: (posts: Post[]) => void;
  setPagination: (pagination: PaginationInfo) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  // 무한 스크롤 페이지네이션
  appendPosts: (newPosts: Post[], newPagination: PaginationInfo) => void;
}

export const useStoreDetailStore = create<StoreDetailState>((set, get) => ({
  currentStore: null,
  posts: [],
  pagination: {
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 1,
    hasNext: false,
  },
  isLoading: false,
  error: null,

  // 한 번에 API 응답 데이터 설정하는 함수
  setStoreData: (data: StoreDetailResponse['data']) =>
    set({
      currentStore: data.store,
      posts: data.posts,
      pagination: data.page,
    }),

  setCurrentStore: (store) => set({ currentStore: store }),
  setPosts: (posts) => set({ posts }),
  setPagination: (pagination) => set({ pagination }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  appendPosts: (newPosts, newPagination) => {
    set((state) => ({
      posts: [...state.posts, ...newPosts],
      pagination: newPagination,
    }));
  },
}));
