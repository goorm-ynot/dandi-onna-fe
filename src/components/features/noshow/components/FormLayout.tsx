import React from 'react';
import { Label } from '@/components/ui/label';

interface FormLayoutProps {
  children: React.ReactNode;
  bottomChildren?: React.ReactNode;
  onSubmit: () => void;
}

export default function FormLayout({ children, bottomChildren, onSubmit }: FormLayoutProps) {
  return (
    <form onSubmit={onSubmit} className='flex flex-col justify-between min-h-[758px]'>
      <div className='flex flex-col gap-24'>
        {children}
      </div>

      {/* 하단 고정 영역 */}
      {bottomChildren && <div className='mt-auto flex flex-col gap-24'>{bottomChildren}</div>}
    </form>
  );
}
