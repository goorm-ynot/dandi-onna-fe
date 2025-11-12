// src/components/layouts/SingleColumnLayout.tsx
'use client';

import React from 'react';
import { Reservation, SingleColumnLayoutProps } from '@/types/boardData';
import DashBoardLayout from './DashboardLayout';
import PageHeader from '../features/dashboard/PageHeader';
import FilterTabs from '../features/dashboard/FilterTab';
import ContentTable from '../features/dashboard/ContentTable';
import Pagination from '@/components/features/dashboard/ContentPagenation';
import ContentDate from '../features/dashboard/ContentDate';
import SinglePageLayout from '../features/dashboard/SinglePageLayout';

export default function SingleColumnLayout({
  title,
  showDate = true,
  dateString,

  // 필터
  showFilters = true,
  tabs = [],
  activeTab = 'all',
  onTabChange,

  // 테이블
  columns,
  reservations,
  onSelectReservation,
  isUpdating = false,
  emptyMessage,

  // 페이지네이션
  totalPages = 1,
  page = 1,
  onPageChange,

  // 기타
  expiredReservations = [],
  onBatchNoShow,
}: SingleColumnLayoutProps) {
  return (
    <DashBoardLayout>
      <div className='max-w-[1280px] w-full h-[758px] flex flex-col py-40 mb-8'>
        <SinglePageLayout
          title={title}
          tabs={tabs}
          showFilters={true}
          columns={columns}
          reservations={reservations}
          expiredReservations={expiredReservations}
          onSelectReservation={onSelectReservation}
          onTabChange={onTabChange}
          // onBatchNoShow={onBatchNoShow}
          isUpdating={isUpdating}
          totalPages={Number(totalPages)}
          page={Number(page)}
          onPageChange={onPageChange}
          emptyMessage={emptyMessage}
        />
      </div>
    </DashBoardLayout>
  );
}
