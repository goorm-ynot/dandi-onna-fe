'use client';

import React, { use, useEffect, useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { formatTimeString } from '@/lib/dateParse';
import { getPaymentMethodText } from '@/lib/utils';
import { useNavigation } from '@/hooks/useNavigation';

interface Props {
  params: Promise<{ orderId: string }>;
}

export default function PaymentCompletePage({ params }: Props) {
  const { orderId } = use(params);
  const { replaceCustomerHome } = useNavigation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { paymentSnapshot, completePayment } = useCartStore();
  const [mounted, setMounted] = useState(false);

  // URL 파라미터에서 가져오기
  const storeName = searchParams.get('storeName');
  const addressRoad = searchParams.get('addressRoad');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGoHome = () => {
    // paymentSnapshot 초기화
    completePayment(null as any);
    replaceCustomerHome();
  };

  if (!mounted || !paymentSnapshot) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-white'>
        <p className='body3 text-[#4c4c4c]'>결제 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white'>
      {/* Content */}
      <div className='flex flex-col gap-5 items-center px-4 pt-[136px]'>
        {/* Success Icon & Message */}
        <div className='flex flex-col gap-[60px] items-center w-full'>
          <div className='flex flex-col gap-[15px] items-center h-32 w-full'>
            {/* Check Icon */}
            <div className='w-[60px] h-[60px] rounded-full bg-[#8749fe] flex items-center justify-center'>
              <svg width='30' height='30' viewBox='0 0 30 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M25 8.75L11.875 21.875L6.25 16.25'
                  stroke='white'
                  strokeWidth='3'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>

            <p className='title5 text-[#262626] text-center'>결제가 완료되었습니다</p>
            <p className='body3 text-[#262626] text-center'>주문이 정상적으로 접수되었습니다</p>
          </div>

          {/* Order Details */}
          <div className='bg-[#f9f9f9] rounded-[10px] p-5 w-full max-w-[358px] flex flex-col gap-4'>
            <div className='flex flex-col gap-[10px]'>
              {/* 매장명 */}
              <div className='grid grid-cols-[100px_1fr] gap-[10px] h-[19px]'>
                <p className='title1 text-[#4c4c4c]'>매장명</p>
                <p className='body3 text-[#262626] text-right'>{storeName || paymentSnapshot.storeName || '-'}</p>
              </div>

              {/* 방문일시 */}
              <div className='grid grid-cols-[100px_1fr] gap-[10px] h-[19px]'>
                <p className='title1 text-[#4c4c4c]'>방문일시</p>
                <p className='body3 text-[#262626] text-right'>
                  {paymentSnapshot.visitTime ? formatTimeString(new Date(paymentSnapshot.visitTime)) : '-'}
                </p>
              </div>

              {/* 결제금액 */}
              <div className='grid grid-cols-[100px_1fr] gap-[10px] h-[19px]'>
                <p className='title3 text-[#4c4c4c]'>결제금액</p>
                <div className='flex items-start justify-end'>
                  <p className='body5 text-[#8749fe] text-right'>
                    {paymentSnapshot.totalAmount.toLocaleString('ko-KR')}
                  </p>
                  <p className='body5 text-[#8749fe]'>원</p>
                </div>
              </div>

              {/* 결제수단 */}
              <div className='grid grid-cols-[100px_1fr] gap-[10px] h-[19px]'>
                <p className='title1 text-[#4c4c4c]'>결제수단</p>
                <p className='body3 text-[#262626] text-right'>{getPaymentMethodText(paymentSnapshot.paymentMethod)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 홈으로 가기 Button */}
        <Button
          variant='outline'
          className='w-full max-w-[358px] h-11 border-[#c6c6c6] bg-white rounded-[6px]'
          onClick={handleGoHome}>
          <p className='body3 text-[#262626]'>홈으로 가기</p>
        </Button>
      </div>
    </div>
  );
}
