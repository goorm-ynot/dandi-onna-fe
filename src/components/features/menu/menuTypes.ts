export type MenuTab = 'all' | 'single' | 'set';
export type MenuCategory = Exclude<MenuTab, 'all'>;
export type MenuStatus = 'ON_SALE' | 'SOLD_OUT';

export interface SetMenuItem {
  id: string;
  name: string;
  quantity: number;
}

export interface SellerMenuItem {
  id: number;
  name: string;
  category: MenuCategory;
  description: string;
  price: number;
  status: MenuStatus;
  imageUrl?: string;
  setItems?: SetMenuItem[];
}

export interface MenuFormState {
  category: MenuCategory;
  name: string;
  price: string;
  description: string;
  imageUrl: string;
  setItems: SetMenuItem[];
}

export const SET_ITEM_LIBRARY = ['미니우동', '장국', '가라아게', '계란초밥', '튀김', '광어', '연어', '새우'];

export const createEmptyMenuForm = (): MenuFormState => ({
  category: 'single',
  name: '',
  price: '',
  description: '',
  imageUrl: '',
  setItems: [],
});

export const formatPrice = (price: number) => `${new Intl.NumberFormat('ko-KR').format(price)}원`;
export const parsePriceValue = (value: string) => Number(value.replace(/[^\d]/g, '') || 0);
export const toPriceInputValue = (value: string) => {
  const numeric = value.replace(/[^\d]/g, '');
  return numeric ? new Intl.NumberFormat('ko-KR').format(Number(numeric)) : '';
};
