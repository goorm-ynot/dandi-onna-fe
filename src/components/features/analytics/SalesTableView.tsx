/**
 * SalesTableView
 * - 매출 상세 내역 테이블 뷰 렌더만 담당 (필터/푸터/페이지네이션 없음)
 */

'use client';

import * as React from 'react';
import { SalesTableSectionProps } from '@/types/analyticsType';
import GridTable from '../mypage/GridTable';


export function SalesTableView({
  column,
  salesData,
  isLoading = false,
  emptyText = '조회된 주문 내역이 없어요.',
}: SalesTableSectionProps) {
  if (isLoading) {
    // 프로젝트에 스켈레톤 컴포넌트가 있으면 여기서 교체하면 좋음
    return (
      <div className="bg-white px-24 py-24 min-h-[354px]">
        <div className="body4 text-foreground-secondary">불러오는 중...</div>
      </div>
    );
  }

  if (!salesData || salesData.length === 0) {
    return (
      <div className="bg-white px-24 py-24 min-h-[354px]">
        <div className="body4 text-foreground-secondary">{emptyText}</div>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-hidden min-h-[354px]">
      <GridTable columns={column} data={salesData} />
    </div>
  );
}
