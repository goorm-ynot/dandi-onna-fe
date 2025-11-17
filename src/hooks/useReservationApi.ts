// hooks/useReservationApi.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useReservationStore } from '@/store/useReservationStore';
import axios from 'axios';
import { NoShowCreate, Reservation } from '@/types/boardData';
import { redirect } from 'next/navigation';

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
    mutationFn: async (reservation: NoShowCreate) => {
      const response = await fetch('/api/v1/seller/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reservation }),
      });

      if (!response.ok) {
        throw new Error('노쇼 처리에 실패했습니다.');
      }

      return response.json();
    },
    onSuccess: (data) => {
      console.log('✅ 노쇼 처리 성공:', data);
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      redirect('/seller/no-show');
    },
    onError: (error) => {
      console.error('❌ 노쇼 처리 실패:', error);
    },
  });

  return {
    updateStatus: updateStatusMutation.mutate,
    batchNoShow: batchNoShowMutation.mutate,
    isUpdating: updateStatusMutation.isPending || batchNoShowMutation.isPending,
    // 성공/실패 상태 추가
    isSuccess: batchNoShowMutation.isSuccess,
    isError: batchNoShowMutation.isError,
    error: batchNoShowMutation.error,
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
