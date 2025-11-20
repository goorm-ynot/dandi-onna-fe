export default function ReservedMenuSkeleton() {
  return (
    <div className='bg-white rounded-[10px] shadow-[0px_2px_6px_0px_rgba(0,0,0,0.1)] flex flex-col gap-3 w-full animate-pulse'>
      {/* Image Skeleton */}
      <div className='relative bg-neutral-200 rounded-t-[10px] overflow-hidden h-[160px] w-full'>
        <div className='absolute bottom-0 left-1/2 -translate-x-1/2 bg-neutral-300 w-full px-[10px] py-[10px] h-[40px]' />
      </div>

      {/* Content Area */}
      <div className='flex flex-col gap-[10px] px-4 pb-0 w-full'>
        {/* Header */}
        <div className='flex flex-col gap-[10px] w-full'>
          {/* Title with Badge */}
          <div className='flex gap-2 items-center w-full'>
            <div className='h-5 bg-neutral-200 rounded w-32' />
            <div className='h-5 bg-neutral-200 rounded w-12 shrink-0' />
          </div>

          {/* Menu Items */}
          <div className='h-4 bg-neutral-200 rounded w-48' />
        </div>

        {/* Price Section */}
        <div className='border-t border-[#dddddd] py-[14px] flex items-center justify-between w-full'>
          <div className='h-4 bg-neutral-200 rounded w-16' />
          <div className='h-5 bg-neutral-200 rounded w-24' />
        </div>
      </div>
    </div>
  );
}
