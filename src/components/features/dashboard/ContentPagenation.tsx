// src/components/common/Pagination.tsx
import { Button } from '@/components/ui/button';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({ totalPages, currentPage, onPageChange, className = '' }: PaginationProps) {
  const validTotalPages = Math.max(1, totalPages || 1);
  // currentPage는 0-based index이므로 0부터 시작
  const validPage = Math.max(0, Math.min(currentPage ?? 0, validTotalPages - 1));

  return (
    <div className={`flex items-center justify-center gap-2 py-20  ${className}`}>
      <Button
        variant='link'
        size='page'
        onClick={() => onPageChange(Math.max(0, validPage - 1))}
        disabled={validPage === 0}>
        {'<'}
      </Button>

      {Array.from({ length: validTotalPages }).map((_, i) => (
        <Button key={i} size='page' variant={validPage === i ? 'page' : 'link'}  onClick={() => onPageChange(i)}>
          {i + 1}
        </Button>
      ))}

      <Button
        variant='link'
        size='page'
        onClick={() => onPageChange(Math.min(validTotalPages - 1, validPage + 1))}
        disabled={validPage === validTotalPages - 1}>
        {'>'}
      </Button>
    </div>
  );
}
