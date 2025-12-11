import { Button } from '@/components/ui/button';

export default function CreateActionButton() {
  return (
    <div className='flex flex-col gap-8 w-full px-20 pb-20 pt-[8px]'>
      <Button type='submit' className='w-full'>
        노쇼메뉴 등록
      </Button>
    </div>
  );
}
