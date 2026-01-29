'use client';

import { useState } from "react";
import clsx from "clsx";
import { SalesData } from "@/types/analyticsType";
import { formatKRW } from "@/lib/format";
import { getPaymentMethodText, isSaleCompletedText } from "@/lib/utils";
import { formatDateTimeStringNoDay, getNowDateNoDayString } from "@/lib/dateParse";
import { useSalesAnalyticsManage } from "@/hooks/seller/sales/useSalesAnalyticsManage";
import { useSalesAnalyticsQuery } from "@/hooks/seller/sales/useSalesAnalyticsQuery";
import { saleStatus } from "@/constants/sellerNavConstant";
import DashBoardLayout from "@/components/layout/DashboardLayout";
import { Label } from "@/components/ui/label";
import { SalesFilterBar } from "@/components/features/analytics/SalesFilterBar";
import { SalesTableView } from "@/components/features/analytics/SalesTableView";
import { SalesFooterBar } from "@/components/features/analytics/SalesFooterBar";

const MOCK_DATA: SalesData[] = [
  {
    saleDateTime: '2026.01.01 19:30',
    orderNo: 'A00101',
    orderType: 'CANCELLED',
    menuNames: '이메뉴-외-1개',
    paidAmount: 1582000,
    paymentMethod: '카드',
    status: 'CANCELLED',
  },
  {
    saleDateTime: '2026.01.01 19:30',
    orderNo: 'A00101',
    orderType: 'COMPLETED',
    menuNames: '이메뉴 외 1개',
    paidAmount: 1582000,
    paymentMethod: '카드',
    status: 'COMPLETED',
  },
  {
    saleDateTime: '2026.01.01 19:30',
    orderNo: 'A00101',
    orderType: 'NO_SHOW',
    menuNames: '이메뉴 외 1개',
    paidAmount: 1582000,
    paymentMethod: '카드',
    status: 'COMPLETED',
  },
];

const SALES_TABLE_COLUMNS = [
  { key: 'saleDateTime', 
    header: '일시', 
    render: (res: SalesData) => formatDateTimeStringNoDay(new Date(res.saleDateTime))
  },
  { 
    key: 'orderNo', 
    header: '주문번호', 
    location: 'center' as const,
    render: (res: SalesData) => (
      <span className="w-full inline-flex items-center justify-center">
        {res.orderNo}
      </span>
    )
  },
  { key: 'orderType', 
    header: '주문 유형', 
    location: 'center' as const,
    render: (res: SalesData) => (
      <span 
      className={clsx('w-full px-[12px] py-[4px] rounded-[20px] h-[26px] caption5 inline-flex items-center justify-center',
        {
          'bg-status-pending text-status-pending-foreground': res.orderType === 'COMPLETED',
          'bg-status-noshow text-status-noshow-foreground': res.orderType === 'NO_SHOW',
          'bg-status-completed text-status-completed-foreground': res.orderType === 'CANCELLED',
        }
      )}>
        {saleStatus[res.orderType as keyof typeof saleStatus] || res.orderType}
      </span>
    )
  },
  { 
    key: 'menuNames', 
    header: '메뉴',
    isWide: true, // ✅ 메뉴명 컬럼만 넓게
    render: (res: SalesData) => (
      <span
        className={clsx('w-[522px]',
          {
            'line-through text-foreground-normal-subtle': res.status === 'CANCELLED',
          })}
      >
        {res.menuNames}
      </span>
    ) 
  },
  { 
    key: 'paidAmount', 
    header: '최종 금액', 
    location: 'center' as const, 
    render: (res: SalesData) => (
    <span className={clsx('w-full inline-flex items-center justify-center',
          {
            'line-through text-foreground-normal-subtle': res.status === 'CANCELLED',
          })}>
      {res.paidAmount.toLocaleString('ko-KR')} 
    </span>
    )
  },
  { 
    key: 'paymentMethod', 
    header: '결제 수단', 
    location: 'center' as const, 
    render: (res: SalesData) => (
      <span className={clsx('w-full inline-flex items-center justify-center',
          {
            'line-through text-foreground-normal-subtle': res.status === 'CANCELLED',
          })}>
        {getPaymentMethodText(res.paymentMethod)}
      </span>
    )
  },
  { 
    key: 'status', 
    header: '상태',
    location: 'center' as const, 
    render: (res: SalesData) => (
      <span className={clsx({
        "text-system-blue-strong": res.status === 'COMPLETED' || res.status === 'PENDING',
        "text-foreground-finished": res.status === 'CANCELLED',
      })}>
        {isSaleCompletedText(res.status)}
      </span> 
    )
  },
];

function SalesAnalytics() {
  const manage = useSalesAnalyticsManage();
  const salesQuery = useSalesAnalyticsQuery({
    startDate: getNowDateNoDayString(manage.startDate),
    endDate: getNowDateNoDayString(manage.endDate),});

  const handleExportExcel = () => {
    // TODO: popup 오픈
    console.log('팝업이 오픈되야함');
  };


    return ( 
        <DashBoardLayout>
            <div className="max-w-[1400px] w-full h-full flex flex-col gap-40 pt-40 pb-20">
                {/* 타이틀&설명 */}
                <div className="flex flex-col gap-20">
                    <Label className="title7 text-foreground-normal">매출</Label>
                    <Label className="body3 text-foreground-secondary">매출 현황과 주문 이력을 확인하실 수 있습니다.</Label>
                </div>

                {/* 오늘 / 이번 주 / 이번 달 / 노쇼 매출 현황
                    TODO: 컴포넌트로 분리
                */}
                <div className="flex flex-row gap-12 justify-between">
                    <div className="w-full px-20 py-24 flex flex-col gap-10 bg-white rounded-md">
                        <Label className="title3 text-foreground-secondary">오늘 매출</Label>
                        <Label className="title7 text-foreground-normal">{formatKRW(387000)}</Label>
                        <Label className='body3 text-foreground-secondary'>주문 12건</Label>
                    </div>
                    <div className="w-full px-20 py-24 flex flex-col gap-10 bg-white rounded-md">
                        <Label className="title3 text-foreground-secondary">이번 주 매출</Label>
                        <Label className="title7 text-foreground-normal">{formatKRW(2145000)}</Label>
                        <Label className='body3 text-foreground-secondary'>주문 68건</Label>
                    </div>
                    <div className="w-full px-20 py-24 flex flex-col gap-10 bg-white rounded-md">
                        <Label className="title3 text-foreground-secondary">이번 달 매출</Label>
                        <Label className="title7 text-foreground-normal">{formatKRW(8920000)}</Label>
                        <Label className='body3 text-foreground-secondary'>주문 287건</Label>
                    </div>
                    <div className="w-full px-20 py-24 flex flex-col gap-10 bg-white rounded-md">
                        <Label className="title3 text-foreground-secondary">노쇼 판매</Label>
                        <Label className="title7 text-primitives-brand3">{formatKRW(445000)}</Label>
                        <Label className='body3 text-foreground-secondary'>주문 15건</Label>
                    </div>
                </div>

                {/* 상세 내역 - 표 */}
                <div className="flex flex-col w-full border border-border-normal rounded-md ">
                  <SalesFilterBar
                    dateRangeLabel={manage.dateRangeLabel}
                    showDatePicker={manage.showDatePicker}
                    periodType={manage.periodType}
                    orderType={manage.orderType}
                    startDate={manage.startDate}
                    endDate={manage.endDate}
                    onChangePeriodType={manage.setPeriodType}
                    onChangeOrderType={manage.setOrderType}
                    onChangeStartDate={manage.setStartDate}
                    onChangeEndDate={manage.setEndDate}
                  />
                  <SalesTableView
                    column={SALES_TABLE_COLUMNS}
                    salesData={salesQuery.items}
                  />
                  <SalesFooterBar
                    totalCount={salesQuery.pageInfo?.totalElements || 0} 
                    page={salesQuery.pageInfo?.page + 1 || 1}
                    totalPages={salesQuery.pageInfo?.totalPages || 1}
                    onPrevPage={() => salesQuery.setPage((p) => Math.max(1, p - 1))}
                    onNextPage={() => salesQuery.setPage((p) => Math.min(salesQuery.pageInfo?.totalPages || 1, p + 1))}
                    onGoToPage={(p) => salesQuery.setPage(p)}
                    onExportExcel={handleExportExcel}
                  />
                </div>

            </div>
        </DashBoardLayout>
     );
}

export default SalesAnalytics;