// hooks/useNavigation.ts
// hooks/useNavigation.ts
import { useRouter } from 'next/navigation';

export const useNavigation = () => {
  const router = useRouter();

  // 가게 상세 페이지
  const goToStoreDetail = (storeId: string) => {
    router.push(`/customer/store/${storeId}`);
  };

  // 결제 페이지
  const goToPayment = (storeId: string, menuIds?: string[]) => {
    const params = menuIds ? `?menus=${menuIds.join(',')}` : '';
    router.push(`/customer/payment/${storeId}${params}`);
  };

  // 결제 완료 페이지
  const goToPaymentComplete = (orderId: string) => {
    router.replace(`/customer/payment/complete/${orderId}`);
  };

  // 뒤로가기
  const goBack = () => {
    router.back();
  };

  return {
    goToStoreDetail,
    goToPayment,
    goToPaymentComplete,
    goBack,
  };
};
