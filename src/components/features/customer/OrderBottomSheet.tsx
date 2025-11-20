'use client';

import React from 'react';
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
  return (
    <div className='px-4'>
      {/* Backdrop */}
      <div className='fixed inset-0 bg-black bg-opacity-50 z-40' onClick={onClose} />

      {/* Bottom Sheet */}
      <div className='fixed bottom-0 left-0 right-0 bg-white shadow-[0px_-6px_10px_0px_rgba(0,0,0,0.06)] rounded-t-[10px] px-4 py-5 flex flex-col gap-5 z-50'>
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
