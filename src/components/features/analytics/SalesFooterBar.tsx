/**
 * SalesFooterBar
 * - 총 건수, 페이지네이션, 엑셀 내보내기 버튼 UI
 * - 로직은 상위(page)에서 props로 주입 (controlled)
 */

'use client';

import * as React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';


type Props = {
  /** 서버 기준 총 건수 (페이지네이션이면 data.length가 아닐 수 있음) */
  totalCount: number;

  /** 현재 페이지 (1부터 시작) */
  page: number;

  /** 전체 페이지 수 (모르면 1로) */
  totalPages: number;

  /** 페이지 이동 */
  onPrevPage?: () => void;
  onNextPage?: () => void;

  /** 특정 페이지 클릭이 필요하면 사용 (선택) */
  onGoToPage?: (page: number) => void;

  /** 엑셀 내보내기 */
  onExportExcel?: () => void;
  isExporting?: boolean;

};

export function SalesFooterBar({
  totalCount,
  page,
  totalPages,
  onPrevPage,
  onNextPage,
  onGoToPage,
  onExportExcel,
  isExporting = false,
}: Props) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="flex items-center justify-between px-24 py-16 border-t border-border-normal bg-background-normal-foreground">
      {/* 총 건수 */}
      <div className="caption4 text-foreground-secondary">
        총 {totalCount}건의 주문 내역
      </div>

      {/* 페이지네이션 */}
      <div className="flex items-center justify-center gap-2">
        <Button
          type="button"
          variant='link'
          onClick={onPrevPage}
          disabled={!canPrev || !onPrevPage}
          className='disabled:text-foreground-disable disabled:opacity-100'
        >
          <ChevronLeft size={24} />
        </Button>

        {/* 최소 구현: 현재 페이지만 표시 */}
        {Array.from({ length: totalPages }).map((_, i) => (
            <Button 
                key={i} 
                size='page' 
                variant={page === i + 1 ? 'page' : 'pagelink'} 
                onClick={() => onGoToPage && onGoToPage(i + 1)}
            >
                {i+1}
            </Button>
        ))}

        <Button
          type="button"
          variant='link'
          onClick={onNextPage}
          disabled={!canNext || !onNextPage}
          className='disabled:text-foreground-disable disabled:opacity-100'
        >
          <ChevronRight size={24} />
        </Button>
      </div>

      {/* 엑셀 다운로드 */}
      <button
        type="button"
        className="flex items-center gap-2 px-16 py-[6px] rounded bg-white disabled:opacity-50"
        onClick={onExportExcel}
        disabled={!onExportExcel || isExporting}
      >
        <Image
          src="/images/icons/IconL-excel.svg"
          alt="excel icon"
          width={16}
          height={16}
        />
        <span className="body4 text-foreground-normal">
          {isExporting ? '내보내는 중...' : 'Excel로 내보내기'}
        </span>
      </button>
    </div>
  );
}
