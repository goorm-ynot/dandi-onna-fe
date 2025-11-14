// hooks/useReservationApi.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useReservationStore } from '@/store/useReservationStore';
import axios from 'axios';

interface UpdateStatusParams {
  reservationNo: string;
  status: 'NOSHOW' | 'VISIT_DONE';
}

export const useReservationApi = () => {
  const queryClient = useQueryClient();
  const { updateReservationStatus } = useReservationStore();

  // 단일 상태 업데이트
  const updateStatusMutation = useMutation({
    mutationFn: async ({ reservationNo, status }: UpdateStatusParams) => {
      const response = await fetch(`/api/reservations/${reservationNo}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      return response.json();
    },
    onSuccess: (data, variables) => {
      // Zustand 상태 업데이트
      updateReservationStatus(variables.reservationNo, variables.status);
      // React Query 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });

  // 배치 노쇼 처리
  const batchNoShowMutation = useMutation({
    mutationFn: async (reservationIds: string[]) => {
      const response = await fetch('/api/owner/no-show-posts:batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reservationIds }),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    },
  });

  return {
    updateStatus: updateStatusMutation.mutate,
    batchNoShow: batchNoShowMutation.mutate,
    isUpdating: updateStatusMutation.isPending || batchNoShowMutation.isPending,
  };
};

// 별도의 Hook으로 분리
export const useReservationDetail = (reservationNo: string) => {
  return useQuery({
    queryKey: ['reservation', reservationNo],
    queryFn: async () => {
      const response = await axios.get('/api/v1/seller/reservations/detail', {
        params: {
          date: new Date(),
          reservationNo: reservationNo,
        },
      });
      return response.data;
    },
    enabled: !!reservationNo, // reservationNo가 있을 때만 쿼리 실행
  });
};
