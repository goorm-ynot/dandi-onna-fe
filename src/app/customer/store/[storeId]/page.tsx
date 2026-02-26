'use client';
import { useStoreDetailManage } from '@/hooks/customer/useStoreDetailManage';
import { useState, useEffect } from 'react';
import StoreDetailHeader from '@/components/features/customer/StoreDetailHeader';
import StoreDetailInfo from '@/components/features/customer/StoreDetailInfo';
import TimeSlotHeader from '@/components/features/customer/TimeSlotHeader';
import ProductCard from '@/components/features/product/ProductCard';
import { StickyFooter } from '@/components/features/customer/StickyFooter';
import OrderBottomSheet from '@/components/features/customer/OrderBottomSheet';
import StoreDetailSkeleton from '@/components/features/customer/StoreDetailSkeleton';
import { useNavigation } from '@/hooks/useNavigation';
import { useParams } from 'next/navigation';

// 🎯 ProductCard 상태 타입
type ProductCardState = 'selected' | 'default' | 'disabled';

// app/store/[storeId]/page.tsx
export default function StorePage() {
  const params = useParams<{ storeId: string }>();
  const storeId = params.storeId as string;
  const {
    // store state
    store,
    posts,
    pagination,
    storeLoading,
    storeError,

    // cart state
    selectedMenus,

    // cart utilities
    checkCartExpiration,
    getCartRemainingTime,
    clearExpiredCartItems,
    totalCartItems,
    totalCartPrice,

    // cart actions
    addToCart,
    createPaymentSnapshot,

    favorite,
    // favorite actions
    toggleFavorite,
    isFavoriteLoading, // 찜하기 로딩 상태
  } = useStoreDetailManage(storeId);
  const { goToPayment, goBack } = useNavigation();

  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [hasItemsInCart, setHasItemsInCart] = useState(selectedMenus.length > 0);

  // 컴포넌트 마운트 시 만료된 장바구니 확인
  useEffect(() => {
    const wasExpired = clearExpiredCartItems();
    if (wasExpired) {
      setHasItemsInCart(false);
    }
  }, [clearExpiredCartItems]);

  // 장바구니 변경 시 hasItemsInCart 업데이트
  useEffect(() => {
    setHasItemsInCart(selectedMenus.length > 0);
  }, [selectedMenus]);

  // 주기적으로 장바구니 만료 체크 (30초마다)
  useEffect(() => {
    const interval = setInterval(() => {
      const wasExpired = clearExpiredCartItems();
      if (wasExpired) {
        setHasItemsInCart(false);
      }
    }, 30000); // 30초마다 체크

    return () => clearInterval(interval);
  }, [clearExpiredCartItems]);

  // Group posts by expireAt time
  const groupedPosts = posts.reduce((acc, post) => {
    const expireDate = new Date(post.expireAt);
    const hour = String(expireDate.getHours()).padStart(2, '0');
    const minute = String(expireDate.getMinutes()).padStart(2, '0');
    const expireTime = `${hour}시 ${minute}분`;

    if (!acc[expireTime]) {
      acc[expireTime] = [];
    }
    acc[expireTime].push(post);
    return acc;
  }, {} as Record<string, Array<(typeof posts)[0]>>);

  const handleProductClick = (postId: number) => {
    ////expireAt이 이전에 등록한 메뉴와 일치할 때만 선택 될 수 있게

    setSelectedProduct(postId);
    setQuantity(1);
  };

  // 🎯 expireAt 검증: 이미 담긴 아이템과 동일한 expireAt인지 확인
  const getProductState = (postId: number): ProductCardState => {
    const post = posts.find((p) => p.postId === postId);
    if (!post) return 'default';

    // 장바구니가 비어있으면 모두 활성화
    if (selectedMenus.length === 0) {
      return selectedProduct === postId ? 'selected' : 'default';
    }

    // 장바구니에 아이템이 있을 때
    const firstCartItem = selectedMenus[0];
    const firstCartPost = posts.find((p) => p.postId === firstCartItem.postId);

    if (!firstCartPost) return 'default';

    // expireAt이 동일하면 활성화, 다르면 disabled
    const isSameExpireTime = new Date(post.expireAt).getTime() === new Date(firstCartPost.expireAt).getTime();

    if (isSameExpireTime) {
      // 동일한 expireAt
      return selectedProduct === postId ? 'selected' : 'default';
    } else {
      // 다른 expireAt - disabled
      return 'disabled';
    }
  };

  const handleAddToCart = () => {
    if (selectedProduct && quantity > 0) {
      const post = posts.find((p) => p.postId === selectedProduct);
      // console.log('선택한거: ', post);

      if (post) {
        setSelectedProduct(null);
        setQuantity(1);
        setHasItemsInCart(true);
        addToCart(post, quantity);
      }
    }
  };

  const handleCloseBottomSheet = () => {
    setSelectedProduct(null);
    setQuantity(0);
  };

  // 결제 하기
  const handlePayment = () => {
    const storeInfo = {
      storeId,
      storeName: store.name,
      addressRoad: store.addressRoad,
    };

    createPaymentSnapshot(storeInfo, posts, store.visitTime);
    goToPayment(storeId, storeInfo);
  };

  const handleToggleFavorite = () => {
    if (store) {
      toggleFavorite(favorite);
    }
  };

  if (storeLoading) {
    return <StoreDetailSkeleton />;
  }

  if (storeError || !store) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <p className='body3 text-[#f84e3e]'>가게 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  const selectedPost = selectedProduct ? posts.find((p) => p.postId === selectedProduct) : null;

  return (
    <div className='min-h-screen bg-white pb-[200px]'>
      {/* Header */}
      <StoreDetailHeader title='주문하기' />

      {/* Store Information */}
      <StoreDetailInfo
        name={store.name}
        description={store.description}
        address={store.addressRoad}
        distance={store.distance || 300} // You can calculate this or get it from the store data
        imageUrl={store.imageUrl}
        isFavorite={favorite} // You need to track this in your state
        onToggleFavorite={handleToggleFavorite}
        onShowMap={() => {
          // Handle map view
          console.log('Show map');
        }}
      />

      {/* Product List by Time Slot */}
      <div className='flex flex-col gap-[40px] px-4 pt-[40px]'>
        {Object.entries(groupedPosts).map(([time, timePosts]) => (
          <div key={time} className='flex flex-col gap-[20px] w-full'>
            {/* Time Slot Header */}
            <TimeSlotHeader time={time} />

            {/* Products for this time slot */}
            {(timePosts as Array<(typeof posts)[0]>).map((post) => (
              <ProductCard
                key={post.postId}
                image={post.menuImageUrl}
                title={post.menuName}
                description={post.menuDescription}
                originalPrice={post.originalPrice}
                discountRate={post.discountRate || post.discountPercent}
                salePrice={post.discountedPrice}
                stock={post.qtyRemaining}
                state={getProductState(post.postId)}
                onClick={() => handleProductClick(post.postId)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Sticky Footer - Show when product selected (order) or items in cart (payment) */}
      {selectedProduct && selectedPost ? (
        <OrderBottomSheet
          menuName={selectedPost.menuName}
          quantity={quantity}
          maxQuantity={selectedPost.qtyRemaining}
          onQuantityChange={setQuantity}
          onAddToCart={handleAddToCart}
          onClose={handleCloseBottomSheet}
        />
      ) : hasItemsInCart && selectedMenus.length > 0 ? (
        <StickyFooter
          menuName={selectedMenus.map((m) => m.menuName)}
          count={selectedMenus.map((m) => m.quantity.toString())}
          price={selectedMenus.map((m) => {
            const post = posts.find((p) => p.postId === m.postId);
            return ((post?.discountedPrice || 0) * m.quantity).toLocaleString('ko-KR');
          })}
          originalPrice={selectedMenus
            .reduce((sum, menu) => {
              const post = posts.find((p) => p.postId === menu.postId);
              return sum + (post?.originalPrice || 0) * menu.quantity;
            }, 0)
            .toLocaleString('ko-KR')}
          totalPaymentAmount={totalCartPrice(posts).toLocaleString('ko-KR') + '원'}
          context='order'
          onOrderClick={handlePayment}
        />
      ) : null}
    </div>
  );
}
