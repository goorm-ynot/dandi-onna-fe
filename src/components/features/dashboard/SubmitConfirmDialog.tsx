import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import React, { ReactNode } from 'react';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  onCancel: () => void;
  title?: string;
  description?: string | ReactNode;
  content?: ReactNode;
  confirmText?: string;
  cancelText?: string;
}

export function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  onCancel,
  title = '저장하시겠습니까?',
  description = '입력한 내용이 저장됩니다.',
  content,
  confirmText = '확인',
  cancelText = '취소',
}: ConfirmDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='bg-white p-3 w-[304px] rounded-16 shadow-[0_4px_32px_rgba(0,0,0,0.15)]'>
        <DialogHeader className='flex flex-col justify-center items-center gap-2 pt-[30px]'>
          <DialogTitle className='title5 text-black'>{title}</DialogTitle>
          <DialogDescription className='body3 whitespace-pre-line text-center text-[#707070]'>
            {description}
          </DialogDescription>
        </DialogHeader>

        {content && <div className='py-4'>{content}</div>}

        <DialogFooter className='flex-row gap-3 w-full pt-5 pb-3'>
          <Button
            type='button'
            className='body3 text-[#262626] px-5 py-2.5 h-[38px]'
            variant='outline'
            onClick={() => {
              onCancel();
              onOpenChange(false);
            }}>
            {cancelText}
          </Button>
          <Button
            type='button'
            className='w-full body5 bg-[#8749FE] text-white rounded-[6px] px-[12px] py-[10px] h-[38px] hover:bg-[#7239d4] active:scale-95 active:opacity-70 transition-all duration-100'
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 하위 호환성을 위한 별칭
export const SubmitConfirmDialog = ConfirmDialog;
