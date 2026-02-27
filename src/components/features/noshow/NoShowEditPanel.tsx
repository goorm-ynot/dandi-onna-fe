import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useNoShowMenuForm } from '@/hooks/useNoShowForm';
import { NoShowMenu } from '@/types/boardData';
import { SubmitConfirmDialog } from '@/components/features/dashboard/SubmitConfirmDialog';
import FormLayout from './components/FormLayout';
import MenuQuantityList from './components/MenuQuantityList';
import DiscountSelector from './components/DiscountSelector';
import VisitTimeSelector from './components/VisitTimeSelector';
import PriceSummary from './components/PriceSummary';
import EditActionButtons from './components/CreateActionButtons';
import { Label } from '@/components/ui/label';

interface NoShowEditFormProps {
  noShowData: NoShowMenu;
  onDataUpdate?: (data: any) => void;
}

export default function NoShowEditForm({ noShowData, onDataUpdate }: NoShowEditFormProps) {
  const formResult = useNoShowMenuForm(noShowData);

  return (
    <>
      <FormProvider {...formResult.form}>
        <FormLayout
          onSubmit={formResult.onSubmit}
          bottomChildren={
            <>
              <PriceSummary formResult={formResult} />
              <EditActionButtons noShowData={noShowData} onDataUpdate={onDataUpdate} />
            </>
          }>
          <Label className='title5 text-foreground-normal px-20'>메뉴의 개수를 입력해 주세요.</Label>
          <MenuQuantityList formResult={formResult} />
          <DiscountSelector formResult={formResult} mode='edit' />
          <VisitTimeSelector formResult={formResult} mode='edit' />
        </FormLayout>
      </FormProvider>

      {/* 노쇼 수정 확인 Dialog */}
      <SubmitConfirmDialog
        open={formResult.isSubmitDialogOpen}
        onOpenChange={formResult.setIsSubmitDialogOpen}
        onConfirm={formResult.handleConfirmSubmit}
        onCancel={formResult.handleCancelSubmit}
        title='메뉴 상태 변경'
        description='노쇼 메뉴를 수정하시겠습니까?'
      />
    </>
  );
}
