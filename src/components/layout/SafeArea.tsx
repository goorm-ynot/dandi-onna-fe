// 'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface SafeAreaProps {
  children: React.ReactNode;
  className?: string;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}

/**
 * Safe Area 컴포넌트
 * Spec: 16px, Actual: 12px (iOS notch 및 Android navigation bar 대응)
 * 
 * @param top - 상단 safe area 적용 (기본: true)
 * @param bottom - 하단 safe area 적용 (기본: true)
 * @param left - 좌측 safe area 적용 (기본: true)
 * @param right - 우측 safe area 적용 (기본: true)
 */
export default function SafeArea({
  children,
  className,
  top = true,
  bottom = true,
  left = true,
  right = true,
}: SafeAreaProps) {
  return (
    <div
      className={cn(
        'w-full h-full',
        top && 'pt-[max(12px,env(safe-area-inset-top))]',
        bottom && 'pb-[max(12px,env(safe-area-inset-bottom))]',
        left && 'pl-[max(12px,env(safe-area-inset-left))]',
        right && 'pr-[max(12px,env(safe-area-inset-right))]',
        className
      )}>
      {children}
    </div>
  );
}

/**
 * 개별 방향 Safe Area 컴포넌트들
 */
export function SafeAreaTop({ children, className }: { children: React.ReactNode; className?: string }) {
  return <SafeArea top bottom={false} left={false} right={false} className={className}>{children}</SafeArea>;
}

export function SafeAreaBottom({ children, className }: { children: React.ReactNode; className?: string }) {
  return <SafeArea top={false} bottom left={false} right={false} className={className}>{children}</SafeArea>;
}

export function SafeAreaHorizontal({ children, className }: { children: React.ReactNode; className?: string }) {
  return <SafeArea top={false} bottom={false} left right className={className}>{children}</SafeArea>;
}

export function SafeAreaVertical({ children, className }: { children: React.ReactNode; className?: string }) {
  return <SafeArea top bottom left={false} right={false} className={className}>{children}</SafeArea>;
}
