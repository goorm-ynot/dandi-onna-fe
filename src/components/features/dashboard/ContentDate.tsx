import { getNowDateString } from '@/lib/dateParse';
import React from 'react';

interface ContentDate {
  showDate?: boolean;
  dateString?: string;
}

export default function ContentDate({ showDate = true, dateString }: ContentDate) {
  return (
    <>
      {showDate && (
        <div className='flex item-start pt-40'>
          <p className='text-base font-normal text-foreground-secondary'>{dateString || getNowDateString()}</p>
        </div>
      )}
    </>
  );
}
