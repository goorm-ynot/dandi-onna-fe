'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer className='w-full border-t border-gray-200 bg-white'>
      {/* ✅ 전체는 중앙 정렬 + 최대 1920px 제한 */}
      <div className='max-w-[1920px] mx-auto px-6 sm:px-10 lg:px-20 py-10'>
        {/* ✅ 내부 컨테이너: 중앙에 1280px 고정, 양쪽 여백 균등 */}
        <div className='max-w-[1280px] mx-auto flex flex-col gap-5'>
          {/* 상단: 로고 + 링크 + 고객센터 */}
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 sm:gap-0'>
            {/* 왼쪽 */}
            <div className='flex flex-col sm:flex-row items-start sm:items-center gap-5'>
              <div className='logo text-2xl'>단디온나</div>

              <div className='flex flex-wrap items-center gap-4 text-xs text-neutral-900'>
                <span className='cursor-pointer hover:underline'>브랜드 소개</span>
                <span className='cursor-pointer hover:underline'>이용약관</span>
                <span className='cursor-pointer font-bold hover:underline'>개인정보처리방침</span>
              </div>
            </div>

            {/* 오른쪽 */}
            <div className='flex flex-col sm:flex-row sm:items-center sm:gap-2 text-right sm:text-left'>
              <span className='text-neutral-900 text-base font-medium'>고객센터</span>
              <span className='text-neutral-900 text-xl font-bold sm:ml-1'>1500-0000</span>
            </div>
          </div>

          {/* 하단: 주소 및 카피라이트 */}
          <div className='flex flex-col gap-1.5 text-xs text-neutral-900 mt-2'>
            <p>경기 성남시 분당구 구름스퀘어 (주)와이낫컴퍼니</p>
            <p>Copyright © 2025 Ynot. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
