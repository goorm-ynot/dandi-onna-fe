import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useNoShowForm } from '@/hooks/useNoShowForm';
import { Reservation } from '@/types/boardData';
import { SubmitConfirmDialog } from '@/components/features/dashboard/SubmitConfirmDialog';
import FormLayout from './components/FormLayout';
import MenuQuantityList from './components/MenuQuantityList';
import DiscountSelector from './components/DiscountSelector';
import VisitTimeSelector from './components/VisitTimeSelector';
import PriceSummary from './components/PriceSummary';
import CreateActionButton from './components/CreateActionButton';

interface NoShowCreateFormProps<T = Reservation> {
  noShowData: T;
  onDataUpdate?: (data: any) => void;
  // ✅ 데이터를 Reservation 형태로 변환하는 함수 (선택적)
  transformData?: (data: T) => Reservation;
}

export default function NoShowCreateForm<T = Reservation>({
  noShowData,
  onDataUpdate,
  transformData,
}: NoShowCreateFormProps<T>) {
  // ✅ 데이터 변환 (필요한 경우)
  const reservationData = transformData ? transformData(noShowData) : (noShowData as unknown as Reservation);

  const formResult = useNoShowForm(reservationData);

  return (
    <>
      <FormProvider {...formResult.form}>
        <FormLayout
          onSubmit={formResult.onSubmit}
          bottomChildren={
            <>
              <PriceSummary formResult={formResult} />
              <CreateActionButton />
            </>
          }>
          <MenuQuantityList formResult={formResult} />
          <DiscountSelector formResult={formResult} mode='create' />
          <VisitTimeSelector formResult={formResult} mode='create' />
        </FormLayout>
      </FormProvider>

      {/* 노쇼 생성 확인 Dialog */}
      <SubmitConfirmDialog
        open={formResult.isSubmitDialogOpen}
        onOpenChange={formResult.setIsSubmitDialogOpen}
        onConfirm={formResult.handleConfirmSubmit}
        onCancel={formResult.handleCancelSubmit}
        title='노쇼 메뉴 등록'
        description='노쇼 메뉴를 등록하시겠습니까?'
        confirmText='확인'
        cancelText='취소'
      />
    </>
  );
}
