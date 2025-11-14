import { Reservation } from './boardData';
import { PanelMode } from './PanleTypes';
import { UseFormReturn } from 'react-hook-form';

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
}

export interface UseNoShowFormResult {
  form: UseFormReturn<NoShowFormData>;
  fields: any[];
  originalTotal: number;
  discountTotal: number;
  errors: any;
  increment: (index: number) => void;
  decrement: (index: number) => void;
  deleteMenu: (index: number) => void;
  onSubmit: () => void;
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
