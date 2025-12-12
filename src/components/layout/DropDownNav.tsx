'use client';

import Link from 'next/link';
import { MenuItem } from '@/constants/sellerNavConstant';
import clsx from 'clsx';
import { DynamicIcon } from '@/lib/iconMapper';
import { usePathname } from 'next/navigation';

export default function DropDownNav({
  menu,
  x,
  y,
  close,
}: {
  menu: MenuItem;
  x: number;
  y: number;
  close: () => void;
}) {
  const BASE_URL = '/seller';
  const pathname = usePathname();
  
  return (
    <div
      style={{ position: 'absolute', top: y + 30, left: x + 10, transform: 'translateX(-50%)' }}
      onMouseEnter={() => {}}
      onMouseLeave={close}
      className={clsx(
        'min-w-[160px] px-[20px] py-[20px] shadow-lg rounded-sm z-[10000] flex flex-col gap-[10px]',
        menu.id === 'sales-management' ? 'bg-background-secondary-subtle' : 'bg-white' // sales-management 메뉴일 때 배경색 변경
      )}>
      {menu.children?.map((item) => {
        const URL = item.path ? BASE_URL + item.path : '';
        const hasIcon = !!item.icon;
        const isActive = item.path && pathname == BASE_URL + item.path;
        
        return (
          <Link
            key={item.id}
            href={URL}
            className={clsx(
              'flex items-center gap-2 px-4 whitespace-nowrap text-foreground-normal',
              hasIcon && 'text-foreground-normal-subtle ',
              isActive ? 'body5' : 'body3 hover:font-semibold'
            )}
            onClick={close}>
            {/* ✅ 아이콘이 존재할 경우 함께 표시 */}
            {hasIcon && (
              <span className='flex-shrink-0 '>
                <DynamicIcon name={String(item.icon)} size={16} className='text-foreground-normal-subtle pr-1' />
              </span>
            )}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
