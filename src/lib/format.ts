// utils/format.ts

const krwFormatter = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "KRW",
  maximumFractionDigits: 0,
});

/**
 * 원화(₩) 포맷
 * @example formatKRW(12345) => ₩12,345
 */
export function formatKRW(value: number): string {
  return krwFormatter.format(value);
}

/**
 * 카드번호를 마스킹하여 뒤 4자리만 표시
 * @example maskCardNumber('1234-1234-1234-1234') => '****-****-****-1234'
 * @example maskCardNumber('1234123412341234') => '****-****-****-1234'
 */
export function maskCardNumber(cardNumber: string): string {
  // 하이픈 제거
  const cleanNumber = cardNumber.replace(/-/g, '');
  
  // 16자리가 아니면 원본 반환
  if (cleanNumber.length !== 16) {
    return cardNumber;
  }
  
  // 마지막 4자리 추출
  const lastFour = cleanNumber.slice(-4);
  
  // 마스킹 처리
  return `****-****-****-${lastFour}`;
}

/**
 * 카드번호의 마지막 4자리만 반환
 * @example getCardLastFour('1234-1234-1234-1234') => '1234'
 * @example getCardLastFour('1234123412341234') => '1234'
 */
export function getCardLastFour(cardNumber: string): string {
  // 하이픈 제거
  const cleanNumber = cardNumber.replace(/-/g, '');
  
  // 마지막 4자리 반환
  return cleanNumber.slice(-4);
}

