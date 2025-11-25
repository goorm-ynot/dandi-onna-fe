// app/customer/layout.tsx
import ButtomNav from '@/components/layout/ButtomNav';
import CustomerHeader from '@/components/layout/CustomerHeader';

import ConditionalFooter from '@/components/layout/ConditionalFooter';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
