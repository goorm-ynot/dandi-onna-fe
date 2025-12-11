'use client';

import React, { useRef, useState } from 'react';
import { BellIcon } from '../icons';
import { MenuItem } from '@/constants/sellerNavConstant';
import { usePathname } from 'next/navigation';
import DropDownNav from './DropDownNav';
import { useDropdownPosition } from '@/hooks/useDropdownPosition';
import DropdownPortal from './DropDownPortal';
import { useNavigation } from '@/hooks/useNavigation';

interface HeaderProps {
  navList: MenuItem[];
  hasNotification: boolean;
  userName: string;
}

export default function Header({ navList, hasNotification, userName }: HeaderProps) {
  const pathname = usePathname();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const { pos, updatePosition } = useDropdownPosition();
  const { goSellerHomeParams } = useNavigation();
  const openMenu = (id: string) => {
    const target = menuRefs.current[id];
    if (target) updatePosition(target);
    setOpenMenuId(id);
  };

  const closeMenu = () => setOpenMenuId(null);

  return (
    <header className='relative w-full bg-background-normal-foreground shadow-sm border-b border-gray-300'>
      {/* ✅ 한 줄 정렬 + 중앙정렬 */}
      <div className='max-w-[1280px] mx-auto flex items-center justify-between py-[30px] px-40 '>
        {/* 왼쪽: 로고 + 네비게이션 */}
        <div className='flex items-center gap-12'>
          {/* 로고 */}
          <div className='logo text-2xl cursor-pointer' onClick={() => goSellerHomeParams}>
            단디온나
          </div>

          {/* 네비게이션 */}
          <nav className='self-stretch inline-flex justify-center items-center'>
            {navList.map((menu) => {
              const isActive = pathname === menu.path || menu.children?.some((child) => child.path && pathname === child.path);
              const isOpen = openMenuId === menu.id;

              return (
                <button
                  key={menu.id}
                  ref={(el) => {
                    menuRefs.current[menu.id] = el;
                  }}
                  onMouseEnter={() => openMenu(menu.id)}
                  onClick={() => openMenu(menu.id)}
                  className={`
          transition px-[50px] text-lg
          ${isActive ? 'text-neutral-900 font-semibold' : 'text-neutral-600 font-medium'}
          hover:text-neutral-900
        `}>
                  {menu.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* 오른쪽: 사용자 정보 + 알림 */}
        <div className='flex items-center gap-4'>
          <div className='text-neutral-900 text-lg'>
            <span className='font-semibold'>{userName}</span> <span>사장님 오늘도 번창하세요!</span>
          </div>
          <div className='relative w-[20px] h-[24px]'>
            <BellIcon hasNotification={hasNotification} />
          </div>
        </div>
      </div>

      {/* ✅ Portal로 드롭다운 렌더링 */}
      {openMenuId && (
        <DropdownPortal>
          <DropDownNav menu={navList.find((m) => m.id === openMenuId)!} x={pos.x} y={pos.y} close={closeMenu} />
        </DropdownPortal>
      )}
    </header>
  );
}
