'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import NumberStepper from './NumberStepper';

interface OrderBottomSheetProps {
  menuName: string;
  quantity: number;
  maxQuantity?: number;
  onQuantityChange: (value: number) => void;
  onAddToCart: () => void;
  onClose?: () => void;
}

export default function OrderBottomSheet({
  menuName,
  quantity,
  maxQuantity = 10,
  onQuantityChange,
  onAddToCart,
  onClose,
}: OrderBottomSheetProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // 마운트 시 애니메이션 트리거
    setIsVisible(true);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // 애니메이션 완료 후 onClose 호출
    setTimeout(() => {
      onClose?.();
    }, 20);
  };

  return (
    <div className='px-4'>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black z-40 transition-opacity duration-[20ms] ${
          isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
        }`}
        onClick={handleClose}
      />

      {/* Bottom Sheet */}
      <div
        className={`fixed bottom-0 left-0 right-0 bg-white shadow-[0px_-6px_10px_0px_rgba(0,0,0,0.06)] rounded-t-[10px] px-4 py-5 flex flex-col gap-5 z-50 transition-transform duration-[20ms] ${
          isVisible ? 'translate-y-0' : 'translate-y-full'
        }`}>
        {/* Menu Name */}
        <div className='flex items-start justify-between w-full body3 text-[#262626]'>
          <p className='font-normal'>메뉴</p>
          <p className='font-semibold'>{menuName}</p>
        </div>

        {/* Quantity Selector */}
        <div className='flex items-center justify-between w-full'>
          <p className='title3 text-[#262626]'>수량 선택(최대 {maxQuantity}개)</p>
          <NumberStepper value={quantity} min={0} max={maxQuantity} onChange={onQuantityChange} />
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={onAddToCart}
          disabled={quantity === 0}
          className='w-full h-11 bg-[#8749fe] hover:bg-[#7239d4] rounded-[6px] flex items-center justify-center'>
          <p className='body5 text-white'>담기</p>
        </Button>
      </div>
    </div>
  );
}
