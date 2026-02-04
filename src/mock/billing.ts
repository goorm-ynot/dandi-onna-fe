import { getNextPaymentDate } from "@/lib/utils";

// 청구 및 결제 목 데이터
export const billingData = [
    {
        id: '1',
        price: 49000,
        status: '정상',
        nextPaymentDate: getNextPaymentDate()
    },
    {
        id: '2',
        //결제수단
        paymentMethod: 'CARD', // card | kakao_pay | toss_pay
        cardCompany: '신한카드',
        cardNumber: '****-****-****-1234',
    }
]


