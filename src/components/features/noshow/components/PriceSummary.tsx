import React from 'react';
import { Label } from '@/components/ui/label';
import { useWatch } from 'react-hook-form';
import { UseNoShowFormResult } from '@/types/noShowPanelType';
import { roundToNext10Minutes } from '@/lib/dateParse';

interface PriceSummaryProps {
  formResult: UseNoShowFormResult;
}

export default function PriceSummary({ formResult }: PriceSummaryProps) {
  const {
    originalTotal,
    discountTotal,
    form: { control },
  } = formResult;
  const visitTime = useWatch({ control, name: 'visitTime' });

  const calculatedVisitAt = React.useMemo(() => {
    const now = new Date();
    const originVisitAt = new Date(now.getTime() + (visitTime || 0) * 60 * 1000);
    const visitAt = roundToNext10Minutes(originVisitAt);
    return visitAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, [visitTime]);

  return (
    <div className='flex flex-col gap-10 justify-center item-center border-t px-20 border-line-foreground pt-20 w-full'>
      <div className='grid grid-cols-4 gap-[8px] w-full'>
        <Label className='col-span-2 title1'>판매금액</Label>
        <Label className='text-right body3 flex-none text-secondary line-through'>
          {originalTotal.toLocaleString()}원
        </Label>
        <Label className='text-right body7 flex-none'>{discountTotal.toLocaleString()}원</Label>
        <Label className='col-span-3 title1'>방문시간</Label>
        <Label className='text-right title1 flex-none'>{calculatedVisitAt}</Label>
      </div>
    </div>
  );
}
