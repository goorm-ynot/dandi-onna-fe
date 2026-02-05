import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { SectionCard, SectionCardContent, SectionCardHeader, SectionCardTitle } from "@/components/ui/section-card";
import { billingInvoiceType } from "@/types/paymentType";
import { XIcon } from "lucide-react";

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
  duringDate: '결제 일시',
  paymentDate: '청구기간',
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
                        <Label className="body2">공급자 정보</Label>
                        <div className="w-[480px] px-14 py-10 rounded-md bg-background-normal-foreground">
                                {data && Object.entries(InvoiceSupplierKeys).map(([key, label]) => (
                                <div key={key} className="flex justify-between py-6 border-b border-border-secondary last:border-0">
                                    <Label className="body1 text-foreground-secondary">{label}</Label>
                                    <Label className="body2 text-foreground-normal">
                                        {key in data ? 
                                            (key === 'duringDate' || key === 'paymentDate' ? 
                                                new Date((data as any)[key]).toLocaleDateString() 
                                                : (data as any)[key]) 
                                            : '-'}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {/* 결제 상세 정보 */}
                        <Label className="body2">결제 상세 정보</Label>
                        <div className="w-[480px] px-14 py-10 rounded-md bg-background-normal-foreground">
                                {data && Object.entries(InvoiceDataKeys).map(([key, label]) => (
                                <div key={key} className="flex justify-between py-6 border-b border-border-secondary last:border-0">
                                    <Label className="body1 text-foreground-secondary">{label}</Label>
                                    <Label className="body2 text-foreground-normal">
                                        {key in data ? 
                                            (key === 'duringDate' || key === 'paymentDate' ? 
                                                new Date((data as any)[key]).toLocaleDateString() 
                                                : (data as any)[key]) 
                                            : '-'}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {/* 결제 수단 정보 */}
                        <Label className="body2">결제 수단 정보</Label>
                        <div className="w-[480px] px-14 py-10 rounded-md bg-background-normal-foreground flex flex-col gap-10">
                                {data && Object.entries(InvoicePaymentMethodKeys).map(([key, label]) => (
                                <div key={key} className="flex justify-between border-b border-border-secondary last:border-0">
                                    <Label className="body1 text-foreground-secondary">{label}</Label>
                                    <Label className="body2 text-foreground-normal">
                                        {key in data ? 
                                            (key === 'duringDate' || key === 'paymentDate' ? 
                                                new Date((data as any)[key]).toLocaleDateString() 
                                                : (data as any)[key]) 
                                            : '-'}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        {/* 버튼들 */}
                        <div className="flex flex-row justify-end item-center gap-10">
                            <Button type='button' variant="outline" onClick={onPrint}>인쇄하기</Button>
                            <Button type='button' onClick={onDownload}>다운로드</Button>
                        </div>
                    </SectionCardContent>
                </SectionCard>
            </div>
        </>
    )
}