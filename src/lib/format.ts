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

