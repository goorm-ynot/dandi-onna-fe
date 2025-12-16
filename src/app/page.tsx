'use client';

import ImageSlider from '@/components/ui/imageSlider';
import useFcmToken from '@/hooks/useFcmToken';
import { useGeolocationConsent } from '@/hooks/useGeolocationConsent';
import { redirect, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import React, { useEffect, useState } from 'react';
import { useUserHook } from '@/hooks/useUser';
import { useNavigation } from '@/hooks/useNavigation';
import SafeArea from '@/components/layout/SafeArea';

const USER_ROLE = ['CONSUMER', 'OWNER', 'ADMIN'];
export default function OnboardingPage() {
  const router = useRouter();
  const { token } = useFcmToken();
  const { permission, requestPermission } = useGeolocationConsent();
  const { handleLogin, postFcmToken } = useUserHook();
  const { goCustomerHome, goSellerHome, goSellerHomeParams } = useNavigation();

  const [deviceId, setDeviceId] = useState<string | null>(null);

  useEffect(() => {
    // 위치 권한 정보 수집
    requestPermission();
    // deviceID 필요
    let storedId = localStorage.getItem('deviceId');
    if (!storedId) {
      storedId = crypto.randomUUID();
      localStorage.setItem('deviceId', storedId);
    }
    setDeviceId(storedId);
  }, []);

  const onKakaoClick = async () => {
    const userLoginData = {
      loginId: 'Customer1',
      password: '111111',
      role: USER_ROLE[0], // CUSTOMER
    };
    try {
      const result = await handleLogin(userLoginData);
      if (result.success && token && deviceId) {
        await postFcmToken(token, deviceId);
      }
      toast.success('로그인 성공!', {
        description: result.message,
      });
      goCustomerHome();
    } catch (error) {
      toast.error('로그인 실패', {
        description: '아이디 또는 비밀번호를 확인해주세요.',
      });
    }
  };

  const onSellerClick = async () => {
    //redirect('/test-page');
    const userLoginData = {
      loginId: 'CEO1',
      password: '111111',
      role: USER_ROLE[1], // OWNER
    };

    try {
      const result = await handleLogin({
        loginId: userLoginData.loginId,
        password: userLoginData.password,
        role: userLoginData.role,
      });
      // result 성공 시, fcm 토큰도 전송
      if (result.success && token && deviceId) {
        await postFcmToken(token, deviceId);
      }
      toast.success('로그인 성공!', {
        description: '로그인 성공했습니다.',
      });
      goSellerHomeParams(userLoginData.loginId);
    } catch (error) {
      toast.error('로그인 실패', {
        description: '아이디 또는 비밀번호를 확인해주세요.',
      });
    }
  };

  const images = ['/images/onboarding1.png'];

  return (
    <SafeArea className='w-screen h-screen flex flex-col max-w-full justify-center items-center'>
      <div className='flex-1 flex flex-col justify-center items-center gap-[40px] p-3'>
        <div className='w-96 inline-flex flex-col justify-center items-center gap-[7px]'>
          <h1 className='logo text-[40px] font-bold text-primitives-brand3 '>단디온나</h1>
          <p className='body6'>모두가 신뢰할 수 있는 경험</p>
        </div>

        <ImageSlider images={images} interval={3000} />

        <div className='flex flex-col justify-start items-center gap-[10px] w-full max-[400px]:px-[16px]'>
          <Button
            onClick={onKakaoClick}
            size='onboarding'
            className='w-full bg-[#FACC15] hover:bg-yellow-500 body5 text-foreground-normal px-[12px] py-[10px] rounded-[6px]'
            disabled={permission === 'granted' ? false : true}>
            <img src='/images/IconL-kakao.svg' alt='kakao logo' className='w-5 h-5 mr-2 inline-block align-middle' />
            카카오톡으로 로그인
          </Button>

          <Button
            onClick={onSellerClick}
            variant='outline'
            size='onboarding'
            disabled={permission === 'granted' ? false : true}
            className='w-full bg-white body3 text-foreground-normal hover:bg-gray-100 border border-[#C6C6C6] px-[12px] py-[10px] rounded-[6px]'>
            사장님으로 로그인
          </Button>

          <Button
            variant='link'
            size='sm'
            className='body1 hover:underline text-[#666666]'
            disabled={permission === 'granted' ? false : true}
            onClick={() => alert('현재 비회원은 서비스하고 있지 않습니다.')}>
            비회원으로 둘러보기
          </Button>
        </div>
      </div>
    </SafeArea>
  );
}
