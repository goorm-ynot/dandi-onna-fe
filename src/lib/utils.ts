import { OrderStatus } from '@/types/boardData';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 주문 상태 텍스트 변환 함수
export function formatStatusText(status: OrderStatus): string {
  switch (status) {
    case 'PENDING':
      return '대기중';
    case 'CONFIRMED':
      return '확정됨';
    case 'COMPLETED':
      return '완료됨';
    case 'CANCELLED':
      return '취소됨';
    default:
      return '알 수 없음';
  }
}

// 시간 문자열에서 초 제거 (HH:MM:SS -> HH:MM)
export function formatTimeWithoutSeconds(time: string): string {
  if (!time) return '';
  // "22:00:00" -> "22:00"
  return time.split(':').slice(0, 2).join(':');
}

// 결제 수단 한글 변환
export const getPaymentMethodText = (method: string) => {
  switch (method) {
    case 'CARD':
      return '신용/체크카드';
    case 'KAKAO_PAY':
      return '카카오페이';
    case 'NAVER_PAY':
      return '네이버페이';
    case 'TOSS_PAY':
      return '토스페이';
    default:
      return method;
  }
};
