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

// 매출 여부 한글 변환
export const isSaleCompletedText = (status: string) => {
  return status === 'CANCELLED' ? '취소됨' : '완료';
}

// 결제 상태
export const isBilingStateText = (status: string) => {
  switch (status) {
    case 'PAID':
    case 'COMPLETED':
      return '결제완료';
    case 'FAILED':
      return '결제실패';
    case 'CANCELLED':
      return '결제취소';
    default:
      return status;
  }
}

// 다음 결제일: 매달 15일 계산
export const getNextPaymentDate = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-based
  const currentDay = today.getDate();

  let nextYear = currentYear;
  let nextMonth = currentMonth;

  // 오늘이 15일 이후면 다음 달 15일
  if (currentDay >= 15) {
    nextMonth += 1;
    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear += 1;
    }
  }

  const nextDate = new Date(nextYear, nextMonth, 15);
  return nextDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
};

// 이전 결제일(결제완료한 날): 매달 15일 계산
export const getPreviousPaymentDate = (today: Date) => {
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); // 0-based
  const currentDay = today.getDate();

  let prevYear = currentYear;
  let prevMonth = currentMonth;

  // 오늘이 15일 이전이면 지난 달 15일
  if (currentDay < 15) {
    prevMonth -= 1;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear -= 1;
    }
  }

  const prevDate = new Date(prevYear, prevMonth, 15);
  return prevDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}