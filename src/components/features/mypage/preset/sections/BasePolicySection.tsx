"use client";

import { Info } from "lucide-react";
import { usePresetForm } from "@/hooks/seller/preset/usePresetForm";
import { CommonPolicyFields, PolicySection } from "./PolicyShared";
import { PresetData} from "@/hooks/seller/preset/usePresetQueries";
import { useMemo } from "react";

export interface BasePolicySectionProps {
  presetData?: PresetData; // API에서 받아온 프리셋 데이터를 전달받는 props
  onSaveRequest?: (submitAction: () => void) => void;
}

export function BasePolicySection({ presetData, onSaveRequest }: BasePolicySectionProps) {
  const initialValues = useMemo(
    () => ({
      name: "기본 노쇼 정책",
      discountPercent: presetData?.discountPercent ?? 30,
      visitAvailableHour: 0,
      visitAvailableMinute: presetData?.visitAvailableMinutes ?? 30,
      waitingMinutes: presetData?.saleDelayMinutes ?? 15,
      timeSlots: [],
    }),
    [presetData?.discountPercent, presetData?.visitAvailableMinutes, presetData?.saleDelayMinutes]
  );

  const { values, errors, handleFieldChange, handleTimeSlotChange, handleSubmit } = usePresetForm({
    initialValues,
    sectionLabel: "기본 노쇼 정책",
    requireTimeSlots: false,
    presetData,
  });

  return (
    <PolicySection
      title="기본 노쇼 정책"
      badgeLabel="필수"
      badgeClassName="bg-background-quaternary text-foreground-primary"
      badgeIcon={<Info className="w-[14px] h-[14px] text-foreground-primary" />}
      description="모든 노쇼 처리에 적용되는 기본 설정입니다."
      onSave={() => onSaveRequest?.(handleSubmit)}
    >
      <CommonPolicyFields
        values={values}
        errors={errors}
        onChange={handleFieldChange}
        onTimeSlotChange={handleTimeSlotChange}
      />
    </PolicySection>
  );
}
