'use client';

import Link from 'next/link';
import { MenuItem } from '@/constants/sellerNavConstant';
import clsx from 'clsx';

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
      className='min-w-[160px] px-3 py-3 bg-white shadow-lg rounded-md border border-gray-200 z-[9999]'>
      {menu.children?.map((item) => {
        const URL = item.path ? BASE_URL + item.path : '#';
        return (
          <Link
            key={item.id}
            href={URL}
            className={clsx('block px-4 py-2 text-sm hover:font-semibold whitespace-nowrap')}
            onClick={close}>
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}
