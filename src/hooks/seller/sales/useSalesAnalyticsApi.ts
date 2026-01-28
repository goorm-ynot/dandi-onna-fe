// 매출 api 호출
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useSalesAnalyticsApi = ({startDate, endDate, page, size}: {startDate: string, endDate: string, page: number, size: number}) => {
  const {
    data: salesData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['sales-analytics', startDate, endDate, page, size],
    queryFn: async () => {
      const response = await axios.get('/api/v1/seller/order/sales', {
        params: {startDate, endDate, page, size},
        });
        return response.data;
    },
    staleTime: 1000 * 60 * 1, // 1분간 캐시 유지
    refetchOnWindowFocus: false, // 윈도우 포커스시 refetch 비활성화
    enabled: !!startDate && !!endDate, // date가 있을 때만 쿼리 실행
  });

  return {
    salesData,
    isLoading,
    error,
    refetch,
  };
}