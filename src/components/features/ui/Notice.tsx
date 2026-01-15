import React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const noticeVariants = cva(
  'w-full rounded-md py-20 px-16 gap-6 flex items-start',
  {
    variants: {
      variant: {
        default: 'bg-background-normal-foreground',
        info: 'bg-system-mauve-light border border-border',
        warning: 'bg-system-yellow-light border border-system-yellow-strong',
        error: 'bg-system-pink-light border border-system-pink-strong',
        success: 'bg-system-green-light border border-system-green-strong',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface NoticeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof noticeVariants> {
  /**
   * 제목 (선택)
   */
  title?: string;
  
  /**
   * 설명 텍스트
   */
  description?: string | React.ReactNode;
  
  /**
   * 아이콘 (선택)
   */
  icon?: React.ReactNode;
  
  /**
   * children을 사용하면 자유롭게 커스텀 가능
   */
  children?: React.ReactNode;
}

export default function Notice({
  variant = 'default',
  title,
  description,
  icon,
  children,
  className,
  ...props
}: NoticeProps) {
  // children이 있으면 완전히 커스텀 렌더링
  if (children) {
    return (
      <div className={cn(noticeVariants({ variant }), className)} {...props}>
        {children}
      </div>
    );
  }

  // props 기반 기본 렌더링
  return (
    <div className={cn(noticeVariants({ variant }), className)} {...props}>
      {icon && <div className='flex-shrink-0'>{icon}</div>}
      
      <div className='flex-1 flex flex-col gap-14'>
        {title && (
          <p className='title3 text-foreground-normal'>
            {title}
          </p>
        )}
        
        {description && (
          <div className='body1 text-foreground-secondary whitespace-pre-line'>
            {description}
          </div>
        )}
      </div>
    </div>
  );
}

// 개별 서브 컴포넌트 export (더 세밀한 제어 가능)
export function NoticeIcon({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex-shrink-0', className)}>{children}</div>;
}

export function NoticeContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('flex-1 flex flex-col gap-6', className)}>{children}</div>;
}

export function NoticeTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('title3 text-foreground-normal', className)}>{children}</p>;
}

export function NoticeDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('body1 text-foreground-secondary whitespace-pre-line', className)}>{children}</div>;
}
