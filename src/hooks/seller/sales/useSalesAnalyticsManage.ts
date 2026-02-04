import { useEffect, useMemo, useState } from "react";

/** 
 * Hook to manage sales analytics for sellers.
 * This hook every events related to sales analytics.
 */
export type PeriodType = 'today' | 'week' | 'month' | 'custom';
export type OrderType = 'all' | 'cancelled' | 'normal' | 'noshow';

export function useSalesAnalyticsManage() {
    const [periodType, setPeriodType] = useState<PeriodType>('today');
    const [orderType, setOrderType] = useState<OrderType>('all');
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();

    const showDatePicker = periodType === 'custom';

    // periodType 변경 시 startDate, endDate 초기화
    useEffect(() => {
        const today = new Date();
        let start: Date | undefined;
        let end: Date | undefined;

        switch (periodType) {
        case 'today':
            start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            end = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            break;
        case 'week':
            const firstDayOfWeek = today.getDate() - today.getDay();
            start = new Date(today.getFullYear(), today.getMonth(), firstDayOfWeek);
            end = new Date(today.getFullYear(), today.getMonth(), firstDayOfWeek + 6);
            break;
        case 'month':
            start = new Date(today.getFullYear(), today.getMonth(), 1);
            end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            break;
        case 'custom':
            start = undefined;
            end = undefined;
            break;
        default:
            start = undefined;
            end = undefined;
        }

        setStartDate(start);
        setEndDate(end);
    },[periodType]);

    // 날짜 포맷 (hydration 에러 방지)
  const dateRangeLabel = useMemo(() => {
    if (!startDate || !endDate) return '';
    return `${startDate.toLocaleDateString('ko-KR')} ~ ${endDate.toLocaleDateString('ko-KR')}`;
  }, [startDate, endDate]);

  return {
    // states
    periodType,
    orderType,
    startDate,
    endDate,
    showDatePicker,
    dateRangeLabel,
    // setters
    setOrderType,
    setPeriodType,
    setStartDate,
    setEndDate,
  }
}