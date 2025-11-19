// app/login/page.tsx
'use client'; // ✅ 파일 최상단에 추가

import { redirect, useRouter } from 'next/navigation';
import { LoginForm } from '@/components/features/auth/LoginForm';
import { toast } from 'sonner'; // 또는 다른 toast 라이브러리
import useFcmToken from '@/hooks/useFcmToken';
import { useEffect, useState } from 'react';
import { useUserHook } from '@/hooks/useUser';

export default function LoginPage() {
  const router = useRouter();
  const { token, notificationPermissionStatus } = useFcmToken();
  const { handleLogin: loginHook, postFcmToken } = useUserHook();

  const [deviceId, setDeviceId] = useState<string | null>(null);

  // ✅ localStorage 접근
  useEffect(() => {
    let storedId = localStorage.getItem('deviceId');
    if (!storedId) {
      storedId = crypto.randomUUID();
      localStorage.setItem('deviceId', storedId);
    }
    setDeviceId(storedId);
  }, []);

  const handleLogin = async (data: { userId: string; password: string; role: 'CUSTOMER' | 'OWNER' }) => {
    try {
      const result = await loginHook({ loginId: data.userId, password: data.password, role: data.role });
      // result 성공 시, fcm 토큰도 전송
      if (result.success && token && deviceId) {
        await postFcmToken(token, deviceId);
      }
      toast.success('로그인 성공!', {
        description: '로그인 성공했습니다.',
      });
      router.replace('/seller');
    } catch (error) {
      toast.error('로그인 실패', {
        description: '아이디 또는 비밀번호를 확인해주세요.',
      });
    }
  };

  return (
    <div className='min-h-screen w-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}
