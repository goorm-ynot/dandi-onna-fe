'use client';

import Link from 'next/link';
import { MenuItem } from '@/constants/sellerNavConstant';
import clsx from 'clsx';
import { DynamicIcon } from '@/lib/iconMapper';

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
  return (
    <div
      style={{ position: 'absolute', top: y + 15, left: x + 10, transform: 'translateX(-50%)' }}
      onMouseEnter={() => {}}
      onMouseLeave={close}
      className={clsx(
        'min-w-[160px] px-3 py-3 bg-white shadow-lg rounded-md border border-gray-200 z-[9999]',
        menu.id === 'sales-management' && 'bg-zinc-300'
      )}>
      {menu.children?.map((item) => {
        const URL = item.path ? BASE_URL + item.path : '#';
        const hasIcon = !!item.icon;
        return (
          <Link
            key={item.id}
            href={URL}
            className={clsx(
              'flex items-center gap-2 px-4 py-2 text-sm hover:font-semibold whitespace-nowrap',
              hasIcon && 'text-gray-500'
            )}
            onClick={close}>
            {/* ✅ 아이콘이 존재할 경우 함께 표시 */}
            {hasIcon && (
              <span className='flex-shrink-0 text-gray-500'>
                <DynamicIcon name={String(item.icon)} size={16} className='text-black pr-1' />
              </span>
            )}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
