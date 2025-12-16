'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter, usePathname } from 'next/navigation';
import { Home, Search, Menu, Heart, User } from 'lucide-react';

export const navItems = [
  {
    id: 'category',
    label: '카테고리',
    icon: Menu,
    path: '#',
  },
  {
    id: 'search',
    label: '검색',
    icon: Search,
    path: '#',
  },
  {
    id: 'home',
    label: '홈',
    icon: Home,
    path: '/customer',
  },
  {
    id: 'wishlist',
    label: '찜한 가게',
    icon: Heart,
    path: '#',
  },
  {
    id: 'my',
    label: '마이',
    icon: User,
    path: '#',
  },
];

export default function ButtomNav() {
  const router = useRouter();
  const pathname = usePathname();

  // 특정 페이지에서만 ButtomNav 표시
  // /customer/store로 시작하는 경로에서는 숨김
  const showBottomNav =
    pathname.startsWith('/customer') &&
    !pathname.startsWith('/customer/store') &&
    !pathname.startsWith('/customer/payment');

  const handleNavClick = (path: string) => {
    router.push(path);
  };

  const getIsActive = (itemPath: string) => {
    // 홈의 경우: /customer만 정확히 일치 (서브 경로 제외)
    if (itemPath === '/customer') {
      return pathname === '/customer';
    }
    // 다른 탭의 경우: 정확히 일치 또는 해당 경로로 시작
    return pathname === itemPath || pathname.startsWith(itemPath + '/');
  };

  if (!showBottomNav) {
    return null;
  }

  return (
    <nav className='fixed bottom-0 left-0 right-0 z-50 bg-background-normal w-full border-t border-border-secondary px-4 py-2.5'>
      <div className='flex items-start justify-between w-full'>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = getIsActive(item.path);

          return (
            <Button
              key={item.id}
              variant='link'
              className={`flex flex-col gap-2 items-center p-0 h-auto rounded-none hover:bg-transparent [&_svg]:!w-[24px] [&_svg]:!h-[24px] ${
                isActive ? 'text-foreground-primary' : 'text-foreground-normal'
              }`}
              onClick={() => handleNavClick(item.path)}>
              <Icon strokeWidth={1.5} />
              <span className='caption3 text-[10px] leading-[14px] whitespace-nowrap'>{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}
