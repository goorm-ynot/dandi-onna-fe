'use client';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Alarm from '@/components/features/alarm/Alarm';
import { MENU_ITEMS } from '@/constants/sellerNavConstant';
import { useAlarmStore } from '@/store/useAlarmStore';
import useFcmToken from '@/hooks/useFcmToken';
import React from 'react';
import NoticeSummary from '@/components/features/dashboard/NoticeSummary';

export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { alarm, hideAlarm } = useAlarmStore();
  useFcmToken(); // FCM 토큰 초기화 및 메시지 리스너 등록

  return (
    <div className='flex min-h-screen min-w-[1200px] flex-col items-center '>
      <main className='w-full min-h-screen flex flex-col bg-background-normal-foreground'>
        {/* 고정된 헤더 */}
        <div className='sticky top-0 z-40 bg-background-normal-foreground'>
          <Header navList={MENU_ITEMS} hasNotification={true} userName='이든횟집' />
        </div>

        {/* 알림 */}
        {alarm.isVisible && (
          <div className='fixed top-20 right-10 z-50'>
            <Alarm
              type={alarm.type}
              title={alarm.title}
              message={alarm.message}
              onClose={hideAlarm}
              autoClose={alarm.autoClose ?? true}
              duration={30000}
            />
          </div>
        )}

        {/* 스크롤 가능한 콘텐츠 */}
        <div className='flex-1 overflow-y-auto'>
          <div className='mx-auto flex items-center'>{children}</div>
        </div>
        
        {/* 공지사항 */}
        <div className='w-full flex-2'>
          <NoticeSummary />
        </div>
        {/* 푸터 */}
        <Footer />
      </main>
    </div>
  );
}
