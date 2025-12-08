import { SingleColumnLayoutProps } from '@/types/boardData';
import React from 'react';
import PageHeader from './PageHeader';
import ContentDate from './ContentDate';
import FilterTabs from './FilterTab';
import ContentTable from './ContentTable';
import Pagination from './ContentPagenation';

export default function SinglePageLayout({
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
  data,
  onSelected,
  isUpdating = false,
  emptyMessage,
  selectItemId,

  // 페이지네이션
  totalPages = 1,
  page = 1,
  onPageChange,

  // 기타
  expiredData = [],
  sortState,
  onSort,
}: // onBatchNoShow,
SingleColumnLayoutProps) {
  return (
    <div className='px-40'>
      {/* 헤더 (title + 날짜) */}
      <PageHeader title={title} />
      <div className='h-[758px] overflow-hidden border border-border-wrapper border-1 rounded-md'>
        <div className='flex items-center justify-between border-b border-border-wrapper px-20 pt-20 mb-20'>
          {/* 필터 (조건부) */}
          {showFilters && tabs.length > 0 && onTabChange && (
            <FilterTabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
          )}
          <ContentDate showDate={showDate} dateString={dateString} />
        </div>

        {/* 테이블 */}
        <ContentTable
          columns={columns}
          data={data}
          onSelectRow={onSelected}
          selectItemId={selectItemId}
          emptyMessage={emptyMessage}
          expiredData={expiredData}
          sortState={sortState}
          onSort={onSort}
        />

        {/* 페이지네이션 */}
        <Pagination totalPages={totalPages} currentPage={page} onPageChange={onPageChange} />
      </div>
    </div>
  );
}
