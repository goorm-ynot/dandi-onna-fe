import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleAlert } from 'lucide-react';
import { UseNoShowFormResult } from '@/types/noShowPanelType';

interface VisitTimeSelectorProps {
  formResult: UseNoShowFormResult;
  mode: 'create' | 'edit';
}
// TODO: 시간 선택 시, 10분단위 혹은 30분단위로 올림처리 관련
export default function VisitTimeSelector({ formResult, mode }: VisitTimeSelectorProps) {
  const {
    form: { register, setValue },
    errors,
  } = formResult;
  const timeOptions = ['10', '20', '30'];
  const [selectedTime, setSelectedTime] = React.useState('');
  const [customTime, setCustomTime] = React.useState('');

  return (
    <div className='flex flex-col gap-1 px-20'>
      {mode === 'create' ? (
        <div className='flex flex-row justify-between items-center w-full gap-3'>
          {timeOptions.map((opt) => (
            <Button
              type='button'
              key={opt}
              variant={selectedTime === opt ? 'secondary' : 'outline'}
              onClick={() => {
                setSelectedTime(opt);
                setCustomTime('');
                setValue('visitTime', Number(opt));
              }}
              size='custom'
              className='w-auto px-3.5 py-2.5'>
              {opt}분 후
            </Button>
          ))}

          <div className='flex items-center gap-2'>
            <Input
              type='number'
              placeholder='0분 후'
              value={customTime}
              {...register('visitTime', { valueAsNumber: true })}
              onChange={(e) => {
                setCustomTime(e.target.value);
                setSelectedTime('custom');
                setValue('visitTime', Number(e.target.value));
              }}
              onFocus={() => setSelectedTime('custom')}
              className={`w-[82px] text-center rounded-[6px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                selectedTime === 'custom' ? 'border-primary ring-1 ring-primary' : 'border-muted-foreground/40'
              }`}
            />
          </div>
        </div>
      ) : (
        <Input
          type='number'
          placeholder='0분 후'
          value={customTime}
          {...register('visitTime', { valueAsNumber: true })}
          onChange={(e) => {
            setCustomTime(e.target.value);
            setSelectedTime('custom');
            setValue('visitTime', Number(e.target.value));
          }}
          onFocus={() => setSelectedTime('custom')}
          className='w-full text-center rounded-[6px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
        />
      )}

      <Label className='caption3 flex gap-1 justify-end items-center'>
        <CircleAlert size={18} /> 최대 300분까지 입력할 수 있어요
      </Label>
      {errors.visitTime && <p className='caption3 text-error text-right'>{errors.visitTime.message}</p>}
    </div>
  );
}
