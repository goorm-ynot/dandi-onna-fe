// hooks/useNavigation.ts
// hooks/useNavigation.ts
import { StoreSummary } from '@/types/storeType';
import { useRouter } from 'next/navigation';

export const useNavigation = () => {
  const router = useRouter();

  // 가게 상세 페이지
  const goToStoreDetail = (storeId: string) => {
    router.push(`/customer/store/${storeId}`);
  };

  // 결제 페이지
  const goToPayment = (storeId: string, storeInfo?: StoreSummary) => {
    const params = storeInfo
      ? `?storeName=${encodeURIComponent(storeInfo.storeName)}&addressRoad=${encodeURIComponent(storeInfo.addressRoad)}`
      : '';
    router.push(`/customer/payment/${storeId}${params}`);
  };

  // 결제 완료 페이지
  const goToPaymentComplete = (orderId: string, storeInfo?: StoreSummary) => {
    const params = storeInfo
      ? `?storeName=${encodeURIComponent(storeInfo.storeName)}&addressRoad=${encodeURIComponent(storeInfo.addressRoad)}`
      : '';
    // router.push(`/customer/payment/complete/${orderId}${params}`);
    router.replace(`/customer/payment/complete/${orderId}${params}`);
  };

  // 뒤로가기
  const goBack = () => {
    router.back();
  };

  // 히스토리 기록 남김
  const goCustomerHome = () => {
    router.push('/customer');
  };

  const goSellerHome = () => {
    router.push('/seller');
  };

  // query params
  const goSellerHomeParams = (loginId: string) => {
    // loginId를 Base64로 인코딩
    const encodedLoginId = btoa(loginId);
    router.push(`/seller?token=${encodeURIComponent(encodedLoginId)}`);
  };

  // 히스토리 기록 남기지 않고 이동
  const replaceCustomerHome = () => {
    router.replace('/customer');
  };

  const replaceSellerHome = () => {
    router.replace('/seller');
  };

  return {
    goToStoreDetail,
    goToPayment,
    goToPaymentComplete,
    goBack,
    goCustomerHome,
    replaceCustomerHome,
    goSellerHome,
    replaceSellerHome,
    goSellerHomeParams, //임시라서 추후 삭제 예정
  };
};
