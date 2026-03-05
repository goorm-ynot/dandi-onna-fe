import { BillingType, billingInvoiceType } from '@/types/paymentType';
import { SortState } from '@/types/boardData';
import { create } from 'zustand';

interface BillingStore {
	currentPage: number;
	sortState: SortState;
	popupOpen: boolean;
	selectedInvoice: BillingType | null;
	popupData: billingInvoiceType | null;
	recentInvoice: BillingType | null;

  setCurrentPage: (page: number | ((prev: number) => number)) => void;
  setSortState: (sortState: SortState | ((prev: SortState) => SortState)) => void;
  setPopupOpen: (open: boolean) => void;
	setSelectedInvoice: (invoice: BillingType | null) => void;
	setPopupData: (data: billingInvoiceType | null) => void;
	setRecentInvoice: (invoice: BillingType | null) => void;
	resetPopup: () => void;
}

export const useBillingStore = create<BillingStore>((set) => ({
	currentPage: 1,
	sortState: { key: '', order: null },
	popupOpen: false,
	selectedInvoice: null,
	popupData: null, 
	recentInvoice: null, // 최근 청구서 정보

  setCurrentPage: (page) =>
    set((state) => ({
      currentPage: typeof page === 'function' ? page(state.currentPage) : page,
    })),
  setSortState: (sortState) =>
    set((state) => ({
      sortState: typeof sortState === 'function' ? sortState(state.sortState) : sortState,
    })),
  setPopupOpen: (popupOpen) => set({ popupOpen }),
	setSelectedInvoice: (selectedInvoice) => set({ selectedInvoice }),
	setPopupData: (popupData) => set({ popupData }),
	setRecentInvoice: (recentInvoice) => set({ recentInvoice }),
	resetPopup: () => set({ popupOpen: false, selectedInvoice: null, popupData: null }),
}));

