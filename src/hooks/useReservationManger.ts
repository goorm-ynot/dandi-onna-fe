// hooks/useReservationManager.ts
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useReservationStore } from '@/store/useReservationStore';
import { useReservationTimer } from './useReservationTimer';
import { useReservationApi } from './useReservationApi';

export const useReservationManager = () => {
  const {
    reservations,
    selectedReservation,
    totalPage,
    cursor,
    activeTab,
    setPages,
    setReservations,
    setSelectedReservation,
    getExpiredReservations,
    setActiveTab,
  } = useReservationStore();

  const { forceCheck } = useReservationTimer();
  const { updateStatus, batchNoShow, isUpdating } = useReservationApi();

  // 예약 목록 로드
  const { data: reservationData, isLoading } = useQuery({
    queryKey: ['reservations'],
    queryFn: async () => {
      // fetch 넘길 때 Params 넘겨야함. 참고
      // const response = await fetch('/api/v1/seller/reservations');
      const response = await axios.get('/api/v1/seller/reservations', {
        params: {
          date: new Date(),
          status: activeTab,
          sort: 'time_desc',
          cursor: Number(cursor),
          size: 10,
        },
      });
      console.log('response: ', response.data);
      return response.data;
    },
  });

  // 데이터 로드 시 Zustand에 저장
  useEffect(() => {
    if (reservationData) {
      setReservations(reservationData.data);
      setPages(reservationData.totalPage, reservationData.cursor);
    }
  }, [reservationData, setReservations, setPages, setActiveTab]);

  // 만료된 예약 알림
  const expiredReservations = getExpiredReservations();

  const handleStatusUpdate = (reservationNo: string, status: 'NOSHOW' | 'VISIT_DONE') => {
    updateStatus({ reservationNo, status });
  };

  const handleBatchNoShow = (reservationIds: string[]) => {
    batchNoShow(reservationIds);
  };

  // 페이지 변경 함수
  const handlePageChange = (newPage: number) => {
    setPages(totalPage, newPage); // cursor 업데이트
    // React Query가 자동으로 refetch함 (쿼리키 변경으로 인해)
  };

  // Filter 선택 함수
  const handleFilterChange = (filter: string) => {
    setActiveTab(filter);
    // React Query가 자동을 refetch 진행
  };

  return {
    // 상태
    reservations,
    selectedReservation,
    expiredReservations,
    isLoading,
    isUpdating,
    totalPage,
    cursor,

    // 액션
    setSelectedReservation,
    handleStatusUpdate,
    handleBatchNoShow,
    forceCheck,
    handlePageChange,
    setPages,
    handleFilterChange,
  };
};
