// hooks/useReservationManager.ts
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import axios from 'axios';

import { useReservationStore } from '@/store/useReservationStore';
import { useReservationTimer } from './useReservationTimer';
import { useReservationApi } from './useReservationApi';
import { Reservation, SortState } from '@/types/boardData';
import { sortData, handleSortToggle } from '@/lib/sortUtils';

export const useReservationManager = ({ userId = null }: { userId?: string | null }) => {
  const router = useRouter();
  const {
    reservations,
    selectedReservation,
    totalPage,
    cursor,
    activeTab,
    selectItemId,
    selectItemStatus,
    activeEdit,
    setPages,
    setReservations,
    setSelectedReservation,
    getExpiredReservations,
    setActiveTab,
    setActiveEdit,
  } = useReservationStore();

  const { forceCheck } = useReservationTimer();
  const { updateStatus, batchNoShow, isUpdating } = useReservationApi();
  const [sortState, setSortState] = useState<SortState>({ key: '', order: null });

  // 에러 처리 핸들러
  const handleQueryError = (error: any) => {
    console.error('❌ API Error:', error);
    if (error?.message === 'AUTH_FAILURE' || error?.response?.status === 401 || error?.response?.status === 403) {
      alert('연결이 원활하지 않습니다. 다시 시도해주세요');
      router.replace('/');
    }
  };

  // 예약 목록 로드
  const {
    data: reservationData,
    isLoading,
    refetch,
    error: reservationError,
  } = useQuery({
    queryKey: ['reservations', activeTab, cursor],
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
          userId, // 임시 추가
        },
      });
      // console.log('response: ', response.data);
      return response.data;
    },
    staleTime: 1000 * 60 * 1, // 1분간 캐시 유지
    refetchOnWindowFocus: false, // 윈도우 포커스시 refetch 비활성화
  });

  // 에러 감지 및 처리
  useEffect(() => {
    if (reservationError) {
      handleQueryError(reservationError);
    }
  }, [reservationError]);

  // 데이터 로드 시 Zustand에 저장
  useEffect(() => {
    if (reservationData) {
      setReservations(reservationData.data);
      setPages(reservationData.totalPage, reservationData.cursor);
    }
  }, [reservationData, setReservations, setPages, setActiveTab, activeTab]);

  // 만료된 예약 알림
  const expiredReservations = getExpiredReservations();

  const handleStatusUpdate = (reservationNo: string, status: 'NOSHOW' | 'VISIT_DONE') => {
    updateStatus({ reservationNo, status });
    // 업데이트 후 선택한거 clear
    setSelectedReservation(null);
  };

  // 페이지 변경 함수
  const handlePageChange = (newPage: number) => {
    setPages(totalPage, newPage);
  };

  // Filter 선택 함수
  const handleFilterChange = (filter: string) => {
    setActiveTab(filter);
  };

  // ✅ 정렬 핸들러
  const handleSort = (key: string) => {
    // console.log('Sorting by key:', key);
    handleSortToggle(key, setSortState);
  };

  // ✅ 정렬된 예약 데이터
  const sortedReservations = useMemo(() => {
    return sortData(reservations, sortState);
  }, [reservations, sortState]);

  return {
    // 상태
    reservations,
    selectedReservation,
    expiredReservations,
    isLoading,
    isUpdating,
    totalPage,
    cursor,
    activeTab,
    selectItemId,
    selectItemStatus,
    activeEdit,

    // 액션
    setSelectedReservation,
    handleStatusUpdate,
    forceCheck,
    handlePageChange,
    setPages,
    handleFilterChange,
    setActiveEdit,

    // 정렬
    sortState,
    sortedReservations,
    handleSort,
  };
};
