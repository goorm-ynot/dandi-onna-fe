/**
 * SalesFilterBar
 * - 조회기간 프리셋(periodType) + 직접선택(DateRangePicker) + 주문유형(orderType)
 * - 표시용 날짜 라벨(dateRangeLabel)
 */

'use client';

import * as React from 'react';
import { Label } from '@/components/ui/label';
import { DateRangePicker } from './DateRangePicker';
import { OrderType, PeriodType } from '@/hooks/seller/sales/useSalesAnalyticsManage';

type Props = {
  // view states
  dateRangeLabel: string;
  showDatePicker: boolean;

  // filter states
  periodType: PeriodType;
  orderType: OrderType;
  startDate?: Date;
  endDate?: Date;

  // handlers
  onChangePeriodType: (v: PeriodType) => void;
  onChangeOrderType: (v: OrderType) => void;
  onChangeStartDate: (d: Date | undefined) => void;
  onChangeEndDate: (d: Date | undefined) => void;
};

const PERIOD_OPTIONS: Array<{ value: PeriodType; label: string }> = [
  { value: 'today', label: '오늘' },
  { value: 'week', label: '이번 주' },
  { value: 'month', label: '이번 달' },
  { value: 'custom', label: '직접선택' },
];

const ORDER_OPTIONS: Array<{ value: OrderType; label: string }> = [
  { value: 'all', label: '전체유형' },
  { value: 'cancelled', label: '예약취소' },
  { value: 'normal', label: '일반주문' },
  { value: 'noshow', label: '노쇼판매' },
];

function isPeriodType(v: string): v is PeriodType {
  return (PERIOD_OPTIONS as Array<{ value: string; label: string }>).some((o) => o.value === v);
}
function isOrderType(v: string): v is OrderType {
  return (ORDER_OPTIONS as Array<{ value: string; label: string }>).some((o) => o.value === v);
}

export function SalesFilterBar({  dateRangeLabel,
  showDatePicker,
  periodType,
  orderType,
  startDate,
  endDate,
  onChangePeriodType,
  onChangeOrderType,
  onChangeStartDate,
  onChangeEndDate,
}: Props){

  return (
   <div className="flex flex-row justify-between items-center px-24 py-16 bg-background-normal-subtle border-b border-border-normal">
      {/* 조회기간 라벨 */}
      <Label className="title3 text-foreground-normal">{dateRangeLabel}</Label>

      <div className="flex items-center gap-16">
        {/* 조회기간 */}
        <div className="flex items-center gap-10">
          <Label className="title1 text-foreground-secondary">조회기간</Label>
          <select
            value={periodType}
            onChange={(e) => {
              const v = e.target.value;
              if (isPeriodType(v)) onChangePeriodType(v);
            }}
            className="flex h-37 w-[137px] rounded border border-gray-300 bg-white px-12 py-[8px]
                       body4 text-foreground-normal focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {PERIOD_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* 날짜 범위 선택 (직접선택일 때만) */}
        {showDatePicker && (
          <div className="flex items-center gap-10">
            <Label className="title1 text-foreground-secondary">기간선택</Label>
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onStartDateChange={onChangeStartDate}
              onEndDateChange={onChangeEndDate}
            />
          </div>
        )}

        {/* 주문유형 */}
        <div className="flex items-center gap-10">
          <Label className="title1 text-foreground-secondary">주문유형</Label>
          <select
            value={orderType}
            onChange={(e) => {
              const v = e.target.value;
              if (isOrderType(v)) onChangeOrderType(v);
            }}
            className="flex h-37 w-[137px] rounded border border-gray-300 bg-white px-12 py-[8px]
                       body4 text-foreground-normal focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {ORDER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}