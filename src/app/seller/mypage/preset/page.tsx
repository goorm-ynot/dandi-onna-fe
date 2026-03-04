"use client";

/**
 * TODO: 
 * 프리셋 관리 페이지 구현 (1/3) [v]
 * 프리셋 저장 시, 저장 완료 다이얼로그 구현 (2/3) [v]
 * 프리셋 불러올 때, 기본 이외의 프리셋이 있는경우 화면 어떻게 보여줄지 고민 필요 (3/3) []
 * 프리셋 호출 할 때 로딩 상태 보여주기 [] 
 *    - 사실 첫 호출이후 계속 로딩이 뜸 -> 캐싱 필요할듯?
 */

import DashBoardLayout from "@/components/layout/DashboardLayout";
import {
  BasePolicySection,
  ExtraPolicyPicker,
  ExtraPolicySection,
  PageHeader,
} from "@/components/features/mypage/preset/sections";
import { usePresetPage } from "@/hooks/seller/preset/usePresetPage";
import { usePresetQueries } from "@/hooks/seller/preset/usePresetQueries";
import { ConfirmDialog } from "@/components/features/dashboard/SubmitConfirmDialog";
import { useState } from "react";

function PresetPage() {
  const { extraPolicies, hiddenTypes, addPolicy, getPolicyTitle, 
    handlePresetCancel, isPresetSavedDialogOpen, setIsPresetSavedDialogOpen } = usePresetPage();
  const [pendingSubmitAction, setPendingSubmitAction] = useState<(() => void) | null>(null);

  const handleBaseSaveRequest = (submitAction: () => void) => {
    setPendingSubmitAction(() => submitAction);
    setIsPresetSavedDialogOpen(true);
  };

  const handlePresetConfirmSubmit = () => {
    pendingSubmitAction?.();
    setPendingSubmitAction(null);
    setIsPresetSavedDialogOpen(false);
  };

  const handlePresetCancelSubmit = () => {
    setPendingSubmitAction(null);
    handlePresetCancel();
  };

  const { presets, loading, error } = usePresetQueries();
  if (loading) return <div className='w-screen h-full flex items-center justify-center'>로딩 중...</div>;
  if (error) return <div className='w-screen h-full flex items-center justify-center'>에러 발생: {error}</div>;
  return (
    <>
      <DashBoardLayout>
        <div className="max-w-[1400px] w-full h-full flex flex-col gap-40 pt-40 pb-20">
          <PageHeader />
          <BasePolicySection presetData={presets[0]} onSaveRequest={handleBaseSaveRequest} />

          {extraPolicies.map((policy) => (
            <ExtraPolicySection
              key={policy.id}
              title={getPolicyTitle(policy.type)}
              slotIds={policy.slotIds}
              onSaveRequest={handleBaseSaveRequest}
              // onAddSlot={() => addSlot(policy.id)}
            />
          ))}

          <ExtraPolicyPicker onAdd={addPolicy} hiddenTypes={hiddenTypes} />
        </div>
      </DashBoardLayout>
      
      {/* 저장 버튼 클릭 시 묻는 다이얼로그 */}
      <ConfirmDialog
        open = {isPresetSavedDialogOpen}
        onOpenChange = {setIsPresetSavedDialogOpen}
        onCancel={handlePresetCancelSubmit}
        onConfirm={handlePresetConfirmSubmit} 
        title = '프리셋 저장'
        description = '프리셋을 저장하시겠습니까?'
      />
    </>
  );
}

export default PresetPage;