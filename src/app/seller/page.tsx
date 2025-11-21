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
import { useEffect, useState } from 'react';
import { ConfirmDialog } from '@/components/features/dashboard/SubmitConfirmDialog';
import { useSearchParams } from 'next/navigation';

export default function RegistPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const loginId = token ? atob(token) : '';
  const [isNoShowDialogOpen, setIsNoShowDialogOpen] = useState(false);
  const [isVisitDoneDialogOpen, setIsVisitDoneDialogOpen] = useState(false);

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
    forceCheck,
    handlePageChange,
    handleFilterChange,
    setActiveEdit,
    // 정렬
    sortState,
    sortedReservations,
    handleSort,
  } = useReservationManager({ userId: loginId });

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
      location: 'center' as 'center',
      render: (res: Reservation) => (
        <span
          className={`px-3 py-1 rounded-full text-base font-normal ${
            res.status === 'PENDING'
              ? 'bg-status-pending text-status-pending-foreground'
              : res.status === 'NOSHOW'
              ? 'bg-status-noshow text-status-dark'
              : 'bg-status-completed text-status-completed-foreground'
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

  /** 노쇼 모드 전환 - Dialog로 확인 받기 */
  const onChangeEdit = (active: boolean) => {
    if (active) {
      // 편집 모드 진입 시 확인 다이얼로그 표시
      setIsNoShowDialogOpen(true);
    } else {
      // 취소 시 그냥 종료
      setActiveEdit(false);
    }
  };

  /** 노쇼 처리 확정 */
  const handleNoShowConfirm = () => {
    setActiveEdit(true);
    // TODO: 실제 노쇼 처리 API 호출
    // handleStatusUpdate(selectedReservation?.reservationNo, 'NOSHOW');
  };

  /** 노쇼 처리 취소 */
  const handleNoShowCancel = () => {
    setIsNoShowDialogOpen(false);
    setActiveEdit(false);
  };

  /** 방문 완료 전환 요청 - Dialog 띄우기 */
  const onDataUpdate = () => {
    setIsVisitDoneDialogOpen(true);
  };

  /** 방문 완료 확정 */
  const handleVisitDoneConfirm = () => {
    if (selectedReservation?.reservationNo) {
      handleStatusUpdate(selectedReservation.reservationNo, 'VISIT_DONE');
      setSelectedReservation(null);
    }
  };

  /** 방문 완료 취소 */
  const handleVisitDoneCancel = () => {
    setIsVisitDoneDialogOpen(false);
  };

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
        data={sortedReservations}
        expiredData={expiredReservations}
        onSelected={onSelectReservation}
        onTabChange={handleFilterChange}
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
    <>
      <TwoColumnLayout
        rightTitle={selectItemStatus === 'PENDING' ? '예약 상세정보를 확인해주세요' : '앗, 노쇼가 발생했나요?'}
        leftContent={
          <SinglePageLayout
            title='오늘의 예약 내역이에요'
            tabs={tabs}
            showFilters={true}
            columns={columns}
            data={reservations}
            expiredData={expiredReservations}
            onSelected={onSelectReservation}
            onTabChange={handleFilterChange}
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
        onDataUpdate={onDataUpdate}
        onStatusUpdate={() => console.log('update2')}
        onEditMode={onChangeEdit}
        leftClassName='flex-1'
        rightClassName='w-96'
        showTitles={true}
      />

      {/* 노쇼 확인 다이얼로그 */}
      <ConfirmDialog
        open={isNoShowDialogOpen}
        onOpenChange={setIsNoShowDialogOpen}
        onConfirm={handleNoShowConfirm}
        onCancel={handleNoShowCancel}
        title='예약 상태 변경'
        description='노쇼 상태로 전환하시겠습니까?'
      />

      {/* 방문 완료 확인 다이얼로그 */}
      <ConfirmDialog
        open={isVisitDoneDialogOpen}
        onOpenChange={setIsVisitDoneDialogOpen}
        onConfirm={handleVisitDoneConfirm}
        onCancel={handleVisitDoneCancel}
        title='고객 방문 완료'
        description='고객 방문 완료로 전환하시겠습니까?'
        confirmText='방문 완료'
        cancelText='취소'
      />
    </>
  );
}
