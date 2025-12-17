// src/components/common/ReservationTable.tsx
import React from 'react';
import clsx from 'clsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Column, Reservation, SortState } from '@/types/boardData';

interface ContentTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onSelectRow?: (item: T) => void;
  selectItemId?: string;
  isUpdating?: boolean;
  emptyMessage?: string;
  expiredData?: T[];
  // ✅ 정렬 관련 props 추가
  sortState?: SortState;
  onSort?: (key: string) => void;
  // ✅ 각 아이템의 고유 ID를 가져오는 함수
  getItemId?: (item: T) => string;
  // ✅ 만료 여부를 확인하는 함수 (선택적)
  isItemExpired?: (item: T) => boolean;
}

export default function ContentTable<T extends { [key: string]: any }>({
  columns,
  data,
  onSelectRow,
  selectItemId,
  isUpdating = false,
  emptyMessage = '표시할 목록이 없습니다.',
  expiredData,
  sortState,
  onSort,
  getItemId = (item) => item.reservationNo || item.id || '', // 기본값: reservationNo 또는 id
  isItemExpired, // 커스텀 만료 체크 함수
}: ContentTableProps<T>) {
  // ✅ 특정 아이템이 만료된 예약인지 확인하는 함수
  const checkExpired = (item: T): boolean => {
    // 1. 커스텀 함수가 제공된 경우
    if (isItemExpired) {
      return isItemExpired(item);
    }

    // 2. 아이템 자체에 expired 속성이 있는 경우
    if (item.expired === true) {
      return true;
    }

    // 3. expiredData 배열에서 해당 아이템을 찾는 경우
    if (expiredData && expiredData.length > 0) {
      const itemId = getItemId(item);
      return expiredData.some((expired) => getItemId(expired) === itemId);
    }

    return false;
  };

  // ✅ 정렬 아이콘 렌더링 함수
  const renderSortIcon = (columnKey: string) => {
    if (!sortState || sortState.key !== columnKey) {
      return <img src='/images/table-down.svg' alt='아이콘' width={16} height={16} className='icon-xs' />;
    }

    return sortState.order === 'asc' ? (
      <img src='/images/table-up.svg' alt='아이콘' width={16} height={16} className='icon-xs' />
    ) : (
      <img src='/images/table-down.svg' alt='아이콘' width={16} height={16} className='icon-xs' />
    );
  };

  return (
    <>
      {/* 상태 표시 */}
      {isUpdating && (
        <div className='h-[544px] bg-yellow-50 text-yellow-700 text-center py-2 text-sm'>
          예약 상태를 업데이트 중입니다...
        </div>
      )}

      {/* 테이블 */}
      <div className='mx-auto w-full max-w-7xl flex-1 overflow-auto pt-20'>
        {!data || data.length === 0 ? (
          <div className='text-center text-gray-500 mt-20'>{emptyMessage}</div>
        ) : (
          <Table className='w-full text-left rounded-sm overflow-x-auto'>
            {/* 헤더 */}
            <TableHeader className='max-h-[29px]'>
              <TableRow>
                {columns.map((col, idx) => (
                  <TableHead
                    key={col.key}
                    className={clsx(
                      'body4 text-foreground-normal whitespace-nowrap px-[20px] pb-[10px] h-[29px]',
                      col.isWide && 'min-w-[350px]',
                      col.sortable && 'cursor-pointer select-none',
                      // ✅ location 기반 정렬
                      {
                        'text-left': !col.location || col.location === 'left',
                        'text-center': col.location === 'center',
                        'text-right': col.location === 'right',
                      }
                    )}
                    onClick={() => col.sortable && onSort?.(col.sortKey || col.key)}>
                    <p
                      className={clsx('flex flex-row gap-1 items-center', {
                        'justify-start': !col.location || col.location === 'left',
                        'justify-center': col.location === 'center',
                        'justify-end': col.location === 'right',
                      })}>
                      {col.header}
                      {col.sortable && renderSortIcon(col.sortKey || col.key)}
                    </p>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            {/* 본문 */}
            <TableBody>
              {data.map((item, index) => {
                const isExpired = checkExpired(item);
                const itemId = getItemId(item);

                return (
                  <TableRow
                    key={itemId || index} // 고유 ID가 있으면 사용, 없으면 index
                    className={clsx('cursor-pointer transition-colors h-[48px] border-b border-border-secondary', {
                      // ✅ 만료된 예약인 경우 붉은색 배경
                      'bg-system-pink-light hover:bg-table-hover': isExpired,
                      // ✅ 일반적인 경우
                      'hover:bg-table-hover': !isExpired,
                      'bg-table-hover': selectItemId === itemId,
                    })}
                    onClick={() => onSelectRow?.(item)}>
                    {columns.map((col, idx) => (
                      <TableCell
                        key={col.key}
                        className={clsx(
                          'body3 text-foreground-normal align-middle truncate px-[16px]',
                          col.isWide && 'min-w-[350px]',
                          idx === columns.length - 1 && 'text-center'
                        )}>
                        {col.render ? col.render(item) : item[col.key]}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
}
