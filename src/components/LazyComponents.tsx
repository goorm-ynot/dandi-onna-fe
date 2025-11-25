// 현재 무거운 패키지들을 찾아서 동적 로딩
// components/LazyComponents.tsx
import dynamic from 'next/dynamic';

// 🎯 React Query DevTools (개발환경에서만)
export const ReactQueryDevtools = dynamic(
  () =>
    import('@tanstack/react-query-devtools').then((mod) => ({
      default: mod.ReactQueryDevtools,
    })),
  { ssr: false }
);

// 🎯 카카오맵 (필요할 때만)
export const KakaoMap = dynamic(() => import('react-kakao-maps-sdk').then((mod) => mod.Map), {
  ssr: false,
  loading: () => <div className='h-64 bg-gray-200 animate-pulse' />,
});

// 🎯 Firebase 관련 (인증 후에만)
// export const FirebaseAuth = dynamic(() => import('../firebase'), { ssr: false });
