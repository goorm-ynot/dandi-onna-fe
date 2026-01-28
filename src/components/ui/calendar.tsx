"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { addMonths } from "date-fns"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

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

  const leftLabel = formatMonth(month)
  const rightLabel = formatMonth(addMonths(month, 1))

  // day_button이 h-9 w-9면 36px * 7 = 252px
  const monthWidth = 252

  return (
    <div className={cn("inline-block rounded-sm border bg-white p-3", className)}>
      {/* ✅ 네비(1개) + 월 라벨을 각 달 영역 위쪽 좌/우 */}
      <div className="mb-2 flex flex-row justify-between items-center">
        <div className="flex flex-row items-center ">
          <button
            type="button"
            aria-label="Previous"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-60 hover:opacity-100"
            )}
            onClick={() => setMonth((m) => addMonths(m, pagedNavigation ? -numberOfMonths : -1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div style={{ width: monthWidth }} className="text-left text-sm font-medium">
            {leftLabel}
          </div>
        </div>

        <div className="flex flex-row items-center">
          <div style={{ width: monthWidth }} className="text-right text-sm font-medium">
            {rightLabel}
          </div>
          <button
            type="button"
            aria-label="Next"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-7 w-7 bg-transparent p-0 opacity-60 hover:opacity-100"
            )}
            onClick={() => setMonth((m) => addMonths(m, pagedNavigation ? numberOfMonths : 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <DayPicker
        {...props}
        month={month}
        onMonthChange={setMonth}
        numberOfMonths={numberOfMonths}
        pagedNavigation={pagedNavigation}
        showOutsideDays={showOutsideDays}
        classNames={{
          /* 레이아웃 */
          months: "flex gap-4",
          month: `w-[${monthWidth}px] space-y-2`,
          month_grid: "w-full",

          /* ✅ 내부 캡션/네비 숨김 (v9) */
          month_caption: "hidden",
          nav: "hidden",

          /* 요일/주(그리드) */
          weekdays: "grid grid-cols-7",
          weekday: "text-muted-foreground text-center text-[0.8rem] font-normal",
          weeks: "space-y-1",
          week: "grid grid-cols-7 gap-0", // ✅ gap=0으로 이어지는 바가 안 끊김

          // ✅ 셀(day wrapper): 기본은 라운드 없이 시작
          day: cn(
            "h-9 w-9 p-0 flex items-center justify-center rounded-none",

            // bar(연결되는 영역) 배경은 셀에 깔기
            "range_middle:bg-system-mauve-light",
            "range_start:bg-system-mauve-light range_end:bg-system-mauve-light",

            // ✅ start/end만 라운드
            "range_start:rounded-l-md",
            "range_middle:rounded-none",
            "range_end:rounded-r-md"
          ),

          // ✅ 버튼: 기본 라운드 제거 (중간에서 동그라미 생기는 거 방지)
          day_button: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal border-0 rounded-none aria-selected:opacity-100",
            "focus-visible:outline-none focus-visible:ring-0"
          ),

          /* range start/end는 버튼을 진하게 */
          range_start:
            "range_start [&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:rounded-l-md [&>button]:hover:bg-primary",
          range_end:
            "range_end [&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:rounded-r-md [&>button]:hover:bg-primary",
          
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
    </div>
  )
}
