// src/components/common/ReservationTable.tsx
import React from 'react';
import clsx from 'clsx';
import { Reservation } from '@/types/boardData';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Column {
  key: string;
  header: string;
}

interface ContentTableProps {
  columns: Column[];
  reservations: Reservation[];
  onSelectReservation?: (reservation: Reservation) => void;
  isUpdating?: boolean;
  emptyMessage?: string;
}

export default function ContentTable({
  columns,
  reservations,
  onSelectReservation,
  isUpdating = false,
  emptyMessage = '표시할 목록이 없습니다.',
}: ContentTableProps) {
  return (
    <>
      {/* 상태 표시 */}
      {isUpdating && (
        <div className='bg-yellow-50 text-yellow-700 text-center py-2 text-sm'>예약 상태를 업데이트 중입니다...</div>
      )}

      {/* 테이블 */}
      <div className='flex-1 overflow-auto p-20 bg-secondary-foreground'>
        {reservations.length === 0 ? (
          <div className='text-center text-gray-500 mt-20'>{emptyMessage}</div>
        ) : (
          <Table className='w-full text-left'>
            <TableHeader>
              <TableRow>
                {columns.map((col) => (
                  <TableHead key={col.key} className='p-3 text-left text-base font-medium text-gray-700'>
                    {col.header}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              {reservations.map((res) => (
                <TableRow
                  key={res.reservationNo}
                  className={clsx('py-10 hover:bg-blue-50 cursor-pointer', {
                    'bg-red-300': res.expired,
                  })}
                  onClick={() => onSelectReservation?.(res)}>
                  <TableCell className='p-3 text-base text-gray-700'>{res.reservationNo}</TableCell>

                  <TableCell className='p-3 text-base text-gray-700'>
                    {new Date(res.time).toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </TableCell>

                  <TableCell className='p-3 text-base text-gray-700'>
                    {res.menus?.map((m) => m.name).join(', ') || '-'}
                  </TableCell>

                  <TableCell className='p-3 text-base text-gray-700'>{res.contact}</TableCell>

                  <TableCell className='p-3 text-base'>
                    <span
                      className={`px-3 py-1 rounded-full text-base font-normal ${
                        res.status === 'PENDING'
                          ? 'bg-secondary text-secondary-foreground'
                          : res.status === 'NOSHOW'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}>
                      {res.status === 'PENDING' ? '방문예정' : res.status === 'NOSHOW' ? '노쇼' : '방문완료'}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </>
  );
}
