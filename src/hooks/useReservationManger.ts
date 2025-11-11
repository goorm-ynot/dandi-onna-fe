// hooks/useReservationManager.ts
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useReservationStore } from '@/store/useReservationStore';
import { useReservationTimer } from './useReservationTimer';
import { useReservationApi } from './useReservationApi';

interface ReservationParams {
  date: Date;
  status?: string;
  sort?: 'time_desc' | 'id_desc';
  cursor: string;
  size?: number;
}

export const useReservationManager = (
  params: ReservationParams = {
    date: new Date(),
    status: '',
    sort: 'time_desc',
    cursor: '1',
    size: 10,
  }
) => {
  const { reservations, selectedReservation, setReservations, setSelectedReservation, getExpiredReservations } =
    useReservationStore();

  const { forceCheck } = useReservationTimer();
  const { updateStatus, batchNoShow, isUpdating } = useReservationApi();

  // 예약 목록 로드
  const { data: reservationData, isLoading } = useQuery({
    queryKey: ['reservations'],
    queryFn: async () => {
      const response = await fetch('/api/v1/seller/reservations');
      // const response = await axios.post('/api/v1/seller/reservations', {
      //   date: params.date,
      //   status: params.status,
      //   sort: params.sort,
      //   cursor: params.cursor,
      //   size: params.size,
      // });
      return response.json();
    },
  });

  // 데이터 로드 시 Zustand에 저장
  useEffect(() => {
    if (reservationData) {
      setReservations(reservationData);
    }
  }, [reservationData, setReservations]);

  // 만료된 예약 알림
  const expiredReservations = getExpiredReservations();

  const handleStatusUpdate = (reservationNo: string, status: 'NOSHOW' | 'VISIT_DONE') => {
    updateStatus({ reservationNo, status });
  };

  const handleBatchNoShow = (reservationIds: string[]) => {
    batchNoShow(reservationIds);
  };

  return {
    // 상태
    reservations,
    selectedReservation,
    expiredReservations,
    isLoading,
    isUpdating,

    // 액션
    setSelectedReservation,
    handleStatusUpdate,
    handleBatchNoShow,
    forceCheck,
  };
};
