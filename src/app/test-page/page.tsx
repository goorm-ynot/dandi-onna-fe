// app/login/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { LoginForm } from '@/components/features/auth/LoginForm';
import { toast } from 'sonner'; // 또는 다른 toast 라이브러리
import useFcmToken from '@/hooks/useFcmToken';

export default function LoginPage() {
  const router = useRouter();
  const { token, notificationPermissionStatus } = useFcmToken();
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
      console.log(result);
      putToken();
      // router.push('/dashboard');
    } catch (error) {
      toast.error('로그인에 실패했습니다. 다시 시도해주세요.');
      console.error(error);
      throw error;
    }
  };

  const putToken = async () => {
    console.log('토큰 발급: ', token);
    try {
      const response = await fetch('/api/v1/push/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(token),
      });

      toast.success('토큰이 저장되었습니다.');
      console.log(response);
    } catch (error) {
      toast.error('토큰 저장 실패함요');
      console.log(error);
      throw error;
    }
  };

  return (
    <div className='min-h-screen w-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}
