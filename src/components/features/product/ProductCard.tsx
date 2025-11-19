'use client';

import React from 'react';

type ProductCardState = 'selected' | 'default' | 'disabled';

interface ProductCardProps {
  image: string;
  title?: string;
  description?: string;
  originalPrice?: number;
  discountRate?: number;
  salePrice?: number;
  stock?: number;
  state?: ProductCardState;
  onClick?: () => void;
}

export default function ProductCard({
  image,
  title = 'label',
  description = 'label',
  originalPrice = 0,
  discountRate = 0,
  salePrice = 0,
  stock = 0,
  state = 'default',
  onClick,
}: ProductCardProps) {
  const formatPrice = (price: number) => price.toLocaleString('ko-KR');

  const baseClasses = 'bg-white flex flex-col gap-5 p-4 rounded-[10px] w-full';
  const selectedClasses = 'border-2 border-[#a87bfe]';
  const defaultClasses = 'shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)]';
  const disabledClasses = 'shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] opacity-60';

  const stateClass = state === 'selected' ? selectedClasses : state === 'disabled' ? disabledClasses : defaultClasses;

  return (
    <div className={`${baseClasses} ${stateClass} cursor-pointer hover:shadow-lg transition-all`} onClick={onClick}>
      {/* Header */}
      <div className='flex gap-[10px] items-start w-full'>
        {/* Image */}
        <div className='bg-neutral-100 rounded-[6px] overflow-hidden shrink-0 w-[84px] h-[84px] relative'>
          <img src={image} alt={title} className='object-cover w-full h-full' />
        </div>

        {/* Text Area */}
        <div className='flex-1 flex flex-col gap-[10px] items-start min-w-0'>
          <p className='title3 text-[#262626] line-clamp-2'>{title}</p>
          <p className='body1 text-[#4c4c4c] line-clamp-2'>{description}</p>
        </div>
      </div>

      {/* Body */}
      <div className='flex items-end justify-between w-full gap-4'>
        {/* Price */}
        <div className='flex-1 flex flex-col items-start gap-1'>
          {/* Original Price */}
          <div className='flex items-center gap-1 body1 text-[#a3a3a3] line-through'>
            <span>{formatPrice(originalPrice)}</span>
            <span>원</span>
          </div>

          {/* Discount and Sale Price */}
          <div className='flex items-center gap-1 w-full'>
            <div className='flex items-center gap-[2px] body5 text-[#8949fe]'>
              <span>{discountRate}</span>
              <span>%</span>
            </div>
            <div className='flex items-center gap-[2px] body7 text-[#262626]'>
              <span>{formatPrice(salePrice)}</span>
              <span>원</span>
            </div>
          </div>
        </div>

        {/* Stock */}
        <div className='flex flex-col items-end gap-[2px] shrink-0 whitespace-nowrap'>
          <span className='body1 text-[#4c4c4c]'>남은수량</span>
          <span className='body2 text-[#8749fe]'>{stock}</span>
        </div>
      </div>

      {/* Disabled Overlay */}
      {state === 'disabled' && (
        <div className='absolute inset-0 rounded-[10px] shadow-[inset_0px_0px_250px_0px_rgba(0,0,0,0.2)] pointer-events-none' />
      )}
    </div>
  );
}
