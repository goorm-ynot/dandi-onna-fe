// store/useCartStore.ts (새로 생성)
import { PaymentDataType } from '@/types/paymentType';
import { Post } from '@/types/storeType';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CartItem {
  postId: number;
  menuName: string;
  discountedPrice: number;
  quantity: number; // 선택 수량
  qtyRemaining: number; // 재고 수량
  visitTime?: string; // 방문 예정 시간 (선택 사항)
  originalPrice: number; // 원래 가격
  discountPercent: number; // 할인 비율
}

interface PaymentSnapshot extends PaymentDataType {
  storeName: string; // 가게 이름
  storeAddress: string; // 가게 주소
  orderTime: string; // 주문 생성 시간(visitTime과 구분)
}

interface CartState {
  // 장바구니
  selectedMenus: CartItem[];
  cartCreatedAt: string | null;

  // 결제
  paymentSnapshot: PaymentSnapshot | null;
  isInPayment: boolean;
  paymentError: string | null;

  // 결제 완료 정보
  paymentResult: PaymentResponse | null;

  // 장바구니 액션들
  addMenuToCart: (postId: number, quantity: number, post: Post) => void;
  removeMenuFromCart: (postId: number) => void;
  updateCartQuantity: (postId: number, quantity: number) => void;
  clearCart: () => void;

  // 만료시간 관련
  isCartExpired: () => boolean;
  getRemainingTime: () => number;
  clearExpiredCart: () => boolean;

  // 결제 액션
  createPaymentSnapshot: (storeData: any, postsData: any[], visitTime: string) => void;
  setPaymentMethod: (method: PaymentDataType['paymentMethod']) => void;
  setAppliedDiscount: (discount: number) => void;
  setInPayment: (inPayment: boolean) => void;
  setPaymentError: (error: string | null) => void;
  setPaymentResult: (result: PaymentResponse) => void;
  completePayment: (result: PaymentResponse) => void;
  cancelPayment: () => void;

  // 유틸리티
  getTotalCartItems: () => number;
  getTotalCartPrice: (posts: any[]) => number; // posts를 매개변수로 받음
  getPaymentData: () => PaymentDataType | null;
  getPaymentTotal: () => number;
  canProceedToPayment: () => boolean;
}

const CART_EXPIRE_MINUTES = 3; // 장바구니 만료 시간(3분)

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      selectedMenus: [],
      cartCreatedAt: null,

      // 결제 상태들
      paymentSnapshot: null,
      isInPayment: false,
      paymentError: null,
      paymentResult: null,

      addMenuToCart: (postId, quantity, post) => {
        const now = new Date();
        set((state) => {
          // 기존 메뉴가 있으면 수량만 업데이트, 없으면 새로 추가
          const existingMenu = state.selectedMenus.find((menu) => menu.postId === postId);

          // 장바구니가 비어있거나, 같은 시간대의 상품만 추가 가능
          if (state.selectedMenus.length > 0 && !existingMenu) {
            const firstMenu = state.selectedMenus[0];
            if (firstMenu.visitTime !== post.expireAt) {
              // 다른 시간대 상품은 추가 불가
              alert('같은 시간대의 상품만 담을 수 있습니다.');
              return state;
            }
          }

          return {
            selectedMenus: existingMenu
              ? state.selectedMenus.map((menu) => (menu.postId === postId ? { ...menu, quantity } : menu))
              : [
                  ...state.selectedMenus,
                  {
                    postId,
                    menuName: post.menuName,
                    discountedPrice: post.discountedPrice,
                    quantity,
                    qtyRemaining: post.qtyRemaining,
                    visitTime: post.expireAt,
                    originalPrice: post.originalPrice,
                    discountPercent: post.discountPercent,
                  },
                ],
            cartCreatedAt: state.cartCreatedAt || now.toISOString(),
          };
        });
      },

      removeMenuFromCart: (postId) => {
        set((state) => ({
          selectedMenus: state.selectedMenus.filter((menu) => menu.postId !== postId),
        }));
      },

      updateCartQuantity: (postId, quantity) => {
        if (quantity <= 0) {
          get().removeMenuFromCart(postId);
          return;
        }

        set((state) => ({
          selectedMenus: state.selectedMenus.map((menu) => (menu.postId === postId ? { ...menu, quantity } : menu)),
        }));
      },

      clearCart: () =>
        set({
          selectedMenus: [],
          cartCreatedAt: null,
        }),

      isCartExpired: () => {
        const { cartCreatedAt } = get();
        if (!cartCreatedAt) return false;

        const created = new Date(cartCreatedAt);
        const now = new Date();
        const diffMinutes = (now.getTime() - created.getTime()) / (1000 * 60);

        return diffMinutes > CART_EXPIRE_MINUTES;
      },

      getRemainingTime: () => {
        const { cartCreatedAt } = get();
        if (!cartCreatedAt) return 0;

        const created = new Date(cartCreatedAt);
        const now = new Date();
        const diffMinutes = (now.getTime() - created.getTime()) / (1000 * 60);

        return Math.max(0, CART_EXPIRE_MINUTES - diffMinutes);
      },

      clearExpiredCart: () => {
        if (get().isCartExpired()) {
          set({ selectedMenus: [], cartCreatedAt: null });
          return true;
        }
        return false;
      },

      getTotalCartItems: () => {
        return get().selectedMenus.reduce((total, menu) => total + menu.quantity, 0);
      },

      getTotalCartPrice: (posts) => {
        let totalPrice = 0;
        const { selectedMenus } = get();

        selectedMenus.forEach((menu) => {
          const post = posts.find((p) => p.postId === menu.postId);
          if (post) {
            totalPrice += post.discountedPrice * menu.quantity;
          }
        });
        return totalPrice;
      },

      // 🔥 결제 액션들
      createPaymentSnapshot: (storeData, postsData, visitTime) => {
        const { selectedMenus } = get();

        const items = selectedMenus.map((cartItem) => {
          const post = postsData.find((p) => p.postId === cartItem.postId);
          return {
            noShowPostId: cartItem.postId,
            menuName: post?.menuName || '',
            quantity: cartItem.quantity,
            originalPrice: post?.originalPrice || 0,
            discountRate: post?.discountPercent || 0,
          };
        });

        const totalAmount = items.reduce(
          (sum, item) => sum + item.originalPrice * item.quantity * (1 - item.discountRate / 100),
          0
        );
        const originalTotalAmount = items.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0);
        const totalDiscount = originalTotalAmount - totalAmount;

        // visitTime이 없으면 selectedMenus의 첫 번째 항목의 visitTime 사용
        const finalVisitTime = visitTime || selectedMenus[0]?.visitTime || '';

        set({
          paymentSnapshot: {
            storeId: storeData.storeId,
            storeName: storeData.name,
            storeAddress: storeData.addressRoad,
            visitTime: finalVisitTime,
            paymentMethod: 'CARD', // 기본값
            totalAmount,
            appliedDiscountAmount: totalDiscount, // 자동 계산된 할인 금액
            items,
            orderTime: new Date().toISOString(),
          },
          isInPayment: true,
          paymentError: null,
        });
      },

      setPaymentMethod: (method) =>
        set((state) => ({
          paymentSnapshot: state.paymentSnapshot
            ? {
                ...state.paymentSnapshot,
                paymentMethod: method,
              }
            : null,
        })),

      setAppliedDiscount: (discount) =>
        set((state) => ({
          paymentSnapshot: state.paymentSnapshot
            ? {
                ...state.paymentSnapshot,
                appliedDiscountAmount: discount,
                totalAmount: state.paymentSnapshot.totalAmount - discount,
              }
            : null,
        })),

      setInPayment: (inPayment) => set({ isInPayment: inPayment }),
      setPaymentError: (error) => set({ paymentError: error }),
      setPaymentResult: (result) => set({ paymentResult: result }),

      completePayment: (result) =>
        set({
          selectedMenus: [], // 장바구니 비우기
          cartCreatedAt: null,
          isInPayment: false,
          paymentError: null,
          paymentResult: result, // 결제 결과 저장
        }),

      cancelPayment: () =>
        set({
          paymentSnapshot: null,
          isInPayment: false,
          paymentError: null,
          paymentResult: null,
        }),

      // 🔥 API 호출용 데이터 생성
      getPaymentData: () => {
        const { paymentSnapshot } = get();
        if (!paymentSnapshot) return null;
        console.log('paymentSnapshow check:', paymentSnapshot);
        return {
          storeId: paymentSnapshot.storeId,
          visitTime: paymentSnapshot.visitTime,
          paymentMethod: paymentSnapshot.paymentMethod, // 결제 수단
          totalAmount: paymentSnapshot.totalAmount, // 최종 결제 금액
          appliedDiscountAmount: paymentSnapshot.appliedDiscountAmount, // 얼마나 할인 되었는지 금액
          items: paymentSnapshot.items,
        };
      },

      getPaymentTotal: () => {
        const { paymentSnapshot } = get();
        return paymentSnapshot?.totalAmount || 0;
      },

      canProceedToPayment: () => {
        const { selectedMenus, isCartExpired } = get();
        return selectedMenus.length > 0 && !isCartExpired();
      },
    }),
    {
      name: 'cart-storage', // 로컬스토리지 키
      // 모든 장바구니 관련 상태만 저장
      storage: createJSONStorage(() => localStorage),

      onRehydrateStorage: () => (state) => {
        // 리하이드레이션 후 만료된 장바구니 자동 삭제
        if (state?.cartCreatedAt) {
          const created = new Date(state.cartCreatedAt);
          const now = new Date();
          const diffMinutes = (now.getTime() - created.getTime()) / (1000 * 60);
          if (diffMinutes > CART_EXPIRE_MINUTES) {
            return {
              ...state,
              selectedMenus: [],
              cartCreatedAt: null,
            };
          }
        }
        return state;
      },
    }
  )
);
