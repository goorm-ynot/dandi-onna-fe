// app/providers.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import dynamic from 'next/dynamic';

// 🎯 FCM 훅을 동적으로 로드 (클라이언트에서만, 필요할 때만)
const FcmInitializer = dynamic(() => import('@/components/FcmInitializer'), {
  ssr: false, // 서버사이드 렌더링 없음 - 클라이언트 전용
  loading: () => null, // 로딩 중 아무것도 표시하지 않음
});

// 🎯 폰트 로더를 동적으로 로드 (LCP 최적화)
// preload: false로 설정했으므로, SPA 진입 후 폰트 백그라운드 로드
const FontLoader = dynamic(() => import('@/components/FontLoader'), {
  ssr: false, // 클라이언트 전용 (서버에서 폰트 로드 불필요)
  loading: () => null, // 로딩 중 아무것도 표시하지 않음
});

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000, // 30초
            retry: 1,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {/* 🎯 폰트 로더 (백그라운드에서 동적 로드) */}
      <FontLoader />

      {/* 🎯 FCM 초기화 컴포넌트 (동적 로드) */}
      <FcmInitializer />

      {children}
    </QueryClientProvider>
  );
}
