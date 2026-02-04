/**
 * DateRangePicker 컴포넌트
 * - 시작일 ~ 종료일 범위 선택
 */

'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { endOfToday, format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { DateRange } from 'react-day-picker';

interface DateRangePickerProps {
  startDate?: Date;
  endDate?: Date;
  onStartDateChange?: (date: Date | undefined) => void;
  onEndDateChange?: (date: Date | undefined) => void;
}

export const DateRangePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangePickerProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = React.useState(false);
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: startDate,
    to: endDate,
  });

  const handleStartDateChange = React.useCallback((date: Date | undefined) => {
    onStartDateChange?.(date);
  }, [onStartDateChange]);

  const handleEndDateChange = React.useCallback((date: Date | undefined) => {
    onEndDateChange?.(date);
  }, [onEndDateChange]);

  React.useEffect(() => {
    if(range?.from && range?.to){
      // 두 날짜의 차이가 6개월(183일) 이내인지 확인
      const diffTime = Math.abs(range.to.getTime() - range.from.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 183) {
        // 6개월 초과 시 알람 후 리턴
        alert('최대 6개월까지 선택할 수 있습니다.');
        setRange({ from: undefined, to: undefined });
        handleStartDateChange(undefined);
        handleEndDateChange(undefined);
        return;
      }

      handleStartDateChange(range.from);
      handleEndDateChange(range.to);
      
      // popover 닫기
      setIsCalendarOpen(false);
    }    
  },[range, handleStartDateChange, handleEndDateChange]);

  return (
    <div className="flex items-center gap-8">
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-[504px] justify-between text-left font-normal px-14',
              !startDate && 'text-muted-foreground'
            )}
          >
            {startDate && endDate ? `${format(startDate, 'yyyy.MM.dd', { locale: ko })} ~ ${format(endDate, 'yyyy.MM.dd', { locale: ko })}` : '시작일과 종료일을 선택하세요(최대 6개월)'}
            <CalendarIcon className=" h-16 w-16" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            // 필요하면 최소/최대 제한도 가능
            disabled={{ after: endOfToday() }} // 오늘까지 선택가능
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
