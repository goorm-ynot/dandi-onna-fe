// 사용자 메인 화면 스토어
import { MyOrderStore, Stores } from '@/types/storeType';
import { create } from 'zustand';

interface CustomerStore {
  stores: Stores[];
  isLoading: boolean;
  error: string | null;
  page: number;
  params?: { lat: number; lon: number };
  setStores: (stores: Stores[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setPage: (page: number) => void;
  setParams: (params: { lat: number; lon: number }) => void;
  addToFavorites: (storeId: string) => void;
  removeFromFavorites: (storeId: string) => void;
}

interface MyOrderStores {
  orderList: MyOrderStore[];
  isLoading: boolean;
  error: string | null;
  setOrderList: (orders: MyOrderStore[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCustomerStore = create<CustomerStore>((set) => ({
  stores: [],
  isLoading: false,
  error: null,
  page: 0,
  params: { lat: 0, lon: 0 },

  setStores: (stores) => set({ stores }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  setPage: (page) => set({ page }),
  setParams: (params) => set({ params }),
  addToFavorites: (storeId) =>
    set((state) => ({
      stores: state.stores.map((store) => (store.storeId === storeId ? { ...store, isLiked: true } : store)),
    })),
  removeFromFavorites: (storeId) =>
    set((state) => ({
      stores: state.stores.map((store) => (store.storeId === storeId ? { ...store, isLiked: false } : store)),
    })),
}));

export const useMyOrderStore = create<MyOrderStores>((set) => ({
  orderList: [],
  isLoading: false,
  error: null,
  setOrderList: (orderList) => set({ orderList }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
