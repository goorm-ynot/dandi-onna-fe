export default function StoreDetailSkeleton() {
  return (
    <div className='min-h-screen bg-white pb-[200px] animate-pulse'>
      {/* Header Skeleton */}
      <div className='h-14 bg-neutral-100 border-b border-neutral-200' />

      {/* Store Info Skeleton */}
      <div className='px-4 py-6'>
        <div className='flex gap-4'>
          {/* Image */}
          <div className='w-24 h-24 bg-neutral-200 rounded-lg shrink-0' />

          {/* Text Content */}
          <div className='flex-1 flex flex-col gap-2'>
            <div className='h-6 bg-neutral-200 rounded w-32' />
            <div className='h-4 bg-neutral-200 rounded w-full' />
            <div className='h-4 bg-neutral-200 rounded w-3/4' />
            <div className='flex gap-2 mt-1'>
              <div className='h-4 bg-neutral-200 rounded w-20' />
              <div className='h-4 bg-neutral-200 rounded w-16' />
            </div>
          </div>
        </div>
      </div>

      {/* Product List Skeleton */}
      <div className='flex flex-col gap-5 px-4 mt-8'>
        {[1, 2].map((section) => (
          <div key={section} className='flex flex-col gap-5 w-full'>
            {/* Time Slot Header Skeleton */}
            <div className='h-6 bg-neutral-200 rounded w-24' />

            {/* Product Cards Skeleton */}
            {[1, 2, 3].map((item) => (
              <div key={item} className='flex gap-4 p-4 border border-neutral-200 rounded-lg'>
                {/* Product Image */}
                <div className='w-20 h-20 bg-neutral-200 rounded-lg shrink-0' />

                {/* Product Info */}
                <div className='flex-1 flex flex-col gap-2'>
                  <div className='h-5 bg-neutral-200 rounded w-32' />
                  <div className='h-4 bg-neutral-200 rounded w-full' />
                  <div className='flex gap-2 items-center mt-1'>
                    <div className='h-5 bg-neutral-200 rounded w-16' />
                    <div className='h-4 bg-neutral-200 rounded w-12' />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
