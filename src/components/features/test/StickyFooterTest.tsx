'use client';
import { useState } from 'react';
import ReservedMenu from '@/components/features/customer/ReservedMenu';
import StoreProfile from '@/components/features/customer/StoreProfile';
import ProductCard from '@/components/features/product/ProductCard';
import { Badge } from '@/components/features/ui/Badge';
import { QuantitySelectorModal } from '@/components/features/ui/QuantitySelectorModal';
import { StickyFooter } from '@/components/features/customer/StickyFooter';

export default function StickyFooterTest() {
  // Order 상태 관리
  const [orderData, setOrderData] = useState({
    count: '3',
    price: '30,000',
    originalPrice: '45,000',
    totalPaymentAmount: '30,000',
  });

  // Payment 상태 관리
  const [paymentData, setPaymentData] = useState({
    visitingTime: '18:30',
    totalPaymentAmount: '121,800',
  });

  // Order 버튼 클릭
  const handleOrderClick = () => {
    console.log('주문하기 클릭:', orderData);
    // API 호출 등의 로직
    alert(`${orderData.totalPaymentAmount}원 주문이 진행됩니다.`);
  };

  // Payment 버튼 클릭
  const handlePaymentClick = () => {
    console.log('결제하기 클릭:', paymentData);
    // 결제 로직
    alert(`${paymentData.totalPaymentAmount}원 결제가 진행됩니다.`);
  };

  return (
    <div className='w-full flex flex-col p-4 bg-gray-50 pb-56'>
      <h1 className='text-2xl font-bold mb-2'>소비자 페이지</h1>

      {/* 주문 컨텍스트 */}
      <section className='mb-8'>
        <h2 className='text-lg font-semibold mb-4'>주문 화면</h2>
        <StickyFooter
          context='order'
          count={orderData.count}
          price={orderData.price}
          originalPrice={orderData.originalPrice}
          totalPaymentAmount={orderData.totalPaymentAmount}
          onOrderClick={handleOrderClick}
        />
      </section>

      {/* 결제 컨텍스트 */}
      <section>
        <h2 className='text-lg font-semibold mb-4'>결제 화면</h2>
        <StickyFooter
          context='payment'
          visitingTime={paymentData.visitingTime}
          totalPaymentAmount={paymentData.totalPaymentAmount}
          onPaymentClick={handlePaymentClick}
        />
      </section>
    </div>
  );
}
