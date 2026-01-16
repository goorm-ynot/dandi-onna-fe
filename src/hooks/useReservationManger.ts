// hooks/useReservationManager.ts
import { useEffect, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { useReservationStore } from '@/store/useReservationStore';
import { useReservationTimer } from './useReservationTimer';
import { useReservationApi } from './useReservationApi';
import { Reservation, SortState } from '@/types/boardData';
import { sortData, handleSortToggle } from '@/lib/sortUtils';
import { reservationStorage } from '@/lib/reservationStorage';

export const useReservationManager = ({ userId = null }: { userId?: string | null }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  
  // ✅ Zustand는 UI 상태만 관리
  const {
    selectedReservation,
    activeTab,
    selectItemId,
    selectItemStatus,
    activeEdit,
    setSelectedReservation,
    setActiveTab,
    setActiveEdit,
  } = useReservationStore();

  // ✅ cursor는 로컬 상태로 관리 (페이지네이션 UI용)
  const [cursor, setCursor] = useState(1);

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

  // localStorage에서 직접 예약 목록 로드 (React Query 캐싱)
  const {
    data: reservations,
    isLoading,
    refetch,
    error: reservationError,
  } = useQuery({
    queryKey: ['reservations', activeTab, cursor],
    queryFn: async () => {
      // ✅ localStorage에서 직접 데이터 가져오기
      const allReservations = reservationStorage.getAll();
      
      // ✅ 상태별 필터링
      const filtered = reservationStorage.filterByStatus(activeTab === 'LATE' ? 'LATE' : activeTab || 'all');
      
      // ✅ 페이지네이션 계산
      const pageSize = 10;
      const totalPages = Math.ceil(filtered.length / pageSize);
      const start = (cursor - 1) * pageSize;
      const end = start + pageSize;
      const paginatedData = filtered.slice(start, end);
      
      return {
        data: paginatedData,
        totalPage: totalPages,
        cursor: cursor,
      };
    },
    staleTime: 1000 * 30, // 30초간 캐시 유지
    refetchOnWindowFocus: false,
  });

  // 에러 감지 및 처리
  useEffect(() => {
    if (reservationError) {
      handleQueryError(reservationError);
    }
  }, [reservationError]);

  // 만료된 예약 가져오기
  const expiredReservations = useMemo(() => {
    return reservationStorage.getExpired();
  }, [reservations]);

  // 상태 업데이트 핸들러
  const handleStatusUpdate = (reservationNo: string, status: 'NOSHOW' | 'VISIT_DONE') => {
    // localStorage 업데이트
    reservationStorage.updateStatus(reservationNo, status);
    
    // React Query 캐시 무효화
    queryClient.invalidateQueries({ queryKey: ['reservations'] });
    
    // 선택 해제
    setSelectedReservation(null);
  };

  // ✅ 페이지 변경 함수
  const handlePageChange = (newPage: number) => {
    setCursor(newPage);
  };

  // ✅ Filter 선택 함수
  const handleFilterChange = (filter: string) => {
    setActiveTab(filter);
    setCursor(1); // 필터 변경 시 첫 페이지로 리셋
  };

  // ✅ 정렬 핸들러
  const handleSort = (key: string) => {
    // console.log('Sorting by key:', key);
    handleSortToggle(key, setSortState);
  };

  // ✅ 필터링 및 정렬된 예약 데이터
  const sortedReservations = useMemo(() => {
    if (!reservations) return [];
    return sortData(reservations.data, sortState);
  }, [reservations, sortState]);

  return {
    // 상태
    reservations: reservations?.data || [],
    selectedReservation,
    expiredReservations,
    isLoading,
    isUpdating,
    totalPage: reservations?.totalPage || 0,
    cursor, // ✅ 로컬 상태에서 가져옴
    activeTab,
    selectItemId,
    selectItemStatus,
    activeEdit,

    // 액션
    setSelectedReservation,
    handleStatusUpdate,
    forceCheck,
    handlePageChange,
    handleFilterChange,
    setActiveEdit,

    // 정렬
    sortState,
    sortedReservations,
    handleSort,
  };
};
