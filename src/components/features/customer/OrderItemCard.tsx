'use client';

import React from 'react';
import NumberStepper from './NumberStepper';
import { X } from 'lucide-react';

interface OrderItemCardProps {
  menuName: string;
  quantity: number;
  maxQuantity: number;
  price: number;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
}

export default function OrderItemCard({
  menuName,
  quantity,
  maxQuantity,
  price,
  onQuantityChange,
  onRemove,
}: OrderItemCardProps) {
  return (
    <div className='bg-white rounded-[10px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] p-4 flex flex-col gap-5'>
      {/* Header */}
      <div className='flex items-center justify-between w-full'>
        <p className='title3 text-[#262626]'>{menuName}</p>
        <button onClick={onRemove} className='w-[16px] h-[16px] flex items-center justify-center'>
          <X size={16} />
        </button>
      </div>

      {/* Order Count */}
      <div className='flex items-start justify-between w-full'>
        <p className='title1 text-[#262626]'>주문수량</p>
        <div className='flex items-start gap-0'>
          <p className='body5 text-[#262626]'>{quantity}</p>
          <p className='body5 text-[#262626]'>개</p>
        </div>
      </div>

      {/* Stepper and Price */}
      <div className='flex items-center justify-between w-full border-t border-[#c6c6c6] pt-5'>
        <NumberStepper value={quantity} min={0} max={maxQuantity} onChange={onQuantityChange} />
        <div className='flex items-start gap-0'>
          <p className='body5 text-[#262626]'>{price.toLocaleString('ko-KR')}</p>
          <p className='body5 text-[#262626]'>원</p>
        </div>
      </div>
    </div>
  );
}
