"use client";

import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

export type TimePeriod = "AM" | "PM";

export type TimeValue = {
  period: TimePeriod;
  hour: number;
  minute: number;
};

export type TimeSlot = {
  start: TimeValue;
  end: TimeValue;
};

export type PolicyFormValues = {
  name: string;
  discountRate: number;
  visitAvailableHour: number;
  visitAvailableMinute: number;
  waitingMinutes: number;
  timeSlots: TimeSlot[];
};

export type PolicyFormErrors = Partial<Record<keyof PolicyFormValues, string>>;

export const DEFAULT_START_TIME: TimeValue = { period: "AM", hour: 11, minute: 30 };
export const DEFAULT_END_TIME: TimeValue = { period: "PM", hour: 1, minute: 30 };

export const createDefaultTimeSlot = (): TimeSlot => ({
  start: { ...DEFAULT_START_TIME },
  end: { ...DEFAULT_END_TIME },
});

const timeValueSchema = z.object({
  period: z.enum(["AM", "PM"]),
  hour: z.number().min(1).max(12),
  minute: z.number().min(0).max(59),
});

const timeSlotSchema = z.object({
  start: timeValueSchema,
  end: timeValueSchema,
});

const createPolicyFormSchema = (requireTimeSlots: boolean) =>
  z.object({
    name: z.string().trim().min(1, "정책 이름을 입력하세요."),
    discountRate: z.number().min(30, "할인율을 입력하세요.(30 이상)").max(90, "할인율은 최대 90%입니다."),
    visitAvailableHour: z.number().min(1, "방문 가능 시간을 입력하세요.").max(5,"방문 가능 시간은 최대 5시간입니다."),
    visitAvailableMinute: z.number().min(0, "방문 가능 분을 입력하세요.").max(59, "방문 가능 분은 최대 59분입니다."),
    waitingMinutes: z.number().min(1, "판매 대기 시간을 입력하세요.").max(300, "판매 대기 시간은 최대 300분입니다."),
    timeSlots: requireTimeSlots ? z.array(timeSlotSchema).min(1, "시간대를 1개 이상 설정하세요.") : z.array(timeSlotSchema),
  });

type UsePresetFormOptions = {
  initialValues: PolicyFormValues;
  sectionLabel: string;
  requireTimeSlots: boolean;
  slotIds?: string[];
};

export function usePresetForm({ initialValues, sectionLabel, requireTimeSlots, slotIds }: UsePresetFormOptions) {
  const [values, setValues] = useState<PolicyFormValues>(initialValues);
  const [errors, setErrors] = useState<PolicyFormErrors>({});
  const schema = useMemo(() => createPolicyFormSchema(requireTimeSlots), [requireTimeSlots]);

  const mapZodFieldErrors = (fieldErrors: Record<string, string[] | undefined>): PolicyFormErrors => ({
    name: fieldErrors.name?.[0],
    discountRate: fieldErrors.discountRate?.[0],
    visitAvailableHour: fieldErrors.visitAvailableHour?.[0],
    visitAvailableMinute: fieldErrors.visitAvailableMinute?.[0],
    waitingMinutes: fieldErrors.waitingMinutes?.[0],
    timeSlots: fieldErrors.timeSlots?.[0],
  });

  useEffect(() => {
    if (!slotIds) return;

    setValues((prev) => {
      const nextSlots = slotIds.map((_, index) => prev.timeSlots[index] ?? createDefaultTimeSlot());
      return {
        ...prev,
        timeSlots: nextSlots,
      };
    });
  }, [slotIds]);

  const handleFieldChange = (field: keyof Omit<PolicyFormValues, "timeSlots">, value: string | number) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleTimeSlotChange = (index: number, kind: "start" | "end", value: TimeValue) => {
    setValues((prev) => ({
      ...prev,
      timeSlots: prev.timeSlots.map((slot, slotIndex) => (slotIndex === index ? { ...slot, [kind]: value } : slot)),
    }));
    setErrors((prev) => ({ ...prev, timeSlots: undefined }));
  };

  const handleSubmit = () => {
    const parsed = schema.safeParse(values);

    if (!parsed.success) {
      setErrors(mapZodFieldErrors(parsed.error.flatten().fieldErrors));
      console.error(`${sectionLabel} 유효성 검사 실패`, parsed.error.flatten());
      return;
    }

    setErrors({});

    console.log(`${sectionLabel} 저장 값`, parsed.data);
    
    // TODO: parsed data API 연동 전처리 후 저장 로직 구현
    const preprocessedData = dataPreprocessing(parsed.data);
    console.log(`${sectionLabel} 전처리된 데이터`, preprocessedData);
  };

  const dataPreprocessing = (data: PolicyFormValues) => {
    const visitAvailableMinutes = data.visitAvailableHour * 60 + data.visitAvailableMinute;
    if(visitAvailableMinutes > 300) {
      console.error("방문 가능 시간은 최대 5시간(300분)입니다.");
      alert("방문 가능 시간은 최대 5시간(300분)입니다.");
      return;
    }
    const discountPercent = data.discountRate;
    const saleDelayMinutes = data.waitingMinutes  ;

      if(discountPercent < 30 || discountPercent > 90) {
        console.error("할인율은 30% 이상 90% 이하로 입력하세요.");
      alert("할인율은 30% 이상 90% 이하로 입력하세요.");
      return;
    }
    if(saleDelayMinutes < 1 || saleDelayMinutes > 300) {
      console.error("판매 대기 시간은 1분 이상 300분 이하로 입력하세요.");
      alert("판매 대기 시간은 1분 이상 300분 이하로 입력하세요.");
      return;
    }
    let dataName = data.name.trim();
    if(dataName.length === 0) {
      console.error("정책 이름을 입력하세요.");
      alert("정책 이름을 입력하세요.");
      return;
    }
    if(dataName === "기본 노쇼 정책") dataName = "기본";

    return {
      name: dataName,
      discountPercent,
      visitAvailableMinutes,
      saleDelayMinutes,
    }
  }

  return {
    values,
    errors,
    handleFieldChange,
    handleTimeSlotChange,
    handleSubmit,
  };
}
