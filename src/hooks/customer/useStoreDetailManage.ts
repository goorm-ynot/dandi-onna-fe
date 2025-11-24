import { useStoreDetailStore } from '@/store/useStoreDetailStore';
import { useStorePostsInfinite } from './useStoreDetailQueries';
import { useEffect, useMemo } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useFavoriteMutation } from './useStoresQueries';
import { useThrottle } from '@/hooks/useThrottle';
import { Post } from '@/types/storeType';
import { useFavoriteStore } from '@/store/useFavorite';

export const useStoreDetailManage = (storeId: string) => {
  const {
    // store state
    currentStore,
    isLoading: storeLoading,
    error: storeError,
    // store actions
    setCurrentStore,
    setPosts,
    setPagination,
    setIsLoading,
    setError,
    // pagination
    appendPosts,
  } = useStoreDetailStore();

  const {
    selectedMenus,
    createPaymentSnapshot,
    addMenuToCart,
    removeMenuFromCart,
    updateCartQuantity,
    clearCart,
    isCartExpired,
    getRemainingTime,
    clearExpiredCart,
    getTotalCartItems,
    getTotalCartPrice,
  } = useCartStore();
  // 찜하기 상태
  const { favorite, setFavorite } = useFavoriteStore();

  // React Query 무한스크롤 데이터
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: queryLoading,
    error: queryError,
    refetch,
  } = useStorePostsInfinite(storeId || '');

  // ================= 데이터 동기화 ===================
  // 🔥 computed values (zustand에 저장하지 않고 계산)
  const allPosts = useMemo(() => {
    return infiniteData?.pages?.flatMap((page) => page.posts || []) || [];
  }, [infiniteData]);

  const store = useMemo(() => {
    return infiniteData?.pages[0]?.store || null;
  }, [infiniteData]);

  const pagination = useMemo(() => {
    if (!infiniteData?.pages || infiniteData.pages.length === 0) {
      return {
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 1,
        hasNext: false,
      };
    }
    return infiniteData.pages[infiniteData.pages.length - 1]?.page || null;
  }, [infiniteData]);

  // favorite 상태
  const like = useMemo(() => {
    return infiniteData?.pages[0]?.favorited || false;
  }, [infiniteData]);

  // 🔥 하나의 useEffect로 통합 + 의존성 최소화
  useEffect(() => {
    // 로딩/에러 상태만 zustand에 동기화
    setIsLoading(queryLoading);
    setError(queryError?.message || null);

    // store 정보만 zustand에 저장
    if (store && store.storeId !== currentStore?.storeId) {
      setCurrentStore(store);
    }

    // favorite 정보 zustand에 저장
    if (like !== undefined) {
      // Assuming you have a zustand action like setFavorite
      setFavorite(like);
    }
  }, [
    queryLoading,
    queryError,
    store?.storeId, // storeId만 비교해서 불필요한 업데이트 방지
    setIsLoading,
    setError,
    setCurrentStore,
  ]);
  // ================= 데이터 동기화 end ===================

  //=============== cart utilities ===============
  // 카트 만료 체크
  const checkCartExpiration = () => {
    return isCartExpired();
  };

  // 카트 남은 시간 가져오기
  const getCartRemainingTime = () => {
    return getRemainingTime();
  };

  // 만료된 카트 클리어
  const clearExpiredCartItems = () => {
    return clearExpiredCart();
  };

  // 카트 총 아이템 수
  const totalCartItems = () => {
    return getTotalCartItems();
  };

  // 카트 총 가격
  const totalCartPrice = (posts: any[]) => {
    return getTotalCartPrice(posts);
  };

  // ================ cart utilities end ================
  // ================ cart actions ====================
  // 카트에 추가
  const addToCart = (post: Post, quantity: number) => {
    addMenuToCart(post.postId, quantity, post);
  };

  // 카트에서 제거
  const removeFromCart = (postId: number) => {
    removeMenuFromCart(postId);
  };

  // 카트 수량 업데이트
  const updateQuantityInCart = (postId: number, quantity: number) => {
    updateCartQuantity(postId, quantity);
  };

  // 카트 비우기
  const clearCartItems = () => {
    clearCart();
  };
  // ================ cart actions end =================

  // =============== 찜하기 액션 ==================
  const favoriteMutation = useFavoriteMutation();

  // 쓰로틀링 적용 (1초에 1번만 실행)
  const throttledToggleFavorite = useThrottle((isLiked: boolean) => {
    if (favoriteMutation.isPending) return;
    const result = favoriteMutation.mutate({ storeId, isLiked });
  }, 1000);

  const toggleFavorite = (isLiked: boolean) => {
    // console.log('Toggling favorite from useStoreDetailManage:', !isLiked);
    throttledToggleFavorite(isLiked);
  };
  // =============== 찜하기 액션 end ==================

  return {
    // store state
    store,
    posts: allPosts,
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
    // payment utilities
    createPaymentSnapshot,

    // cart actions
    addToCart,
    removeFromCart,
    updateQuantityInCart,
    clearCartItems,

    // favorite state
    favorite,
    // favorite actions
    toggleFavorite,
    isFavoriteLoading: favoriteMutation.isPending, // 찜하기 로딩 상태
  };
};
