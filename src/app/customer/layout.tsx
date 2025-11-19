import NoticeSummary from '@/components/features/dashboard/NoticeSummary';
import ButtomNav from '@/components/layout/ButtomNav';
import CustomerHeader from '@/components/layout/CustomerHeader';
import Footer from '@/components/layout/Footer';

import React from 'react';

export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='min-h-screen flex flex-col w-screen overflow-x-hidden'>
      <CustomerHeader />
      <main className='flex-1 w-full bg-white'>{children}</main>
      <div className='pb-18'>
        <NoticeSummary />
        <Footer />
      </div>
      <ButtomNav />
      {/* ButtomNav 고정 시 content 겹침 방지 padding */}
      <div className='h-[80px]' />
    </div>
  );
}
