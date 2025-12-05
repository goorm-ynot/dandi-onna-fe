'use client';

import { Button } from '@/components/ui/button';
import React from 'react';

interface StickyFooterProps {
  menuName?: string[];
  count?: string[];
  price?: string[];
  originalPrice?: string;
  totalPaymentAmount?: string;
  visitingTime?: string;
  context?: 'order' | 'payment';
  onOrderClick?: () => void;
  onPaymentClick?: () => void;
}

export const StickyFooter: React.FC<StickyFooterProps> = ({
  menuName = [],
  count = [],
  price = [],
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
      <div className='fixed bottom-0 left-0 right-0 bg-white border-t border-[#e1e1e1] flex flex-col gap-4 px-4 py-5 w-full z-50'>
        {/* 방문시간 */}
        <div className='flex items-start justify-between w-full'>
          <p className='body10 text-[#262626]'>방문시간</p>
          <div className='flex items-center gap-0'>
            <p className='body5 text-[#262626]'>{visitingTime}</p>
          </div>
        </div>

        {/* 총 결제금액 */}
        <div className='flex items-center justify-between w-full'>
          <p className='body10 text-[#262626]'>총 결제금액</p>
          <div className='flex items-start gap-0'>
            <p className='body5 text-[#262626]'>{totalPaymentAmount}원</p>
          </div>
        </div>

        {/* 결제하기 버튼 */}
        <Button
          onClick={onPaymentClick}
          className='w-full h-11 bg-[#8749fe] hover:bg-[#7239d4] rounded-[6px] flex items-center justify-center active:scale-95 active:opacity-70 transition-all duration-100'>
          <p className='body5 text-white'>{totalPaymentAmount} 결제하기</p>
        </Button>
      </div>
    );
  }

  // order 상태 (기본값)
  return (
    <div className='fixed bottom-0 left-0 right-0 bg-white border-t border-[#e1e1e1] '>
      <div className='flex flex-col gap-4 px-16 py-5 w-full z-50 '>
        {/* 헤더: 상품명, 개수, 가격 (메뉴별로 한 줄씩) */}
        <div className='flex flex-col gap-2 w-full px-4'>
          {menuName?.map((name, index) => (
            <div key={index} className='flex items-start justify-between w-full'>
              <p className='body1 text-[#262626]'>{name}</p>
              <div className='flex items-center gap-1.5'>
                {/* 개수 */}
                <div className='flex items-start gap-0.5'>
                  <p className='body1 text-[#262626]'>{count?.[index]}개</p>
                </div>

                {/* 가격 */}
                <div className='flex items-start gap-0.5'>
                  <p className='body1 text-[#262626]'>{price?.[index]}원</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 총 결제금액 */}
        <div className='flex items-center justify-between w-full px-4 border-t border-border-wrapper pt-4'>
          <p className='body1 text-[#262626]'>총 결제금액</p>
          <div className='flex items-center gap-1'>
            {/* 원가 (취소선) */}
            <p className='body1 line-through text-[#c6c6c6]'>{originalPrice}원</p>

            {/* 최종 가격 */}
            <p className='body5 text-[#262626]'>{totalPaymentAmount}</p>
          </div>
        </div>

        {/* 주문하기 버튼 */}
        <div className='px-4 w-full'>
          <Button onClick={onOrderClick} size='custom' className='w-full h-11 flex items-center justify-center active:scale-95 active:opacity-70 transition-all duration-100'>
            <p className='body5 text-white'>주문하기</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
