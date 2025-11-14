// src/components/common/ReservationTable.tsx
import React from 'react';
import clsx from 'clsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Column, Reservation, SortState } from '@/types/boardData';
import { ChevronDown, ChevronsUpDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

interface ContentTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onSelectRow?: (item: T) => void;
  selectItemId?: string;
  isUpdating?: boolean;
  emptyMessage?: string;
  expiredReservations?: Reservation[];
  // ✅ 정렬 관련 props 추가
  sortState?: SortState;
  onSort?: (key: string) => void;
}

export default function ContentTable<T extends { [key: string]: any }>({
  // columns,
  // data,
  // onSelectRow,
  // selectItemId,
  // isUpdating = false,
  // emptyMessage = '표시할 목록이 없습니다.',
  // expiredReservations,
  columns,
  data,
  onSelectRow,
  selectItemId,
  isUpdating = false,
  emptyMessage = '표시할 목록이 없습니다.',
  expiredReservations,
  sortState,
  onSort,
}: ContentTableProps<T>) {
  // ✅ 특정 아이템이 만료된 예약인지 확인하는 함수
  const isExpiredItem = (item: T): boolean => {
    // 1. 아이템 자체에 expired 속성이 있는 경우
    if (item.expired === true) {
      return true;
    }

    // 2. expiredReservations 배열에서 해당 reservationNo를 찾는 경우
    if (expiredReservations && expiredReservations.length > 0) {
      return expiredReservations.some((expired) => expired.reservationNo === item.reservationNo);
    }

    return false;
  };

  // ✅ 정렬 아이콘 렌더링 함수
  const renderSortIcon = (columnKey: string) => {
    if (!sortState || sortState.key !== columnKey) {
      return <Image src='/images/table-down.svg' alt='아이콘' width={16} height={16} className='icon-xs ' />;
    }

    return sortState.order === 'asc' ? (
      <Image src='/images/table-up.svg' alt='아이콘' width={16} height={16} className='icon-xs ' />
    ) : (
      <Image src='/images/table-down.svg' alt='아이콘' width={16} height={16} className='icon-xs ' />
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
      <div className='h-[580px] flex-1 overflow-auto p-20'>
        {data.length === 0 ? (
          <div className='text-center text-gray-500 mt-20'>{emptyMessage}</div>
        ) : (
          <Table className='w-full text-left bg-table-bg rounded-md'>
            {/* 헤더 */}
            <TableHeader>
              <TableRow>
                {columns.map((col, idx) => (
                  <TableHead
                    key={col.key}
                    className={clsx(
                      'p-3 text-left text-base font-medium text-gray-700 whitespace-nowrap',
                      col.isWide && 'min-w-[350px]',
                      idx === columns.length - 1 && 'text-center',
                      col.sortable && 'cursor-pointer hover:bg-gray-50 select-none'
                    )}
                    onClick={() => col.sortable && onSort?.(col.sortKey || col.key)}>
                    <p className='flex flex-row gap-1 items-center'>
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
                const isExpired = isExpiredItem(item);

                return (
                  <TableRow
                    key={item.reservationNo || index} // reservationNo가 있으면 사용, 없으면 index
                    className={clsx('py-10 cursor-pointer transition-colors', {
                      // ✅ 만료된 예약인 경우 붉은색 배경 + 왼쪽 보더
                      'bg-table-expired hover:bg-red-100 border-l-4 border-l-red-500': isExpired,
                      // ✅ 일반적인 경우
                      'hover:bg-table-hover': !isExpired,
                      'bg-table-secondary ': selectItemId === item.reservationNo,
                    })}
                    onClick={() => onSelectRow?.(item)}>
                    {columns.map((col, idx) => (
                      <TableCell
                        key={col.key}
                        className={clsx(
                          'p-3 text-base text-gray-700 align-middle truncate',
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
