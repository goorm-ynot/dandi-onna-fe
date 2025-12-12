'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { getProxiedImageUrl } from '@/lib/imageProxy';
import { HeartIcon } from '@/components/icons';

interface StoreDetailInfoProps {
  name: string;
  description: string;
  address: string;
  distance: number;
  imageUrl: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  onShowMap?: () => void;
}

export default function StoreDetailInfo({
  name,
  description,
  address,
  distance,
  imageUrl,
  isFavorite,
  onToggleFavorite,
  onShowMap,
}: StoreDetailInfoProps) {
  return (
    // <div className='flex flex-col gap-5 w-full px-[16px]'>
    <div className='flex flex-col gap-5 w-full '>
      {/* Store Image */}
      <div className='w-full h-[240px] bg-neutral-100 overflow-hidden relative'>
        <Image
          src={getProxiedImageUrl(imageUrl)}
          alt={name}
          fill
          className='object-cover'
          sizes='full'
          loader={({ src }) => src}
          unoptimized
        />
      </div>

      {/* Store Information */}
      <div className='flex flex-col w-full gap-[20px]  px-[16px]'>
        {/* Title Section */}
        <div className='flex flex-col gap-[20px] w-full'>
          {/* Name and Favorite */}
          <div className='flex items-center justify-between w-full'>
            <p className='title6 text-[#262626]'>{name}</p>
            <Button
              variant='ghost'
              size='icon'
              onClick={onToggleFavorite}
              className='p-0 hover:bg-transparent w-6 h-6 mr-3'>
              <HeartIcon size={24} filled={isFavorite} />
            </Button>
          </div>

          {/* Description */}
          <p className='body3 text-[#262626] whitespace-pre-wrap'>{description}</p>
        </div>

        {/* Location Section */}
        <div className='border-t border-b border-[#e1e1e1] py-5 flex gap-0 items-start w-full'>
          {/* Location Icon */}
          <svg
            width='18'
            height='18'
            viewBox='0 0 18 18'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
            className='shrink-0 mt-0.5'>
            <path
              d='M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z'
              stroke='#262626'
              strokeWidth='1.5'
            />
            <path
              d='M9 15.75C12 12.75 15 10.146 15 7.5C15 4.18629 12.3137 1.5 9 1.5C5.68629 1.5 3 4.18629 3 7.5C3 10.146 6 12.75 9 15.75Z'
              stroke='#262626'
              strokeWidth='1.5'
            />
          </svg>

          {/* Location Info */}
          <div className='flex flex-col gap-[8px] flex-1 ml-0'>
            <p className='body3 text-[#262626] whitespace-pre-wrap'>{address}</p>

            <div className='flex gap-[6px] items-start w-full'>
              {/* Distance */}
              <div className='flex gap-[2px] items-center body3 text-[#262626] font-semibold'>
                <span>{distance}</span>
                <span>m</span>
              </div>

              {/* Map Button */}
              <Button
                variant='map'
                size='map'
                onClick={onShowMap}
                className='h-auto px-[10px] py-1'>
                <span className='body3 text-[#262626]'>지도보기</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
