/**
 * SalesTable 컴포넌트
 * - 매출 상세 내역 테이블
 * - 필터 (조회기간, 주문유형)
 */

'use client';

import * as React from 'react';
import ExcelIcon from '@/assets/icons/IconL-excel.svg';
import { Label } from '@/components/ui/label';
import { DateRangePicker } from './DateRangePicker';
import { SalesTableSectionProps } from '@/types/analyticsType';
import ContentTable from '../dashboard/ContentTable';


export const SalesTable = ({
  salesData, 
  column, 
  }: SalesTableSectionProps) => {
  const [periodType, setPeriodType] = React.useState<string>('today');
  const [orderType, setOrderType] = React.useState<string>('all');
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();
  const [mounted, setMounted] = React.useState(false);

  const showDatePicker = periodType === 'custom';

  // 클라이언트 마운트 확인
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // periodType 변경 시 startDate, endDate 초기화
  React.useEffect(() => {
    const today = new Date();
    let start: Date | undefined;
    let end: Date | undefined;

    switch (periodType) {
      case 'today':
        start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        end = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        break;
      case 'week':
        const firstDayOfWeek = today.getDate() - today.getDay();
        start = new Date(today.getFullYear(), today.getMonth(), firstDayOfWeek);
        end = new Date(today.getFullYear(), today.getMonth(), firstDayOfWeek + 6);
        break;
      case 'month':
        start = new Date(today.getFullYear(), today.getMonth(), 1);
        end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        break;
      case 'custom':
        start = undefined;
        end = undefined;
        break;
      default:
        start = undefined;
        end = undefined;
    }

    setStartDate(start);
    setEndDate(end);
  }, [periodType]);

  // 날짜 포맷 함수 (hydration 에러 방지)
  const formatDateRange = () => {
    if (!mounted || !startDate || !endDate) return '';
    return `${startDate.toLocaleDateString('ko-KR')} ~ ${endDate.toLocaleDateString('ko-KR')}`;
  };

  return (
    <div className="flex flex-col w-full border border-border-normal rounded-md ">
      {/* 필터 영역 */}
      <div className="flex flex-row justify-between items-center px-24 py-16 bg-background-normal-subtle border-b border-border-normal"> 
        {/* 조회기간을 text로 나타냄*/}
        <Label className='title3 text-foreground-normal'>{formatDateRange()}</Label>
        {/* 조회기간 + 주문유형 */}
        <div className="flex items-center gap-16">
          {/* 조회기간 */}
          <div className="flex items-center gap-10">
            <Label className="title1 text-foreground-secondary">조회기간</Label>
            <select
              value={periodType}
              onChange={(e) => setPeriodType(e.target.value)}
              className="flex h-37 w-[137px] rounded border border-gray-300 bg-white px-12 
              py-[8px] body4 text-foreground-normal focus:outline-none focus:ring-2 
              focus:ring-blue-500"
            >
              <option value="today">오늘</option>
              <option value="week">이번 주</option>
              <option value="month">이번 달</option>
              <option value="custom">직접선택</option>
            </select>
          </div>


        {/* 날짜 범위 선택 (직접선택일 때만 표시) */}
        {showDatePicker && (
          <div className="flex items-center gap-10">
            <Label className="title1 text-foreground-secondary">기간선택</Label>
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={setStartDate}
              onEndDateChange={setEndDate}
            />
          </div>
        )}

          {/* 주문유형 */}
          <div className="flex items-center gap-10">
            <Label className="title1 text-foreground-secondary ">주문유형</Label>
            <select
              value={orderType}
              onChange={(e) => setOrderType(e.target.value)}
              className="flex h-37 w-[137px] rounded border border-gray-300 bg-white 
              px-12 py-[8px] body4 text-foreground-normal focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">전체유형</option>
              <option value="cancelled">예약취소</option>
              <option value="normal">일반주문</option>
              <option value="noshow">노쇼판매</option>
            </select>
          </div>
        </div>

      </div>

      {/* 테이블 */}
      <div className="bg-white overflow-hidden">
        <ContentTable columns={column} data={salesData} />

        {/* 페이지네이션 & 엑셀 다운로드 */}
        <div className="flex items-center justify-between px-24 py-16 border-t border-border-normal bg-background-normal-foreground">
          <div className="caption4 text-foreground-secondary">총 {salesData.length}건의 주문 내역</div>
            {/* 페이지네이션 */}
            <div className="flex items-center gap-8">
              <button className="hover:bg-gray-100 rounded">
                <span className="text-gray-400">‹</span>
              </button>
              <span className="px-[8px] py-2 body4 text-primitives-brand bg-blue-50 rounded">1</span>
              <button className="hover:bg-gray-100 rounded">
                <span className="text-gray-400">›</span>
              </button>
            </div>

            {/* 엑셀 다운로드 */}
            <button className="flex items-center gap-2 px-16 py-[6px] rounded bg-white">
              <ExcelIcon style={{ width: '16px', height: '16px' }} />
              <span className="body4 text-foreground-normal">Excel로 내보내기</span>
            </button>
          </div>
      </div>
    </div>
  );
};
