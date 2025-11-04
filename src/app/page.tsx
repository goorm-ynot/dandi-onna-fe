import React from 'react';

export default function OnboardingPage() {
  return (
    <div className='w-[392px] h-screen flex flex-col max-w-full'>
      {/* 온보딩 콘텐츠 */}
      <div className='flex-1 flex flex-col justify-center items-center p-6'>
        <h1 className='text-2xl font-bold mb-4'>환영합니다!</h1>
        <p className='text-gray-600 text-center mb-8'>앱을 시작하기 위해 몇 가지 설정을 해보세요.</p>
        {/* 온보딩 단계들 */}
      </div>
    </div>
  );
}
