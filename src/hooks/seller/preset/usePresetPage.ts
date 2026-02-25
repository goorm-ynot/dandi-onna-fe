"use client";

import { useMemo, useState } from "react";

export type ExtraPolicyType = "PEAK" | "CLOSE";

export interface ExtraPolicySectionState {
  id: string;
  type: ExtraPolicyType;
  slotIds: string[];
}

const POLICY_TITLE_BY_TYPE: Record<ExtraPolicyType, string> = {
  PEAK: "피크타임 노쇼 정책",
  CLOSE: "마감 정책",
};

export function usePresetPage() {
  const [extraPolicies, setExtraPolicies] = useState<ExtraPolicySectionState[]>([]);
  const [policyCounter, setPolicyCounter] = useState(0);
  const [slotCounter, setSlotCounter] = useState(0);
  const [isPresetSavedDialogOpen, setIsPresetSavedDialogOpen] = useState(false);

  const addPolicy = (type: ExtraPolicyType) => {
    if (extraPolicies.some((policy) => policy.type === type)) return;

    const nextPolicyId = policyCounter + 1;
    const nextSlotId = slotCounter + 1;

    setPolicyCounter(nextPolicyId);
    setSlotCounter(nextSlotId);

    setExtraPolicies((prev) => [
      ...prev,
      {
        id: `policy-${nextPolicyId}`,
        type,
        slotIds: [`slot-${nextSlotId}`],
      },
    ]);
  };

  const addSlot = (policyId: string) => {
    const nextSlotId = slotCounter + 1;
    setSlotCounter(nextSlotId);

    setExtraPolicies((prev) =>
      prev.map((policy) =>
        policy.id === policyId ? { ...policy, slotIds: [...policy.slotIds, `slot-${nextSlotId}`] } : policy
      )
    );
  };

  const getPolicyTitle = (type: ExtraPolicyType) => POLICY_TITLE_BY_TYPE[type];

  const hiddenTypes = useMemo(
    () => Array.from(new Set(extraPolicies.map((policy) => policy.type))),
    [extraPolicies]
  );

  const handlePresetConfirm = () => {
    setIsPresetSavedDialogOpen(true);
  }

  const handlePresetCancel = () => {
    setIsPresetSavedDialogOpen(false);
  }

  return {
    extraPolicies,
    hiddenTypes,
    addPolicy,
    addSlot,
    getPolicyTitle,
    isPresetSavedDialogOpen,
    setIsPresetSavedDialogOpen,
    handlePresetConfirm,
    handlePresetCancel,
  };
}