'use client';

import React from 'react';
import { Button } from '@/components/ui/button';

interface NumberStepperProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}

export default function NumberStepper({ value, min = 0, max = 10, onChange }: NumberStepperProps) {
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
        className={`p-[7px] border ${
          isMinDisabled ? 'border-[#a3a3a3] bg-white' : 'border-[#8749fe] bg-white'
        } rounded-[6px]`}>
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M5 12H19'
            stroke={isMinDisabled ? '#a3a3a3' : '#a3a3a3'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </Button>

      {/* Number Display */}
      <div className='bg-white border border-[#a3a3a3] rounded-[6px] h-[38px] min-w-[46px] px-[18px] py-[10px] flex items-center justify-center'>
        <p className='body3 text-[#262626]'>{value}</p>
      </div>

      {/* Plus Button */}
      <Button
        variant='outline'
        size='xs'
        onClick={handleIncrement}
        disabled={isMaxDisabled}
        className={`p-[7px] border ${
          isMaxDisabled ? 'border-[#a3a3a3] bg-white' : 'border-[#8749fe] bg-white'
        } rounded-[6px]`}>
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M12 5V19M5 12H19'
            stroke={isMaxDisabled ? '#a3a3a3' : '#8749fe'}
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </Button>
    </div>
  );
}
