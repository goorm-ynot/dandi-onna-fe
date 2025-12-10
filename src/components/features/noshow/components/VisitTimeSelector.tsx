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

  // ✅ 현재 폼의 방문 시간 값 감시
  const currentDuringTime = watch('duringTime');

  // ✅ 초기값 설정: 폼의 디폴트 값을 기반으로 버튼 선택 상태 결정
  const getInitialState = () => {
    if (currentDuringTime !== undefined && currentDuringTime !== null) {
      const timeStr = String(currentDuringTime);
      if (timeOptions.includes(timeStr)) {
        return { selected: timeStr, custom: '' };
      } else if (currentDuringTime > 0) {
        return { selected: 'custom', custom: timeStr };
      }
    }
    return { selected: '', custom: '' };
  };

  const [selectedTime, setSelectedTime] = React.useState(() => getInitialState().selected);
  const [customTime, setCustomTime] = React.useState(() => getInitialState().custom);

  // ✅ 폼 값이 변경되면 버튼 선택 상태 동기화 (초기 로드시만)
  // React.useEffect를 제거하여 직접입력 시 버튼이 자동 선택되지 않도록 함

  // ✅ Debounce를 위한 타이머 ref
  const debounceTimer = React.useRef<NodeJS.Timeout | null>(null);

  return (
    <div className='flex flex-col gap-1 px-20'>
      <div className='flex flex-row justify-between items-center w-full gap-3'>
        {mode === 'create' &&
          timeOptions.map((opt) => (
            <Button
              type='button'
              key={opt}
              variant={selectedTime === opt ? 'outlineHug' : 'outline'}
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

              // 이전 타이머 취소
              if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
              }

              // 500ms 후에 폼 값 업데이트
              debounceTimer.current = setTimeout(() => {
                if (value === '') {
                  setValue('duringTime', mode === 'edit' ? undefined : 0);
                } else {
                  const numValue = Number(value);
                  setValue('duringTime', isNaN(numValue) ? (mode === 'edit' ? undefined : 0) : numValue);
                }
              }, 500);
            }}
            onFocus={() => setSelectedTime('custom')}
            className={`text-center rounded-[6px] bg-background-normal [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              selectedTime === 'custom' ? 'border-primary ring-1 ring-primary' : 'border-muted-foreground/40'
            } ${mode === 'create' ? 'w-[82px]' : 'w-full'}`}
          />
        </div>
      </div>

      <Label className='caption3 flex gap-1 justify-end items-center text-error'>
        <CircleAlert size={18} /> 최대 300분까지 입력할 수 있어요
      </Label>
      {errors.duringTime && <p className='caption3 text-error text-right'>{errors.duringTime.message}</p>}
    </div>
  );
}
