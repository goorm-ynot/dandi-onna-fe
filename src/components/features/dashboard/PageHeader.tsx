// src/components/common/PageHeader.tsx
import { getNowDateString } from '@/lib/dateParse';

interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <>
      <h1 className='title7 pt-40'>{title}</h1>
    </>
  );
}
