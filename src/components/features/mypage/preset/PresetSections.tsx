"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionCard, SectionCardContent, SectionCardHeader } from "@/components/ui/section-card";
import clsx from "clsx";
import { Clock, Info, PlusIcon } from "lucide-react";
import { useState } from "react";

type FieldTitleProps = {
  title: string;
  description: string;
};

type TimePeriod = "AM" | "PM";

type TimeValue = {
  period: TimePeriod;
  hour: string;
  minute: string;
};

const PERIODS: { value: TimePeriod; label: string }[] = [
  { value: "AM", label: "오전" },
  { value: "PM", label: "오후" },
];

const HOURS = Array.from({ length: 12 }, (_, index) => String(index + 1).padStart(2, "0"));
const MINUTES = ["00", "10", "20", "30", "40", "50"];

const TIME_OPTIONS: TimeValue[] = PERIODS.flatMap((period) =>
  HOURS.flatMap((hour) => MINUTES.map((minute) => ({ period: period.value, hour, minute })))
);

export function PageHeader() {
  return (
    <div className="flex flex-col gap-20">
      <div className="title7 font-foreground-normal">노쇼 프리셋</div>
      <div className="body3 text-foreground-secondary">시스템이 자동으로 적용할 노쇼 판매 규칙을 설정합니다.</div>
    </div>
  );
}

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
};

function PolicySection({
  title,
  badgeLabel,
  badgeClassName,
  description,
  children,
  cardClassName,
  showSaveButton = true,
  badgeIcon,
}: PolicySectionProps) {
  return (
    <SectionCard className={`overflow-visible shadow-4 w-[1000px] ${cardClassName ?? ""}`.trim()}>
      <SectionCardHeader className="p-30">
        <div className="flex flex-col gap-6">
          <div className="flex flex-row items-center gap-6">
            <Label className="body9 text-foreground-normal">{title}</Label>
            {badgeLabel && (<div className={`flex flex-row items-center gap-2 rounded-lg px-8 py-2 ${badgeClassName}`}>
              {badgeIcon}
              <Label className="body2">{badgeLabel}</Label>
            </div>)}
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
          <Button type="button" className="w-[160px] px-12 py-10">
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
};

function CommonPolicyFields({ showNameField, showTimeSlots, slotIds = [] }: CommonPolicyFieldsProps) {
  return (
    <>
      {showNameField && (
        <>
          <FieldTitle title="정책 이름" description="구분할 수 있는 이름을 입력하세요." />
          <Input placeholder="예: 평일 점심" className="w-[280px] py-10 px-14 bg-white rounded-md" />
        </>
      )}

      <FieldTitle title="할인율" description="새 손님에게 제공할 할인율입니다." />
      <div className="flex flex-row gap-6">
        <Input
          type="number"
          placeholder="30~90"
          min={30}
          max={90}
          className="w-[140px] py-10 px-14 text-center bg-white rounded-md"
        />
        <Label className="body3 text-foreground-normal self-center">%</Label>
      </div>

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
          className="w-[55px] py-10 text-center bg-white rounded-md"
        />
        <Label className="body3 text-foreground-normal self-center">시간</Label>
        <Input
          type="number"
          placeholder="00"
          min={0}
          max={59}
          className="w-[55px] py-10 text-center bg-white rounded-md"
        />
        <Label className="body3 text-foreground-normal self-center">분 후 방문 가능</Label>
      </div>

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
          className="w-[140px] py-10 px-14 text-center bg-white rounded-md"
        />
        <Label className="body3 text-foreground-normal self-center">분</Label>
      </div>

      {showTimeSlots && (
        <>
          <FieldTitle title="시간대 설정" description="해당 정책을 적용할 시간을 입력하세요." />
          <div className="flex flex-col gap-10">
            {slotIds.map((slotId, index) => (
              <div key={slotId} className="flex flex-row items-center gap-10">
                <TimeSlotRow index={index} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
}

function TimeInput({ defaultValue, ariaLabel }: { defaultValue: TimeValue; ariaLabel: string }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<TimeValue>(defaultValue);

  const displayText = `${value.period === "AM" ? "오전" : "오후"} ${value.hour} : ${value.minute}`;

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
            {/* 오전 / 오후 선택 */}
            <div className="flex flex-col gap-6">
                {PERIODS.map((period) => (
                    <Button 
                        key={period.value}
                        type="button" 
                        size='xl'
                        variant={value.period === period.value ? "page" : "pagelink"}
                        onClick={() => setValue((prev) => ({ ...prev, period: period.value }))} 
                        className={`text-left body3 ${value.period === period.value ? "text-foreground-primary font-medium" : "text-foreground-secondary"}`}>
                        {period.label}
                    </Button>  
                ))}
            </div>
            {/* 시간 선택 */}
            <div className="flex flex-col gap-6 ">
                {HOURS.map((hour) => (
                    <Button 
                        key={hour}
                        type="button"
                        size='xl'
                        variant={value.hour === hour ? "page" : "pagelink"}
                        onClick={() => setValue((prev) => ({ ...prev, hour }))}
                        className="body3 p-10">
                        {hour}
                        </Button>
                ))}
            </div>
            {/* 분 선택 */}
            <div className="flex flex-col gap-6">
                {MINUTES.map((minute) => (
                    <Button 
                        key={minute}
                        type="button"
                        size='xl'
                        variant={value.minute === minute ? "page" : "pagelink"}
                        onClick={() => setValue((prev) => ({ ...prev, minute }))}
                        className="body3 p-10">
                        {minute}
                    </Button>
                ))}
            </div>
        </div>
      )}
    </div>
  );
}

function TimeSlotRow({ index }: { index: number }) {
  return (
    <div className="flex flex-row items-center gap-10" data-slot-index={index}>
      <TimeInput
        ariaLabel="시작 시간"
        defaultValue={{ period: "AM", hour: "11", minute: "30" }}
      />
      <Label className="body3 text-foreground-normal self-center">~</Label>
      <TimeInput
        ariaLabel="종료 시간"
        defaultValue={{ period: "PM", hour: "01", minute: "30" }}
      />
    </div>
  );
}

export function BasePolicySection() {
  return (
    <PolicySection
      title="기본 노쇼 정책"
      badgeLabel="필수"
      badgeClassName="bg-background-quaternary text-foreground-primary"
      badgeIcon={<Info className="w-[14px] h-[14px] text-foreground-primary" />}
      description="모든 노쇼 처리에 적용되는 기본 설정입니다."
    >
      <CommonPolicyFields />
    </PolicySection>
  );
}


/**
 * 추가 정책 섹션 컴포넌트
 * - 피크타임 정책 / 마감 정책
 */
export function ExtraPolicySection({
  title,
  slotIds,
}: {
  title: string;
  slotIds: string[];
}) {
  return (
    <PolicySection
      title={title}
    //   badgeLabel="선택"
    //   badgeClassName="bg-background-secondary-subtle text-foreground-secondary"
      description="특정 시간대에만 적용할 추가 정책입니다."
    >
      <CommonPolicyFields showNameField showTimeSlots slotIds={slotIds} />
    </PolicySection>
  );
}


/**
 * 추가 정책 선택 컴포넌트
 * - 피크타임 정책 / 마감 정책 추가 버튼
 * - 이미 추가된 정책은 버튼 비활성화
 * - onAdd 콜백 함수 호출
 */
export function ExtraPolicyPicker({
  onAdd,
  hiddenTypes = [],
}: {
  onAdd: (type: "PEAK" | "CLOSE") => void;
  hiddenTypes?: Array<"PEAK" | "CLOSE">;
}) {
  const showPeak = !hiddenTypes.includes("PEAK");
  const showClose = !hiddenTypes.includes("CLOSE");

  return (
    <SectionCard className="overflow-hidden w-[1000px] bg-gray-lighter p-24 border border-border-normal">
      <div className="flex flex-col gap-6 justify-center items-center">
        <Label className="body9 text-foreground-normal">추가 정책 설정 (선택사항)</Label>
        <Label className="body1 text-foreground-secondary w-[340px] text-center whitespace-pre-line">
          특정 시간대에 다른 정책을 적용하고 싶은 경우에만 추가하세요 기본 정책만으로도 시스템을 운영할 수 있습니다
        </Label>
      </div>
      {(showPeak || showClose) && (
        <div className="flex flex-row gap-12 justify-center pt-24">
          {showPeak && (
            <Button
              type="button"
              variant="outline"
              className="flex flex-row gap-8 justify-center items-center w-[160px]"
              onClick={() => onAdd("PEAK")}
            >
              <PlusIcon className="w-24 h-24 text-foreground-normal" />
              <Label className="body3 text-foreground-normal">피크타임 정책</Label>
            </Button>
          )}
          {showClose && (
            <Button
              type="button"
              variant="outline"
              className="flex flex-row gap-8 justify-center items-center w-[160px]"
              onClick={() => onAdd("CLOSE")}
            >
              <PlusIcon className="w-24 h-24 text-foreground-normal" />
              <Label className="body3 text-foreground-normal">마감 정책</Label>
            </Button>
          )}
        </div>
      )}
    </SectionCard>
  );
}
