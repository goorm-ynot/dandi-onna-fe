import React from 'react';
import { Label } from '@/components/ui/label';
import { useWatch, useFormContext } from 'react-hook-form';
import { UseNoShowFormResult, UseNoShowMenuFormResult } from '@/types/noShowPanelType';
import { useNoShowStore } from '@/store/useNoShowStore';
import { formatTimeString, roundToNext10Minutes } from '@/lib/dateParse';

interface PriceSummaryProps {
  formResult: UseNoShowFormResult | UseNoShowMenuFormResult;
}

export default function PriceSummary({ formResult }: PriceSummaryProps) {
  const { originalTotal, discountTotal } = formResult;
  const presetData = useNoShowStore((state) => state.presetData);
  
  // ✅ PresetListSection과 동일한 값 사용
  // visitAvailableMinutes: 프리셋에서 정의된 고정 방문 가능 시간
  const visitAvailableMinutes = presetData?.visitAvailableMinutes ?? 0;

  return (
    <div className='flex flex-col gap-12 justify-center item-center px-20 w-full'>
      <div className='flex flex-col w-full bg-background-normal-foreground rounded-sm px-12'>
        {/* 판매금액 행 */}
        <div className='flex items-center justify-between w-full py-12'>
          <Label className='title1 flex-shrink-0'>최종 판매금액</Label>
          <div className='flex items-center gap-6 flex-shrink-0'>
            <Label className='text-right body3 text-foreground-disable line-through whitespace-nowrap'>
              {originalTotal.toLocaleString()}원
            </Label>
            <Label className='text-right body5 text-foreground-normal whitespace-nowrap'>{discountTotal.toLocaleString()}원</Label>
          </div>
        </div>
        {/* 방문시간 행 */}
        <div className='flex items-center justify-between w-full py-12 border-t border-border-secondary'>
          <Label className='title1 flex-shrink-0'>방문 가능시간</Label>
          <Label className='text-right title1 whitespace-nowrap'>{visitAvailableMinutes}분 후</Label>
        </div>
        {'saleDelayMinutes' in formResult && formResult.saleDelayMinutes !== undefined && formResult.saleDelayMinutes !== null && (
          <div className='flex items-center justify-between w-full py-12 border-t border-border-secondary'>
            <Label className='title1 flex-shrink-0'>노쇼 판매 대기시간</Label>
            <Label className='text-right title1 whitespace-nowrap'>
              {`${formResult.saleDelayMinutes}분 후`}
            </Label>
          </div>
        )}
      </div>
    </div>
  );
}
