/**
 * 사업자 메인 페이지 & 에약 내역을 확인할 수 있음
 */
'use client';

import SinglePageLayout from '@/components/features/dashboard/SinglePageLayout';
import { TwoColumnLayout } from '@/components/layout/TwoCloumnLayout';
import { reservationStatus } from '@/constants/sellerNavConstant';
import { useReservationManager } from '@/hooks/useReservationManger';
import { Reservation } from '@/types/boardData';
import { useEffect, useState, Suspense } from 'react';
import { ConfirmDialog } from '@/components/features/dashboard/SubmitConfirmDialog';
import { useSearchParams } from 'next/navigation';
import { EmptyPanelGuide } from '@/components/common/EmptyPanelGuide';
import { SELLER_PANEL_CONFIG, EmptyPanelVariant } from '@/constants/emptyPanelConfigs';
import clsx from 'clsx';

/**
 * 예약 데이터 기반 variant 판단 함수
 * 우선순위: error > warning > success > info
 */
const determineReservationVariant = (reservations: Reservation[]): EmptyPanelVariant => {
  if (!reservations || reservations.length === 0) {
    return 'info';
  }

  // error 우선순위 (나중에 구현)
  // const hasError = reservations.some((res) => res.status === 'ERROR');
  // if (hasError) return 'error';

  // warning 우선순위: LATE가 한 개라도 있는 경우
  const hasLate = reservations.some((res) => res.status === 'LATE');
  if (hasLate) return 'warning';

  // success 우선순위: NOSHOW가 있는 경우
  const hasNoShow = reservations.some((res) => res.status === 'NOSHOW');
  if (hasNoShow) return 'success';

  // info: 데이터가 없거나 모든 데이터가 PENDING/VISIT_DONE인 경우
  return 'info';
};

function SellerPageContent() {
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
    { id: 'LATE', label: '확인필요' },
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
          className={clsx(
            'px-[12px] py-[4px] rounded-[20px] h-[26px] w-[120px] caption5 inline-flex items-center justify-center',
            {
              'bg-status-pending text-status-pending-foreground': res.status === 'PENDING',
              'bg-status-noshow text-status-noshow-foreground': res.status === 'LATE',
              'bg-system-blue-light text-system-blue-strong': res.status === 'NOSHOW',
              'bg-status-completed text-status-completed-foreground': res.status === 'VISIT_DONE',
            }
          )}
        >
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

  /** 선택 시 동작 */
  const onSelectReservation = (reservation: Reservation) => {
    setActiveEdit(false);
    setSelectedReservation(reservation);
    // if (reservation.status === 'PENDING' || reservation.status === 'LATE') {
    //   return;
    // }
    // setSelectedReservation(null);
  };

  /** 로딩 중 상태 표시 */
  if (isLoading) {
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
        <p className='text-gray-500'>예약 데이터를 불러오는 중...</p>
      </div>
    );
  }

  /** 항상 TwoColumnLayout 사용 */
  return (
    <>
      <TwoColumnLayout
        rightTitle={selectedReservation && selectItemStatus === 'LATE' ? '앗, 노쇼가 발생했나요?' : '예약 상세정보를 확인해주세요'}
        leftContent={
          <SinglePageLayout
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
            onSort={handleSort}
            sortState={sortState}
          />
        }
        // 예약이 선택되지 않았을 때는 EmptyGuide를 렌더링하고, 선택되었을 때는 실제 패널을 표시
        panelType={!activeEdit ? 'reservation-detail' : 'noshow-edit'}
        panelMode={'noshow-form'}
        selectedData={selectedReservation}
        onBack={() => console.log('onBack')}
        onModeChange={() => console.log('mode change')}
        onDataUpdate={onDataUpdate}
        onStatusUpdate={() => console.log('update2')}
        onEditMode={onChangeEdit}
        leftClassName='flex-1'
        rightClassName='w-96'
        showTitles={!!selectedReservation}
        // 선택이 되지 않은 경우 보여줌
        emptyContent={
          <EmptyPanelGuide 
            config={SELLER_PANEL_CONFIG} 
            variant={determineReservationVariant(sortedReservations)} 
          />
        }
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

export default function RegistPage() {
  return (
    <Suspense
      fallback={
        <div className='w-screen h-screen flex items-center justify-center'>
          <p className='text-gray-500'>로딩 중...</p>
        </div>
      }>
      <SellerPageContent />
    </Suspense>
  );
}
