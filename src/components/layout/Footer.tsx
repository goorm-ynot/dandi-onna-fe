import React from 'react';

export default function Footer() {
  return (
    <footer className='w-full bg-background-normal-foreground border-t border-border-normal'>
      {/* ✅ 전체는 중앙 정렬 */}
      <div className='w-full pt-40 pb-20'>
        {/* ✅ 내부 컨테이너 */}
        <div className='max-w-[1280px] mx-auto px-16 max-[400px]:px-16 lg:px-[40px] flex flex-col gap-5'>
          {/* 상단: 로고 + 링크 + 고객센터 */}
          <div className='flex flex-row justify-between items-start max-[400px]:flex-col max-[400px]:items-left max-[400px]:gap-[20px]'>
            {/* 왼쪽 */}
            <div className='flex flex-row items-center gap-[20px]'>
              <div className='title7 max-[400px]:title5'>단디온나</div>

              <div className='flex flex-wrap items-center gap-[20px] min-[400px]:gap-3 text-xs text-neutral-900'>
                <span className='caption3 cursor-pointer hover:underline hover:font-bold transition-all'>브랜드 소개</span>
                <span className='caption3 cursor-pointer hover:underline hover:font-bold transition-all'>이용약관</span>
                <span className='caption3 cursor-pointer hover:underline hover:font-bold transition-all'>
                  개인정보처리방침
                </span>
              </div>
            </div>

            {/* 오른쪽 */}
            <div className='flex flex-row text-right items-center gap-[10px]'>
              <span className='text-neutral-900 text-base font-medium min-[400px]:body1'>고객센터</span>
              <span className='text-primary text-xl font-bold min-[400px]:caption8'>1500-0000</span>
            </div>
          </div>

          {/* 하단: 주소 및 카피라이트 */}
          <div className='flex flex-col gap-1.5 caption3 text-neutral-900 mt-2'>
            <p>경기 성남시 분당구 구름스퀘어 (주)와이낫컴퍼니</p>
            <p>Copyright © 2025 Ynot. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
