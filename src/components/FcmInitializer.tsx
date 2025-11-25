'use client';

import useFcmToken from '@/hooks/useFcmToken';

/**
 * 🎯 FCM 토큰 초기화 컴포넌트
 * - 클라이언트 전용
 * - providers.tsx에서 동적으로 로드됨 (번들에 포함 안 됨)
 * - useFcmToken 훅 실행
 * - 이 컴포넌트 자체는 아무것도 렌더링하지 않음 (invisible)
 *
 * 성능 이점:
 * - Firebase는 이 컴포넌트가 마운트될 때만 동적으로 로드됨
 * - 초기 페이지 로드 시 Firebase 번들이 vendors chunk에 포함되지 않음
 * - LCP(Largest Contentful Paint) 개선
 */
export default function FcmInitializer() {
  // 🎯 FCM 훅 호출 - Firebase는 여기서만 동적으로 임포트됨
  useFcmToken();

  // 화면에 아무것도 렌더링하지 않음 (invisible component)
  return null;
}
