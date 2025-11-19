import { getNowDateHyphenString } from '@/lib/dateParse';
import { useSellerOrderStore } from '@/store/useSellerOrder';
import { useAlarmStore } from '@/store/useAlarmStore';
import { OrderDetail } from '@/types/boardData';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useEffect } from 'react';
import { set } from 'zod';

export const useSellerOrderManage = () => {
  const router = useRouter();
  const {
    orders,
    pagination,
    selectItemId,
    filterStatus,
    selectOrderItem,
    setOrders,
    setPages,
    setSelectItem,
    setFilterStatus,
    setSelectOrderItem,
  } = useSellerOrderStore();
  const { showAlarm } = useAlarmStore();
  const queryClient = useQueryClient();

  // 에러 처리 핸들러
  const handleQueryError = (error: any) => {
    console.error('❌ API Error:', error);
    if (error?.message === 'AUTH_FAILURE' || error?.response?.status === 401 || error?.response?.status === 403) {
      alert('연결이 원활하지 않습니다. 다시 시도해주세요');
      router.replace('/');
    }
  };

  // 판매자 주문내역 조회 쿼리
  const {
    data: orderList,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ['seller-orders'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/seller/order', {
        params: {
          date: getNowDateHyphenString(),
          page: 0,
          size: 10,
        },
      });
      return response.data;
    },
    staleTime: 1000 * 60 * 10, // 10분간 캐시 유지
    refetchOnWindowFocus: false, // 윈도우 포커스시 refetch 비활성화
  });

  // 주문내역 데이터 상세 조회
  const { data: orderDetail, error: orderDetailError } = useQuery({
    queryKey: ['seller-order-detail', selectItemId],
    queryFn: async () => {
      const response = await axios.get('/api/v1/seller/order/detail', {
        params: {
          orderId: selectItemId,
        },
      });
      return response.data;
    },
    enabled: !!selectItemId, // selectItemId가 있을 때만 실행
  });

  // 에러 감지 및 처리
  useEffect(() => {
    if (error) {
      handleQueryError(error);
    }
  }, [error]);

  useEffect(() => {
    if (orderDetailError) {
      handleQueryError(orderDetailError);
    }
  }, [orderDetailError]);

  // 데이터 로드 시 스토어에 저장
  useEffect(() => {
    if (orderList) {
      const order = orderList.data?.orders || orderList?.orders || [];
      const pagination = orderList.data?.pagination ||
        orderList?.pagination || {
          page: 0,
          size: 10,
          totalElements: 0,
          totalPages: 0,
          hasNext: false,
        };
      setOrders(order);
      setPages(pagination);
    }
    if (orderDetail) {
      setSelectOrderItem(orderDetail.data || null);
    }
  }, [orderList, orderDetail, setOrders, setPages, setSelectOrderItem]);

  // 페이지 변경 함수
  const handlePageChange = (newPage: number) => {
    setPages({ ...pagination, page: newPage });
  };

  // Filter 선택 함수
  const handleFilterChange = (filter: string) => {
    // 구현 필요 시 추가
  };

  // 정렬 핸들러 > 당장 구현하지 않음
  const handleSort = (key: string) => {
    // 구현 필요 시 추가
  };

  // 선택한 주문내역 아이템 세팅
  const onSelected = (item: OrderDetail) => {
    setSelectItem(item?.orderId.toString());
  };

  // 방문 완료 뮤테이션
  const completeVisitMutation = useMutation({
    mutationFn: async (orderId: string) => {
      const response = await fetch(`/api/v1/seller/order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });

      if (!response.ok) {
        throw new Error('방문 완료 처리에 실패했습니다.');
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log('✅ 방문 완료 처리 성공:', data);
      showAlarm('방문 완료 처리가 완료되었습니다.', 'success', '성공');
      queryClient.invalidateQueries({ queryKey: ['seller-orders'] });
      setSelectItem('');
    },
    onError: (error) => {
      console.error('❌ 방문 완료 처리 실패:', error);
      showAlarm('방문 완료 처리에 실패했습니다.', 'error', '실패');
    },
  });

  // 방문 완료 핸들러
  const handleCompleteVisit = (orderId: string) => {
    console.log('방문 완료 처리 주문ID:', orderId);
    completeVisitMutation.mutate(orderId);
  };

  return {
    orders,
    selectItemId,
    cursor: pagination?.page || 0,
    totalPages: pagination?.totalPages || 0,
    activeFilter: filterStatus,
    selectOrderItem,
    isLoading,
    refetch,
    error,

    onSelected,
    handlePageChange,
    handleFilterChange, // 현재는 구현 필요 없음
    handleSort, // 현재는 구현 필요 없음
    handleCompleteVisit, // 방문 완료 핸들러
  };
};
