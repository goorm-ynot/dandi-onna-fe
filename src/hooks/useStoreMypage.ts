import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface StoreMypage {
  name: string;
  addressRoad: string;
  openTime: string;
  closeTime: string;
}

interface StoreMypageResponse {
  success: boolean;
  code: string;
  message: string;
  data: StoreMypage;
}

export const useStoreMypage = () => {
  return useQuery<StoreMypage>({
    queryKey: ['store-mypage'],
    queryFn: async () => {
      try {
        const response = await axios.get<StoreMypageResponse>('/api/v1/stores/me/mypage');

        if (response.status !== 200 || !response.data.success) {
          throw new Error(response.data.message || 'API 오류');
        }

        return response.data.data;
      } catch (error) {
        console.error('❌ 가게 정보 조회 실패:', error);
        throw error;
      }
    },
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    retry: 1,
  });
};
