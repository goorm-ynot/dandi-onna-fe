import React from 'react';

export default function Footer() {
  return (
    <footer className='w-full bg-white py-16 border-t border-border-wrapper'>
      {/* ✅ 전체는 중앙 정렬 */}
      <div className='w-full px-16 max-[400px]:px-16 lg:px-20 py-40'>
        {/* ✅ 내부 컨테이너 */}
        <div className='w-full mx-auto flex flex-col gap-5'>
          {/* 상단: 로고 + 링크 + 고객센터 */}
          <div className='flex flex-row justify-between items-start max-[400px]:flex-col max-[400px]:items-left max-[400px]:gap-20'>
            {/* 왼쪽 */}
            <div className='flex flex-col max-[400px]:flex-row items-start max-[400px]:items-center gap-5'>
              <div className=' title5 max-[400px]:title8'>단디온나</div>

              <div className='flex flex-wrap items-center gap-4 max-[400px]:gap-3 text-xs text-neutral-900'>
                <span className='caption4 cursor-pointer hover:underline'>브랜드 소개</span>
                <span className='caption4 cursor-pointer hover:underline'>이용약관</span>
                <span className='caption4 font-bold max-[400px]:font-medium cursor-pointer hover:underline'>
                  개인정보처리방침
                </span>
              </div>
            </div>

            {/* 오른쪽 */}
            <div className='flex flex-col max-[400px]:flex-row max-[400px]:items-center max-[400px]:gap-2 text-right max-[400px]:text-left'>
              <span className='text-neutral-900 text-base font-medium max-[400px]:body1'>고객센터</span>
              <span className='text-primary text-xl font-bold max-[400px]:caption8'>1500-0000</span>
            </div>
          </div>

          {/* 하단: 주소 및 카피라이트 */}
          <div className='flex flex-col gap-1.5 caption4 text-neutral-900 mt-2'>
            <p>경기 성남시 분당구 구름스퀘어 (주)와이낫컴퍼니</p>
            <p>Copyright © 2025 Ynot. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
