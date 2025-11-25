// hooks/useReservationApi.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useReservationStore } from '@/store/useReservationStore';
import { useAlarmStore } from '@/store/useAlarmStore';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { NoShowCreate, Reservation } from '@/types/boardData';

interface UpdateStatusParams {
  reservationNo: string;
  status: 'NOSHOW' | 'VISIT_DONE';
}

export const useReservationApi = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { updateReservationStatus } = useReservationStore();
  const { showAlarm } = useAlarmStore();

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

      const data = await response.json();

      if (!response.ok) {
        // 에러 응답 데이터를 포함한 Error 객체 생성
        const error: any = new Error(data.message || '노쇼 처리에 실패했습니다.');
        error.response = { data }; // response.data 형태로 저장
        throw error;
      }

      return data;
    },
    onSuccess: (data) => {
      console.log('✅ 노쇼 처리 성공:', data);
      showAlarm('노쇼 메뉴 처리가 완료되었습니다.', 'success', '성공', true);
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
      // 네비게이션을 onSuccess에서 처리
      router.push('/seller/no-show');
    },
    onError: (error: any) => {
      console.error('❌ 노쇼 처리 실패:', error);
      const errorMessage = error.response?.data?.message || error.message || '노쇼 메뉴 처리에 실패했습니다.';
      showAlarm(errorMessage, 'error', '실패', true);
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
