import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useNoShowForm } from '@/hooks/useNoShowForm';
import { Reservation } from '@/types/boardData';
import FormLayout from './components/FormLayout';
import MenuQuantityList from './components/MenuQuantityList';
import DiscountSelector from './components/DiscountSelector';
import VisitTimeSelector from './components/VisitTimeSelector';
import PriceSummary from './components/PriceSummary';
import EditActionButtons from './components/CreateActionButtons';

interface NoShowEditFormProps {
  noShowData: Reservation;
  onDataUpdate?: (data: any) => void;
}

export default function NoShowEditForm({ noShowData, onDataUpdate }: NoShowEditFormProps) {
  const formResult = useNoShowForm(noShowData);

  return (
    <FormProvider {...formResult.form}>
      <FormLayout
        onSubmit={formResult.onSubmit}
        bottomChildren={
          <>
            <PriceSummary formResult={formResult} />
            <EditActionButtons />
          </>
        }>
        <MenuQuantityList formResult={formResult} />
        <DiscountSelector formResult={formResult} mode='edit' />
        <VisitTimeSelector formResult={formResult} mode='edit' />
        {/* <PriceSummary formResult={formResult} />
          <EditActionButtons /> */}
      </FormLayout>
    </FormProvider>
  );
}
