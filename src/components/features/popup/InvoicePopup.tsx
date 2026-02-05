"use client";

import { Button } from "@/components/ui/button";
import { SectionCard, SectionCardContent, SectionCardHeader, SectionCardTitle } from "@/components/ui/section-card";
import { InfoCard, InfoCardRow } from "@/components/ui/info-card";
import { billingInvoiceType } from "@/types/paymentType";
import { formatInvoiceField } from "@/lib/invoiceFormatter";
import { XIcon } from "lucide-react";
import IconDownload from "@/assets/icons/icon-download.svg";
import IconPrinter from "@/assets/icons/icon-printer.svg";

type InvoicePopupProps = {
    isOpen: boolean;
    data?: billingInvoiceType | null;
    onClose: () => void;
    onDownload?: () => void;
    onPrint?: () => void;
}

const InvoiceSupplierKeys: { [key: string]: string } = {
  // 공급자 정보
  supplierName: '상호명',
  supplierCeoName: '대표자명',
  supplierBusinessNumber: '사업자 등록번호',
  supplierAddress: '주소',
  supplierContact: '고객센터',
};

const InvoiceDataKeys: { [key: string]: string } = {
    // 결제 상세 정보
  paymentDate: '결제 일시',
  duringDate: '청구기간',
  productName: '상품명',
  unitPrice: '공급가액',
  taxAmount: '부가가치세',
  totalAmount: '합계 금액',
}

const InvoicePaymentMethodKeys: { [key: string]: string } = {
  // 결제 수단 정보
  paymentMethod: '결제 수단',
  cardCompany: '카드사',
  cardNumber: '카드번호',
  installment: '할부회차',
  paymentId: '승인번호',
}


export function InvoicePopup({
    isOpen=false,
    data,
    onClose,
    onDownload,
    onPrint,
}: InvoicePopupProps) {
    if (!isOpen) return null;

    const openPrintWindow = (mode: "print" | "download") => {
        if (!data?.invoiceId) return;
        
        if (mode === 'download') {
            // 다운로드: PDF API 호출
            const link = document.createElement('a');
            link.href = `/api/pdf/invoice/${data.invoiceId}`;
            link.download = `invoice-${data.invoiceId}.pdf`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } else {
            // 인쇄: 별도 창에서 print 페이지 열기
            const url = `/print/invoice/${data.invoiceId}?mode=print`;
            window.open(url, '_blank', 'width=800,height=600');
        }
    };

    const handlePrint = () => {
        if (onPrint) return onPrint();
        openPrintWindow("print");
    };

    const handleDownload = () => {
        if (onDownload) return onDownload();
        openPrintWindow("download");
    };

 
    return (
        <>
            {/* 배경 어두워짐 */}
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
            
            {/* 모달 팝업 */}
            <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
                <SectionCard className="w-[560px] overflow-y-auto pointer-events-auto shadow-lg">
                    <SectionCardHeader className="px-24 py-20">
                        <SectionCardTitle>결제 영수증</SectionCardTitle>
                        <Button variant='icon' onClick={onClose} className="p-0"><XIcon style={{width:24, height:24}} /></Button>
                    </SectionCardHeader>
                    <SectionCardContent className="flex flex-col gap-24 py-24 px-40">
                        {/* 공급자 정보 */}
                        <InfoCard title="공급자 정보">
                            {data && Object.entries(InvoiceSupplierKeys).map(([key, label]) => (
                                <InfoCardRow
                                    key={key}
                                    label={label}
                                    value={formatInvoiceField(key, data)}
                                />
                            ))}
                        </InfoCard>

                        {/* 결제 상세 정보 */}
                        <InfoCard title="결제 상세 정보">
                            {data && Object.entries(InvoiceDataKeys).map(([key, label]) => (
                                <InfoCardRow
                                    key={key}
                                    label={label}
                                    value={formatInvoiceField(key, data)}
                                    highlighted={key === 'totalAmount'}
                                />
                            ))}
                        </InfoCard>

                        {/* 결제 수단 정보 */}
                        <InfoCard title="결제 수단 정보">
                            {data && Object.entries(InvoicePaymentMethodKeys).map(([key, label]) => (
                                <InfoCardRow
                                    key={key}
                                    label={label}
                                    value={formatInvoiceField(key, data)}
                                />
                            ))}
                        </InfoCard>

                        {/* 버튼들 */}
                        <div className="flex flex-row justify-end item-center gap-10">
                            <Button type='button' variant="outline" onClick={handlePrint} className="px-16 py-7 flex flex-row gap-6">
                                <IconPrinter style={{width:24, height:24}} />
                                인쇄하기
                            </Button>
                            <Button type='button' onClick={handleDownload} className="px-16 py-7 flex flex-row gap-6">
                                <IconDownload className="text-white" style={{width:24, height:24}} />
                                다운로드
                            </Button>
                        </div>
                    </SectionCardContent>
                </SectionCard>
            </div>
        </>
    )
}