import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleAlert } from 'lucide-react';
import { UseNoShowFormResult } from '@/types/noShowPanelType';

interface DiscountSelectorProps {
  formResult: UseNoShowFormResult;
  mode: 'create' | 'edit';
}

export default function DiscountSelector({ formResult, mode }: DiscountSelectorProps) {
  const {
    form: { register, setValue },
    errors,
  } = formResult;
  const discountOptions = ['30', '40', '50'];
  const [selectedDiscount, setSelectedDiscount] = React.useState('');
  const [customDiscount, setCustomDiscount] = React.useState('');

  return (
    <>
      <Label className='title5 px-20'>할인율과 방문시간을 등록해 주세요.</Label>

      <div className='flex flex-col gap-1 px-20'>
        {mode === 'create' ? (
          <div className='flex flex-row justify-between items-center w-full gap-3'>
            {discountOptions.map((opt) => (
              <Button
                type='button'
                key={opt}
                variant={selectedDiscount === opt ? 'secondary' : 'outline'}
                onClick={() => {
                  setSelectedDiscount(opt);
                  setCustomDiscount('');
                  setValue('discount', Number(opt));
                }}
                size='custom'
                className='w-auto px-5 py-2.5'>
                {opt}%
              </Button>
            ))}

            <div className='flex items-center gap-2'>
              <Input
                type='number'
                placeholder='0'
                value={customDiscount}
                {...register('discount', { valueAsNumber: true })}
                onChange={(e) => {
                  setCustomDiscount(e.target.value);
                  setSelectedDiscount('custom');
                  setValue('discount', Number(e.target.value));
                }}
                onFocus={() => setSelectedDiscount('custom')}
                className={`w-[82px] text-center rounded-[6px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                  selectedDiscount === 'custom' ? 'border-primary ring-1 ring-primary' : 'border-muted-foreground/40'
                }`}
              />
            </div>
          </div>
        ) : (
          <Input
            type='number'
            placeholder='할인율 입력'
            {...register('discount', { valueAsNumber: true })}
            className='w-full text-center'
          />
        )}

        <Label className='caption3 flex gap-1 justify-end items-center'>
          <CircleAlert size={18} /> 최대 90%까지 입력할 수 있어요
        </Label>
        {errors.discount && <p className='caption3 text-error text-right'>{errors.discount.message}</p>}
      </div>
    </>
  );
}
