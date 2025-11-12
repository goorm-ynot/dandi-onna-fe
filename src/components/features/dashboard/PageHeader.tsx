// src/components/common/PageHeader.tsx
import { getNowDateString } from '@/lib/dateParse';

interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <>
      <h1 className='title6 pb-20'>{title}</h1>
    </>
  );
}
