import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useApiErrorHandler = () => {
  const router = useRouter();

  const handleApiError = useCallback(
    (error: any) => {
      if (error?.message === 'AUTH_FAILURE') {
        // alert 표시
        alert('연결이 원활하지 않습니다. 다시 시도해주세요');
        // 메인 페이지로 이동
        router.replace('/');
      }
    },
    [router]
  );

  return { handleApiError };
};
