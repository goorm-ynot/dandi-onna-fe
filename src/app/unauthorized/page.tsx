'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="w-screen h-screen flex flex-col max-w-full justify-center items-center p-4">
      <div className="flex flex-col items-center gap-6 max-w-md text-center">
        <div className="text-6xl">🚫</div>
        <h1 className="text-3xl font-bold text-gray-900">접근 권한이 없습니다</h1>
        <p className="text-gray-600">
          이 페이지에 접근할 수 있는 권한이 없습니다.
          <br />
          사장님 계정으로 로그인해주세요.
        </p>
        <div className="flex gap-3 mt-4">
          <Button onClick={() => router.push('/')} variant="default">
            로그인 페이지로
          </Button>
          <Button onClick={() => router.back()} variant="outline">
            이전 페이지로
          </Button>
        </div>
      </div>
    </div>
  );
}
