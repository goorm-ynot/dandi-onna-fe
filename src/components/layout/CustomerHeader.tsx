'use client';

import React from 'react';
import { Button } from '../ui/button';
import { BellIcon } from '../icons';
import { usePathname } from 'next/navigation';

export default function CustomerHeader() {
  // 알림 개수: 상태관리로 변경 필요
  const notificationCount = 1;
  const pathname = usePathname();

  /**
   * Header를 보여줄 경로들
   * - exact: 정확히 일치해야 보임
   * - regex: 정규식 매칭되면 보임 (동적 라우트용)
   */
  const SHOW_HEADER_RULES: Array<
  | {type:'exact'; path: string}
  | {type:'regex'; pattern: RegExp}
  > = [
    { type: 'exact', path: '/customer' }, // 아직은 이거 하나
    // 예시: /customer/* 전부 보여주고 싶으면 아래처럼
    // { type: 'regex', pattern: /^\/customer(\/.*)?$/ },
    ];

  // 현재 경로가 Header를 보여줄 경로인지 확인
  const shouldShowHeader = SHOW_HEADER_RULES.some((rule) => {
    if(rule.type==='exact') return pathname === rule.path;
    return rule.pattern.test(pathname);
  });

  if(!shouldShowHeader) return null;


  return (
    <header className='sticky top-0 z-50 bg-background-normal w-full py-22'>
      <div className='w-full px-4 h-16 flex justify-between'>
        {/* 로고 (타이포) */}
        <div className='flex items-center'>
          <h1 className='logo logo-header '>단디온나</h1>
        </div>

        {/* 알람 + 배찌 */}
        <div className='flex items-center'>
          <Button aria-label='알람확인' variant='icon' size='icon' className='relative'>
            <BellIcon hasNotification={notificationCount > 0} />
          </Button>
        </div>
      </div>
    </header>
  );
}
