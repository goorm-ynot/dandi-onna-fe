import React from 'react';
import { FormProvider } from 'react-hook-form';
import { useNoShowForm } from '@/hooks/useNoShowForm';
import { Reservation } from '@/types/boardData';
import FormLayout from './components/FormLayout';
import MenuQuantityList from './components/MenuQuantityList';
import DiscountSelector from './components/DiscountSelector';
import VisitTimeSelector from './components/VisitTimeSelector';
import PriceSummary from './components/PriceSummary';
import CreateActionButton from './components/CreateActionButton';

interface NoShowCreateFormProps {
  noShowData: Reservation;
  onDataUpdate?: (data: any) => void;
}

export default function NoShowCreateForm({ noShowData, onDataUpdate }: NoShowCreateFormProps) {
  const formResult = useNoShowForm(noShowData);

  return (
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
        {/* <PriceSummary formResult={formResult} />
        <CreateActionButton /> */}
      </FormLayout>
    </FormProvider>
  );
}
