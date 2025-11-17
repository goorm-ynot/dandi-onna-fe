import React from 'react';
import { Label } from '@/components/ui/label';
import { useWatch, useFormContext } from 'react-hook-form';
import { UseNoShowFormResult, UseNoShowMenuFormResult } from '@/types/noShowPanelType';
import { formatTimeString, roundToNext10Minutes } from '@/lib/dateParse';

interface PriceSummaryProps {
  formResult: UseNoShowFormResult | UseNoShowMenuFormResult;
}

export default function PriceSummary({ formResult }: PriceSummaryProps) {
  const { originalTotal, discountTotal } = formResult;

  // ✅ 생성 폼인지 체크
  const isCreateForm = 'fields' in formResult;

  // ✅ visitTime 가져오기 (생성: 계산된 Date, 수정: ISO 문자열)
  // const visitTime = 'visitTime' in formResult ? formResult.visitTime : undefined;
  const visitTime = formResult.visitTime;

  const calculatedVisitAt = React.useMemo(() => {
    if (!visitTime) return formatTimeString(new Date());

    // ✅ visitTime이 Date 객체 또는 ISO 문자열
    const visitDate = typeof visitTime === 'string' ? new Date(visitTime) : (visitTime as Date);
    return formatTimeString(visitDate);
  }, [visitTime]);

  return (
    <div className='flex flex-col gap-10 justify-center item-center border-t px-20 border-line-foreground pt-20 w-full'>
      <div className='flex flex-col gap-[8px] w-full'>
        {/* 판매금액 행 */}
        <div className='flex items-center justify-between gap-2 w-full'>
          <Label className='title1 flex-shrink-0'>판매금액</Label>
          <div className='flex items-center gap-2 flex-shrink-0'>
            <Label className='text-right body3 text-secondary line-through whitespace-nowrap'>
              {originalTotal.toLocaleString()}원
            </Label>
            <Label className='text-right body7 whitespace-nowrap'>{discountTotal.toLocaleString()}원</Label>
          </div>
        </div>
        {/* 방문시간 행 */}
        <div className='flex items-center justify-between gap-2 w-full'>
          <Label className='title1 flex-shrink-0'>방문시간</Label>
          <Label className='text-right title1 whitespace-nowrap'>{calculatedVisitAt}</Label>
        </div>
      </div>
    </div>
  );
}
