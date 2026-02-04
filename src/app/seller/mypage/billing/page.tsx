'use client';

import DashBoardLayout from "@/components/layout/DashboardLayout";
import { Label } from "@/components/ui/label";
import Card from "@/assets/icons/IconL-card.svg";
import {billingData} from "@/mock/billing";
import { formatKRW } from "@/lib/format";
import { getPaymentMethodText, getPreviousPaymentDate, isBilingStateText } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import DownLoadIcon from "@/assets/icons/icon-download.svg";
import { useBillingDetails } from "@/hooks/seller/billing/useBillingDetails";
import ContentTable from "@/components/features/dashboard/ContentTable";
import { BillingType } from "@/types/paymentType";
import { Column } from "@/types/boardData";
import GridTable from "@/components/features/mypage/GridTable";

/**
 * TODO: 
 * 청구 및 결제 페이지 구현 (1/5)
 * 결제 영수증 팝업 구현 (2/5)
 * 결제 내역 다운로드 기능 구현 - 개별 (3/5) PDF 다운로드
 * 결제 내역 다운로드 기능 구현 - 전체 (4/5) PDF -> zip 다운로드
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

const invoiceColumns: Column<BillingType>[] = [
    {
        key: 'duringDate', 
        header: '청구기간', 
        sortable: true,
        render: (data: BillingType) => (
            <Label className="body1">{data.duringDate}</Label>)
    },
    {
        key: 'paymentDate', 
        header: '결제일', 
        sortable: true,
        render: (data: BillingType) => (
            <Label className="body1">{data.paymentDate}</Label>)
    },
    {
        key: 'amount',
        header: '금액',
        render: (data: BillingType) => (
            <Label className="body1">{data.amount.toLocaleString()}{'원'}</Label>)
    },
    {
        key: 'paymentStatus',
        header: '상태',
        render: (data: BillingType) => (
            <Label className="body1">{isBilingStateText(data.paymentStatus)}</Label>)
    },
    {
        key: 'paymentMethod',
        header: '결제수단',
        render: (data: BillingType) => (
            <Label className="body1">{data.paymentMethod}</Label>)
    },
    {
        key: 'download',
        header: '다운로드',
        location: 'center' as const,
        render: () => (
            <Button variant="icon" className="w-full h-auto flex items-center justify-center p-0 body1"><DownLoadIcon className="text-foreground-normal" style={{width: 18, height: 18}}  /></Button>
        )
    }

];

function BillingPage() {
  const {invoiceData} = useBillingDetails();
  const billingDataItem = billingData[0]; // id: 1번 데이터
  const billingMethod = billingData[1]; // id: 2번 데이터

  const typedInvoiceData: BillingType[] = invoiceData.map((item) => ({
    ...item,
    paymentStatus: item.paymentStatus as "COMPLETED" | "PENDING" | "CANCELLED",
  }));

  return (
    <DashBoardLayout>
        <div className="max-w-[1400px] w-full h-full flex flex-col gap-40 pt-40 pb-20">
            <div className="flex flex-col gap-20">
                <div className="title7 font-foreground-normal">청구 및 결제</div>
                <div className="body3 text-foreground-secondary">구독 정보와 결제 내역을 확인하실 수 있습니다</div>
            </div>
            
            <div className="w-[1000px] flex flex-col gap-20">
                {/* 구독정보 */}
                <div className="w-full bg-white rounded-md shadow-md flex flex-col gap-16">
                    <div className="py-20 border-b border-border-secondary px-24">
                        <Label className="title5 text-foreground-normal">구독정보</Label>
                    </div>
                    <div className="p-24 flex flex-row gap-20 justify-between">
                        {billingColumns.map((col) => {
                            return (
                                <div key={col.key} className="w-[300px] flex flex-col gap-16">
                                    <Label className="body1 text-foreground-secondary">{col.header}</Label>
                                    <div>
                                        {col.render ? col.render(billingDataItem as any) : billingDataItem[col.key as keyof typeof billingDataItem]}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                {/* 결제수단 */}
                <div className="w-full bg-white rounded-md shadow-md flex flex-col gap-16">
                    <div className="py-20 border-b border-border-secondary px-24">
                        <Label className="title5 text-foreground-normal">결제 수단</Label>
                    </div>
                    <div className="p-24 flex flex-row justify-between">
                        <div className="flex flex-row gap-10">
                            {/* 아이콘 */}
                            <div className="w-[44px] h-[40px] px-10 py-6 bg-background-normal-foreground rounded-sm">
                                <Card className="w-24 h-24 text-foreground-normal" />
                            </div>
                            <div className="flex flex-col gap-6">
                                <Label className="body1 text-foreground-normal">{getPaymentMethodText(billingMethod.paymentMethod || '')} {billingMethod?.cardCompany && `(${billingMethod.cardCompany})`}</Label>
                                <Label className="body5 text-foreground-normal">{billingMethod.cardNumber}</Label>
                            </div>
                        </div>
                    </div>
                </div>
                {/* 영수증 */}
                <div className="w-full bg-white rounded-md shadow-md flex flex-col">
                    <div className="py-20 border-b border-border-secondary px-24">
                        <Label className="title5 text-foreground-normal">영수증</Label>
                    </div>
                    <div className="p-24 flex flex-col gap-24">
                        <div className="flex flex-row justify-between">
                            <div className="flex flex-col gap-6">
                                <Label className="body1 text-foreground-normal">최근 결제 영수증</Label>
                                <Label className="body5 text-foreground-normal">{getPreviousPaymentDate(new Date())} 결제분 ({formatKRW(billingDataItem.price || 0)})</Label>
                            </div>
                            <div className="flex flex-row gap-10">
                                <Button variant="outline" className="px-12 py-7 rounded-md border-border-normal text-foreground-normal"><DownLoadIcon className="text-foreground-normal" style={{width: 18, height: 18}} /></Button>
                                <Button variant="outline" className="px-16 py-10 rounded-md border-border-normal text-foreground-normal body1">전체 영수증 보기</Button>
                            </div>
                        </div>
                        {/* table */}
                         <GridTable
                             columns={invoiceColumns} 
                             data={typedInvoiceData} 
                         />
                   
                        {/* footer */}
                        <div className="flex flex-row justify-between items-center">
                            {/* pagination control */}
                            <div></div>
                            {/* Button */}
                            <Button variant='outline' className="px-16 py-7">
                                <DownLoadIcon className="text-foreground-normal" style={{width: 18, height: 18}} />
                                <span className="ml-8">일괄 다운받기(ZIP)</span>
                            </Button>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </DashBoardLayout>
  );
}

export default BillingPage;