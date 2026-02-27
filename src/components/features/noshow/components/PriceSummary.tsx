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
  // console.log('PriceSummary 렌더링됨', formResult);
  // ✅ 생성 폼인지 체크
  const isCreateForm = 'fields' in formResult;

  // ✅ visitTime 가져오기 (생성: 계산된 Date, 수정: ISO 문자열)
  // const visitTime = 'visitTime' in formResult ? formResult.visitTime : undefined;
  const visitTime = formResult.visitTime;

  // const calculatedVisitAt = React.useMemo(() => {
  //   if (!visitTime) return formatTimeString(new Date());

  //   // ✅ visitTime이 Date 객체 또는 ISO 문자열
  //   const visitDate = typeof visitTime === 'string' ? new Date(visitTime) : (visitTime as Date);
  //   return formatTimeString(visitDate);
  // }, [visitTime]);

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
          <Label className='text-right title1 whitespace-nowrap'>{visitTime.getMinutes()}분 후</Label>
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
