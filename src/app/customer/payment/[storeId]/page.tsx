'use client';
import { usePaymentActions } from '@/hooks/customer/usePaymentAction';
import { StoreSummary } from '@/types/storeType';
import React, { use, useState } from 'react';
import StoreDetailHeader from '@/components/features/customer/StoreDetailHeader';
import OrderItemCard from '@/components/features/customer/OrderItemCard';
import OrderDetailList from '@/components/features/customer/OrderDetailList';
import PaymentPolicyAccordion from '@/components/features/customer/PaymentPolicyAccordion';
import { StickyFooter } from '@/components/features/customer/StickyFooter';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/store/useCartStore';
import KakaoPayIcon from '@/components/icons/KakaoPayIcon';
import NaverPayIcon from '@/components/icons/NaverPayIcon';
import { formatTimeString } from '@/lib/dateParse';
import { ConfirmDialog } from '@/components/features/dashboard/SubmitConfirmDialog';
import { useNavigation } from '@/hooks/useNavigation';

interface Props {
  params: Promise<{ storeId: string; storeInfo?: StoreSummary }>;
}

export default function PaymentPage({ params }: Props) {
  const { storeId, storeInfo } = use(params);
  const { updateCartQuantity, removeMenuFromCart, selectedMenus } = useCartStore();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'CARD' | 'KAKAO_PAY' | 'NAVER_PAY' | null>(null);
  const [isPaymentConfirmDialogOpen, setIsPaymentConfirmDialogOpen] = useState(false);
  const { goToPaymentComplete } = useNavigation();

  const { paymentSnapshot, isProcessing, paymentError, processPayment, changePaymentMethod, getPaymentSummary } =
    usePaymentActions(storeInfo);

  const summary = getPaymentSummary();

  const handlePayClick = async () => {
    // 결제 전 확인 모달 띄우기
    if (!selectedPaymentMethod) {
      alert('결제 방법을 선택해주세요.');
      return;
    }
    setIsPaymentConfirmDialogOpen(true);
  };

  const handlePaymentConfirm = async () => {
    setIsPaymentConfirmDialogOpen(false);
    const success = await processPayment();
    if (success) {
      // 결제 성공 - 완료 페이지로 이동됨
      goToPaymentComplete(storeId, storeInfo);
    }
  };

  const handlePaymentCancel = () => {
    setIsPaymentConfirmDialogOpen(false);
  };

  const handlePaymentMethodSelect = (method: 'CARD' | 'KAKAO_PAY' | 'NAVER_PAY') => {
    setSelectedPaymentMethod(method);
    changePaymentMethod(method);
  };

  const handleQuantityChange = (postId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeMenuFromCart(postId);
    } else {
      updateCartQuantity(postId, newQuantity);
    }
  };

  if (!summary || !paymentSnapshot) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='body3 text-[#4c4c4c]'>결제 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-white pb-[200px]'>
      {/* Header */}
      <StoreDetailHeader title='결제하기' />

      {/* Content */}
      <div className='px-[18px] py-10 flex flex-col gap-10'>
        {/* Order Items */}
        <div className='flex flex-col gap-5'>
          {selectedMenus.map((item) => (
            <OrderItemCard
              key={item.postId}
              menuName={item.menuName}
              quantity={item.quantity}
              maxQuantity={item.qtyRemaining || 10}
              price={item.discountedPrice * item.quantity}
              onQuantityChange={(newQuantity) => handleQuantityChange(item.postId, newQuantity)}
              onRemove={() => removeMenuFromCart(item.postId)}
            />
          ))}
        </div>

        {/* Payment Summary */}
        <div className='flex flex-col gap-5'>
          <div className='flex gap-[6px] items-center'>
            <p className='title5 text-[#262626]'>최종 결제금액</p>
          </div>

          <div className='bg-white rounded-[10px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] p-4 flex flex-col gap-5'>
            <OrderDetailList item='상품금액' price={summary.originalAmount.toLocaleString('ko-KR')} />
            <OrderDetailList item='할인금액' price={summary.discountAmount.toLocaleString('ko-KR')} />
            <div className='border-t border-[#e1e1e1] pt-5'>
              <OrderDetailList item='총 결제예정금액' price={summary.finalAmount.toLocaleString('ko-KR')} />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className='flex flex-col gap-5'>
          <p className='title5 text-[#262626]'>결제 방법</p>

          <div className='flex flex-col gap-[10px]'>
            {/* Credit Card */}
            <Button
              variant='outline'
              className={`h-11 rounded-[6px] ${
                selectedPaymentMethod === 'CARD' ? 'border-[#8749fe] bg-[#f5f0ff]' : 'border-[#c6c6c6] bg-white'
              }`}
              onClick={() => handlePaymentMethodSelect('CARD')}>
              <p className='body3 text-[#262626]'>신용/체크카드</p>
            </Button>

            {/* Other Payment Methods */}
            <div className='flex gap-4'>
              <Button
                variant='outline'
                className={`flex-1 h-11 rounded-[6px] flex items-center justify-center gap-1 ${
                  selectedPaymentMethod === 'KAKAO_PAY' ? 'border-[#8749fe] bg-[#f5f0ff]' : 'border-[#c6c6c6] bg-white'
                }`}
                onClick={() => handlePaymentMethodSelect('KAKAO_PAY')}>
                <KakaoPayIcon />
                <p className='body3 text-[#262626]'>카카오페이</p>
              </Button>
              <Button
                variant='outline'
                className={`flex-1 h-11 rounded-[6px] flex items-center justify-center gap-1 ${
                  selectedPaymentMethod === 'NAVER_PAY' ? 'border-[#8749fe] bg-[#f5f0ff]' : 'border-[#c6c6c6] bg-white'
                }`}
                onClick={() => handlePaymentMethodSelect('NAVER_PAY')}>
                <NaverPayIcon />
                <p className='body3 text-[#262626]'>네이버페이</p>
              </Button>
            </div>
          </div>
        </div>

        {/* Payment Policy */}
        <PaymentPolicyAccordion />
      </div>

      {/* Sticky Footer */}
      <StickyFooter
        visitingTime={formatTimeString(new Date(summary?.visitTime || new Date()))}
        totalPaymentAmount={summary.finalAmount.toLocaleString()}
        context='payment'
        onPaymentClick={handlePayClick}
      />

      {/* 결제 확인 Dialog */}
      <ConfirmDialog
        open={isPaymentConfirmDialogOpen}
        onOpenChange={setIsPaymentConfirmDialogOpen}
        onConfirm={handlePaymentConfirm}
        onCancel={handlePaymentCancel}
        title='확인해주세요'
        description={`예약 및 환불 규정을 모두 읽었으며
이에 동의합니다`}
        confirmText='네, 결제할게요'
        cancelText='아니요'
      />
    </div>
  );
}
