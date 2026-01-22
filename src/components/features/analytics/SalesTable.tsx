/**
 * SalesTable 컴포넌트
 * - 매출 상세 내역 테이블
 * - 필터 (조회기간, 주문유형)
 */

'use client';

import * as React from 'react';
import { Label } from '@/components/ui/label';
import { DateRangePicker } from './DateRangePicker';
import { formatKRW } from '@/lib/format';

interface SalesData {
  date: string;
  orderNo: string;
  status: 'pending' | 'completed' | 'cancelled' | 'noshow';
  menu: string;
  quantity: number;
  discount: string;
  finalPrice: number;
  paymentMethod: string;
  detailStatus: string;
}

const MOCK_DATA: SalesData[] = [
  {
    date: '2026.01.01 19:30',
    orderNo: 'A00101',
    status: 'cancelled',
    menu: '이메뉴-외-1개',
    quantity: 35,
    discount: '50%',
    finalPrice: 1582000,
    paymentMethod: '카드',
    detailStatus: '취소됨',
  },
  {
    date: '2026.01.01 19:30',
    orderNo: 'A00101',
    status: 'completed',
    menu: '이메뉴 외 1개',
    quantity: 35,
    discount: '50%',
    finalPrice: 1582000,
    paymentMethod: '카드',
    detailStatus: '완료',
  },
  {
    date: '2026.01.01 19:30',
    orderNo: 'A00101',
    status: 'noshow',
    menu: '이메뉴 외 1개',
    quantity: 35,
    discount: '50%',
    finalPrice: 1582000,
    paymentMethod: '카드',
    detailStatus: '완료',
  },
];

const STATUS_CONFIG = {
  pending: { label: '예약취소', bgColor: 'bg-gray-100', textColor: 'text-gray-600' },
  completed: { label: '일반 주문', bgColor: 'bg-green-100', textColor: 'text-green-700' },
  cancelled: { label: '예약취소', bgColor: 'bg-gray-100', textColor: 'text-gray-600' },
  noshow: { label: '노쇼 판매', bgColor: 'bg-pink-100', textColor: 'text-pink-700' },
};

const SALES_TABLE_COLUMNS = [
  { key: 'date', header: '일시' },
  { key: 'orderNo', header: '주문번호' },
  { key: 'status', header: '주문 유형' },
  { key: 'menu', header: '메뉴' },
  { key: 'quantity', header: '수량' },
  { key: 'discount', header: '할인율' },
  { key: 'finalPrice', header: '최종 금액' },
  { key: 'paymentMethod', header: '결제 수단' },
  { key: 'detailStatus', header: '상태' },
];

export const SalesTable = () => {
  const [periodType, setPeriodType] = React.useState<string>('today');
  const [orderType, setOrderType] = React.useState<string>('all');
  const [startDate, setStartDate] = React.useState<Date>();
  const [endDate, setEndDate] = React.useState<Date>();

  const showDatePicker = periodType === 'custom';

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

  return (
    <div className="flex flex-col w-full border border-border-normal rounded-md ">
      {/* 필터 영역 */}
      <div className="flex flex-row justify-between items-center px-24 py-16 bg-background-normal-subtle border-b border-border-normal"> 
        {/* 조회기간을 text로 나타냄*/}
        <Label className='title3 text-foreground-normal'>{startDate?.toLocaleDateString()} ~ {endDate?.toLocaleDateString()}</Label>
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
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-border-normal">
            <tr>
              {SALES_TABLE_COLUMNS.map((col) => (
                <th
                  key={col.key }
                  className="px-16 py-12 text-left body4 text-foreground-secondary"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_DATA.map((item, index) => {
              const statusConfig = STATUS_CONFIG[item.status];
              return (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-16 py-16 body4 text-foreground-normal">{item.date}</td>
                  <td className="px-16 py-16 body4 text-foreground-normal">{item.orderNo}</td>
                  <td className="px-16 py-16">
                    <span
                      className={`inline-flex px-12 py-4 rounded-full body5 ${statusConfig.bgColor} ${statusConfig.textColor}`}
                    >
                      {statusConfig.label}
                    </span>
                  </td>
                  <td className="px-16 py-16 body4 text-foreground-normal">{item.menu}</td>
                  <td className="px-16 py-16 body4 text-foreground-normal text-center">{item.quantity}</td>
                  <td className="px-16 py-16 body4 text-foreground-normal text-center">{item.discount}</td>
                  <td className="px-16 py-16 body4 text-foreground-normal text-right">
                    {formatKRW(item.finalPrice)}
                  </td>
                  <td className="px-16 py-16 body4 text-foreground-normal text-center">
                    {item.paymentMethod}
                  </td>
                  <td className="px-16 py-16 body4 text-primitives-brand text-center">
                    {item.detailStatus}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

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
              <img src="/images/IconL-excel.svg" alt="excel icon" className="w-16 h-16" />
              <span className="body4 text-foreground-normal">Excel로 내보내기</span>
            </button>
          </div>
      </div>
    </div>
  );
};
