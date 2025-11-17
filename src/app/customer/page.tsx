import React from 'react';

export default function customerPage() {
  return (
    <div className='h-screen flex flex-col max-w-full'>
      {/* seller 헤더 
      
lat      37.389858

lon 127.096352
*/}
      {/* seller 사이드 메뉴 */}
      {/* 아... 이건 레이아웃에 들어가야하지 */}
      <div className='flex-1 flex flex-col justify-center items-center p-6'>
        <h1 className='text-2xl font-bold mb-4'>환영합니다!</h1>
        <p className='text-gray-600 text-center mb-8'>일반 유저 전용 페이지입니다!</p>
        {/* 온보딩 단계들 */}
      </div>
    </div>
  );
}
