'use client';

import React, { useState, useRef, useEffect } from 'react';
import StoreProfile from '@/components/features/customer/StoreProfile';
import ReservedMenu from '@/components/features/customer/ReservedMenu';
import ReservedMenuSkeleton from '@/components/features/customer/ReservedMenuSkeleton';
import StoreProfileSkeleton from '@/components/features/customer/StoreProfileSkeleton';
import { Chip } from '@/components/features/ui/Chip';
import { useStoresActions } from '@/hooks/customer/useStoresManage';
import { formatTimeWithoutSeconds } from '@/lib/utils';
import { useGlobalTimer } from '@/hooks/useGlobalTimer';
import { ChevronDown, MapPin, ChevronRight } from 'lucide-react';
import { useNavigation } from '@/hooks/useNavigation';
import OptimizedImage from '@/components/ui/OptimizedImage';
import Alarm from '@/components/features/alarm/Alarm';
import { useAlarmStore } from '@/store/useAlarmStore';

export default function CustomerPage() {
  const {
    stores,
    storesLoading,
    storesError,
    loadMoreStores,
    hasNextPage,
    isFetchingNextPage,
    orderList,
    myOrdersLoading,
    myOrdersError,
    setOrderList,
    setParams,
  } = useStoresActions();
  const { goToStoreDetail } = useNavigation();
  const { alarm, hideAlarm, handleAlarmClick } = useAlarmStore();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'noshow'>('noshow');
  const [isMounted, setIsMounted] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const displayStores = stores.length > 0 ? stores : [];

  // 🔧 1. useEffect ref 문제 해결 - 변수에 미리 저장
  useEffect(() => {
    const currentTarget = observerTarget.current; // 변수에 저장

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          loadMoreStores();
        }
      },
      { threshold: 0.1 }
    );

    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        // cleanup에서 저장된 변수 사용
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, loadMoreStores]);

  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

  // 🔧 2. ReservedMenuWrapper 컴포넌트 - React.memo 제거하여 타이머 실시간 업데이트 허용
  const ReservedMenuWrapper = ({ order, isPriority }: { order: (typeof orderList)[0]; isPriority?: boolean }) => {
    const timeRemaining = useGlobalTimer(order.visitTime);
    return (
      <ReservedMenu
        image={order.storeImageKey}
        storeName={order.storeName}
        badge={'노쇼'}
        menuItems={order.menuSummary}
        totalPrice={formatPrice(order.totalPrice)}
        paidAmount={formatPrice(order.paidAmount)}
        timeRemaining={timeRemaining}
        status={order.status}
        isPriority={isPriority}
      />
    );
  };

  return (
    <div className='w-full flex flex-col pb-20'>
      {/* 위치 정보 섹션 */}
      <div className='bg-neutral-100 w-full px-4 py-3.5 flex items-center justify-between gap-2'>
        <div className='flex items-center gap-1.5 flex-1'>
          <span className='text-[14px] text-[#161616] flex items-center gap-1'>
            <MapPin size={16} /> 분당구 내정로165번길 35 <ChevronDown size={16} />
          </span>
        </div>
      </div>

      {/* 내가 주문한 가게 섹션 */}
      <section className='px-4 py-5 flex flex-col gap-12 min-h-[340px]'>
        <div className='flex items-center justify-between'>
          <h2 className='title5 text-[#161616]'>내가 주문한 가게</h2>
          <button className='flex flex-row items-center text-[14px] text-foreground-primary'>
            더보기	<ChevronRight size={16} strokeWidth={2}/>
            </button>
        </div>

        {/* 예약 메뉴 카드 */}
        <div
          className='flex gap-[10px] overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 min-h-[298px]'
          suppressHydrationWarning>
          {!isMounted ? null : myOrdersLoading ? (
            // 로딩 스켈레톤
            [...Array(2)].map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className='bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0 
                   w-72 min-[400px]:w-80 
                   snap-start first:ml-0 last:mr-4'>
                <ReservedMenuSkeleton />
              </div>
            ))
          ) : orderList && orderList.length > 0 ? (
            orderList.map((order, index) => (
              <div
                key={order.orderId}
                className='bg-white rounded-lg shadow-sm overflow-hidden flex-shrink-0 
                   w-72 min-[400px]:w-80 
                   snap-start first:ml-0 last:mr-4'>
                <ReservedMenuWrapper order={order} isPriority={index < 2} />
              </div>
            ))
          ) : (
            <div className='text-center py-8 text-gray-500 w-full px-4'>주문한 가게가 없습니다.</div>
          )}
        </div>
      </section>

      {/* 공지사항 배너 */}
      <section className='relative w-full h-[92px] bg-neutral-100 my-20'>
        <OptimizedImage
          src='/images/adNotices1.png'
          alt='공지사항 배너'
          fill
          quality={85}
          className='object-fill'
          priority={true}
          isLCP={true} // 🎯 LCP 표시
          fetchPriority='high' // 🎯 명시적 우선순위
        />
      </section>

      {/* 주문 가능한 가게 섹션 */}
      <section className='px-4 py-5 flex flex-col gap-[10px]'>
        <div className='flex items-center justify-between'>
          <h2 className='title5 text-[#121212]'>주문 가능한 가게</h2>
          <button className='text-[14px] text-foreground-primary flex items-center gap-1'>
            가까운 순 <ChevronDown size={16} />
          </button>
        </div>
          <h2 className='body1 text-foreground-finished'>갑자기 생긴 빈자리, 지금 할인 중!</h2>

        {/* 필터 칩 */}
        <div className='flex gap-2.5'>
          <Chip
            label='노쇼할인'
            state={selectedFilter === 'noshow' ? 'selected' : 'default'}
            onClick={() => setSelectedFilter('noshow')}
          />
          <Chip
            label='일반예약'
            state={selectedFilter === 'all' ? 'selected' : 'default'}
            onClick={() => setSelectedFilter('noshow')}
          />
        </div>

        {/* 에러 상태 */}
        {storesError && <div className='text-center py-4 text-red-500'>가게 목록을 불러올 수 없습니다.</div>}

        {/* 가게 목록 */}
        <div className='flex flex-col gap-[20px] min-h-[400px]'>
          {storesLoading && displayStores.length === 0 ? (
            // 초기 로딩 스켈레톤
            [...Array(5)].map((_, index) => (
              <div key={`store-skeleton-${index}`} className='flex gap-2.5 h-[108px]'>
                <StoreProfileSkeleton />
              </div>
            ))
          ) : displayStores && displayStores.length > 0 ? (
            displayStores.map((store) => (
              <div key={store.storeId} className='flex gap-2.5' onClick={() => goToStoreDetail(store.storeId)}>
                <StoreProfile
                  name={store.name}
                  image={store.imageUrl}
                  openTime={formatTimeWithoutSeconds(store.openTime)}
                  closeTime={formatTimeWithoutSeconds(store.closeTime)}
                  distance={parseFloat((store.distanceMeters / 1000).toFixed(1))}
                />
              </div>
            ))
          ) : (
            <div className='text-center py-8 text-gray-500'>주문 가능한 가게가 없습니다.</div>
          )}
        </div>

        {/* 무한스크롤 트리거 영역 */}
        {hasNextPage && (
          <div ref={observerTarget} className='flex justify-center py-4'>
            {isFetchingNextPage && <div className='text-center text-gray-500'>더 불러오는 중...</div>}
          </div>
        )}
      </section>

      {/* 알림 */}
      {alarm.isVisible && (
        <div className='fixed top-20 right-10 z-50'>
          <Alarm
            type={alarm.type}
            title={alarm.title}
            message={alarm.message}
            onClose={hideAlarm}
            autoClose={alarm.autoClose ?? true}
            duration={30000}
            deepLink={alarm.deepLink}
            onAlarmClick={handleAlarmClick}
          />
        </div>
      )}
    </div>
  );
}
