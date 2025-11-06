'use client'; // Next.js App Router 사용 시 클라이언트 컴포넌트 지정

import React from 'react';
import { BellIcon } from '../icons';

export default function Header() {
  return (
    <header className='w-full px-5 py-4 bg-white shadow-sm border-b border-gray-300'>
      <div className='max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        {/* 왼쪽: 로고 + 네비게이션 */}
        <div className='flex flex-col md:flex-row md:items-center md:gap-10'>
          {/* 로고 */}
          <div className='text-neutral-900 text-2xl font-black text-center md:text-left font-[PartialSans]'>
            단디온나
          </div>

          {/* 네비게이션 */}
          <nav className='flex flex-row flex-wrap md:flex-nowrap gap-10 text-lg '>
            <button className='text-neutral-900 px-12 font-bold  whitespace-nowrap'>주문 관리</button>
            <button className='text-neutral-600 px-12 font-medium hidden sm:block  whitespace-nowrap'>매출 관리</button>
            <button className='text-neutral-600 px-12 font-medium  hidden sm:block  whitespace-nowrap'>
              상품/재고
            </button>
          </nav>
        </div>

        {/* 오른쪽: 프로필 + 알림 */}
        <div className='flex items-center justify-center gap-4'>
          <div className='text-neutral-900 text-lg text-center sm:text-left'>
            <span className='font-semibold'>한정민 </span>
            <span className='font-normal'>사장님 오늘도 번창하세요!</span>
          </div>
          <div data-alarm='true' className='relative w-6 h-6'>
            <BellIcon hasNotification={true} />
          </div>
        </div>
      </div>
    </header>
  );
}
