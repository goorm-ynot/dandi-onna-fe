'use client';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { MENU_ITEMS } from '@/constants/sellerNavConstant';
import React from 'react';

export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className='min-h-screen flex flex-col justify-center items-center'>
      <main className=' max-w-[1920px] min-h-screen mx-auto bg-white z-999'>
        <Header navList={MENU_ITEMS} hasNotification={true} userName='한정민' />
        {children}
        <Footer />
      </main>
    </div>
  );
}
