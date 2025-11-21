// hooks/usePriceCalculation.ts
import { useMemo } from 'react';

export function usePriceCalculation(price: number, quantity: number, discountPercent: number = 0) {
  const calculations = useMemo(() => {
    const originalTotal = price * quantity;
    const discountTotal = originalTotal * (1 - discountPercent / 100);

    return {
      originalTotal,
      discountTotal,
      discountAmount: originalTotal - discountTotal,
    };
  }, [price, quantity, discountPercent]);

  return calculations;
}
