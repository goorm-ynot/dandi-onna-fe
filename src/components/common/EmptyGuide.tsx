import React from 'react';

interface EmptyGuideProps {
  title?: string | null;
  description?: string | null;
  children?: React.ReactNode;
}

export default function EmptyGuide({ title, description, children }: EmptyGuideProps) {
  // children이 제공되면 우선 사용
  if (children) {
    return (
      <div className='flex flex-col items-center justify-center h-full w-full px-24 py-40'>
        {children}
      </div>
    );
  }

  // props로 간단히 표시
  return (
    <div className='flex flex-col items-center justify-center h-full w-full px-24 py-40'>
      <div className='flex flex-col items-center gap-12 text-center'>
        {title && (
          <h3 className='text-foreground-normal body2 font-medium'>
            {title}
          </h3>
        )}
        {description && (
          <p className='text-foreground-subtle body4 whitespace-pre-line'>
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
