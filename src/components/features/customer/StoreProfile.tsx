'use client';

import React from 'react';
import Image from 'next/image';

interface StoreProfileProps {
  name: string;
  image: string;
  openTime: string;
  closeTime: string;
  distance: number;
}

const StoreProfile = React.memo(function StoreProfile({
  name,
  image,
  openTime,
  closeTime,
  distance,
}: StoreProfileProps) {
  return (
    <div className='flex gap-[10px] items-start w-full'>
      {/* Image */}
      <div className='bg-neutral-100 rounded-[10px] overflow-hidden shrink-0 w-[86px] h-[86px] relative'>
        {/* 🎯 S3 이미지는 unoptimized 사용 (Vercel Image Optimization 스킵) */}
        <Image
          src={image}
          alt={name}
          fill
          className='object-cover'
          sizes='86px'
          loading='lazy'
          unoptimized={image.includes('s3.ap-northeast-2.amazonaws.com')} // S3 이미지는 최적화 스킵
        />
      </div>

      {/* Text Area */}
      <div className='flex-1 flex flex-col gap-2 min-w-0'>
        {/* Header */}
        <div className='w-full'>
          <p className='title5 text-[#262626] truncate'>{name}</p>
        </div>

        {/* Body */}
        <div className='flex gap-1 items-start w-full'>
          {/* Icons */}
          <div className='flex flex-col gap-[6px] items-center py-[2px] shrink-0'>
            {/* Clock Icon */}
            <svg width='14' height='14' viewBox='0 0 14 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <circle cx='7' cy='7' r='5.83333' stroke='#262626' strokeWidth='1.16667' />
              <path d='M7 4.08333V7L8.75 8.16667' stroke='#262626' strokeWidth='1.16667' strokeLinecap='round' />
            </svg>

            {/* Location Icon */}
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M8 8.66667C9.10457 8.66667 10 7.77124 10 6.66667C10 5.5621 9.10457 4.66667 8 4.66667C6.89543 4.66667 6 5.5621 6 6.66667C6 7.77124 6.89543 8.66667 8 8.66667Z'
                stroke='#262626'
                strokeWidth='1.5'
              />
              <path
                d='M8 14C10.6667 11.3333 13.3333 9.01867 13.3333 6.66667C13.3333 3.72115 10.9455 1.33333 8 1.33333C5.05448 1.33333 2.66667 3.72115 2.66667 6.66667C2.66667 9.01867 5.33333 11.3333 8 14Z'
                stroke='#262626'
                strokeWidth='1.5'
              />
            </svg>
          </div>

          {/* Text Area */}
          <div className='flex flex-col gap-1'>
            {/* Store Hours */}
            <div className='flex gap-[2px] items-start body3 text-[#4c4c4c]'>
              <span>{openTime}</span>
              <span>~</span>
              <span>{closeTime}</span>
            </div>

            {/* Distance */}
            <div className='flex gap-[2px] items-start body3 text-[#4c4c4c]'>
              <span>{distance}</span>
              <span>km</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default StoreProfile;
