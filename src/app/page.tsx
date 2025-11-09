'use client';

import ImageSlider from '@/components/ui/imageSlider';
import useFcmToken from '@/hooks/useFcmToken';
import { useGeolocationConsent } from '@/hooks/useGeolocationConsent';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import React from 'react';

export default function OnboardingPage() {
  const router = useRouter();
  const { token, notificationPermissionStatus } = useFcmToken();
  const { permission, requestPermission } = useGeolocationConsent();

  const isLocationAllowed = permission === 'granted';

  const putToken = () => {
    if (notificationPermissionStatus === 'granted') {
      console.log('토큰 발급: ', token);
    }
  };

  const onKakaoClick = () => {
    putToken();
    router.push('/customer');
  };

  const onSellerClick = () => {
    putToken();
    router.push('/seller/dashboard');
  };

  const images = [
    'https://placehold.co/304x293/FF6B6B/ffffff?text=Image+1',
    'https://placehold.co/304x293/4ECDC4/ffffff?text=Image+2',
    'https://placehold.co/304x293/45B7D1/ffffff?text=Image+3',
    'https://placehold.co/304x293/96CEB4/ffffff?text=Image+4',
  ];

  // ✅ Step 1: 위치 권한 미허용 시
  if (permission === 'prompt' || permission === 'unsupported' || permission === null) {
    return (
      <div className='w-screen h-screen flex flex-col justify-center items-center gap-10 p-5 text-center'>
        <h1 className='text-3xl font-bold text-black'>단디온나</h1>
        <p className='text-gray-700 text-base max-w-sm'>
          서비스 이용을 위해 위치정보 접근이 필요합니다. 주변 매장 탐색 및 맞춤 추천 기능을 사용하려면 위치정보 사용에
          동의해주세요.
        </p>
        <Button
          onClick={async () => {
            await requestPermission();
            // if (navigator.geolocation) {
            //   navigator.geolocation.getCurrentPosition(
            //     () => toast.success('위치정보 사용이 허용되었습니다!'),
            //     () => toast.error('위치정보 접근이 거부되었습니다.')
            //   );
            // }
          }}
          size='default'
          className='w-1/4 bg-blue-500 hover:bg-blue-600 text-white text-lg'>
          위치정보 사용 동의하기
        </Button>
      </div>
    );
  }

  // ✅ Step 2: 위치 권한 거부 시
  if (permission === 'denied') {
    return (
      <div className='w-screen h-screen flex flex-col justify-center items-center text-center gap-5'>
        <h2 className='text-xl font-semibold text-red-500'>위치정보 접근이 거부되었습니다.</h2>
        <p className='text-gray-600 max-w-xs'>브라우저 설정에서 위치 권한을 허용한 뒤 다시 시도해주세요.</p>
      </div>
    );
  }

  // ✅ Step 3: 위치 권한 허용 후 (정상 온보딩 UI)
  return (
    <div className='w-screen h-screen flex flex-col max-w-full justify-center items-center'>
      <div className='flex-1 flex flex-col justify-center items-center gap-8 p-3'>
        <div className='w-96 inline-flex flex-col justify-center items-center gap-3'>
          <p className='text-black text-lg font-normal'>모두가 신뢰할 수 있는 경험</p>
          <h1 className='text-black text-4xl font-black mb-4'>단디온나</h1>
        </div>

        <ImageSlider images={images} interval={3000} />

        <div className='flex flex-col justify-start items-center gap-3 w-full mt-5'>
          <Button onClick={onKakaoClick} size='default' className='w-full bg-yellow-400 hover:bg-yellow-500 text-black'>
            카카오톡으로 로그인
          </Button>

          <Button
            onClick={onSellerClick}
            variant='outline'
            size='default'
            className='w-full bg-white text-black hover:bg-gray-100 border border-gray-300'>
            사장님으로 로그인
          </Button>

          <Button
            variant='link'
            size='sm'
            className='text-xs text-black hover:underline'
            onClick={() => router.push('/customer')}>
            비회원으로 둘러보기
          </Button>
        </div>
      </div>
    </div>
  );
}
