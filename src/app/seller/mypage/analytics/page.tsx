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
// Icons
import Wallet from "@/assets/icons/money-wallet-checkmark.svg";


const SALES_TABLE_COLUMNS = [
  { key: 'saleDateTime', 
    header: '일시', 
    render: (res: SalesData) => (
      <Label className="max-w-[140px]">{formatDateTimeStringNoDay(new Date(res.saleDateTime))}</Label>
    ),
    width: 140,
    paddingX: 16
  },
  { 
    key: 'orderNo', 
    header: '주문번호', 
    location: 'center' as const,
    render: (res: SalesData) => (
      <span className="w-full inline-flex items-center justify-center">
        {res.orderNo}
      </span>
    ),
    width: 200,
    paddingX: 16
  },
  { key: 'orderType', 
    header: '주문 유형', 
    location: 'center' as const,
    render: (res: SalesData) => (
      <span 
      className={clsx('w-full px-[12px] py-[4px] rounded-[20px] h-[26px] caption5 flex items-center justify-center',
        {
          'bg-status-pending text-status-pending-foreground': res.orderType === 'COMPLETED',
          'bg-status-noshow text-status-noshow-foreground': res.orderType === 'NO_SHOW',
          'bg-status-completed text-status-completed-foreground': res.orderType === 'CANCELLED',
        }
      )}>
        {saleStatus[res.orderType as keyof typeof saleStatus] || res.orderType}
      </span>
    ),
    width: 140,
    paddingX: 16
  },
  { 
    key: 'menuNames', 
    header: '메뉴',
    render: (res: SalesData) => (
      <span
        className={clsx('w-[522px]',
          {
            'line-through text-foreground-normal-subtle': res.status === 'CANCELLED',
          })}
      >
        {res.menuNames}
      </span>
    ),
    paddingX: 16 
  },
  { 
    key: 'paidAmount', 
    header: '최종 금액', 
    location: 'center' as const, 
    width: 80,
    render: (res: SalesData) => (
    <span className={clsx('w-full inline-flex items-center justify-center',
          {
            'line-through text-foreground-normal-subtle': res.status === 'CANCELLED',
          })}>
      {res.paidAmount.toLocaleString('ko-KR')} 
    </span>
    ),
    paddingX: 16
  },
  { 
    key: 'paymentMethod', 
    header: '결제 수단', 
    location: 'center' as const, 
    width: 90,
    render: (res: SalesData) => (
      <span className={clsx('w-full inline-flex items-center justify-center',
          {
            'line-through text-foreground-normal-subtle': res.status === 'CANCELLED',
          })}>
        {getPaymentMethodText(res.paymentMethod)}
      </span>
    ),
    paddingX: 16
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
    ),
    width: 80,
    paddingX: 16
  },
];

function SalesAnalytics() {
  const manage = useSalesAnalyticsManage();
  const salesQuery = useSalesAnalyticsQuery({
    startDate: getNowDateNoDayString(manage.startDate),
    endDate: getNowDateNoDayString(manage.endDate),});


/**
 * TODO: 
 * 엑셀 내보내기 팝업 구현 (1/2)
 * 엑셀 내보내기 기능 구현 (2/2)
 */
  const handleExportExcel = () => {
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
                    TODO: 이부분 수정 됨
                */}
                <div className="w-[1000px]">
                  <div className="bg-white rounded-md px-20 py-24 flex flex-row gap-6 items-center">
                      <Wallet className="w-24 h-24 text-foreground-normal" />
                      <Label className="title4 text-foreground-normal">사장님 단디온나를 통해 </Label><Label className="title6 text-foreground-primary">{formatKRW(445000)}</Label><Label className='title4 text-foreground-normal'>의 노쇼 손실을 방어하셨어요!</Label>
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
            </div>

            {/* 엑셀 내보내기 팝업 */}
            
        </DashBoardLayout>
     );
}

export default SalesAnalytics;