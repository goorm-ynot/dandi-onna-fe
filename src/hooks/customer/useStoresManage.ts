import { useCustomerStore, useMyOrderStore } from '@/store/useCustomerStore';
import { useInfiniteStores, useMyOrders } from '@/hooks/customer/useStoresQueries';
import { useEffect, useMemo } from 'react';

export const useStoresActions = () => {
  const { addToFavorites, removeFromFavorites, setParams } = useCustomerStore();
  const { orderList, setOrderList } = useMyOrderStore();

  // 무한스크롤 쿼리
  const {
    data: storesData,
    isLoading: storesLoading,
    error: storesError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteStores({ lat: 0, lon: 0, size: 10 });

  const { data: myOrdersData, isLoading: myOrdersLoading, error: myOrdersError } = useMyOrders();

  // 무한스크롤 데이터 평탄화
  const stores = useMemo(() => {
    // console.log('[useStoresActions] storesData:', storesData);
    return storesData?.pages?.flatMap((page) => page.data?.stores || []) || [];
  }, [storesData]);

  // myOrdersData 변화 감지 시 store에 설정
  useEffect(() => {
    // console.log('[useStoresActions] myOrdersData:', myOrdersData);
    if (myOrdersData) {
      const orders = myOrdersData.data.orders || myOrdersData.data.myOrders || [];
      // console.log('[useStoresActions] Setting orders:', orders);
      if (Array.isArray(orders) && orders.length > 0) {
        setOrderList(orders);
      }
    }
  }, [myOrdersData, setOrderList]);

  // 무한스크롤 로드 더보기
  const loadMoreStores = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  return {
    // 무한스크롤 관련
    stores, // 평탄화된 전체 가게 목록
    storesLoading,
    storesError,
    loadMoreStores,
    hasNextPage,
    isFetchingNextPage,

    // 기존 states
    orderList,
    myOrdersLoading,
    myOrdersError,

    // actions
    addToFavorites,
    removeFromFavorites,
    setOrderList,
    setParams,
  };
};
