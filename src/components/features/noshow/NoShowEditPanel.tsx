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
