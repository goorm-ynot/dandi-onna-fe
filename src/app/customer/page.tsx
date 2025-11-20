'use client';

import React, { useState, useRef, useEffect } from 'react';
import StoreProfile from '@/components/features/customer/StoreProfile';
import ReservedMenu from '@/components/features/customer/ReservedMenu';
import ReservedMenuSkeleton from '@/components/features/customer/ReservedMenuSkeleton';
import StoreProfileSkeleton from '@/components/features/customer/StoreProfileSkeleton';
import { Chip } from '@/components/features/ui/Chip';
import CustomerHeader from '@/components/layout/CustomerHeader';
import { useStoresActions } from '@/hooks/customer/useStoresManage';
import { formatStatusText, formatTimeWithoutSeconds } from '@/lib/utils';
import { useGlobalTimer } from '@/hooks/useGlobalTimer';
import { ChevronDown, MapPin } from 'lucide-react';
import { useNavigation } from '@/hooks/useNavigation';
import Image from 'next/image';

export default function CustomerPage() {
  const {
    stores, // 평탄화된 전체 가게 목록
    storesLoading,
    storesError,
    loadMoreStores,
    hasNextPage,
    isFetchingNextPage,
    // 기존 states
    orderList,
    myOrdersLoading,
    myOrdersError,
    // actions
    addToFavorites,
    removeFromFavorites,
    setOrderList,
    setParams,
  } = useStoresActions();
  const { goToStoreDetail } = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'noshow'>('noshow');
  const observerTarget = useRef<HTMLDivElement>(null);

  // 가게 데이터 - API에서 받아온 stores 데이터 사용
  const displayStores = stores.length > 0 ? stores : [];

  // 무한스크롤 Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          loadMoreStores();
        }
      },
      { threshold: 0.1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasNextPage, isFetchingNextPage, loadMoreStores]);

  // 가격 포맷 함수
  const formatPrice = (price: number) => {
    return price.toLocaleString('ko-KR');
  };

  // ReservedMenu를 감싸는 컴포넌트 - 각 order마다 훅 사용
  const ReservedMenuWrapper = React.memo(
    ({ order, isPriority }: { order: (typeof orderList)[0]; isPriority?: boolean }) => {
      const timeRemaining = useGlobalTimer(order.visitTime);
      return (
        <ReservedMenu
          image={order.storeImageKey}
          storeName={order.storeName}
          badge={'노쇼'}
          menuItems={order.menuSummary}
          totalPrice={formatPrice(order.totalPrice)}
          timeRemaining={timeRemaining}
          status={order.status}
          isPriority={isPriority}
        />
      );
    },
    (prevProps, nextProps) => {
      return (
        prevProps.order.orderId === nextProps.order.orderId &&
        prevProps.order.status === nextProps.order.status &&
        prevProps.isPriority === nextProps.isPriority
      );
    }
  );

  return (
    <div className='w-full flex flex-col pb-20'>
      {/* 위치 정보 섹션 */}
      <div className='bg-neutral-100 w-full px-4 py-3.5 flex items-center justify-between gap-2'>
        <div className='flex items-center gap-1.5 flex-1'>
          {/* icon add */}
          <span className='text-[16px] text-[#161616] flex items-center gap-1'>
            <MapPin size={16} /> 분당구 내정로165번길 35 <ChevronDown size={16} />
          </span>
        </div>
        {/* <button className='text-[14px] text-[#656565] underline'>위치 변경</button> */}
      </div>

      {/* 내가 주문한 가게 섹션 */}
      <section className='px-4 py-5 flex flex-col gap-12'>
        <div className='flex items-center justify-between'>
          <h2 className='title5 text-[#161616]'>내가 주문한 가게</h2>
          <button className='text-[14px] text-[#656565] underline'>더보기</button>
        </div>

        {/* 예약 메뉴 카드 */}
        <div className='flex gap-3 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 px-4 '>
          {myOrdersLoading ? (
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
      <section className='bg-neutral-100 w-full px-4 py-4 flex items-center gap-4'>
        <Image
          src='/images/adNotices1.png'
          alt='공지사항 배너'
          width={358}
          height={80}
          priority={true} // LCP 이미지에 우선순위
          className='w-full rounded-lg'
        />
      </section>

      {/* 주문 가능한 가게 섹션 */}
      <section className='px-4 py-5 flex flex-col gap-5'>
        <div className='flex items-center justify-between'>
          <h2 className='title5 text-[#121212]'>주문 가능한 가게</h2>
          <button className='text-[14px] text-[#656565] flex items-center gap-1'>
            가까운 순<span>›</span>
          </button>
        </div>

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
        <div className='flex flex-col gap-6'>
          {storesLoading && displayStores.length === 0 ? (
            // 초기 로딩 스켈레톤
            [...Array(5)].map((_, index) => (
              <div key={`store-skeleton-${index}`} className='flex gap-2.5'>
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
                  distance={Math.round(store.distanceMeters / 1000)}
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
    </div>
  );
}
