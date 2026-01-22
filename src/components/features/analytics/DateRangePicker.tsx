/**
 * DateRangePicker 컴포넌트
 * - 시작일 ~ 종료일 범위 선택
 */

'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

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
  const [isStartOpen, setIsStartOpen] = React.useState(false);
  const [isEndOpen, setIsEndOpen] = React.useState(false);

  return (
    <div className="flex items-center gap-8">
      {/* 시작일 */}
      <Popover open={isStartOpen} onOpenChange={setIsStartOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-[200px] justify-start text-left font-normal',
              !startDate && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-8 h-16 w-16" />
            {startDate ? format(startDate, 'yyyy.MM.dd', { locale: ko }) : '시작일'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={(date: Date | undefined) => {
              onStartDateChange?.(date);
              setIsStartOpen(false);
            }}
            initialFocus
            locale={ko}
          />
        </PopoverContent>
      </Popover>

      <span className="text-gray-500">~</span>

      {/* 종료일 */}
      <Popover open={isEndOpen} onOpenChange={setIsEndOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-[200px] justify-start text-left font-normal',
              !endDate && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className="mr-8 h-16 w-16" />
            {endDate ? format(endDate, 'yyyy.MM.dd', { locale: ko }) : '종료일'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={endDate}
            onSelect={(date: Date | undefined) => {
              onEndDateChange?.(date);
              setIsEndOpen(false);
            }}
            initialFocus
            locale={ko}
            disabled={(date: Date) => startDate ? date < startDate : false}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
