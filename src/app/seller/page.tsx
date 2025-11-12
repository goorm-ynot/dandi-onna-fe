/**
 * 사업자 메인 페이지 & 에약 내역을 확인할 수 있음
 */
'use client';

import SinglePageLayout from '@/components/features/dashboard/SinglePageLayout';
import SingleColumnLayout from '@/components/layout/SingleColumnLayout';
import { TwoColumnLayout } from '@/components/layout/TwoCloumnLayout';
import { useReservationManager } from '@/hooks/useReservationManger';
import { useEffect } from 'react';

export default function RegistPage() {
  /**
   * ✅ 예약 상태 & 관리 훅
   * - 예약 목록 로드 (React Query)
   * - Zustand 연동 (setReservations 등)
   * - 타이머 기반 만료 처리
   */
  const {
    reservations,
    selectedReservation,
    expiredReservations,
    isLoading,
    isUpdating,
    totalPage,
    cursor,
    setSelectedReservation,
    handleStatusUpdate,
    handleBatchNoShow,
    forceCheck,
    handlePageChange,
    handleFilterChange,
  } = useReservationManager();
  console.log('선택된 데이터: ', selectedReservation);
  /** 예시 탭 목록 (UI용) */
  const tabs = [
    { id: 'all', label: '전체' },
    { id: 'pending', label: '방문예정' },
    { id: 'confirmed', label: '노쇼' },
    { id: 'cancelled', label: '방문완료' },
  ];

  /** 예시 테이블 컬럼 (UI용) */
  const columns = [
    { key: 'id', header: '주문번호', width: '' },
    { key: 'time', header: '시간', width: '' },
    { key: 'menu', header: '메뉴명', width: '' },
    { key: 'contact', header: '연락처', width: '' },
    { key: 'status', header: '예약관리', width: '' },
  ];

  /** 페이지 로드시 타이머 강제 체크 (만료 예약 즉시 반영용) */
  useEffect(() => {
    forceCheck();
  }, [forceCheck]);

  /** 로딩 중 상태 표시 */
  if (isLoading) {
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
        <p className='text-gray-500'>예약 데이터를 불러오는 중...</p>
      </div>
    );
  }

  /** 예약이 아직 선택되지 않은 경우 — 단일 컬럼 레이아웃 */
  if (!selectedReservation) {
    return (
      <SingleColumnLayout
        title='오늘의 예약 내역이에요'
        tabs={tabs}
        showFilters={true}
        columns={columns}
        reservations={reservations}
        expiredReservations={expiredReservations}
        onSelectReservation={setSelectedReservation}
        onTabChange={handleFilterChange}
        onBatchNoShow={handleBatchNoShow}
        isUpdating={isUpdating}
        totalPages={Number(totalPage)}
        page={Number(cursor)}
        onPageChange={handlePageChange}
        emptyMessage='오늘 예약이 비어있습니다.'
      />
    );
  }

  /** 예약이 선택된 경우 — 두 개의 패널로 세부 정보 표시 */
  return (
    <TwoColumnLayout
      rightTitle={'상태에 따라 바뀜'}
      leftContent={
        <SinglePageLayout
          title='오늘의 예약 내역이에요'
          tabs={tabs}
          showFilters={true}
          columns={columns}
          reservations={reservations}
          expiredReservations={expiredReservations}
          onSelectReservation={setSelectedReservation}
          onTabChange={handleFilterChange}
          onBatchNoShow={handleBatchNoShow}
          isUpdating={isUpdating}
          totalPages={Number(totalPage)}
          page={Number(cursor)}
          onPageChange={handlePageChange}
          emptyMessage='오늘 예약이 비어있습니다.'
        />
      }
      panelType={'reservation-detail'}
      panelMode={'edit'}
      selectedData={selectedReservation}
      onBack={() => console.log('onBack')}
      onModeChange={() => console.log('mode change')}
      onDataUpdate={() => console.log('update')}
      onStatusUpdate={() => console.log('update2')}
      leftClassName='flex-1'
      rightClassName='w-96'
      showTitles={true}
    />
  );
}
