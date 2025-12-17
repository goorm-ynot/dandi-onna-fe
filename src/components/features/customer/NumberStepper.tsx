'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import clsx from 'clsx';

interface NumberStepperProps {
  value: number;
  min?: number;
  max?: number;
  division?: 'customer' | 'seller'; // 소비자인지 판매자인지 구분 필요 
  onChange: (value: number) => void;
}

export default function NumberStepper({ value = 1, min = 0, max = 10, division='customer', onChange }: NumberStepperProps) {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const isMinDisabled = value <= min;
  const isMaxDisabled = value >= max;

  return (
    <div className='flex gap-[6px] items-center'>
      {/* Minus Button */}
      <Button
        variant='outline'
        size='xs'
        onClick={handleDecrement}
        disabled={isMinDisabled}
        className={clsx(
          'p-[7px] border rounded-[6px] active:scale-95 active:opacity-70 transition-all duration-100',
          isMinDisabled ? 'border-[#c6c6c6]' : 'border-[#8749fe]',
          division === 'seller' ? 'bg-system-mauve-light' : 'bg-white'
        )}>
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M5 12H19'
            stroke={isMinDisabled ? '#c6c6c6' : '#8749fe'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </Button>

      {/* Number Display */}
      <div className='bg-white border border-border-tertiary rounded-[6px] h-[38px] min-w-[46px] flex items-center justify-center'>
        <input
          type='number'
          value={value}
          onChange={(e) => {
            const newValue = parseInt(e.target.value) || 0;
            if (newValue >= min && newValue <= max) {
              onChange(newValue);
            }
          }}
          className='body3 text-[#262626] text-center w-[18px] h-full bg-transparent border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
        />
      </div>

      {/* Plus Button */}
      <Button
        variant='outline'
        size='xs'
        onClick={handleIncrement}
        disabled={isMaxDisabled}
        className={clsx(
          'p-[7px] border rounded-[6px] active:scale-95 active:opacity-70 transition-all duration-100',
          isMaxDisabled ? 'border-[#c6c6c6]' : 'border-border-primary',
          division === 'seller' ? 'bg-system-mauve-light' : 'bg-white'
        )}>
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M12 5V19M5 12H19'
            stroke={isMaxDisabled ? '#c6c6c6' : '#8749fe'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </Button>
    </div>
  );
}
