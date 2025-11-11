// src/components/layouts/SingleColumnLayout.tsx
'use client';

import React from 'react';
import { Reservation } from '@/types/boardData';
import DashBoardLayout from './DashboardLayout';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Button } from '../ui/button';
import { getNowDateString } from '@/lib/dateParse';

interface SingleColumnLayoutProps {
  tabs: { id: string; label: string }[];
  columns: { key: string; header: string }[];
  reservations: Reservation[];
  expiredReservations: Reservation[];
  onSelectReservation: (reservation: Reservation) => void;
  onBatchNoShow: (reservationIds: string[]) => void;
  isUpdating?: boolean;
  totalPages?: number;
  page?: number;
}

// 페이지 사이즈는 10으로 변함없음
const pageSize = 10;
export default function SingleColumnLayout({
  tabs,
  columns,
  reservations,
  expiredReservations,
  onSelectReservation,
  onBatchNoShow,
  isUpdating = false,
  totalPages = 10,
  page = 1,
}: SingleColumnLayoutProps) {
  const [activeTab, setActiveTab] = React.useState('all');
  const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

  /** ✅ 필터링된 예약 목록 */
  const filteredReservations = React.useMemo(() => {
    if (activeTab === 'all') return reservations;
    if (activeTab === 'pending') return reservations.filter((r) => r.status === 'PENDING');
    if (activeTab === 'confirmed') return reservations.filter((r) => r.status === 'VISIT_DONE');
    if (activeTab === 'cancelled') return reservations.filter((r) => r.status === 'NOSHOW');
    return reservations;
  }, [activeTab, reservations]);

  return (
    <DashBoardLayout>
      <div className='max-w-[1280px] w-full h-[758px] flex flex-col border border-1 rounded-md p-20'>
        {/* 오늘 날짜  */}
        <div className='flex item-start px-4 '>
          <p className='text-base font-normal'>{getNowDateString()}</p>
        </div>
        {/* ✅ 탭 영역 */}
        <div className='flex gap-3 bg-white px-4 pt-4'>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-24 py-[6px] text-sm font-medium rounded-full ${
                activeTab === tab.id
                  ? 'bg-primary text-primary-foreground'
                  : 'border text-gray-600 hover:text-popover-foreground'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* ✅ 상태 표시 (로딩/업데이트 중) */}
        {isUpdating && (
          <div className='bg-yellow-50 text-yellow-700 text-center py-2 text-sm'>예약 상태를 업데이트 중입니다...</div>
        )}

        {/* ✅ 예약 테이블 */}
        <div className='flex-1 overflow-auto p-4 bg-secondary-foreground'>
          {filteredReservations.length === 0 ? (
            <div className='text-center text-gray-500 mt-20'>표시할 예약이 없습니다.</div>
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
                {filteredReservations.map((res) => (
                  <TableRow
                    key={res.reservationNo}
                    className='py-10 hover:bg-blue-50 cursor-pointer'
                    // onClick={() => onSelectReservation(res)}
                  >
                    <TableCell className='p-3 text-base text-gray-700'>{res.reservationNo}</TableCell>
                    <TableCell className='p-3 text-base text-gray-700'>
                      {new Date(res.time).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
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
        {/* ✅ 페이지네이션 */}
        <div className='flex items-center justify-center gap-2 mt-4'>
          <Button
            variant='link'
            size='sm'
            // onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}>
            {'<'}
          </Button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button
              key={i}
              size='sm'
              variant={page === i + 1 ? 'outline' : 'link'}
              //  onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant='link'
            size='sm'
            // onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}>
            {'>'}
          </Button>
        </div>
      </div>
    </DashBoardLayout>
  );
}
