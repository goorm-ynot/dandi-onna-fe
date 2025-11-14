import { Button } from '@/components/ui/button';

export default function EditActionButtons() {
  return (
    <div className='grid grid-cols-2 gap-4 border-t border-line-foreground pb-20'>
      <Button type='button' variant='outline' size='lg' className='w-full'>
        노쇼메뉴 삭제
      </Button>
      <Button type='submit' variant='default' size='lg' className='w-full'>
        노쇼메뉴 수정
      </Button>
    </div>
  );
}
