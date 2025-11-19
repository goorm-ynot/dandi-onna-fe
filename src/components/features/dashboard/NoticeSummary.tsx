'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ChevronRight } from 'lucide-react';
import React from 'react';

interface Notice {
  title: string;
}

export default function NoticeSummary() {
  return (
    <div
      className='w-full pt-10 pb-20 px-4
             max-[400px]:px-16 max-[400px]:py-10
             flex flex-row gap-4 justify-between max-[400px]:items-center max-[400px]:gap-0'>
      {/* 왼쪽: 공지사항 + 제목 */}
      <div className='flex flex-row items-center gap-16 max-[400px]:flex-row max-[400px]:items-center max-[400px]:gap-0'>
        <Label className='title7 leading-8 max-[400px]:pr-10 max-[400px]:title2'>공지사항</Label>
        <Label className='body3 max-[400px]:caption4 max-[400px]:flex-1'>누적 노쇼 고객 관리 방법 안내</Label>
      </div>

      {/* 오른쪽: 더보기 버튼 - 반응형! */}
      <Button
        variant='link'
        className="self-start p-0
                  min-[400px]:self-center 
                  text-neutral-600 font-normal font-['Pretendard']">
        {/* 모바일: 아이콘만 */}
        <ChevronRight className='h-5 w-5 min-[400px]:hidden' />

        {/* PC: 텍스트 */}
        <span className='hidden min-[400px]:inline text-base underline leading-4'>더보기</span>
      </Button>
    </div>
  );
}
