// hooks/useNavigation.ts
// hooks/useNavigation.ts
import { StoreSummary } from '@/types/storeType';
// import { cookies } from 'next/headers';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export const useNavigation = () => {
  const router = useRouter();

  // 가게 상세 페이지
  const goToStoreDetail = (storeId: string) => {
    router.push(`/customer/store/${storeId}`, {scroll: true});
  };

  // 결제 페이지
  const goToPayment = (storeId: string, storeInfo?: StoreSummary) => {
    const params = storeInfo
      ? `?storeName=${encodeURIComponent(storeInfo.storeName)}&addressRoad=${encodeURIComponent(storeInfo.addressRoad)}`
      : '';
    router.push(`/customer/payment/${storeId}${params}`, {scroll: true});
  };

  // 결제 완료 페이지
  const goToPaymentComplete = (orderId: string, storeInfo?: StoreSummary) => {
    const params = storeInfo
      ? `?storeName=${encodeURIComponent(storeInfo.storeName)}&addressRoad=${encodeURIComponent(storeInfo.addressRoad)}`
      : '';
    // router.push(`/customer/payment/complete/${orderId}${params}`);
    router.replace(`/customer/payment/complete/${orderId}${params}`, {scroll: true});
  };

  // 뒤로가기
  const goBack = () => {
    router.back();
  };

  // 히스토리 기록 남김
  const goCustomerHome = () => {
    router.push('/customer', {scroll: true});
  };

  const goSellerHome = () => {
    router.push('/seller', {scroll: true});
  };

  // query params
  const goSellerHomeParams = async (loginId?: string) => {
    // const cookieStore = await cookies();
    // const storedLoginId = cookieStore.get('login-id')?.value || loginId;
    const storedLoginId = getCookie('login-id')?.toString() || loginId;

    if (!storedLoginId) {
      // 에러 처리 또는 기본 동작
      alert('로그인 정보가 없습니다. 다시 로그인해주세요.');
      console.error('로그인 ID를 찾을 수 없습니다');
      router.push('/'); // 로그인 페이지로 리다이렉트
      return;
    }

    // loginId를 Base64로 인코딩
    const encodedLoginId = btoa(storedLoginId);
    router.push(`/seller?token=${encodeURIComponent(encodedLoginId)}`, {scroll: true});
  };

  // 히스토리 기록 남기지 않고 이동
  const replaceCustomerHome = () => {
    window.location.href = '/customer';
  };

  const replaceSellerHome = () => {
    router.replace('/seller', {scroll: true});
  };

  // 노쇼 메뉴 관리
  const goToNoShowManagement = () => {
    router.push('/seller/no-show', {scroll: true});
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
    goToNoShowManagement,
  };
};
