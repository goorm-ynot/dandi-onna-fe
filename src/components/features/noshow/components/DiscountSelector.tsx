import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CircleAlert } from 'lucide-react';
import { UseNoShowFormResult, UseNoShowMenuFormResult } from '@/types/noShowPanelType';
import { useFormContext } from 'react-hook-form';

interface DiscountSelectorProps {
  formResult: UseNoShowFormResult | UseNoShowMenuFormResult;
  mode: 'create' | 'edit';
}

export default function DiscountSelector({ formResult, mode }: DiscountSelectorProps) {
  const { register, setValue, watch } = useFormContext();
  const { errors } = formResult;
  const discountOptions = ['30', '40', '50'];

  // ✅ 생성/수정에 따라 필드명이 다름
  const discountFieldName = mode === 'create' ? 'discount' : 'discountPercent';

  // ✅ 현재 폼의 할인율 값 감시
  const currentDiscount = watch(discountFieldName);

  // ✅ 초기값 설정: 폼의 디폴트 값을 기반으로 버튼 선택 상태 결정
  const getInitialState = () => {
    if (currentDiscount !== undefined && currentDiscount !== null) {
      const discountStr = String(currentDiscount);
      if (discountOptions.includes(discountStr)) {
        return { selected: discountStr, custom: '' };
      } else if (currentDiscount > 0) {
        return { selected: 'custom', custom: discountStr };
      }
    }
    return { selected: '', custom: '' };
  };

  const [selectedDiscount, setSelectedDiscount] = React.useState(() => getInitialState().selected);
  const [customDiscount, setCustomDiscount] = React.useState(() => getInitialState().custom);

  // ✅ 폼 값이 변경되면 버튼 선택 상태 동기화 (초기 로드시만)
  // React.useEffect를 제거하여 직접입력 시 버튼이 자동 선택되지 않도록 함

  // ✅ Debounce를 위한 타이머 ref
  const debounceTimer = React.useRef<NodeJS.Timeout | null>(null);

  return (
    <>
      <Label className='title5 px-20'>할인율과 방문시간을 등록해 주세요.</Label>

      <div className='flex flex-col gap-1 px-20'>
        <div className='flex flex-row justify-between items-center w-full gap-3'>
          {discountOptions.map((opt) => (
            <Button
              type='button'
              key={opt}
              variant={selectedDiscount === opt ? 'secondary' : 'outline'}
              onClick={() => {
                setSelectedDiscount(opt);
                setCustomDiscount('');
                setValue(discountFieldName, Number(opt));
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
              {...register(discountFieldName, { valueAsNumber: true })}
              onChange={(e) => {
                const value = e.target.value;
                setCustomDiscount(value);
                setSelectedDiscount('custom');

                // 이전 타이머 취소
                if (debounceTimer.current) {
                  clearTimeout(debounceTimer.current);
                }

                // 500ms 후에 폼 값 업데이트
                debounceTimer.current = setTimeout(() => {
                  setValue(discountFieldName, Number(value));
                }, 500);
              }}
              onFocus={() => setSelectedDiscount('custom')}
              className={`w-[82px] text-center rounded-[6px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                selectedDiscount === 'custom' ? 'border-primary ring-1 ring-primary' : 'border-muted-foreground/40'
              }`}
            />
          </div>
        </div>

        <Label className='caption3 flex gap-1 justify-end items-center'>
          <CircleAlert size={18} /> 최대 90%까지 입력할 수 있어요
        </Label>
        {errors[discountFieldName as keyof typeof errors] && (
          <p className='caption3 text-error text-right'>
            {errors[discountFieldName as keyof typeof errors]?.message as string}
          </p>
        )}
      </div>
    </>
  );
}
