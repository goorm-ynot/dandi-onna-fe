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
  import Notice from '../ui/Notice';
  import { CircleAlert } from 'lucide-react';

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
        <div className='pt-[36px] pb-24 px-20'>
          {/* TODO: 라디오 지우고, 안내문으로 수정 */}
          <Notice 
                variant={'warning'}
                icon={<CircleAlert size={16} className='icon-m text-system-yellow-strong' />}
                title="판매하실 노쇼 메뉴를 등록해주세요."
                description="방문 시간이 초과되어 노쇼 등록이 가능합니다."
                />
        </div>
        {/* 노쇼 알람 울리게 할건지 선택 */}
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
            {/* 안내문 */}
            <div className='px-20'>
              <Notice 
                variant={'error'}
                icon={<CircleAlert size={16} className='icon-m text-system-pink-strong' />}
                title="결제가 완료되면 판매가 확정됩니다."
                description="노쇼 메뉴는 등록 즉시 고객에게 제공되며, 결제 완료 시 환불이 불가능합니다."
                />
            </div>        
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
