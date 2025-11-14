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
        <Label className='title5 pt-[36px] px-20'>메뉴의 개수를 입력해 주세요.</Label>
        {children}
      </div>

      {/* 하단 고정 영역 */}
      {bottomChildren && <div className='mt-auto'>{bottomChildren}</div>}
    </form>
  );
}
