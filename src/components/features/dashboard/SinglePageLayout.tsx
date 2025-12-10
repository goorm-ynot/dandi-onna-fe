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
    <div className=''>
      {/* 헤더 (title + 날짜) */}
      <div className='flex flex-row justify-between items-center pb-40'>
        <PageHeader title={title} />
        <ContentDate showDate={showDate} dateString={dateString} />
      </div>
      <div className='h-[758px] overflow-hidden border border-border-wrapper border-1 rounded-md bg-background-normal flex flex-col'>
          {/* 필터 (조건부) */}
          {showFilters && tabs.length > 0 && onTabChange && (
            <div className='flex items-center justify-between border-b border-border-wrapper px-20 pt-20 '>
                <FilterTabs tabs={tabs} activeTab={activeTab} onTabChange={onTabChange} />
            </div>
          )}

        {/* 테이블 */}
        <div className='flex-1'>
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
        </div>
        <div className='border-t border-border-wrapper'>
          {/* 페이지네이션 */}
          <Pagination totalPages={totalPages} currentPage={page} onPageChange={onPageChange} />
        </div>
      </div>
    </div>
  );
}
