import { getNowDateNoDayString } from "@/lib/dateParse";

export const useBillingDetails = () => {

    // 청구 및 결제 목 데이터 만들기
    // 청구기간 생성 함수 (YYYY년 M월 형식)
    const getDuringDate = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth() + 1; // 0-based이므로 +1
        return `${year}년 ${month}월`;
    };

    // 영수증 목 데이터 생성
    const invoiceData = Array.from({ length: 10 }, (_, i) => {
        const today = new Date();
        const targetMonth = new Date(today.getFullYear(), today.getMonth() - i, 15);
        
        // 청구기간은 결제일의 전 달
        const duringMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth() - 1, 1);
        
        return {
            invoiceId: String(i + 1),
            duringDate: getDuringDate(duringMonth),
            paymentDate: getNowDateNoDayString(targetMonth),
            amount: 49000,
            paymentStatus: 'COMPLETED',
            paymentMethod: '신용카드 (신한 1234)'
        };
    });

    return {
        invoiceData
    };
}