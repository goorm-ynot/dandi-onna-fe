/**
 * SalesTable 컴포넌트
 * - 매출 상세 내역 테이블
 * - 필터 (조회기간, 주문유형)
 */

'use client';

import * as React from 'react';
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { DateRangePicker } from './DateRangePicker';
import { formatKRW } from '@/lib/format';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import clsx from 'clsx';
import { SalesTableResponse } from '@/types/analyticsType';


export const SalesTable = ({
  salesData, 
  column, 
  filter
}: SalesTableResponse) => {
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
        <Table className='w-full'>
          <TableHeader>
            <TableRow>
              {column.map((col) => (
                <TableHead
                  key={col.key}
                  className={clsx(
                    'body4 text-foreground-normal whitespace-nowrap px-20 py-16 h-[48px]',
                    // location 기반 정렬
                    {
                      'text-left': !col?.location || col?.location === 'left',
                      'text-center': col?.location === 'center',
                      'text-right': col?.location === 'right',
                    }
                  )}
                >
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          {/* 본문 */}
          <TableBody>
            {salesData.map((item, index) => (
              <TableRow
                key={index }
                className='h-[48px] border-b border-border-secondary'
              >
                {column.map((col) => (
                  <TableCell
                    key={col.key}
                    className={clsx(
                      'body4 text-foreground-normal whitespace-nowrap px-20 py-16',
                      {
                        'text-left': !col?.location || col?.location === 'left',
                        'text-center': col?.location === 'center',
                        'text-right': col?.location === 'right',
                      }
                    )}
                  >
                    {col?.render ? col.render(item) : item[col.key as keyof typeof item]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* 페이지네이션 & 엑셀 다운로드 */}
        <div className="flex items-center justify-between px-24 py-16 border-t border-border-normal bg-background-normal-foreground">
          <div className="caption4 text-foreground-secondary">총 287건의 주문 내역</div>
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
              <Image src="/images/icons/IconL-excel.svg" alt="excel icon" width={16} height={16} />
              <span className="body4 text-foreground-normal">Excel로 내보내기</span>
            </button>
          </div>
      </div>
    </div>
  );
};
