// components/layout/ConditionalFooter.tsx
'use client';

import { usePathname } from 'next/navigation';
import NoticeSummary from '@/components/features/dashboard/NoticeSummary';
import Footer from '@/components/layout/Footer';

export default function ConditionalFooter() {
  const pathname = usePathname();

  // Footer를 숨길 경로 패턴들
  const hideFooterPatterns = [
    /^\/customer\/store\/[^/]+$/, // customer/store/[storeId]
    /^\/customer\/payment\/[^/]+$/, // customer/payment/[storeId]
    /^\/customer\/payment\/success+$/, // customer/payment/[storeId]
  ];

  // 현재 경로가 숨김 패턴과 일치하는지 확인
  const shouldHideFooter = hideFooterPatterns.some((pattern) => pathname?.match(pattern));

  // 숨김 패턴과 일치하면 렌더링하지 않음
  if (shouldHideFooter) {
    return null;
  }

  return (
    <div className='pb-18'>
      <NoticeSummary />
      <Footer />
    </div>
  );
}
