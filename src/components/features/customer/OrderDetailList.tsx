'use client';

import React from 'react';

interface OrderDetailListProps {
  item: string;
  itemAmount?: boolean;
  count?: string;
  price: string;
  type?: 'baseValue' | 'accentValue';
}

export default function OrderDetailList({
  item,
  itemAmount = false,
  count = '0',
  price,
  type = 'baseValue',
}: OrderDetailListProps) {
  const isTotalRow = item === '총 결제예정금액';

  return (
    <div className={`grid ${itemAmount ? 'grid-cols-[1fr_30px_100px]' : 'grid-cols-[1fr_100px]'} gap-3 w-full`}>
      {/* Title */}
      <div className='flex items-start'>
        <p className={`${isTotalRow ? 'title3' : 'title1'} text-[#4c4c4c]`}>{item}</p>
      </div>

      {/* Count (optional) */}
      {itemAmount && (
        <div className='flex items-center justify-center w-[30px]'>
          <p className='body3 text-[#262626]'>{count}</p>
        </div>
      )}

      {/* Price */}
      <div className='flex items-start justify-end gap-0'>
        <p className={`${isTotalRow ? 'body5' : 'body3'} text-[#262626] text-right`}>{price}</p>
        <p className={`${isTotalRow ? 'body5' : 'body3'} text-[#262626]`}>원</p>
      </div>
    </div>
  );
}
