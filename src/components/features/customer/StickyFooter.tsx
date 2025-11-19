'use client';

import { Button } from '@/components/ui/button';
import React from 'react';

interface StickyFooterProps {
  count?: string;
  price?: string;
  originalPrice?: string;
  totalPaymentAmount?: string;
  visitingTime?: string;
  context?: 'order' | 'payment';
  onOrderClick?: () => void;
  onPaymentClick?: () => void;
}

export const StickyFooter: React.FC<StickyFooterProps> = ({
  count = 'label',
  price = '00,000',
  originalPrice = '00,000',
  totalPaymentAmount = '00,000',
  visitingTime = '00:00',
  context = 'order',
  onOrderClick,
  onPaymentClick,
}) => {
  // payment 상태
  if (context === 'payment') {
    return (
      <div className='fixed bottom-0 left-0 right-0 bg-background-normal border-t border-border-secondary flex flex-col gap-4 px-4 py-5 w-full'>
        {/* 방문시간 */}
        <div className='flex items-start justify-between w-full'>
          <p className='body1 text-foreground-normal'>방문시간</p>
          <div className='flex items-center gap-0'>
            <p className='body5 text-foreground-normal'>{visitingTime}</p>
            <p className='body5 text-foreground-normal'>시</p>
          </div>
        </div>

        {/* 총 결제금액 */}
        <div className='flex items-center justify-between w-full'>
          <p className='body1 text-foreground-normal'>총 결제금액</p>
          <div className='flex items-start gap-0'>
            <p className='body5 text-foreground-normal'>{totalPaymentAmount}</p>
            <p className='body5 text-foreground-normal'>원</p>
          </div>
        </div>

        {/* 결제하기 버튼 */}
        <Button
          onClick={onPaymentClick}
          variant={'default'}
          size='custom'
          className='h-11 flex items-center justify-center w-full'>
          <p className='body5 text-foreground-inverse'>{totalPaymentAmount}원 결제하기</p>
        </Button>
      </div>
    );
  }

  // order 상태 (기본값)
  return (
    <div className='fixed bottom-0 left-0 right-0 bg-background-normal border-t border-border-secondary flex flex-col gap-4 h-52 px-4 py-5 w-full'>
      {/* 헤더: 상품명, 개수, 가격 */}
      <div className='flex gap-0 items-start w-full'>
        <p className='body1 text-foreground-normal'>명품 활어 한판</p>
        <div className='flex-1 flex gap-1.5 items-center justify-end'>
          {/* 개수 */}
          <div className='flex gap-0.5 items-start'>
            <p className='body1 text-foreground-normal'>{count}</p>
            <p className='body1 text-foreground-normal'>개</p>
          </div>

          {/* 가격 */}
          <div className='flex gap-0.5 items-start'>
            <p className='body1 text-foreground-normal'>{price}</p>
            <p className='body1 text-foreground-normal'>원</p>
          </div>
        </div>
      </div>

      {/* 바디: 총 결제금액 및 버튼 */}
      <div className='flex flex-col gap-0 items-start w-full'>
        {/* 총 결제금액 */}
        <div className='border-t border-border-secondary flex items-start justify-between px-0 py-4 w-full'>
          <p className='body1 text-foreground-normal'>총 결제금액</p>
          <div className='flex gap-1 items-start'>
            {/* 원가 (취소선) */}
            <div className='flex gap-0 items-center'>
              <p className='body1 line-through text-[#c6c6c6]'>{originalPrice}</p>
              <p className='body1 line-through text-[#c6c6c6]'>원</p>
            </div>

            {/* 최종 가격 */}
            <div className='flex gap-0 items-start'>
              <p className='body5 text-foreground-normal'>{totalPaymentAmount}</p>
              <p className='body5 text-foreground-normal'>원</p>
            </div>
          </div>
        </div>

        {/* 주문하기 버튼 */}
        <Button onClick={onOrderClick} size={'custom'} className='h-11 flex gap-0 items-center justify-center w-full'>
          <p className='body5 text-foreground-inverse'>주문하기</p>
        </Button>
      </div>
    </div>
  );
};
