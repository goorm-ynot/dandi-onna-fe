import { useState, useEffect, useCallback } from 'react';
import { billingInvoiceType, BillingType, UseBillingDataReturn } from '@/types/paymentType';
import { SortState } from '@/types/boardData';
import { 
  fetchBillingInvoices, 
  fetchSubscriptionInfo, 
  fetchPaymentMethod, 
  fetchInvoiceDetails
} from '@/actions/billing';
import { handleSortToggle, sortData } from '@/lib/sortUtils';
import { useBillingStore } from '@/store/useBillingStore';

const parsePaymentDate = (value: string) => {
  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.getTime();
  }

  const normalized = value.replace(/\./g, '-').replace(/\//g, '-');
  const fallbackParsed = new Date(normalized);
  if (!Number.isNaN(fallbackParsed.getTime())) {
    return fallbackParsed.getTime();
  }

  return Number.NEGATIVE_INFINITY;
};

const getRecentInvoice = (invoices: BillingType[]) => {
  if (invoices.length === 0) return null;

  return invoices.reduce((latest, current) => {
    const latestTime = parsePaymentDate(latest.paymentDate);
    const currentTime = parsePaymentDate(current.paymentDate);

    return currentTime > latestTime ? current : latest;
  });
};

export function useBillingData(): UseBillingDataReturn {
  const [invoiceData, setInvoiceData] = useState<BillingType[]>([]);
  const [subscriptionInfo, setSubscriptionInfo] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<any>(null);
  const [pagination, setPagination] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const {
    currentPage,
    setCurrentPage,
    sortState,
    setSortState,
    popupOpen,
    setPopupOpen,
    selectedInvoice,
    setSelectedInvoice,
    popupData,
    setPopupData,
    recentInvoice,
    setRecentInvoice,
    resetPopup,
  } = useBillingStore();

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
        setRecentInvoice(getRecentInvoice(invoices.data));
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
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination?.hasNextPage) {
      setCurrentPage(currentPage + 1);
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

  const onSelectRow = (item: BillingType) => {
    setSelectedInvoice(item);
    fetchInvoiceDetails(item).then(res => {
      if (res.success) {
        setPopupData(res.data);
      } else {
        setPopupData(null);
      }
    })
    setPopupOpen(true);
  }

  const onSelectRecentInvoice = () => {
    if (!recentInvoice) return;
    onSelectRow(recentInvoice);
  };

  const onClose = () => {
    resetPopup();
  }

  const handlePrint = async () => {
    if (!selectedInvoice) return;
    window.open(`/print/invoice/${selectedInvoice.invoiceId}`, '_blank', 'noopener,noreferrer');
  }

  const handleDownload = async (item: BillingType) => {
    if (!item && !selectedInvoice) return;
    const invoice = item || selectedInvoice;
    if (!invoice) return;
    const link = document.createElement('a');
    link.href = `/api/pdf/invoice/${invoice.invoiceId}`;
    link.download = `invoice_${invoice.invoiceId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const handleDownloadRecent = async () => {
    if (!recentInvoice) return;
    const link = document.createElement('a');
    link.href = `/api/pdf/invoice/${recentInvoice.invoiceId}`;
    link.download = `invoice_${recentInvoice.invoiceId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return {
    // 상태
    currentPage,
    invoiceData,
    subscriptionInfo,
    paymentMethod,
    pagination,
    isLoading,
    recentInvoice,
    // 액션 및 핸들러
    setCurrentPage,
    handlePrevPage,
    handleNextPage,
    goToPage,
    sortState,
    handleSort,
    sortedInvoiceData,
    onSelectRow,
    onSelectRecentInvoice,
    onClose,
    popupOpen,
    popupData,
    // 추가 액션
    handlePrint,
    handleDownload,
    handleDownloadRecent,
  };
}
