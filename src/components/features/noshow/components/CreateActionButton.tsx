import { Button } from '@/components/ui/button';

export default function CreateActionButton() {
  return (
    // <div className='flex flex-col gap-8 w-full px-20 pb-20 pt-[8px]'>
    <div className='flex flex-row gap-10 w-full px-20 pb-20'>
      <Button type='button' variant={'outline'} className='body3 w-full px-[12px] py-[10px]'>
        등록 취소
      </Button>
      <Button type='submit' className='body5 w-full px-[12px] py-[10px]'>
        등록하기
      </Button>
    </div>
  );
}
