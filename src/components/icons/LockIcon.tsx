import React, { forwardRef } from 'react';

interface LockIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const LockIcon = forwardRef<SVGSVGElement, LockIconProps>(
  ({ size = 20, color = '#525252', className, ...props }, ref) => {
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox='0 0 16 16'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className={className}
        {...props}>
        <path
          d='M12.6667 7.33331H3.33333C2.59695 7.33331 2 7.93027 2 8.66665V13.3333C2 14.0697 2.59695 14.6666 3.33333 14.6666H12.6667C13.403 14.6666 14 14.0697 14 13.3333V8.66665C14 7.93027 13.403 7.33331 12.6667 7.33331Z'
          fill={color}
          stroke={color}
          strokeWidth='1.25'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M4.66669 7.33331V4.66665C4.66669 3.78259 5.01788 2.93475 5.643 2.30962C6.26812 1.6845 7.11597 1.33331 8.00002 1.33331C8.88408 1.33331 9.73192 1.6845 10.357 2.30962C10.9822 2.93475 11.3334 3.78259 11.3334 4.66665V7.33331'
          stroke={color}
          strokeWidth='1.25'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    );
  }
);

LockIcon.displayName = 'LockIcon';

export default LockIcon;
