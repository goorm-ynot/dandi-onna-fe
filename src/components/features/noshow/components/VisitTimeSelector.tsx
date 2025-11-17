import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleAlert } from 'lucide-react';
import { UseNoShowFormResult, UseNoShowMenuFormResult } from '@/types/noShowPanelType';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

interface VisitTimeSelectorProps {
  formResult: UseNoShowFormResult | UseNoShowMenuFormResult;
  mode: 'create' | 'edit';
}
// TODO: 시간 선택 시, 10분단위 혹은 30분단위로 올림처리 관련
export default function VisitTimeSelector({ formResult, mode }: VisitTimeSelectorProps) {
  const { register, setValue, watch } = useFormContext();
  const { errors } = formResult;
  const timeOptions = ['10', '20', '30'];
  const [selectedTime, setSelectedTime] = React.useState('');
  const [customTime, setCustomTime] = React.useState('');

  return (
    <div className='flex flex-col gap-1 px-20'>
      <div className='flex flex-row justify-between items-center w-full gap-3'>
        {mode === 'create' &&
          timeOptions.map((opt) => (
            <Button
              type='button'
              key={opt}
              variant={selectedTime === opt ? 'secondary' : 'outline'}
              onClick={() => {
                setSelectedTime(opt);
                setCustomTime('');
                setValue('duringTime', Number(opt));
              }}
              size='custom'
              className='w-auto px-3.5 py-2.5'>
              {opt}분 후
            </Button>
          ))}

        <div className={clsx(mode === 'create' ? 'flex items-center gap-2' : 'w-full')}>
          <Input
            type='number'
            placeholder='0분 후'
            value={customTime}
            {...register('duringTime', { valueAsNumber: true })}
            onChange={(e) => {
              const value = e.target.value;
              setCustomTime(value);
              setSelectedTime('custom');

              // 빈 값 처리: 수정 모드는 undefined, 생성 모드는 0
              if (value === '') {
                setValue('duringTime', mode === 'edit' ? undefined : 0);
              } else {
                const numValue = Number(value);
                setValue('duringTime', isNaN(numValue) ? (mode === 'edit' ? undefined : 0) : numValue);
              }
            }}
            onFocus={() => setSelectedTime('custom')}
            className={`text-center rounded-[6px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              selectedTime === 'custom' ? 'border-primary ring-1 ring-primary' : 'border-muted-foreground/40'
            } ${mode === 'create' ? 'w-[82px]' : 'w-full'}`}
          />
        </div>
      </div>

      <Label className='caption3 flex gap-1 justify-end items-center'>
        <CircleAlert size={18} /> 최대 300분까지 입력할 수 있어요
      </Label>
      {errors.duringTime && <p className='caption3 text-error text-right'>{errors.duringTime.message}</p>}
    </div>
  );
}
