import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuantitySelectorModalProps {
  productName?: string;
  maxQuantity?: number;
  onAdd?: (quantity: number) => void;
  onCancel?: () => void;
}

export const QuantitySelectorModal: React.FC<QuantitySelectorModalProps> = ({
  productName = 'label',
  maxQuantity = 10,
  onAdd,
  onCancel,
}) => {
  const [quantity, setQuantity] = useState(0);

  const handleMinus = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handlePlus = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const handleAdd = () => {
    if (onAdd) {
      onAdd(quantity);
    }
  };

  return (
    <div className='flex w-full flex-col gap-5 rounded-t-lg bg-background-normal px-4 py-5 shadow-[-6px_0px_10px_0px_rgba(0,0,0,0.06)]'>
      {/* 메뉴명 헤더 */}
      <div className='flex w-full items-start justify-between'>
        <p className='body3 text-foreground-normal'>메뉴</p>
        <p className='body5 text-foreground-normal font-semibold'>{productName}</p>
      </div>

      {/* 수량 선택 섹션 */}
      <div className='flex w-full items-center justify-between'>
        <p className='title1 text-foreground-normal text-center'>수량 선택(최대 {maxQuantity}개)</p>

        {/* 수량 조절 (Number Stepper) */}
        <div className='flex items-center gap-1.5'>
          {/* 마이너스 버튼 */}
          <Button
            onClick={handleMinus}
            disabled={quantity === 0}
            variant='outline'
            size={'xs'}
            className='flex h-9 items-center justify-center rounded border border-primary-default bg-background-normal disabled:border-border-tertiary disabled:bg-state-disabled'>
            <Minus size={24} className='text-foreground-normal' />
          </Button>

          {/* 수량 입력 필드 */}
          <div className='flex h-9 w-full items-center justify-center rounded border border-border-tertiary bg-background-normal'>
            <p className='body3 text-center text-foreground-normal'>{quantity}</p>
          </div>

          {/* 플러스 버튼 */}
          <Button
            variant='secondary'
            size={'xs'}
            disabled={quantity >= maxQuantity}
            onClick={handlePlus}
            className='flex h-9  items-center justify-center rounded border border-border-normal bg-state-disabled disabled:border-border-normal disabled:bg-state-disabled'>
            <Plus size={24} className='text-foreground-normal' />
          </Button>
        </div>
      </div>

      {/* 담기 버튼 */}
      <button
        onClick={handleAdd}
        className='flex h-11 w-full items-center justify-center rounded bg-primitives-brand3 px-5 py-2.5'>
        <p className='body5 text-center text-foreground-inverse font-semibold'>담기</p>
      </button>
    </div>
  );
};
