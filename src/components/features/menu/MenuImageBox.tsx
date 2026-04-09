import { cn } from '@/lib/utils';
import { Package2 } from 'lucide-react';

interface MenuImageBoxProps {
  name: string;
  disabled: boolean;
  imageUrl?: string;
  className?: string;
}

export function MenuImageBox({ name, disabled, imageUrl, className }: MenuImageBoxProps) {
  return (
    <div
      className={cn(
        'flex h-[100px] w-[100px] shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-[#F1ECFF] bg-gradient-to-br from-[#EEE7FF] to-[#FAF7FF]',
        disabled && 'border-[#ECECEC] bg-[#F6F6F6]',
        className
      )}>
      {imageUrl ? (
        <img src={imageUrl} alt={name} className='h-full w-full object-cover' />
      ) : (
        <div className='flex flex-col items-center gap-1'>
          <Package2 className={cn('h-7 w-7', disabled ? 'text-[#C6C6C6]' : 'text-[#8749FE]')} />
          <span className={cn('caption3', disabled ? 'text-[#C6C6C6]' : 'text-[#8749FE]')}>메뉴</span>
        </div>
      )}
      <span className='sr-only'>{name}</span>
    </div>
  );
}
