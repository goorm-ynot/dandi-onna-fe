// src/components/ui/checkbox.tsx
'use client';

import React, { forwardRef } from 'react';

interface CheckboxProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  label?: string | React.ReactNode;
  id?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked = false, onCheckedChange, disabled = false, className = '', label, id }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        onCheckedChange?.(e.target.checked);
      }
    };

    return (
      <div className={`flex items-start gap-6 ${className}`}>
        <div className='relative flex items-center justify-center'>
          <input
            ref={ref}
            id={id}
            type='checkbox'
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            className='peer sr-only'
          />
          <label
            htmlFor={id}
            className={`
              flex items-center justify-center w-5 h-5 rounded cursor-pointer
              transition-all duration-200
              ${
                checked
                  ? 'bg-[#8749FE] border-[#8749FE]'
                  : 'bg-white border border-[#C6C6C6] hover:border-[#8749FE]'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}>
            {checked && (
              <svg width='12' height='10' viewBox='0 0 12 10' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M1 5L4.5 8.5L11 1'
                  stroke='white'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            )}
          </label>
        </div>
        {label && (
          <label htmlFor={id} className={`body1 text-[#262626] cursor-pointer ${disabled ? 'opacity-50' : ''}`}>
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
