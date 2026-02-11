import { formatKRW, formatAmount } from '@/lib/format';
import { billingInvoiceType } from '@/types/paymentType';
import { formatDateTimeFullString, formatYearMonthString } from './dateParse';
import { getPaymentMethodText } from './utils';

type FieldKey = keyof billingInvoiceType;

/**
 * Invoice 데이터의 각 필드를 적절한 형식으로 포맷
 */
export function formatInvoiceField(
  key: string,
  data: billingInvoiceType
): string {
  if (!(key in data)) {
    return '-';
  }

  const value = (data as any)[key];

  // 청구 기간
  if (key === 'paymentDate') {
      return formatDateTimeFullString(new Date(value));
  }

  // 금액 필드 (단순 원 표시)
  if (key === 'taxAmount' || key === 'unitPrice') {
    return formatAmount(value);
  }

  // 총 금액 (KRW 기호 포함)
  if (key === 'totalAmount') {
    return `${formatKRW(value)}원`;
  }

  // 결제 수단
  if (key === 'paymentMethod') {
    return getPaymentMethodText(value);
  }

  // 기타 문자열/숫자
  return String(value);
}
