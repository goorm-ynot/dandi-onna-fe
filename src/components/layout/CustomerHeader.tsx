import React from 'react';
import { Button } from '../ui/button';
import { BellIcon } from '../icons';

export default function CustomerHeader() {
  // 알림 개수: 상태관리로 변경 필요
  const notificationCount = 3;

  return (
    <header className='sticky top-0 z-50 bg-background-normal w-full py-20'>
      <div className='w-full px-4 h-16 flex justify-between'>
        {/* 로고 (타이포) */}
        <div className='flex items-center'>
          <h1 className='logo title5'>단디온나</h1>
        </div>

        {/* 알람 + 배찌 */}
        <div className='flex items-center'>
          <Button variant='ghost' size='icon' className='relative'>
            <BellIcon hasNotification={true} />
          </Button>
        </div>
      </div>
    </header>
  );
}
