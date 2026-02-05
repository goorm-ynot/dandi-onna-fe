'use server';

import { maskCardNumber } from '@/lib/format';
import { BillingType } from '@/types/paymentType';

// 유저 정보 (실제로는 DB에서 조회)
interface UserBillingInfo {
  userId: string;
  joinDate: Date; // 가입날짜
  subscriptionStartDate: Date; // 구독 시작일
}

// 임시: 유저 정보 (나중에 DB 조회로 변경)
const mockUser: UserBillingInfo = {
  userId: 'CEO1',
  joinDate: new Date('2025-01-15'),
  subscriptionStartDate: new Date('2025-01-15'),
};

/**
 * 청구 데이터 생성: 구독 시작일부터 현재까지 매달 15일마다
 * @param startDate 구독 시작일
 * @returns 청구 데이터 배열 (역순: 최신순)
 */
function generateBillingData(startDate: Date): BillingType[] {
  const today = new Date();
  const billingRecords: BillingType[] = [];

  let currentDate = new Date(startDate);
  currentDate.setDate(15); // 매달 15일로 설정

  while (currentDate <= today) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const duringMonth = new Date(year, currentDate.getMonth() - 1, 1);

    billingRecords.push({
      invoiceId: `billing_${year}${String(month).padStart(2, '0')}`,
      duringDate: `${year}년 ${month}월`,
      paymentDate: `${year}.${String(month).padStart(2, '0')}.15`,
      amount: 29900,
      paymentStatus: 'COMPLETED',
      paymentMethod: 'CARD',
      cardCompany: '신한카드',
      cardNumber: '1234-1234-1234-1234',
    });

    // 다음 달 15일로 이동
    currentDate = new Date(year, currentDate.getMonth() + 1, 15);
  }

  // 최신 데이터가 앞으로 오도록 역순 정렬
  return billingRecords.reverse();
}

/**
 * 페이지네이션과 함께 청구 데이터 조회
 * @param page 페이지 번호 (1부터 시작)
 * @param pageSize 페이지당 데이터 개수 (기본값: 10)
 */
export async function fetchBillingInvoices(page: number = 1, pageSize: number = 10) {
  try {
    // 1. 전체 청구 데이터 생성
    const allBillingData = generateBillingData(mockUser.subscriptionStartDate);

    // 2. 페이지네이션 계산
    const totalCount = allBillingData.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // 3. 현재 페이지 데이터 추출
    const pageData = allBillingData.slice(startIndex, endIndex);

    return {
      success: true,
      data: pageData,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (error) {
    console.error('청구 데이터 조회 실패:', error);
    return {
      success: false,
      error: '청구 데이터를 불러올 수 없습니다.',
      data: [],
      pagination: {
        page: 1,
        pageSize: 10,
        totalCount: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
}

/**
 * 구독 정보 조회
 */
export async function fetchSubscriptionInfo() {
  try {
    return {
      success: true,
      data: {
        price: 29900,
        status: '정상',
        nextPaymentDate: getNextPaymentDate(),
      },
    };
  } catch (error) {
    console.error('구독 정보 조회 실패:', error);
    return {
      success: false,
      error: '구독 정보를 불러올 수 없습니다.',
      data: null,
    };
  }
}

/**
 * 결제 수단 정보 조회
 */
export async function fetchPaymentMethod() {
  try {
    return {
      success: true,
      data: {
        paymentMethod: 'CARD',
        cardCompany: '신한카드',
        cardNumber: maskCardNumber('1234-1234-1234-1234'),
      },
    };
  } catch (error) {
    console.error('결제 수단 조회 실패:', error);
    return {
      success: false,
      error: '결제 수단을 불러올 수 없습니다.',
      data: null,
    };
  }
}

/**
 * 영수증 조회
 */
export async function fetchInvoiceDetails(invoiceData: BillingType) {
  try {
    return {
      success: true,
      data: {
        invoiceId: invoiceData.invoiceId,
        supplierName: '(주)와이낫컴퍼니',
        supplierCeoName: '홍길동',
        supplierBusinessNumber: '123-45-67890',
        supplierAddress: '서울특별시 강남구 테헤란로 123',
        supplierContact: '02-1234-5678',
        duringDate:invoiceData.duringDate,
        paymentDate: new Date(invoiceData.paymentDate + ' 13:00:00'),
        productName: '단디온나 구독 서비스',
        unitPrice: Math.round(invoiceData.amount / 1.1),
        taxAmount: Math.round(invoiceData.amount / 11),
        totalAmount: invoiceData.amount,
        paymentMethod: invoiceData.paymentMethod,
        cardCompany: invoiceData.cardCompany || '',
        cardNumber: invoiceData.cardNumber || '',
        installment: '일시불',
        paymentId: 'PAY1234567890',
      }
    }
  } catch (error) {
    console.error('영수증 조회 실패:', error);
    return {
      success: false,
      error: '영수증을 불러올 수 없습니다.',
      data: null,
    }
  }
}

/**
 * invoiceId로 영수증 상세 조회
 */
export async function fetchInvoiceDetailsById(invoiceId: string) {
  try {
    const allBillingData = generateBillingData(mockUser.subscriptionStartDate);
    const invoice = allBillingData.find((item) => item.invoiceId === invoiceId);

    if (!invoice) {
      return {
        success: false,
        error: '영수증을 찾을 수 없습니다.',
        data: null,
      };
    }

    return await fetchInvoiceDetails(invoice);
  } catch (error) {
    console.error('영수증 조회 실패:', error);
    return {
      success: false,
      error: '영수증을 불러올 수 없습니다.',
      data: null,
    };
  }
}

// 다음 결제일 계산
function getNextPaymentDate() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();

  let nextYear = currentYear;
  let nextMonth = currentMonth;

  if (currentDay >= 15) {
    nextMonth += 1;
    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear += 1;
    }
  }

  const nextDate = new Date(nextYear, nextMonth, 15);
  return nextDate.toLocaleDateString('ko-KR', { year: 'numeric', month: 'long', day: 'numeric' });
}
