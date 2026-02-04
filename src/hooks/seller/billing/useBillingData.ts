import { useState, useEffect, useCallback } from 'react';
import { BillingType } from '@/types/paymentType';
import { SortState } from '@/types/boardData';
import { 
  fetchBillingInvoices, 
  fetchSubscriptionInfo, 
  fetchPaymentMethod 
} from '@/actions/billing';
import { handleSortToggle, sortData } from '@/lib/sortUtils';

export interface BillingState {
  currentPage: number;
  invoiceData: BillingType[];
  subscriptionInfo: any;
  paymentMethod: any;
  pagination: any;
  isLoading: boolean;
}

export interface UseBillingDataReturn extends BillingState {
  setCurrentPage: (page: number) => void;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  goToPage: (page: number) => void;
  sortState: SortState;
  handleSort: (key: string) => void;
  sortedInvoiceData: BillingType[];
}

export function useBillingData(): UseBillingDataReturn {
  const [currentPage, setCurrentPage] = useState(1);
  const [invoiceData, setInvoiceData] = useState<BillingType[]>([]);
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<any>(null);
  const [pagination, setPagination] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sortState, setSortState] = useState<SortState>({ key: '', order: null });

  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      // 병렬로 모든 데이터 조회
      const [invoices, subscription, payment] = await Promise.all([
        fetchBillingInvoices(currentPage, 10),
        fetchSubscriptionInfo(),
        fetchPaymentMethod(),
      ]);

      if (invoices.success) {
        setInvoiceData(invoices.data);
        setPagination(invoices.pagination);
      }

      if (subscription.success) {
        setSubscriptionInfo(subscription.data);
      }

      if (payment.success) {
        setPaymentMethod(payment.data);
      }
    } catch (error) {
      console.error('데이터 로드 실패:', error);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    loadData();
  }, [currentPage, loadData]);

  const handlePrevPage = () => {
    if (pagination?.hasPrevPage) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination?.hasNextPage) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= (pagination?.totalPages || 1)) {
      setCurrentPage(page);
    }
  };

  const handleSort = (key: string) => {
    handleSortToggle(key, setSortState);
  };

  const sortedInvoiceData = sortData(invoiceData, sortState);

  return {
    currentPage,
    invoiceData,
    subscriptionInfo,
    paymentMethod,
    pagination,
    isLoading,
    setCurrentPage,
    handlePrevPage,
    handleNextPage,
    goToPage,
    sortState,
    handleSort,
    sortedInvoiceData,
  };
}
