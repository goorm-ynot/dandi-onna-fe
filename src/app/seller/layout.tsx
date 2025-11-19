'use client';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Alarm from '@/components/features/alarm/Alarm';
import { MENU_ITEMS } from '@/constants/sellerNavConstant';
import { useAlarmStore } from '@/store/useAlarmStore';
import React from 'react';
import { Toaster } from 'sonner';

export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { alarm, hideAlarm } = useAlarmStore();

  return (
    <div className='flex min-h-screen flex-col items-center bg-gray-50'>
      <main className='w-full max-w-[1920px] min-h-screen flex flex-col bg-white'>
        {/* 고정된 헤더 */}
        <div className='sticky top-0 z-40 bg-white'>
          <Header navList={MENU_ITEMS} hasNotification={true} userName='한정민' />
        </div>

        {/* 알림 */}
        {alarm.isVisible && (
          <div className='fixed top-20 right-10 z-50'>
            <Alarm
              type={alarm.type}
              title={alarm.title}
              message={alarm.message}
              onClose={hideAlarm}
              autoClose={true}
              duration={3000}
            />
          </div>
        )}

        {/* 스크롤 가능한 콘텐츠 */}
        <div className='flex-1 overflow-y-auto'>
          <div className='mx-auto flex items-center'>{children}</div>
        </div>

        {/* 푸터 */}
        <Footer />
      </main>
    </div>
  );
}
