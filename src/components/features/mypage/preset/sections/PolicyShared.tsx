"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionCard, SectionCardContent, SectionCardHeader } from "@/components/ui/section-card";
import {
  createDefaultTimeSlot,
  PolicyFormErrors,
  PolicyFormValues,
  TimePeriod,
  TimeSlot,
  TimeValue,
} from "@/hooks/seller/preset/usePresetForm";
import { Clock } from "lucide-react";
import { useState } from "react";

type FieldTitleProps = {
  title: string;
  description: string;
};

const PERIODS: { value: TimePeriod; label: string }[] = [
  { value: "AM", label: "오전" },
  { value: "PM", label: "오후" },
];

const HOURS = Array.from({ length: 12 }, (_, index) => index + 1);
const MINUTES = [0, 10, 20, 30, 40, 50];

function FieldTitle({ title, description }: FieldTitleProps) {
  return (
    <div className="flex flex-col gap-6">
      <Label className="body5 text-foreground-normal">{title}</Label>
      <Label className="body1 text-foreground-secondary">{description}</Label>
    </div>
  );
}

type PolicySectionProps = {
  title: string;
  badgeLabel?: string;
  badgeClassName?: string;
  description: string;
  children: React.ReactNode;
  cardClassName?: string;
  showSaveButton?: boolean;
  badgeIcon?: React.ReactNode;
  onSave?: () => void;
};

export function PolicySection({
  title,
  badgeLabel,
  badgeClassName,
  description,
  children,
  cardClassName,
  showSaveButton = true,
  badgeIcon,
  onSave,
}: PolicySectionProps) {
  return (
    <SectionCard className={`overflow-visible shadow-4 w-[1000px] ${cardClassName ?? ""}`.trim()}>
      <SectionCardHeader className="p-30">
        <div className="flex flex-col gap-6">
          <div className="flex flex-row items-center gap-6">
            <Label className="body9 text-foreground-normal">{title}</Label>
            {badgeLabel && (
              <div className={`flex flex-row items-center gap-2 rounded-lg px-8 py-2 ${badgeClassName}`}>
                {badgeIcon}
                <Label className="body2">{badgeLabel}</Label>
              </div>
            )}
          </div>
          <Label className="body1 text-foreground-secondary">{description}</Label>
        </div>
      </SectionCardHeader>
      <SectionCardHeader className="px-30 py-24">
        <div className="flex flex-col justify-start gap-24">{children}</div>
      </SectionCardHeader>
      {showSaveButton && (
        <SectionCardContent className="px-30 py-24 w-full flex flex-row justify-between items-center">
          <Label className="body1 text-foreground-secondary">설정한 정책에 따라 추후 시스템이 자동으로 적용합니다.</Label>
          <Button type="button" className="w-[160px] px-12 py-10" onClick={onSave}>
            저장
          </Button>
        </SectionCardContent>
      )}
    </SectionCard>
  );
}

type CommonPolicyFieldsProps = {
  showNameField?: boolean;
  showTimeSlots?: boolean;
  slotIds?: string[];
  values: PolicyFormValues;
  errors: PolicyFormErrors;
  onChange: (field: keyof Omit<PolicyFormValues, "timeSlots">, value: string) => void;
  onTimeSlotChange: (index: number, kind: "start" | "end", value: TimeValue) => void;
};

export function CommonPolicyFields({
  showNameField,
  showTimeSlots,
  slotIds = [],
  values,
  errors,
  onChange,
  onTimeSlotChange,
}: CommonPolicyFieldsProps) {
  return (
    <>
      {showNameField && (
        <>
          <FieldTitle title="정책 이름" description="구분할 수 있는 이름을 입력하세요." />
          <Input
            placeholder="예: 평일 점심"
            value={values.name}
            onChange={(event) => onChange("name", event.target.value)}
            className="w-[280px] py-10 px-14 bg-white rounded-md"
          />
          {errors.name && <Label className="body1 text-error">{errors.name}</Label>}
        </>
      )}

      <FieldTitle title="할인율" description="새 손님에게 제공할 할인율입니다." />
      <div className="flex flex-row gap-6">
        <Input
          type="number"
          placeholder="30~90"
          min={30}
          max={90}
          value={values.discountPercent}
          onChange={(event) => onChange("discountPercent", event.target.value)}
          className="w-[140px] py-10 px-14 text-center bg-white rounded-md"
        />
        <Label className="body3 text-foreground-normal self-center">%</Label>
      </div>
      {errors.discountPercent && <Label className="body1 text-error">{errors.discountPercent}</Label>}

      <FieldTitle
        title="방문 가능시간"
        description="노쇼 예약 손님이 도착할 때까지 사장님께 필요한 준비 시간을 선택해 주세요."
      />
      <div className="flex flex-row gap-6">
        <Input
          type="number"
          placeholder="00"
          min={0}
          max={23}
          value={values.visitAvailableHour}
          onChange={(event) => onChange("visitAvailableHour", event.target.value)}
          className="w-[55px] py-10 text-center bg-white rounded-md"
        />
        <Label className="body3 text-foreground-normal self-center">시간</Label>
        <Input
          type="number"
          placeholder="00"
          min={0}
          max={59}
          value={values.visitAvailableMinute}
          onChange={(event) => onChange("visitAvailableMinute", event.target.value)}
          className="w-[55px] py-10 text-center bg-white rounded-md"
        />
        <Label className="body3 text-foreground-normal self-center">분 후 방문 가능</Label>
      </div>
      {errors.visitAvailableHour && <Label className="body1 text-error">{errors.visitAvailableHour}</Label>}
      {errors.visitAvailableMinute && (
        <Label className="body1 text-error">{errors.visitAvailableMinute}</Label>
      )}

      <FieldTitle
        title="판매 대기 시간"
        description="기존 예약자와 새 손님이 겹치지 않도록, 판매 시작 전 잠시 대기하는 시간입니다."
      />
      <div className="flex flex-row gap-6">
        <Input
          type="number"
          placeholder="10~300"
          min={0}
          max={300}
          value={values.waitingMinutes}
          onChange={(event) => onChange("waitingMinutes", event.target.value)}
          className="w-[140px] py-10 px-14 text-center bg-white rounded-md"
        />
        <Label className="body3 text-foreground-normal self-center">분</Label>
      </div>
      {errors.waitingMinutes && <Label className="body1 text-error">{errors.waitingMinutes}</Label>}

      {showTimeSlots && (
        <>
          <FieldTitle title="시간대 설정" description="해당 정책을 적용할 시간을 입력하세요." />
          <div className="flex flex-col gap-10">
            {slotIds.map((slotId, index) => (
              <div key={slotId} className="flex flex-row items-center gap-10">
                <TimeSlotRow
                  index={index}
                  value={values.timeSlots[index] ?? createDefaultTimeSlot()}
                  onChange={onTimeSlotChange}
                />
              </div>
            ))}
          </div>
          {errors.timeSlots && <Label className="body1 text-error">{errors.timeSlots}</Label>}
        </>
      )}
    </>
  );
}

function TimeInput({
  value,
  ariaLabel,
  onChange,
}: {
  value: TimeValue;
  ariaLabel: string;
  onChange: (value: TimeValue) => void;
}) {
  const [open, setOpen] = useState(false);

  const displayText = `${value.period === "AM" ? "오전" : "오후"} ${String(value.hour).padStart(2, "0")} : ${String(value.minute).padStart(2, "0")}`;

  return (
    <div className="relative">
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between gap-8 w-[220px] px-14 py-10 rounded-xl bg-white border border-border-normal text-foreground-normal"
      >
        <span className="body3">{displayText}</span>
        <Clock className="w-16 h-16 text-foreground-secondary" />
      </button>

      {open && (
        <div className="absolute left-0 top-[52px] z-[100] w-[160px] h-[278px] flex flex-row gap-6 shadow2 bg-white p-10 shadow-2 overflow-hidden overflow-y-auto">
          <div className="flex flex-col gap-6">
            {PERIODS.map((period) => (
              <Button
                key={period.value}
                type="button"
                size="xl"
                variant={value.period === period.value ? "page" : "pagelink"}
                onClick={() => onChange({ ...value, period: period.value })}
                className={`text-left body3 ${value.period === period.value ? "text-foreground-primary font-medium" : "text-foreground-secondary"}`}
              >
                {period.label}
              </Button>
            ))}
          </div>
          <div className="flex flex-col gap-6 ">
            {HOURS.map((hour) => (
              <Button
                key={hour}
                type="button"
                size="xl"
                variant={value.hour === hour ? "page" : "pagelink"}
                onClick={() => onChange({ ...value, hour })}
                className="body3 p-10"
              >
                {String(hour).padStart(2, "0")}
              </Button>
            ))}
          </div>
          <div className="flex flex-col gap-6">
            {MINUTES.map((minute) => (
              <Button
                key={minute}
                type="button"
                size="xl"
                variant={value.minute === minute ? "page" : "pagelink"}
                onClick={() => onChange({ ...value, minute })}
                className="body3 p-10"
              >
                {String(minute).padStart(2, "0")}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function TimeSlotRow({
  index,
  value,
  onChange,
}: {
  index: number;
  value: TimeSlot;
  onChange: (index: number, kind: "start" | "end", value: TimeValue) => void;
}) {
  return (
    <div className="flex flex-row items-center gap-10" data-slot-index={index}>
      <TimeInput ariaLabel="시작 시간" value={value.start} onChange={(nextValue) => onChange(index, "start", nextValue)} />
      <Label className="body3 text-foreground-normal self-center">~</Label>
      <TimeInput ariaLabel="종료 시간" value={value.end} onChange={(nextValue) => onChange(index, "end", nextValue)} />
    </div>
  );
}
