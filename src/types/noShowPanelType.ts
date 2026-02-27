import { Reservation } from './boardData';
import { PanelMode } from './PanleTypes';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { NoShowFormValues, NoShowEditFormValues } from './noShowFormZod';

export interface NoShowFormData {
  menus: {
    menuId: string;
    name: string;
    price: number;
    quantity: number;
    maxQty: number;
  }[];
  discount: number;
  visitTime: number;
  saleDelayMinutes: number;
  isNoShowSale: boolean;
}

// ✅ 생성 폼 결과 타입
export interface UseNoShowFormResult {
  form: UseFormReturn<NoShowFormValues, any, FieldValues>;
  fields: any[];
  originalTotal: number;
  discountTotal: number;
  errors: any;
  increment: (index: number) => void;
  decrement: (index: number) => void;
  deleteMenu: (index: number) => void;
  onSubmit: () => void;
  visitTime: Date; // 계산된 방문 시간
  saleDelayMinutes?: number; // 대기 시간
}

// ✅ 수정 폼 결과 타입
export interface UseNoShowMenuFormResult {
  form: UseFormReturn<NoShowEditFormValues, any, FieldValues>;
  errors: any;
  quantity: number;
  originalTotal: number;
  discountTotal: number;
  saleDelayMinutes?: number;
  increment: () => void;
  decrement: () => void;
  onSubmit: () => void;
  visitTime: Date; // ISO 문자열 방문 시간
}

export interface NoShowPanel {
  mode: PanelMode;
  noShowData: Reservation;
  onDataUpdate?: (data: any) => void;
}

export interface NoShowEditPanel {
  noShowData: Reservation;
  onDataUpdate?: (data: any) => void; // 입력값들 정리해야함
}

export interface NoShowMenuList {
  postId: number;
  menuId: string;
  visitTime: Date;
  quantity: number;
  discountPercent: number;
}

export interface Pagination {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}
