import React from 'react';
import { PanelMode, PanelType } from '@/types/PanleTypes';
import { Reservation } from '@/types/boardData';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { formatTimeString } from '@/lib/dateParse';

interface ReservationDetailPanel {
  mode: PanelMode;
  reservation: Reservation;
  onModeChange?: (mode: PanelMode) => void;
  onStatusUpdate?: (id: string, status: string) => void;
  onClose?: () => void;
  onEditMode?: (editmode: boolean) => void;
  onDataUpdate?: (data: any) => void;
}

export default function ReservationDetailPanel({
  mode,
  reservation,
  onModeChange,
  onStatusUpdate,
  onClose,
  onEditMode,
  onDataUpdate,
}: ReservationDetailPanel) {
  return (
    <div className='px-20 flex flex-col justify-between min-h-[758px] pt-[36px]'>
      <div className='flex flex-col gap-24'>
        <Label className='title5'>예약 정보</Label>
        {/* 예약 정보 */}
        <div className='flex flex-col gap-16'>
          <div className='flex flex-row justify-between items-center'>
            <Label className='title1 text-secondary'>예약번호</Label>
            <Label className='body3'>{reservation.reservationNo}</Label>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <Label className='title1  text-secondary'>시간</Label>
            <Label className='body3'>{formatTimeString(new Date(reservation.time))}</Label>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <Label className='title1  text-secondary'>연락처</Label>
            <Label className='body3'>{reservation.contact}</Label>
          </div>
        </div>

        {/* 구분선 1 */}
        <div className=''>
          <hr className='w-full border border-1 border-border-detailPanel' />
        </div>

        <Label className='title5'>주문 메뉴</Label>
        {/* 주문 메뉴 */}
        <div className='flex flex-col gap-16'>
          {reservation.menus.map((menu, idx) => (
            <div key={menu.menuId} className='grid grid-cols-5 gap-[10ox]  w-full'>
              <Label className='col-span-2 title1 text-secondary'>{menu.name}</Label>
              <Label className='text-center title1 flex-none'>{menu.qty}</Label>
              <Label className='col-span-2 text-right title1 flex-none'>{(menu.price * menu.qty).toLocaleString()}원</Label>
            </div>
          ))}
        </div>
        {/* <p>{JSON.stringify(reservation)}</p> */}
      </div>

      {/* 버튼들 */}
      <div className='flex gap-10 justify-center item-center py-20'>
        <Button variant={'ghost'} size={'lg'} className='w-full' onClick={() => onEditMode?.(true)}>
          노쇼등록
        </Button>
        <Button variant={'default'} size={'lg'} className='w-full' onClick={() => onDataUpdate?.(reservation)}>
          방문완료
        </Button>
      </div>
    </div>
  );
}
