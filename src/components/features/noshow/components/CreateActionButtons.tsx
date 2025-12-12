import { Button } from '@/components/ui/button';
import { NoShowMenu } from '@/types/boardData';

interface EditActionButtons {
  noShowData: NoShowMenu;
  onDataUpdate?: (data: any) => void;
}

export default function EditActionButtons({ noShowData, onDataUpdate }: EditActionButtons) {
  return (
    <div className='grid grid-cols-2 gap-4 pt-10 pb-20 px-20'>
      <Button type='button' variant='outline' size='lg' className='w-full body3' onClick={() => onDataUpdate?.(noShowData)}>
        노쇼메뉴 삭제
      </Button>
      <Button type='submit' variant='default' size='lg' className='w-full body5'>
        노쇼메뉴 수정
      </Button>
    </div>
  );
}
