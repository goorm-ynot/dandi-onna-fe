// src/components/icons/IconBase.tsx
import React from 'react';
import clsx from 'clsx';
import { IconProps } from '@/types/icon';

interface IconBaseProps extends IconProps {
  children: React.ReactNode;
  viewBox?: string;
}

export default function IconBase({
  children,
  size = 20,
  color = 'currentColor',
  className,
  onClick,
  viewBox = '0 0 24 24',
}: IconBaseProps) {
  const wrapperSize = size + 6; // 최소 3px씩 여유 공간 제공

  return (
    <div
      className={clsx(
        'relative inline-flex items-center justify-center overflow-visible',
        onClick && 'cursor-pointer',
        className
      )}
      style={{ width: wrapperSize, height: wrapperSize }} // 여유 공간 있는 wrapper
      onClick={onClick}>
      <svg
        width={size}
        height={size}
        viewBox={viewBox}
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        stroke={color}
        className='w-full h-full'>
        {children}
      </svg>
    </div>
  );
}
