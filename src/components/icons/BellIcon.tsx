// src/components/icons/BellIcon.tsx
import React, { forwardRef } from 'react';
import { IconProps } from '@/types/icon';

interface BellIconProps extends IconProps {
  hasNotification?: boolean;
  notificationColor?: string;
}

const BellIcon = forwardRef<SVGSVGElement, BellIconProps>(
  (
    {
      size = 24,
      color = '#262626',
      strokeWidth = 2,
      className = '',
      hasNotification = false,
      notificationColor = '#8749FE',
      onClick,
    },
    ref
  ) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} ${onClick ? 'cursor-pointer' : ''}`}
        onClick={onClick}
      >
        {/* 종 */}
        <path
          d="M23.1111 12.4932C23.1111 10.5943 22.3619 8.77312 21.0283 7.43039C19.6947 6.08767 17.886 5.33333 16 5.33333C14.114 5.33333 12.3053 6.08767 10.9717 7.43039C9.63807 8.77312 8.88887 10.5943 8.88887 12.4932C8.88887 20.8463 5.33331 23.2329 5.33331 23.2329H26.6666C26.6666 23.2329 23.1111 20.8463 23.1111 12.4932Z"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* 종 아래 */}
        <path
          d="M18.05 26.8109C17.8416 27.1725 17.5425 27.4727 17.1827 27.6814C16.8228 27.8901 16.4149 27.9999 15.9996 27.9999C15.5843 27.9999 15.1763 27.8901 14.8165 27.6814C14.4567 27.4727 14.1576 27.1725 13.9492 26.8109"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 🔴 알림 점 (오른쪽 상단, 원본 SVG 좌표 그대로) */}
        {hasNotification && (
          <circle
            cx="29"
            cy="3"
            r="3"
            fill={notificationColor}
          />
        )}
      </svg>
    );
  }
);

BellIcon.displayName = 'BellIcon';

export default BellIcon;
