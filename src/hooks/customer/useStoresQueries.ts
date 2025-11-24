import { useCustomerStore } from '@/store/useCustomerStore';
import { useFavoriteStore } from '@/store/useFavorite';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

// 무한스크롤용 가게 목록 조회
export const useInfiniteStores = ({ lat, lon, size }: { lat: number; lon: number; size: number }) => {
  return useInfiniteQuery({
    queryKey: ['stores', lat, lon],
    queryFn: async ({ pageParam = 0 }) => {
      const response = await axios.get('/api/v1/home/stores', {
        params: {
          lat,
          lon,
          page: pageParam,
          size,
        },
      });
      if (response.status !== 200) throw new Error('Failed to fetch stores');
      return response.data;
    },
    getNextPageParam: (lastPage, allPages) => {
      // pagination.hasNext를 체크하여 다음 페이지 여부 확인
      const hasNext = lastPage.data?.pagination?.hasNext ?? false;
      return hasNext ? allPages.length : undefined;
    },
    initialPageParam: 0,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

// 가게 목록 조회
export const useStores = ({ lat, lon, page, size }: { lat: number; lon: number; page: number; size: number }) => {
  return useQuery({
    queryKey: ['stores'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/home/stores', {
        params: {
          lat,
          lon,
          page,
          size,
        },
      });
      if (response.status !== 200) throw new Error('Failed to fetch stores');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5분
  });
};

// 내가 주문한 가게
export const useMyOrders = () => {
  return useQuery({
    queryKey: ['my-orders'],
    queryFn: async () => {
      const response = await axios.get('/api/v1/home');
      if (response.status !== 200) throw new Error('Failed to fetch my orders');
      console.log('[useMyOrders] API Response:', response.data);
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5분
  });
};

// 찜하기 뮤테이션 -> 상세에서 사용
export const useFavoriteMutation = () => {
  const queryClient = useQueryClient();
  const { setFavorite } = useFavoriteStore();

  return useMutation({
    mutationFn: async ({ storeId, isLiked }: { storeId: string; isLiked: boolean }) => {
      const response = await axios(`/api/v1/home/stores/${storeId}/favorites`, {
        method: isLiked ? 'DELETE' : 'POST',
      });
      if (response.status !== 200) throw new Error('Failed to update favorite');
      return response.data;
    },
    onMutate: ({ storeId, isLiked }) => {
      // 낙관적 업데이트: API 응답을 기다리지 않고 미리 UI 업데이트
      setFavorite(!isLiked);

      // 에러 발생시 롤백을 위해 이전 상태 반환
      return { previousState: isLiked };
    },
    onSuccess: (data) => {
      // 서버 응답의 메시지를 alert로 표시
      if (data?.message) {
        toast.success('', { description: data.message });
      }
    },
    onError: (error, { storeId }, context) => {
      // 에러시 이전 상태로 되돌리기
      setFavorite(context?.previousState || false);

      // 에러 메시지 표시
      toast.error('', { description: '찜하기 처리 중 오류가 발생했습니다.' });
    },
    onSettled: (data, error, { storeId }) => {
      // 성공/실패 관계없이 최신 데이터로 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ['store-posts', storeId] });
    },
  });
};
