export default function StoreProfileSkeleton() {
  return (
    <div className='flex gap-[10px] items-start w-full animate-pulse'>
      {/* Image Skeleton */}
      <div className='bg-neutral-200 rounded-[10px] shrink-0 w-[86px] h-[86px]' />

      {/* Text Area */}
      <div className='flex-1 flex flex-col gap-2 min-w-0'>
        {/* Header */}
        <div className='w-full'>
          <div className='h-5 bg-neutral-200 rounded w-32' />
        </div>

        {/* Body */}
        <div className='flex gap-1 items-start w-full'>
          {/* Icons */}
          <div className='flex flex-col gap-[6px] items-center py-[2px] shrink-0'>
            <div className='w-[14px] h-[14px] bg-neutral-200 rounded-full' />
            <div className='w-[16px] h-[16px] bg-neutral-200 rounded-full' />
          </div>

          {/* Text Area */}
          <div className='flex flex-col gap-1'>
            <div className='h-4 bg-neutral-200 rounded w-24' />
            <div className='h-4 bg-neutral-200 rounded w-16' />
          </div>
        </div>
      </div>
    </div>
  );
}
