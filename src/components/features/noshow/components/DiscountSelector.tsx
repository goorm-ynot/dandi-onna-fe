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
      <Label className='title5 text-foreground-normal px-20'>할인율과 방문시간을 등록해 주세요.</Label>

      <div className='flex flex-col gap-[4px] px-20'>
        <div className='flex flex-row justify-between items-center w-full gap-[2.5px]'>
          {discountOptions.map((opt) => (
            <Button
              type='button'
              key={opt}
              variant={selectedDiscount === opt ? 'outlineHug' : 'outline'}
              onClick={() => {
                setSelectedDiscount(opt);
                setCustomDiscount('');
                setValue(discountFieldName, Number(opt));
              }}
              size='custom'
              className='body3 w-auto px-5 py-2.5 text-foreground-normal'>
              {opt}%
            </Button>
          ))}

          <div className='flex items-center gap-2'>
            <div className='relative'>
              <Input
                type='number'
                placeholder='30~90'
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
                className={`pr-6 text-left rounded-[6px] bg-background-normal 
                  min-w-[82px] w-[85px]
                  [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                  selectedDiscount === 'custom' ? 'border-primary ring-1 ring-primary' : 'border-muted-foreground/40'
                }`}
              />
              <span className='absolute right-3 top-1/2 -translate-y-1/2 text-foreground-normal pointer-events-none'>
                %
              </span>
            </div>
          </div>
        </div>

        <Label className="caption3 flex gap-1 justify-end items-center text-error">
          <CircleAlert size={18} />
          {errors[discountFieldName]?.message
            ? errors[discountFieldName]?.message // ← 에러 있을 때 표시
            : '최대 90%까지 입력할 수 있어요'}     
        </Label>

      </div>
    </>
  );
}
