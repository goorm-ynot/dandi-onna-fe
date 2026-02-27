import React from 'react';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className = '', ...props }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded bg-muted-foreground/20 ${className}`}
      {...props}
    />
  );
}

export function SkeletonLine({ className = '' }: { className?: string }) {
  return <Skeleton className={`h-4 w-full ${className}`} />;
}

export function SkeletonText() {
  return (
    <div className='flex flex-col gap-2'>
      <SkeletonLine />
      <SkeletonLine className='w-5/6' />
    </div>
  );
}
