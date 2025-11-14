/**
 * 사업자 메인 페이지 & 에약 내역을 확인할 수 있음
 */
'use client';

import SinglePageLayout from '@/components/features/dashboard/SinglePageLayout';
import SingleColumnLayout from '@/components/layout/SingleColumnLayout';
import { TwoColumnLayout } from '@/components/layout/TwoCloumnLayout';
import { reservationStatus } from '@/constants/sellerNavConstant';
import { useReservationManager } from '@/hooks/useReservationManger';
import { Reservation } from '@/types/boardData';
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
    activeTab,
    selectItemId,
    selectItemStatus,
    activeEdit,
    setSelectedReservation,
    handleStatusUpdate,
    handleBatchNoShow,
    forceCheck,
    handlePageChange,
    handleFilterChange,
    setActiveEdit,
    // 정렬
    sortState,
    sortedReservations,
    handleSort,
  } = useReservationManager();

  /** 예시 탭 목록 (UI용) */
  const tabs = [
    { id: 'all', label: '전체' },
    { id: 'PENDING', label: '방문예정' },
    { id: 'NOSHOW', label: '노쇼' },
    { id: 'VISIT_DONE', label: '방문완료' },
  ];

  /** 테이블 컬럼 (UI용) */
  const columns = [
    { key: 'reservationNo', sortable: true, header: '예약번호' },
    {
      key: 'time',
      header: '시간',
      sortable: true,
      render: (res: { time: string | number | Date }) =>
        new Date(res.time).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }),
    },
    {
      key: 'menu',
      header: '메뉴명',
      isWide: true, // ✅ 메뉴명 컬럼만 넓게
      render: (res: { menus: any[] }) => res.menus.map((m: { name: any }) => m.name).join(', '),
    },
    { key: 'contact', header: '연락처', width: '' },
    {
      key: 'status',
      header: '예약관리',
      render: (res: Reservation) => (
        <span
          className={`px-3 py-1 rounded-full text-base font-normal ${
            res.status === 'PENDING'
              ? 'bg-secondary text-secondary-foreground'
              : res.status === 'NOSHOW'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground'
          }`}>
          {reservationStatus[res.status as keyof typeof reservationStatus] || res.status}
        </span>
      ),
    },
  ];

  /** 페이지 로드시 타이머 강제 체크 (만료 예약 즉시 반영용) */
  useEffect(() => {
    forceCheck();
  }, [forceCheck]);

  /** 방문 완료 된 부분은 선택 안되게
   * (INFO: 당장은 mock데이터를 사용해서 그냥 다 넘기지만 API 호출 시, 이부분 수정 필요)
   */
  const onSelectReservation = (reservation: Reservation) => {
    if (reservation.status === 'PENDING') {
      setSelectedReservation(reservation);
      setActiveEdit(false);
      return;
    }
    setSelectedReservation(null);
  };

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
        reservations={sortedReservations}
        expiredReservations={expiredReservations}
        onSelectReservation={onSelectReservation}
        onTabChange={handleFilterChange}
        onBatchNoShow={handleBatchNoShow}
        isUpdating={isUpdating}
        totalPages={Number(totalPage)}
        page={Number(cursor)}
        onPageChange={handlePageChange}
        emptyMessage='오늘 예약이 비어있습니다.'
        activeTab={activeTab}
        selectItemId={selectItemId}
        sortState={sortState}
        onSort={handleSort}
      />
    );
  }

  /** 예약이 선택된 경우 — 두 개의 패널로 세부 정보 표시 */
  return (
    <TwoColumnLayout
      rightTitle={selectItemStatus === 'PENDING' ? '예약 상세정보를 확인해주세요' : '앗, 노쇼가 발생했나요?'}
      leftContent={
        <SinglePageLayout
          title='오늘의 예약 내역이에요'
          tabs={tabs}
          showFilters={true}
          columns={columns}
          reservations={reservations}
          expiredReservations={expiredReservations}
          onSelectReservation={onSelectReservation}
          onTabChange={handleFilterChange}
          onBatchNoShow={handleBatchNoShow}
          isUpdating={isUpdating}
          totalPages={Number(totalPage)}
          page={Number(cursor)}
          onPageChange={handlePageChange}
          emptyMessage='오늘 예약이 비어있습니다.'
          activeTab={activeTab}
          selectItemId={selectItemId}
        />
      }
      // selectItemStatus 말고 다른 방법?
      panelType={!activeEdit ? 'reservation-detail' : 'noshow-edit'}
      // panelMode={'edit'}
      panelMode={'noshow-form'}
      selectedData={selectedReservation}
      onBack={() => console.log('onBack')}
      onModeChange={() => console.log('mode change')}
      onDataUpdate={() => console.log('update')}
      onStatusUpdate={() => console.log('update2')}
      onEditMode={(active: boolean) => setActiveEdit?.(active)}
      leftClassName='flex-1'
      rightClassName='w-96'
      showTitles={true}
    />
  );
}
