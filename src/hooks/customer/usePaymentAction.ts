// hooks/usePaymentActions.ts
import { useCartStore } from '@/store/useCartStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PaymentDataType, PaymentResponse } from '@/types/paymentType';
import { useNavigation } from '@/hooks/useNavigation';
import axios from 'axios';
import { StoreSummary } from '@/types/storeType';
import { toast } from 'sonner';

export const usePaymentActions = (storeInfo?: StoreSummary) => {
  const {
    // 상태
    selectedMenus,
    paymentSnapshot,
    isInPayment,
    paymentError,
    paymentResult,

    // 액션
    setPaymentMethod,
    setAppliedDiscount,
    setInPayment,
    setPaymentError,
    setPaymentResult,
    completePayment,
    cancelPayment,
    getPaymentData,
    getPaymentTotal,
    canProceedToPayment,
  } = useCartStore();

  const { goToPaymentComplete, goBack } = useNavigation();

  // 🔥 결제 처리 뮤테이션
  const paymentMutation = useMutation({
    mutationFn: async (paymentData: PaymentDataType) => {
      const response = await axios.post('/api/v1/order', paymentData);
      console.log('paymentMutation: ', response);
      if (response.status !== 200) {
        throw new Error('결제 처리 중 오류가 발생했습니다.');
      }
      return response.data.data as PaymentResponse;
    },
    onMutate: () => {
      setPaymentError(null);
      // 로딩 상태는 mutation의 isPending으로 처리
    },
    onSuccess: (result: PaymentResponse) => {
      // 결제 성공
      setPaymentResult(result as any);
      completePayment(result as any);
      setPaymentError(null);

      // 결제 완료 페이지로 이동
      goToPaymentComplete(result.orderId.toString(), storeInfo);
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || error.message || '결제에 실패했습니다.';
      setPaymentError(errorMessage);
      toast.error(errorMessage);
    },
  });

  // 🔥 결제 처리 함수
  const processPayment = async () => {
    const paymentData = getPaymentData();

    if (!paymentData) {
      setPaymentError('결제 정보가 없습니다.');
      toast.error('결제 정보가 없습니다.');
      return false;
    }

    if (!canProceedToPayment()) {
      setPaymentError('다시 결제를 시도해주세요.');
      toast.error('다시 결제를 시도해주세요.');
      return false;
    }

    try {
      await paymentMutation.mutateAsync(paymentData);
      return true;
    } catch (error) {
      return false;
    }
  };

  // 🔥 결제 수단 변경
  const changePaymentMethod = (method: PaymentDataType['paymentMethod']) => {
    setPaymentMethod(method);
  };

  // 🔥 할인 적용
  const applyDiscount = (discountAmount: number) => {
    if (discountAmount < 0) {
      setPaymentError('올바르지 않은 할인 금액입니다.');
      return false;
    }

    const total = getPaymentTotal();
    if (discountAmount > total) {
      setPaymentError('할인 금액이 총 금액을 초과할 수 없습니다.');
      return false;
    }

    setAppliedDiscount(discountAmount);
    return true;
  };

  // 🔥 결제 취소
  const handleCancelPayment = () => {
    cancelPayment();
    goBack(); // 이전 페이지로
  };

  // 🔥 결제 정보 요약
  const getPaymentSummary = () => {
    if (!selectedMenus || !paymentSnapshot) return null;

    // 현재 selectedMenus 기반으로 실시간 계산
    const currentOriginalAmount = selectedMenus.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
    const currentFinalAmount = selectedMenus.reduce((sum, item) => sum + item.discountedPrice * item.quantity, 0);
    const currentDiscountAmount = currentOriginalAmount - currentFinalAmount;

    return {
      storeName: paymentSnapshot.storeName,
      storeAddress: paymentSnapshot.storeAddress,
      itemCount: selectedMenus.length,
      totalQuantity: selectedMenus.reduce((sum, item) => sum + item.quantity, 0),
      originalAmount: currentOriginalAmount,
      discountAmount: currentDiscountAmount,
      finalAmount: currentFinalAmount,
      visitTime: paymentSnapshot.visitTime || selectedMenus[0]?.visitTime,
      paymentMethod: paymentSnapshot.paymentMethod,
    };
  };

  return {
    // 상태
    paymentSnapshot,
    isInPayment,
    paymentError,
    paymentResult,
    isProcessing: paymentMutation.isPending,

    // 액션
    processPayment,
    changePaymentMethod,
    applyDiscount,
    cancelPayment: handleCancelPayment,

    // 유틸리티
    canProceedToPayment,
    getPaymentSummary,
    getPaymentTotal,

    // 에러 처리
    clearError: () => setPaymentError(null),
  };
};
