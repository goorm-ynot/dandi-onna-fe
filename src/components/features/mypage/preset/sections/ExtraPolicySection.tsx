"use client";

import { createDefaultTimeSlot, usePresetForm } from "@/hooks/seller/preset/usePresetForm";
import { CommonPolicyFields, PolicySection } from "./PolicyShared";
import { useMemo } from "react";

export function ExtraPolicySection({
  title,
  slotIds,
  onSaveRequest,
}: {
  title: string;
  slotIds: string[];
  onSaveRequest?: (submitAction: () => void) => void;
}) {
  const initialValues = useMemo(
    () => ({
      name: "",
      discountPercent: 30,
      visitAvailableHour: 0,
      visitAvailableMinute: 30,
      waitingMinutes: 15,
      timeSlots: slotIds.map(() => createDefaultTimeSlot()),
    }),
    [slotIds]
  );

  const { values, errors, handleFieldChange, handleTimeSlotChange, handleSubmit } = usePresetForm({
    initialValues,
    sectionLabel: title,
    requireTimeSlots: true,
    slotIds,
  });

  return (
    <PolicySection
      title={title}
      description="특정 시간대에만 적용할 추가 정책입니다."
      onSave={() => onSaveRequest?.(handleSubmit)}
    >
      <CommonPolicyFields
        showNameField
        showTimeSlots
        slotIds={slotIds}
        values={values}
        errors={errors}
        onChange={handleFieldChange}
        onTimeSlotChange={handleTimeSlotChange}
      />
    </PolicySection>
  );
}
