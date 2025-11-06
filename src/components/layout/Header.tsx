import React from 'react';
import { BellIcon } from '../icons';

export default function Header() {
  return (
    <header className='w-full px-10 py-7 bg-white shadow-sm border-b border-gray-300'>
      <div className='max-w-[1280px] mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
        {/* 왼쪽 타이틀 */}
        <div className='flex flex-row gap-12'>
          <div className='text-neutral-900 text-2xl font-black text-center md:text-left'>단디온나</div>

          {/* 네비게이션 */}
          <nav className='flex justify-left md:justify-start gap-8 text-lg'>
            <button className='text-neutral-900 font-bold'>주문 관리</button>
            <button className='text-neutral-600 font-medium hidden sm:block'>매출 관리</button>
            <button className='text-neutral-600 font-medium hidden sm:block'>상품/재고</button>
          </nav>
        </div>

        {/* 오른쪽 프로필 & 알림 */}
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
