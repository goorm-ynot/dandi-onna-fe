'use client';
import ImageSlider from '@/components/ui/imageSlider';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function OnboardingPage() {
  const router = useRouter();
  const images = [
    'https://placehold.co/304x293/FF6B6B/ffffff?text=Image+1',
    'https://placehold.co/304x293/4ECDC4/ffffff?text=Image+2',
    'https://placehold.co/304x293/45B7D1/ffffff?text=Image+3',
    'https://placehold.co/304x293/96CEB4/ffffff?text=Image+4',
  ];

  const onKakaoClick = () => {
    // 카카오톡으로 로그인 버튼 클릭
    // 로그인 로직 추가해야함
    router.push('/customer');
  };

  const onSellerClick = () => {
    // 사장님 로그인 클릭
    console.log('사장님으로 로그인');
    router.push('/seller/dashboard');
  };

  return (
    <div className='w-screen h-screen flex flex-col max-w-full justify-center items-center'>
      {/* 온보딩 콘텐츠 */}
      <div className='flex-1 flex flex-col justify-center items-center gap-8 p-3'>
        <div className='w-96 inline-flex flex-col justify-center items-center gap-3'>
          <p className='text-black text-lg font-normal'>모두가 신뢰할 수 있는 경험</p>
          <h1 className='text-black text-4xl font-black mb-4'>단디온나</h1>
        </div>
        {/* 스와이프 3초 */}
        <ImageSlider images={images} interval={3000} />
        {/* 로그인 버튼들 */}
        <div className='flex flex-col justify-start items-center gap-3 w-full mt-5'>
          <div className='self-stretch h-14 p-3 bg-yellow-400 rounded-lg inline-flex justify-center items-center gap-2.5'>
            <button onClick={onKakaoClick} className='text-center justify-start text-black text-base font-medium'>
              카카오톡으로 로그인
            </button>
          </div>
          <div className='self-stretch h-14 p-3 bg-white rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-400 inline-flex justify-center items-center gap-2.5'>
            <button
              onClick={onSellerClick}
              className="text-center justify-start text-black text-base font-medium font-['Pretendard']">
              사장님으로 로그인
            </button>
          </div>
          <button
            onClick={() => router.push('/customer')}
            className="text-center justify-start text-black text-xs font-normal font-['Pretendard']">
            비회원으로 둘러보기
          </button>
        </div>
      </div>
    </div>
  );
}
