"use client";

import DashBoardLayout from "@/components/layout/DashboardLayout";
import {
  BasePolicySection,
  ExtraPolicyPicker,
  ExtraPolicySection,
  PageHeader,
} from "@/components/features/mypage/preset/PresetSections";
import { useState } from "react";


/**
 * TODO:
 * UI 제작
 * 기능 구현 1차
 * - 추가 정책 설정 버튼 클릭 시 아래에 새로운 section 생성
 * - section 생성 시, 시간대 설정 부분 추가해야 함
 * 기능 구현 
 *   - name 값 설정
 *   - 값 유효성 검사
 *   - 값 저장 (API 연동)
 * 
 */

type ExtraPolicyType = "PEAK" | "CLOSE";

interface ExtraPolicySectionState {
  id: string;
  type: ExtraPolicyType;
  slotIds: string[];
}

function PresetPage() {
  const [extraPolicies, setExtraPolicies] = useState<ExtraPolicySectionState[]>([]);
  const [policyCounter, setPolicyCounter] = useState(0);
  const [slotCounter, setSlotCounter] = useState(0);

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

  const getPolicyTitle = (type: ExtraPolicyType) => (type === "PEAK" ? "피크타임 노쇼 정책" : "마감 정책");
  const hiddenTypes = Array.from(new Set(extraPolicies.map((policy) => policy.type)));

  return (
    <DashBoardLayout>
      <div className="max-w-[1400px] w-full h-full flex flex-col gap-40 pt-40 pb-20">
        <PageHeader />
        <BasePolicySection />

        {extraPolicies.map((policy) => (
          <ExtraPolicySection
            key={policy.id}
            title={getPolicyTitle(policy.type)}
            slotIds={policy.slotIds}
            // onAddSlot={() => addSlot(policy.id)}
          />
        ))}

        <ExtraPolicyPicker onAdd={addPolicy} hiddenTypes={hiddenTypes} />
      </div>
    </DashBoardLayout>
  );
}

export default PresetPage;