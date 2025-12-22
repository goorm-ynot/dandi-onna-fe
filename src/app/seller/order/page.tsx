'use client';
import SinglePageLayout from '@/components/features/dashboard/SinglePageLayout';
import SingleColumnLayout from '@/components/layout/SingleColumnLayout';
import { TwoColumnLayout } from '@/components/layout/TwoCloumnLayout';
import { ConfirmDialog } from '@/components/features/dashboard/SubmitConfirmDialog';
import { orderStatus } from '@/constants/sellerNavConstant';
import { useSellerOrderManage } from '@/hooks/useSellerOrderManage';
import { formatTimeString } from '@/lib/dateParse';
import { OrderDetail, OrderItem, OrderItemList } from '@/types/boardData';
import React, { useState } from 'react';
import { useApiErrorHandler } from '@/hooks/useApiErrorHandler';

export default function NoShowOrderListPage() {
  const [isCompleteVisitDialogOpen, setIsCompleteVisitDialogOpen] = useState(false);
  const { handleApiError } = useApiErrorHandler();

  const {
    orders,
    selectItemId,
    selectOrderItem,
    cursor,
    totalPages,
    activeFilter,
    isLoading,
    refetch,
    error,
    onSelected,
    handlePageChange,
    handleFilterChange, // 구현 진행중 (백엔드 필터링 필요)
    handleSort, // 정렬
    handleCompleteVisit,

    sortState,
  } = useSellerOrderManage();

  /** 방문 완료 요청 - Dialog 띄우기 */
  const onStatusUpdate = () => {
    setIsCompleteVisitDialogOpen(true);
  };

  /** 방문 완료 확정 */
  const handleCompleteVisitConfirm = () => {
    if (selectOrderItem) {
      try {
        handleCompleteVisit(selectOrderItem.orderId.toString());
      } catch (error) {
        handleApiError(error);
      }
    }
  };

  /** 방문 완료 취소 */
  const handleCompleteVisitCancel = () => {
    setIsCompleteVisitDialogOpen(false);
  };

  // 탭 목록 (UI용)
  const tabs = [
    { id: 'ALL', label: '전체' },
    { id: 'PENDING', label: '노쇼 주문 완료' },
    { id: 'COMPLETED', label: '노쇼 방문 완료' },
  ];

  // 테이블 컬럼 (UI용)
  const columns = [
    { key: 'orderId', header: '주문번호', sortable: true },
    {
      key: 'visitTime',
      sortable: true,
      sortKey: 'visitTime', // 실제 데이터 필드명
      header: '시간',
      render: (res: { visitTime: string | number | Date }) => formatTimeString(new Date(res.visitTime)),
    },
    {
      key: 'menuNames',
      header: '메뉴명',
      isWide: true,
      // render: (res: { menus: any[] }) => res?.menus.map((m: { name: any }) => m.name).join(', '),
    },
    { key: 'consumerPhone', header: '연락처' },
    {
      key: 'status',
      header: '예약관리',
      location: 'center' as 'center',
      render: (res: OrderItemList) => (
        <span
          className={`px-3 py-1 rounded-[20px] caption5 h-[26px] ${
            res.status === 'PENDING'
              ? 'bg-status-pending text-status-pending-foreground'
              : 'bg-status-completed text-status-completed-foreground'
          }`}>
          {orderStatus[res.status as keyof typeof orderStatus] || res.status}
        </span>
      ),
    },
  ];

  if (!selectItemId) {
    return (
      <SingleColumnLayout
        title='노쇼 주문 내역을 볼 수 있어요'
        tabs={tabs}
        showFilters={true}
        columns={columns}
        data={orders}
        onSelected={onSelected}
        onTabChange={handleFilterChange}
        totalPages={totalPages}
        page={cursor}
        onPageChange={handlePageChange}
        emptyMessage='주문 내역이 비어있습니다.'
        activeTab={activeFilter}
        selectItemId={selectItemId}
        onSort={handleSort}
        sortState={sortState}
      />
    );
  }

  return (
    <>
      <TwoColumnLayout
        rightTitle='노쇼 주문내역 상세정보'
        leftContent={
          <SinglePageLayout
            title='노쇼 주문 내역을 볼 수 있어요'
            tabs={tabs}
            showFilters={true}
            columns={columns}
            data={orders}
            onSelected={onSelected}
            onTabChange={handleFilterChange}
            totalPages={totalPages}
            page={cursor}
            onPageChange={handlePageChange}
            emptyMessage='주문 내역이 비어있습니다.'
            activeTab={activeFilter}
            selectItemId={selectItemId}
            onSort={handleSort}
            sortState={sortState}
          />
        }
        panelType={'noshow-order-view'}
        panelMode='view'
        selectedData={selectOrderItem}
        leftClassName='flex-1'
        rightClassName='w-96'
        showTitles={true}
        onStatusUpdate={onStatusUpdate}
      />

      {/* 방문 완료 확인 Dialog */}
      <ConfirmDialog
        open={isCompleteVisitDialogOpen}
        onOpenChange={setIsCompleteVisitDialogOpen}
        onConfirm={handleCompleteVisitConfirm}
        onCancel={handleCompleteVisitCancel}
        title='고객 방문 완료'
        description='방문이 완료되었나요? 상태를 완료로 변경하시겠습니까?'
        confirmText='완료'
        cancelText='취소'
      />
    </>
  );
}
