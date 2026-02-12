"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { addMonths } from "date-fns"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function formatMonth(d: Date) {
  // return new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(d)
  // ko-KR로 바꾸고 싶으면:
  return new Intl.DateTimeFormat("ko-KR", { year: "numeric", month: "long" }).format(d)
}

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  numberOfMonths = 2,
  pagedNavigation = true,
  ...props
}: CalendarProps) {
  const [month, setMonth] = React.useState<Date>((props as any).month ?? new Date())
  const monthItems = Array.from({ length: numberOfMonths }, (_, index) => addMonths(month, index))

  // day_button이 h-9 w-9이고 gap이 4px이면 36 * 7 + 4 * 6 = 276px
  const monthWidth = 276

  const weekdayLabels = ["일", "월", "화", "수", "목", "금", "토"]
  const formatWeekdayName = (date: Date) => weekdayLabels[date.getDay()]

  return (
    <div className={cn("inline-block rounded-lg bg-white p-20 w-fit", className)}>
      <div className="flex flex-row items-center justify-center gap-[6px]">
        <Button
          type="button"
          aria-label="Previous"
          variant="outline"
          size="calendar"
          onClick={() => setMonth((m) => addMonths(m, pagedNavigation ? -numberOfMonths : -1))}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex flex-row gap-[120px]">
          {monthItems.map((item, index) => (
            <div 
                key={index} 
                className="text-center body2 px-10 py-6">
              {formatMonth(item)}
            </div>
          ))}
        </div>

        <Button
          type="button"
          aria-label="Next"
          variant="outline"
          size="calendar"
          onClick={() => setMonth((m) => addMonths(m, pagedNavigation ? numberOfMonths : 1))}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-[6px] flex flex-row gap-[24px]">
        {monthItems.map((item, index) => (
          <DayPicker
            key={index}
            {...props}
            month={item}
            onMonthChange={setMonth}
            numberOfMonths={1}
            pagedNavigation={pagedNavigation}
            showOutsideDays={showOutsideDays}
            formatters={{
              ...(props as any).formatters,
              formatWeekdayName,
            }}
            classNames={{
              /* 레이아웃 */
              months: "flex",
              month: `space-y-[6px]`,
              month_grid: "w-full",

              /* ✅ 내부 캡션/네비 숨김 (v9) */
              month_caption: "hidden",
              nav: "hidden",

              /* 요일/주(그리드) */
              weekdays: "grid grid-cols-7",
              weekday: "text-gray-strong text-center body1 px-[10px] py-[6px]",
              weeks: "space-y-[6px]",
              week: "grid grid-cols-7 gap-1",

              // ✅ 셀(day wrapper): 기본은 라운드 없이 시작
              day: cn(
                "h-[28px] w-[28px] px-[10px] py-[6px] flex items-center justify-center rounded-none",

                // bar(연결되는 영역) 배경은 셀에 깔기
                "range_middle:bg-system-mauve-light",
                "range_start:bg-system-mauve-light range_end:bg-system-mauve-light",

                // ✅ start/end만 라운드
                "range_start:rounded-l-sm",
                "range_middle:rounded-none",
                "range_end:rounded-r-sm"
              ),

              // ✅ 버튼: 기본 라운드 제거 (중간에서 동그라미 생기는 거 방지)
              day_button: cn(
                buttonVariants({ variant: "ghost" }),
                "h-[28px] w-[28px] px-[10px] py-[6px] font-normal border-0 rounded-none aria-selected:opacity-100",
                "focus-visible:outline-none focus-visible:ring-0"
              ),

              /* range start/end는 버튼을 진하게 */
              range_start:
                "range_start [&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:rounded-l-sm [&>button]:hover:bg-primary",
              range_end:
                "range_end [&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:rounded-r-sm [&>button]:hover:bg-primary",

              /* ✅ middle은 버튼 배경을 투명으로 (셀 bg가 바 역할) */
              range_middle:
                "range_middle [&>button]:bg-system-mauve-light [&>button]:rounded-none [&>button]:hover:bg-transparent",

              today: "bg-accent text-accent-foreground",
              outside:
                "text-muted-foreground opacity-50 aria-selected:opacity-30",
              disabled: "text-muted-foreground opacity-50",
              hidden: "invisible",

              ...classNames,
            }}
          />
        ))}
      </div>
    </div>
  )
}
