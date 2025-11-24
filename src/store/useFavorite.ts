// 좋아요 관련 상태 관리 zustand store
import { create } from 'zustand';

interface FavoriteStore {
  favorite: boolean;
  setFavorite: (favorite: boolean) => void;
}

export const useFavoriteStore = create<FavoriteStore>((set) => ({
  favorite: true,
  setFavorite: (favorite: boolean) => set({ favorite }),
}));
