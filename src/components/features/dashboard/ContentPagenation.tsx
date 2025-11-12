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
  const validPage = Math.max(1, Math.min(currentPage || 1, validTotalPages));

  return (
    <div className={`flex items-center justify-center gap-2 py-20 ${className}`}>
      <Button
        variant='link'
        size='page'
        onClick={() => onPageChange(Math.max(1, validPage - 1))}
        disabled={validPage === 1}>
        {'<'}
      </Button>

      {Array.from({ length: validTotalPages }).map((_, i) => (
        <Button
          key={i}
          size='page'
          variant={validPage === i + 1 ? 'secondary' : 'link'}
          onClick={() => onPageChange(i + 1)}>
          {i + 1}
        </Button>
      ))}

      <Button
        variant='link'
        size='page'
        onClick={() => onPageChange(Math.min(validTotalPages, validPage + 1))}
        disabled={validPage === validTotalPages}>
        {'>'}
      </Button>
    </div>
  );
}
