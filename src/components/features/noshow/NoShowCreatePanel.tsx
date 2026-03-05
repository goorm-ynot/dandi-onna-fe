  import React from 'react';
  import { FormProvider, Controller } from 'react-hook-form';
  import { useNoShowForm } from '@/hooks/useNoShowForm';
  import { useNoShowStore } from '@/store/useNoShowStore';
  import { Reservation } from '@/types/boardData';
  import { SubmitConfirmDialog } from '@/components/features/dashboard/SubmitConfirmDialog';
  import FormLayout from './components/FormLayout';
  import MenuQuantityList from './components/MenuQuantityList';
  import PriceSummary from './components/PriceSummary';
  import CreateActionButton from './components/CreateActionButton';
  import Notice from '../ui/Notice';
  import { CircleAlert } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { PresetListSection } from './components/PresetListSection';
import { Skeleton } from '@/components/ui/skeleton';

  interface NoShowCreateFormProps<T = Reservation> {
    noShowData: T;
    onDataUpdate?: (data: any) => void;
    // ✅ 데이터를 Reservation 형태로 변환하는 함수 (선택적)
    transformData?: (data: T) => Reservation;
  }

  function NoShowCreateForm<T = Reservation>({
    noShowData,
    onDataUpdate,
    transformData,
  }: NoShowCreateFormProps<T>) {
    // ✅ 데이터 변환 (필요한 경우)
    const reservationData = transformData ? transformData(noShowData) : (noShowData as unknown as Reservation);

    const formResult = useNoShowForm(reservationData);
    const presetData = useNoShowStore((state) => state.presetData);

    return (
      <>
        {/* 노쇼 알람 울리게 할건지 선택 */}
        <FormProvider {...formResult.form}>
          <FormLayout
            onSubmit={formResult.onSubmit}
            >
            <div className='pt-[36px] px-20'>
              <Notice 
                variant={'warning'}
                icon={<CircleAlert size={16} className='icon-m text-system-yellow-strong' />}
                title="판매하실 노쇼 메뉴를 등록해주세요."
                description="방문 시간이 초과되어 노쇼 등록이 가능합니다."
              />
            </div>

            <Label className='title5 text-foreground-normal px-20'>메뉴의 개수를 입력해 주세요.</Label>
            <MenuQuantityList formResult={formResult} />

            {/* preset에 적용한 정책 불러와서 보여주기 */}
            {/* title */}
            <div className='px-20'>
              <div className='pt-24 border-t border-border-secondary flex flex-row justify-between items-end'>
                <div className="flex gap-[4px] items-center">
                  <Label className="title5 text-foreground-normal">적용되는 정책</Label>
                  <Label className="body2 text-foreground-primary px-8 py-2 rounded-[20px] bg-background-quaternary">기본</Label>
                </div>
                <Link href="/seller/mypage/preset" className="body1 text-foreground-primary-emphasis underline">다른 프리셋 선택하기</Link>
              </div>
            </div>

            {/* preset 리스트 - 로딩 중일 때 스켈레톤 표시 */}
            {formResult.isLoading ? (
              <div className='px-20 flex flex-col gap-14'>
                <div className='space-y-3'>
                  <Skeleton className='h-5 w-1/3' />
                  <Skeleton className='h-5 w-1/4' />
                </div>
                <div className='space-y-3'>
                  <Skeleton className='h-5 w-1/3' />
                  <Skeleton className='h-5 w-1/4' />
                </div>
                <div className='space-y-3'>
                  <Skeleton className='h-5 w-1/3' />
                  <Skeleton className='h-5 w-1/4' />
                </div>
              </div>
            ) : (
              <PresetListSection presetData={presetData} />
            )}
            
            {/* 안내문 */}
            <div className='px-20'>
              <div className='p-14 rounded-md bg-background-quaternary flex flex-row gap-10'>
                <Controller
                  name='isNoShowSale'
                  control={formResult.form.control}
                  render={({ field }) => (
                    <Checkbox
                      id='isNoShowSale'
                      checked={field.value}
                      onCheckedChange={(checked) => field.onChange(checked === true)}
                    />
                  )}
                />
                <div className="flex flex-col gap-10">
                  <Label htmlFor="isNoShowSale" className='body4 text-foreground-normal'>즉시 판매로 등록</Label>  
                  <Label htmlFor="isNoShowSale" className='body1 text-foreground-secondary'>대기시간 없이 바로 판매를 시작합니다.</Label>
                </div>
              </div>
            </div>   

            {/* 가격 요약 */}
            <PriceSummary formResult={formResult} /> 

            {/* 생성 버튼 */}
            <CreateActionButton />    
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

export default React.memo(NoShowCreateForm);
