'use client';

import { useEffect } from 'react';

/**
 * 🎯 폰트 동적 로딩 컴포넌트 (LCP 최적화)
 *
 * 전략:
 * 1. 초기 로드: fallback 폰트 (system-ui) 사용
 * 2. SPA 진입 후: Pretendard Variable 폰트 백그라운드에서 로드
 * 3. 로드 완료 후: 스타일 변경 (smooth transition)
 *
 * 효과:
 * - LCP: fallback 폰트로 빠른 렌더링 (280KB 폰트 제외)
 * - CLS: 폰트 로드 후 layout shift 최소화
 * - UX: 사용자 초기 인터랙션 가능 (폰트 다운 중에도)
 */
export default function FontLoader() {
  useEffect(() => {
    // 🎯 CSS Font Loading API를 사용한 명시적 폰트 로딩
    const loadFont = async () => {
      try {
        if ('fonts' in document) {
          // Pretendard Variable 폰트 로드 (백그라운드에서)
          const response = await fetch('/fonts/pretendard/PretendardVariable.woff2');
          const buffer = await response.arrayBuffer();
          const fontFace = new FontFace('PretendardVariable', buffer, {
            weight: '100 900',
            display: 'swap', // FOUT 허용
          });

          document.fonts.add(fontFace);

          // 🎯 폰트 로드 (Promise로 처리)
          await fontFace.loaded;

          // 폰트 로드 완료 후 클래스 추가
          document.documentElement.classList.add('fonts-loaded');
          console.log('✅ Pretendard font loaded successfully');
        }
      } catch (err) {
        console.warn('⚠️ Failed to load Pretendard font:', err);
        // Fallback 폰트로 계속 진행 (이미 적용됨)
      }
    };

    // 🎯 약간의 지연 후 폰트 로드 시작
    // (초기 렌더링 완료 후 백그라운드에서 로드)
    const timeoutId = setTimeout(loadFont, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return null; // 화면에 아무것도 렌더링하지 않음
}
