import { cn } from '@/lib/utils';
import { MenuStatus } from './menuTypes';

interface MenuStatusToggleProps {
  status: MenuStatus;
  onChange: (nextStatus: MenuStatus) => void;
}

export function MenuStatusToggle({ status, onChange }: MenuStatusToggleProps) {
  return (
    <div className='flex items-center rounded-[10px] bg-[#F9F9F9] p-[6px]'>
      <button
        type='button'
        onClick={() => onChange('ON_SALE')}
        className={cn(
          'body4 min-w-[74px] rounded-[6px] px-5 py-[10px] transition-all',
          status === 'ON_SALE' ? 'bg-white text-[#262626] shadow-4' : 'bg-transparent text-[#A3A3A3]'
        )}>
        판매중
      </button>
      <button
        type='button'
        onClick={() => onChange('SOLD_OUT')}
        className={cn(
          'body4 min-w-[74px] rounded-[6px] px-5 py-[10px] transition-all',
          status === 'SOLD_OUT' ? 'bg-white text-[#DA3944] shadow-4' : 'bg-transparent text-[#A3A3A3]'
        )}>
        품절
      </button>
    </div>
  );
}
