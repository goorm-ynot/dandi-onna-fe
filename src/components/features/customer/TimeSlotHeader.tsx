'use client';

import React from 'react';

interface TimeSlotHeaderProps {
  time: string;
}

export default function TimeSlotHeader({ time }: TimeSlotHeaderProps) {
  return (
    <div className='flex gap-[6px] items-center'>
      <div className='flex gap-[2px] items-center'>
        {/* Clock Icon */}
        <svg
          width='14'
          height='14'
          viewBox='0 0 14 14'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='shrink-0'>
          <circle cx='7' cy='7' r='5.83333' stroke='#8749fe' strokeWidth='1.16667' />
          <path d='M7 4.08333V7L8.75 8.16667' stroke='#8749fe' strokeWidth='1.16667' strokeLinecap='round' />
        </svg>
        <p className='title3 text-[#8749fe]'>{time}시</p>
        <p className='title1 text-[#262626]'>에 방문해주세요!</p>
      </div>
    </div>
  );
}
