// app/customer/layout.tsx
'use client';
import NoticeSummary from '@/components/features/dashboard/NoticeSummary';
import ButtomNav from '@/components/layout/ButtomNav';
import CustomerHeader from '@/components/layout/CustomerHeader';
import Footer from '@/components/layout/Footer';
import ConditionalFooter from '@/components/layout/ConditionalFooter';
import useFcmToken from '@/hooks/useFcmToken';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useFcmToken(); // FCM 토큰 초기화 및 메시지 리스너 등록

  return (
    <div className='min-h-screen flex flex-col w-screen overflow-x-hidden'>
      <CustomerHeader />

      <main className='flex-1 w-full bg-white'>{children}</main>

      {/* 📍 조건부 렌더링을 Client Component로 분리 */}
      <ConditionalFooter />

      <ButtomNav />
      <div className='h-[80px]' />
    </div>
  );
}
