'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface StoreDetailHeaderProps {
  title?: string;
  onBack?: () => void;
}

export default function StoreDetailHeader({ title = '주문하기', onBack }: StoreDetailHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className='sticky top-0 z-50 bg-white h-[60px] flex items-center justify-between px-[10px] pr-4'>
      {/* Back Button */}
      <Button variant='ghost' size='xs' onClick={handleBack} className='p-0 hover:bg-transparent'>
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M15 18L9 12L15 6' stroke='#262626' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      </Button>

      {/* Title */}
      <h1 className='flex-1 title5 text-[#161616] text-center'>{title}</h1>

      {/* Spacer to balance the layout */}
      <div className='w-6' />
    </div>
  );
}
