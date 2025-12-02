'use client';

import React from 'react';
import Image from 'next/image';
import { Badge } from '../ui/Badge';
import { stat } from 'fs';

interface MenuItem {
  name: string;
  count: number;
}

interface ReservedMenuProps {
  image: string;
  storeName: string;
  badge?: string;
  menuItems: string;
  totalPrice: string;
  status: string;
  isPriority?: boolean;
  timeRemaining: {
    hours: number;
    minutes: number;
    seconds: number;
  };
}

const ReservedMenu = React.memo(function ReservedMenu({
  image,
  storeName,
  badge,
  menuItems,
  totalPrice,
  timeRemaining,
  status,
  isPriority = false,
}: ReservedMenuProps) {
  const formatTime = (num: number) => String(num).padStart(2, '0');

  return (
    <div className='bg-white rounded-[10px] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.1)] flex flex-col gap-3 w-full'>
      {/* Image with Timer */}
      <div className='relative bg-neutral-100 rounded-t-[10px] overflow-hidden h-[160px] w-full'>
        {/* 🎯 S3 이미지는 unoptimized 사용 (Vercel Image Optimization 스킵) */}
        <Image
          src={image}
          alt={storeName}
          fill
          className='object-cover'
          sizes='(max-width: 400px) 288px, 320px'
          priority={isPriority}
          loading={isPriority ? undefined : 'lazy'}
          fetchPriority={isPriority ? 'high' : 'auto'}
          // unoptimized={image.includes('s3.ap-northeast-2.amazonaws.com')} // S3 이미지는 최적화 스킵
          loader={({ src }) => src}
            unoptimized     // Vercel 최적화 OFF

        />

        {/* Timer Overlay */}
        <div className='absolute bottom-0 left-1/2 -translate-x-1/2 bg-[rgba(38,38,38,0.6)] w-full px-[10px] py-[10px] flex items-center justify-center gap-1'>
          {status === 'COMPLETED' ||
          (timeRemaining.hours === 0 && timeRemaining.minutes === 0 && timeRemaining.seconds === 0) ? (
            <span className='title3 text-white'>방문하셨나요?</span>
          ) : (
            <>
              <div className='flex items-center title3 text-white'>
                <span>{formatTime(timeRemaining.hours)}</span>
                <span className='text-center'>:</span>
                <span>{formatTime(timeRemaining.minutes)}</span>
                <span className='text-center'>:</span>
                <span>{formatTime(timeRemaining.seconds)}</span>
              </div>
              <span className='title3 text-white'>남음</span>
            </>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className='flex flex-col gap-[10px] px-4 pb-0 w-full'>
        {/* Header */}
        <div className='flex flex-col gap-[10px] w-full'>
          {/* Title with Badge */}
          {/* Title with Badge */}
          <div className='flex gap-2 items-center w-full min-w-0'>
            <div className='title5 text-[#262626] truncate'>{storeName}</div>
            {badge && (
              <div className='shrink-0'>
                <Badge text={badge} state='normal' device='mobile' />
              </div>
            )}
          </div>

          {/* Menu Items */}
          <div className='flex gap-1 items-start overflow-hidden w-full'>
            {/* {menuItems.slice(0, 3).map((item, index) => (
              <div key={index} className='flex gap-1 items-center shrink-0'>
                <span className='body1 text-[#161616]'>{item.name}</span>
                <div className='flex gap-[2px] items-center body1 text-[#4c4c4c]'>
                  <span>{item.count}</span>
                  <span>개</span>
                </div>
              </div>
            ))} */}
            <div className='flex gap-1 items-center shrink-0'>
              <span className='body1 text-[#161616]'>{menuItems}</span>
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className='border-t border-[#dddddd] py-[14px] flex items-center justify-between w-full'>
          <span className='title1 text-[#4c4c4c]'>총 금액</span>
          <span className='body3 text-[#161616]'>{totalPrice}</span>
        </div>
      </div>
    </div>
  );
});

export default ReservedMenu;
