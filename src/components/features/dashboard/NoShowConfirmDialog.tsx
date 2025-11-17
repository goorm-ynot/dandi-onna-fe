import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import React from 'react';

interface NoShowConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  reservationNo?: string;
}

export function NoShowConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  reservationNo,
}: NoShowConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>노쇼 처리</DialogTitle>
          <DialogDescription>
            {reservationNo && <span>예약번호 {reservationNo}</span>}
            <p className='mt-2'>이 예약을 노쇼로 처리하시겠습니까?</p>
          </DialogDescription>
        </DialogHeader>

        <div className='py-4'>
          <p className='text-sm text-gray-600'>노쇼 처리 후에는 취소할 수 없습니다.</p>
        </div>

        <DialogFooter className='gap-3'>
          <Button
            type='button'
            variant='outline'
            onClick={() => {
              onCancel();
              onOpenChange(false);
            }}>
            취소
          </Button>
          <Button
            type='button'
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}>
            노쇼 처리
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
