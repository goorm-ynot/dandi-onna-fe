'use client';
import SinglePageLayout from '@/components/features/dashboard/SinglePageLayout';
import SingleColumnLayout from '@/components/layout/SingleColumnLayout';
import { TwoColumnLayout } from '@/components/layout/TwoCloumnLayout';
import { AlertDialog } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ConfirmDialog } from '@/components/features/dashboard/SubmitConfirmDialog';
import { useNoShowManage } from '@/hooks/useNoShowManage';
import { NoShowMenuList } from '@/types/noShowPanelType';
import React, { useState } from 'react';
import { EmptyPanelVariant, ORDER_PANEL_CONFIG } from '@/constants/emptyPanelConfigs';
import { EmptyPanelGuide } from '@/components/common/EmptyPanelGuide';


/**
 * 노쇼 메뉴 기반 variant 판단 함수
 * 우선 순위: succsee > info
 */
const determineNoShowVariant = (noShowList: NoShowMenuList[]): EmptyPanelVariant => {
  if (!noShowList || noShowList.length === 0) {
    return 'info';
  }

  // success 우선순위: 노쇼 메뉴가 하나라도 있는 경우
  const hasNoShowMenu = noShowList.some((menu) => menu.quantity > 0);
  if (hasNoShowMenu) return 'success';

  // info: 데이터가 없거나 모든 데이터가 품절인 경우
  return 'info';
}


export default function NoShowMenuPage() {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const {
    // noShowList,
    selectNoShowItem,
    cursor,
    totalPages,
    activeEdit,
    // selectItemId,
    isLoading,
    // error
    // noShowListError,
    // detailError,
    setSelectNoshowItem,
    onSelected,
    handlePageChange,
    setActiveEdit,
    // sort
    handleSort,
    sortState,
    sortedReservations: sortedNoShowList,
  } = useNoShowManage();

  // const handleSelectStatus = (item: string) => {
  //   console.log(item);
  // };

  /** 노쇼 메뉴 삭제 요청 - Dialog 띄우기 */
  const onDataUpdate = () => {
    setIsDeleteDialogOpen(true);
  };

  /** 노쇼 메뉴 삭제 확정 */
  const handleDeleteConfirm = () => {
    // INFO: 실제 삭제 API 호출
    // console.log('🗑️ 노쇼 메뉴 삭제 확정:', selectNoShowItem);
    setActiveEdit(false);
    // 선택한 데이터도 빈값으로 설정
    setSelectNoshowItem(null);
  };

  /** 노쇼 메뉴 삭제 취소 */
  const handleDeleteCancel = () => {
    setIsDeleteDialogOpen(false);
  };

  /** 테이블 컬럼 (UI용) */
  const columns = [
    {
      key: 'time',
      sortKey: 'visitTime', // 실제 데이터 필드명
      header: '시간',
      sortable: true, // 페이지 하나당 정렬 > 정렬 훅 추가 필요
      render: (res: { visitTime: string | number | Date }) =>
        new Date(res.visitTime).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: false }),
    },
    {
      key: 'menu',
      header: '메뉴명',
      isWide: true, // ✅ 메뉴명 컬럼만 넓게
      render: (res: { name: string | null; quantity: number }) => (
        <p>
          {res.name} ({res.quantity})
        </p>
      ),
    },
    {
      key: 'status',
      header: '메뉴관리',
      location: 'center' as 'center',
      render: (res: NoShowMenuList) => (
        <Button
          className='rounded-[20px] max-w-[120px] w-full py-[4px] px-[12px]'
          size='table'
          variant='default'
          onClick={(e) => {
            e.stopPropagation(); // 행 클릭 이벤트 방지
            // 개수가 0일 땐 안열리게 하기
            if (res.quantity > 0) onSelected(res.postId.toString());
            else alert('품절된 상품입니다');
          }}>
          수정
        </Button>
      ),
    },
  ];

  /** 로딩 중 상태 표시 */
  if (isLoading) {
    return (
      <div className='w-screen h-screen flex items-center justify-center'>
        <p className='text-gray-500'>예약 데이터를 불러오는 중...</p>
      </div>
    );
  }
/** TwoColumnLayout만 보이기 */
  return (
    <>
      <TwoColumnLayout
        rightTitle='노쇼 주문내역 상세정보'
        leftContent={
          <SinglePageLayout
            title='노쇼 메뉴 상태를 관리해요'
            showFilters={false}
            columns={columns}
            data={sortedNoShowList || []}
            expiredData={[]}
            // onSelected={onSelected} // 행 클릭 비활성화
            isUpdating={activeEdit}
            totalPages={Number(totalPages)}
            page={Number(cursor)}
            onPageChange={handlePageChange}
            emptyMessage='오늘 노쇼가 없습니다!' // TODO: 멘트 추천받기
            onSort={handleSort}
            sortState={sortState}
          />
        }
        panelType='noshow-edit'
        panelMode={'edit'}
        selectedData={selectNoShowItem}
        onDataUpdate={onDataUpdate}
        emptyContent={
          <EmptyPanelGuide 
            config={ORDER_PANEL_CONFIG}
            variant={determineNoShowVariant(sortedNoShowList)}
          />
        }
      />

      {/* 노쇼 메뉴 삭제 확인 Dialog */}
      <ConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        title='삭제 전 확인'
        description='노쇼 메뉴를 정말 삭제하시겠습니까?'
      />
    </>
  );
}
