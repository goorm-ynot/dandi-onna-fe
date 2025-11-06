// src/components/icons/BellIcon.tsx
import React, { forwardRef } from 'react';
import { IconProps } from '@/types/icon';

interface BellIconProps extends IconProps {
  filled?: boolean; // 채워진 버전
  hasNotification?: boolean; // 알림 표시
}

const BellIcon = forwardRef<SVGSVGElement, BellIconProps>(
  (
    {
      size = 20,
      color = 'currentColor',
      strokeWidth = 2,
      className = '',
      filled = false,
      hasNotification = false,
      onClick,
    },
    ref
  ) => {
    return (
      <div className='relative inline-block overflow-visible '>
        <svg
          ref={ref}
          width={size}
          height={size + 4}
          viewBox='0 0 20 21'
          fill={filled ? color : 'none'}
          xmlns='http://www.w3.org/2000/svg'
          className={`${className} ${onClick ? 'cursor-pointer' : ''}`}
          onClick={onClick}>
          <path
            d='M16 7.00053C16 5.40909 15.3679 3.88283 14.2426 2.75751C13.1174 1.6322 11.5913 1 10 1C8.4087 1 6.88258 1.6322 5.75736 2.75751C4.63214 3.88283 4 5.40909 4 7.00053C4 14.0011 1 16.0013 1 16.0013H19C19 16.0013 16 14.0011 16 7.00053Z'
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
          <path
            d='M11.7295 19C11.5537 19.3031 11.3014 19.5547 10.9978 19.7296C10.6941 19.9045 10.3499 19.9965 9.99953 19.9965C9.64915 19.9965 9.30492 19.9045 9.0013 19.7296C8.69769 19.5547 8.44534 19.3031 8.26953 19'
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>

        {/* 알림 점 */}
        {hasNotification && (
          <div className='absolute -top-1.5 -right-1.5  w-3 h-3 bg-gray-500 rounded-full border-2 border-white' />
        )}
      </div>
    );
  }
);

BellIcon.displayName = 'BellIcon';

export default BellIcon;
