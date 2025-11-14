// app/login/page.tsx
'use client'; // ✅ 파일 최상단에 추가

import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/features/auth/LoginForm';
import { toast } from 'sonner'; // 또는 다른 toast 라이브러리
import useFcmToken from '@/hooks/useFcmToken';
import { useEffect, useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const { token, notificationPermissionStatus } = useFcmToken();
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
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('로그인에 실패했습니다');
      }

      const result = await response.json();

      // 성공 시 대시보드로 리다이렉트
      toast.success('로그인에 성공했습니다!');
      // console.log(result);
      putToken();
      // router.push('/register');
    } catch (error) {
      toast.error('로그인에 실패했습니다. 다시 시도해주세요.');
      console.error(error);
      throw error;
    }
  };

  const putToken = async () => {
    // console.log('토큰 발급: ', token);
    try {
      const response = await fetch('/api/v1/push/tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, deviceId }),
      });

      toast.success('토큰이 저장되었습니다.');
      // console.log(response);
    } catch (error) {
      toast.error('토큰 저장에 실패했습니다. 다시 시도해주세요.');
      console.error(error);
      throw error;
    }
  };

  return (
    <div className='min-h-screen w-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}
