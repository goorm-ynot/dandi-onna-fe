import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';

// 가게 상세 정보를 가져오는  훅(무한스크롤 O)
export const useStorePostsInfinite = (storeId: string) => {
  return useInfiniteQuery({
    queryKey: ['store-posts', storeId],
    queryFn: async ({ pageParam = 0 }) => {
      // console.log('🔍 API 요청:', { storeId, pageParam });

      try {
        const response = await axios.get(`/api/v1/home/stores/${storeId}`, {
          params: {
            page: pageParam,
            size: 10,
          },
        });

        if (response.status !== 200) {
          throw new Error(`API 에러: ${response?.data?.message}`);
        }
        // response.data.data만 반환 (store, posts, page)
        return response.data.data;
      } catch (error) {
        console.error('❌ API 호출 실패:', error);
        throw error;
      }
    },
    getNextPageParam: (lastPage) => {
      // lastPage는 이제 { store, posts, page } 구조
      if (!lastPage || !lastPage.page) {
        console.warn('⚠️ lastPage 또는 page가 없습니다:', lastPage);
        return undefined;
      }

      const { page } = lastPage; // 👈 lastPage.data.page가 아니라 lastPage.page

      return page.hasNext ? page.page + 1 : undefined;
    },
    initialPageParam: 0,
    enabled: !!storeId,
    staleTime: 1 * 60 * 1000,
  });
};

// 가게 상세 정보를 가져오는 훅(무한스크롤XX)
export const useStoreDetail = (storeId: string) => {
  return useQuery({
    queryKey: ['storeDetail', storeId],
    queryFn: async () => {
      const response = await axios.get(`/api/v1/home/stores/${storeId}`);
      if (response.status !== 200) {
        throw new Error('가게 상세 정보를 불러오는데 실패했습니다.');
      }

      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5분
    refetchOnWindowFocus: (query) => {
      // 5분 이상 지났거나, 데이터가 없으면 리패치
      const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
      return query.state.dataUpdatedAt < fiveMinutesAgo || !query.state.data;
    },
    refetchOnReconnect: true, // 네트워크 재연결시 리패치
    enabled: !!storeId, // storeId가 있을 때만 쿼리 실행
    retry: 2, // 실패 시 재시도 횟수
  });
};
