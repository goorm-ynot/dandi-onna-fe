import React from 'react';

export default function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // <div className='min-h-screen flex flex-col justify-center items-center'>
    <main className='max-w-[1920px] min-h-screen mx-auto bg-white'>{children}</main>
    // </div>
  );
}
