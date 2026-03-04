'use client';

import DashBoardLayout from "@/components/layout/DashboardLayout";
import { Label } from "@/components/ui/label";
import Card from "@/assets/icons/IconL-card.svg";
import { formatKRW, getCardLastFour } from "@/lib/format";
import { getPaymentMethodText, isBilingStateText } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    SectionCard,
    SectionCardContent,
    SectionCardHeader,
    SectionCardTitle,
} from "@/components/ui/section-card";
import DownLoadIcon from "@/assets/icons/icon-download.svg";
import { BillingType } from "@/types/paymentType";
import { Column } from "@/types/boardData";
import GridTable from "@/components/features/mypage/GridTable";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useBillingData } from "@/hooks/seller/billing/useBillingData";
import { InvoicePopup } from "@/components/features/popup/InvoicePopup";

/**
 * TODO: 
 * 청구 및 결제 페이지 구현 (1/5) - [v]
 * 행 선택 시, 결제 영수증 팝업 구현 (2/5) [v]
 * 영수증 보기 버튼 클릭 시 팝업 뜨기 [v]
 * 다운로드 버튼 클릭 시 바로 다운로드 [v]
 * 결제 내역 다운로드 기능 구현 - 개별 (3/5) PDF 다운로드 [v]
 * 결제 내역 다운로드 기능 구현 - 전체 (4/5) PDF -> zip 다운로드 [x]
 * 결제 수단 변경 기능 구현 (5/5) -> 보류
 */
const billingColumns = [
    {
        key: 'price',
        header: '현재 플랜',
        render: (data: {price: number}) => {
            return (
              <>
                <Label className="title6 text-foreground-normal">{formatKRW(data.price)}{'원'}</Label>
                <Label className="body1 text-foreground-secondary">{' / 월'}</Label>
              </>
            )
        },
    },
    {
        key: 'status',
        header: '결제 상태',
        render: (data: {status: string}) => (
            <Label className="title6 text-foreground-primary">{data.status}</Label>
        ),
    },
    {
        key: 'nextPaymentDate',
        header: '다음 결제일',
        render: (data: {nextPaymentDate: string}) => (
            <Label className="title6 text-foreground-normal">{data.nextPaymentDate}</Label>
        ),
    },
]



function BillingPage() {
  const {
    currentPage,
    invoiceData,
    subscriptionInfo,
    paymentMethod,
    pagination,
    isLoading,
    handlePrevPage,
    handleNextPage,
    goToPage,
    sortState,
    handleSort,
    sortedInvoiceData,
    onSelectRow,
        onSelectRecentInvoice,
    onClose,
    popupOpen,
    popupData,
    recentInvoice,
    handleDownload,
    handleDownloadRecent,
    handlePrint,
  } = useBillingData();

  const invoiceColumns: Column<BillingType>[] = [
    {
        key: 'duringDate', 
        header: '청구기간', 
        sortable: true,
        render: (data: BillingType) => (
            <Label className="body1">{data.duringDate}</Label>),
    },
    {
        key: 'paymentDate', 
        header: '결제일', 
        sortable: true,
        render: (data: BillingType) => (
            <Label className="body1">{data.paymentDate}</Label>),
    },
    {
        key: 'amount',
        header: '금액',
        sortable: true,
        render: (data: BillingType) => (
            <Label className="body1">{data.amount.toLocaleString()}{'원'}</Label>),
    },
    {
        key: 'paymentStatus',
        header: '상태',
        render: (data: BillingType) => (
            <Label className="body1">{isBilingStateText(data.paymentStatus)}</Label>),

    },
    {
        key: 'paymentMethod',
        header: '결제수단',
        render: (data: BillingType) => {
            return (
                <Label className="body1">{getPaymentMethodText(data.paymentMethod)} ({data.cardCompany} {getCardLastFour(data.cardNumber || '')})</Label>);
        },
    },
    {
        key: 'download',
        header: '다운로드',
        location: 'center' as const,
        render: (row: BillingType) => (
            <Button 
            type="button" 
            variant="icon" 
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              handleDownload(row);
            }}
            className="w-full h-auto flex items-center justify-center p-0 body1"><DownLoadIcon className="text-foreground-normal" style={{width: 18, height: 18}}  /></Button>
        ),
    }

];

  return (
    <DashBoardLayout>
        <div className="max-w-[1400px] w-full h-full flex flex-col gap-40 pt-40 pb-20">
            <div className="flex flex-col gap-20">
                <div className="title7 font-foreground-normal">청구 및 결제</div>
                <div className="body3 text-foreground-secondary">구독 정보와 결제 내역을 확인하실 수 있습니다</div>
            </div>
            
            <div className="w-[1000px] flex flex-col gap-20">
                {/* 구독정보 */}
                <SectionCard className="gap-16 shadow-md">
                    <SectionCardHeader className="px-24 py-20">
                        <SectionCardTitle>구독정보</SectionCardTitle>
                    </SectionCardHeader>
                    <SectionCardContent className="flex flex-row gap-20 justify-between p-24">
                        {billingColumns.map((col) => {
                            return (
                                <div key={col.key} className="w-[300px] flex flex-col gap-16">
                                    <Label className="body1 text-foreground-secondary">{col.header}</Label>
                                    <div>
                                        {subscriptionInfo 
                                          ? col.render?.(subscriptionInfo as any) 
                                          : subscriptionInfo?.[col.key as keyof typeof subscriptionInfo]}
                                    </div>
                                </div>
                            );
                        })}
                    </SectionCardContent>
                </SectionCard>
                {/* 결제수단 */}
                <SectionCard className="gap-16  shadow-md">
                    <SectionCardHeader className="px-24 py-20">
                        <SectionCardTitle>결제 수단</SectionCardTitle>
                    </SectionCardHeader>
                    <SectionCardContent className="flex flex-row justify-between p-24">
                        <div className="flex flex-row gap-10">
                            {/* 아이콘 */}
                            <div className="w-[44px] h-[40px] px-10 py-6 bg-background-normal-foreground rounded-sm">
                                <Card className="w-24 h-24 text-foreground-normal" />
                            </div>
                            <div className="flex flex-col gap-6">
                                <Label className="body1 text-foreground-normal">{paymentMethod && getPaymentMethodText(paymentMethod.paymentMethod || '')} {paymentMethod?.cardCompany && `(${paymentMethod.cardCompany})`}</Label>
                                <Label className="body5 text-foreground-normal">{paymentMethod?.cardNumber}</Label>
                            </div>
                        </div>
                    </SectionCardContent>
                </SectionCard>
                {/* 영수증 */}
                <SectionCard className="gap-16  shadow-md">
                    <SectionCardHeader className="px-24 py-20">
                        <SectionCardTitle>영수증</SectionCardTitle>
                    </SectionCardHeader>
                    <SectionCardContent className="flex flex-col gap-24 p-24">
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col gap-6">
                                <Label className="body1 text-foreground-normal">최근 결제 영수증</Label>
                                <Label className="body5 text-foreground-normal">
                                  {recentInvoice
                                    ? `${recentInvoice.paymentDate} 결제분 (${formatKRW(recentInvoice.amount)}원)`
                                    : '-'}
                                </Label>
                            </div>
                            <div className="flex flex-row gap-10">
                                <Button 
                                    type='button'
                                    onClick={onSelectRecentInvoice}
                                    disabled={!recentInvoice}
                                    variant="outline" 
                                    className="px-16 py-10 rounded-md border-border-normal text-foreground-normal body1">
                                        영수증 보기
                                </Button>
                                <Button 
                                    type='button'
                                    onClick={handleDownloadRecent}
                                    disabled={!recentInvoice}
                                    variant="outline" 
                                    className="px-12 py-7 rounded-md border-border-normal text-foreground-normal">
                                    <DownLoadIcon className="text-foreground-normal" style={{width: 18, height: 18}} />
                                </Button>
                            </div>
                        </div>
                        {/* table */}
                         <GridTable
                             columns={invoiceColumns} 
                             data={sortedInvoiceData} 
                             onSort={handleSort}
                             onSelectRow={onSelectRow}
                         />
                   
                        {/* footer */}
                        <div className="flex flex-row justify-between items-center">
                            {/* pagination control */}
                            <div className="flex items-center justify-center gap-2">
                                <Button
                                type="button"
                                variant='link'
                                onClick={handlePrevPage}
                                disabled={!pagination?.hasPrevPage}
                                className='disabled:text-foreground-disable disabled:opacity-100'
                                >
                                <ChevronLeft size={24} />
                                </Button>

                                {/* 페이지 번호 표시 */}
                                {pagination && Array.from({ length: pagination.totalPages }).map((_, i) => (
                                    <Button 
                                        key={i} 
                                        size='page' 
                                        variant={currentPage === i + 1 ? 'page' : 'pagelink'} 
                                        onClick={() => goToPage(i + 1)}
                                    >
                                        {i+1}
                                    </Button>
                                ))}

                                <Button
                                type="button"
                                variant='link'
                                onClick={handleNextPage}
                                disabled={!pagination?.hasNextPage}
                                className='disabled:text-foreground-disable disabled:opacity-100'
                                >
                                <ChevronRight size={24} />
                                </Button>
                            </div>
                            {/* Button */}
                            <Button variant='outline' className="px-16 py-7">
                                <DownLoadIcon className="text-foreground-normal" style={{width: 18, height: 18}} />
                                <span className="ml-6 body1">일괄 다운받기(ZIP)</span>
                            </Button>
                        </div>
                    </SectionCardContent>
                </SectionCard>
            </div>
        </div>

        <InvoicePopup isOpen={popupOpen} onClose={onClose} data={popupData} onDownload={handleDownload} onPrint={handlePrint} />
    </DashBoardLayout>
  );
}

export default BillingPage;