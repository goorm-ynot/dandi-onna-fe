// hooks/useReservationManager.ts
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useReservationStore } from '@/store/useReservationStore';
import { useReservationTimer } from './useReservationTimer';
import { useReservationApi } from './useReservationApi';
import { Reservation, SortState } from '@/types/boardData';

export const useReservationManager = () => {
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

  // 예약 목록 로드
  const {
    data: reservationData,
    isLoading,
    refetch,
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
        },
      });
      // console.log('response: ', response.data);
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5분간 캐시 유지
    refetchOnWindowFocus: false, // 윈도우 포커스시 refetch 비활성화
  });

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
    setSortState((prev) => {
      if (prev.key !== key) {
        return { key, order: 'asc' };
      }

      switch (prev.order) {
        case null:
          return { key, order: 'asc' };
        case 'asc':
          return { key, order: 'desc' };
        case 'desc':
          return { key, order: null };
        default:
          return { key, order: 'asc' };
      }
    });
  };

  // ✅ 정렬된 예약 데이터
  const sortedReservations = useMemo(() => {
    if (!sortState.key || !sortState.order) {
      return reservations;
    }

    return [...reservations].sort((a, b) => {
      const key = sortState.key as keyof typeof a;
      let aValue = a[key];
      let bValue = b[key];

      // 시간 정렬 특별 처리
      if (key === 'time') {
        const aTime = new Date(aValue as unknown as string).getTime();
        const bTime = new Date(bValue as unknown as string).getTime();
        return sortState.order === 'asc' ? aTime - bTime : bTime - aTime;
      }

      // 문자열 정렬
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const result = aValue.localeCompare(bValue);
        return sortState.order === 'asc' ? result : -result;
      }

      // 숫자 정렬
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortState.order === 'asc' ? aValue - bValue : bValue - aValue;
      }

      // 기본 정렬
      if (aValue < bValue) return sortState.order === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortState.order === 'asc' ? 1 : -1;
      return 0;
    });
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
