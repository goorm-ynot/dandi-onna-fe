'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * 고객 페이지 진입 시 스크롤을 최상단으로 이동시키는 컴포넌트
 * @returns TSX.Element
 */
export default function ScrollToTopOnCustomerEnter() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === '/customer') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}