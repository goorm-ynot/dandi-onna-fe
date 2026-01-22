/**
 * RadioGroup 컴포넌트
 * - 라디오 버튼 그룹
 * - 단일 선택 UI
 */

import * as React from 'react';
import { cn } from '@/lib/utils';

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  className?: string;
  disabled?: boolean;
}

export const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ options, value, onChange, name, className, disabled = false }, ref) => {
    const handleChange = (optionValue: string) => {
      if (!disabled && onChange) {
        onChange(optionValue);
      }
    };

    return (
      <div ref={ref} className={cn('flex flex-col gap-16', className)} role="radiogroup">
        {options.map((option) => {
          const isChecked = value === option.value;
          const radioId = `${name}-${option.value}`;

          return (
            <label
              key={option.value}
              htmlFor={radioId}
              className={cn(
                'flex items-start gap-16 p-14 rounded-10 border border-line-normal bg-white rounded-md cursor-pointer transition-all ',
                'hover:border-primitives-brand hover:bg-primitives-brand/5',
                isChecked && 'py-16 border-primitives-brand',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            >
              <div className="relative flex items-center justify-center w-20 h-20 flex-shrink-0 mt-2">
                <input
                  type="radio"
                  id={radioId}
                  name={name}
                  value={option.value}
                  checked={isChecked}
                  onChange={() => handleChange(option.value)}
                  disabled={disabled}
                  className="sr-only"
                />
                <div
                  className={cn(
                    'w-20 h-20 rounded-full border-2 transition-all',
                    isChecked
                      ? 'border-primitives-brand bg-white'
                      : 'border-gray-300 bg-white'
                  )}
                >
                  {isChecked && (
                    <div className="w-full h-full rounded-full p-4">
                      <div className="w-full h-full rounded-full bg-primitives-brand" />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-10 flex-1">
                <span
                  className={cn(
                    'title3 text-foreground-normal',
                  )}
                >
                  {option.label}
                </span>
                {option.description && (
                  <span className="body1 text-foreground-secondary">{option.description}</span>
                )}
              </div>
            </label>
          );
        })}
      </div>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

export default RadioGroup;
