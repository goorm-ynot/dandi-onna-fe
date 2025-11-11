'use client';

import ImageSlider from '@/components/ui/imageSlider';
import useFcmToken from '@/hooks/useFcmToken';
import { useGeolocationConsent } from '@/hooks/useGeolocationConsent';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import React, { useEffect } from 'react';

const USER_ROLE = ['CONSUMER', 'OWNER', 'ADMIN'];
export default function OnboardingPage() {
  const router = useRouter();
  const { token, notificationPermissionStatus } = useFcmToken();
  const { permission, requestPermission } = useGeolocationConsent();

  const isLocationAllowed = permission === 'granted';

  useEffect(() => {
    // 위치 권한 정보 수집
    requestPermission();
  }, []);

  const putToken = () => {
    // 허용 상관없이 token 전송으로
  };

  const onKakaoClick = () => {
    const userLoginData = {
      loginId: 'owner@example.com',
      password: 'pass123!',
      role: USER_ROLE[0], // CUSTOMER
    };

    putToken();
    // router.push('/customer');
  };

  const onSellerClick = () => {
    const userLoginData = {
      loginId: 'owner@example.com',
      password: 'pass123!',
      role: USER_ROLE[1], // OWNER
    };
    putToken();
    // router.push('/seller/dashboard');
  };

  const images = [
    'https://placehold.co/304x293/FF6B6B/ffffff?text=Image+1',
    'https://placehold.co/304x293/4ECDC4/ffffff?text=Image+2',
    'https://placehold.co/304x293/45B7D1/ffffff?text=Image+3',
    'https://placehold.co/304x293/96CEB4/ffffff?text=Image+4',
  ];

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
