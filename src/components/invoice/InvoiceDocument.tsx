// components/invoice/InvoiceDocument.tsx
import { InfoCard, InfoCardRow } from "@/components/ui/info-card";
import { billingInvoiceType } from "@/types/paymentType";
import { formatInvoiceField } from "@/lib/invoiceFormatter";

const InvoiceSupplierKeys = {
  supplierName: "상호명",
  supplierCeoName: "대표자명",
  supplierBusinessNumber: "사업자 등록번호",
  supplierAddress: "주소",
  supplierContact: "고객센터",
} as const;

const InvoiceDataKeys = {
  paymentDate: "결제 일시",
  duringDate: "청구기간",
  productName: "상품명",
  unitPrice: "공급가액",
  taxAmount: "부가가치세",
  totalAmount: "합계 금액",
} as const;

const InvoicePaymentMethodKeys = {
  paymentMethod: "결제 수단",
  cardCompany: "카드사",
  cardNumber: "카드번호",
  installment: "할부회차",
  paymentId: "승인번호",
} as const;

export function InvoiceDocument({ data }: { data: billingInvoiceType }) {
  return (
    <div className="flex flex-col gap-24">
      <InfoCard title="공급자 정보">
        {Object.entries(InvoiceSupplierKeys).map(([key, label]) => (
          <InfoCardRow key={key} label={label} value={formatInvoiceField(key, data)} />
        ))}
      </InfoCard>

      <InfoCard title="결제 상세 정보">
        {Object.entries(InvoiceDataKeys).map(([key, label]) => (
          <InfoCardRow
            key={key}
            label={label}
            value={formatInvoiceField(key, data)}
            highlighted={key === "totalAmount"}
          />
        ))}
      </InfoCard>

      <InfoCard title="결제 수단 정보">
        {Object.entries(InvoicePaymentMethodKeys).map(([key, label]) => (
          <InfoCardRow key={key} label={label} value={formatInvoiceField(key, data)} />
        ))}
      </InfoCard>
    </div>
  );
}
