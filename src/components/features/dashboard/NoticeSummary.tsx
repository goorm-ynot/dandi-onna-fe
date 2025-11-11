'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import React from 'react';

interface Notice {
  title: string;
}

export default function NoticeSummary() {
  return (
    <div className='w-full px-10 pt-5 pb-10 flex justify-between items-center'>
      <div className='flex items-center'>
        <Label className='justify-center text-neutral-900 text-3xl font-semibold leading-8 pr-10'>공지사항</Label>
        <Label className="flex-1 max-w-[1024px] justify-center text-neutral-900 text-base font-normal font-['Pretendard'] leading-4">
          누적 노쇼 고객 관리 방법 안내
        </Label>
      </div>
      <Button
        variant='link'
        className="text-right justify-center text-neutral-600 text-base font-normal font-['Pretendard'] underline leading-4">
        더보기
      </Button>
    </div>
  );
}
