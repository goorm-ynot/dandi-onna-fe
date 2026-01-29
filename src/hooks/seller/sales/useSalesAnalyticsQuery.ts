// 매출 api 호출
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

type paramsType = {
  startDate: string | undefined;
  endDate: string | undefined;
  orderType?: string;
}

export const useSalesAnalyticsQuery = ({startDate, endDate, orderType='all'}: paramsType) => {
  const [page, setPage] = useState(1);
  const size = 10; // 한 페이지에 보여줄 항목 수(고정)

  const query= useQuery({
    queryKey: ['sales-analytics', startDate, endDate, page-1, size],
    queryFn: async () => {
      const response = await axios.get('/api/v1/seller/order/sales', {
        params: {startDate, endDate, page: page-1, size, orderType},
        });
        return response.data;
    },
    staleTime: 1000 * 60 * 1, // 1분간 캐시 유지
    refetchOnWindowFocus: false, // 윈도우 포커스시 refetch 비활성화
    enabled: !!startDate && !!endDate, // date가 있을 때만 쿼리 실행
  });

  return {
    ...query,
    items: query.data?.data.items ?? [],
    pageInfo: query.data?.data.pageInfo,
    setPage,
  };
}