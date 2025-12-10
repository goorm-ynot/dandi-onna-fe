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
      <DialogContent className='bg-[#ffffff] sm:max-w-md p-[12px] w-[88%] max-w-[340px] min-h-[142px] rounded-16'>
        <DialogHeader className='flex flex-col justify-center items-center gap-[8px] pt-[30px]'>
          <DialogTitle className='title5 text-[#000000]'>{title}</DialogTitle>
          <DialogDescription className='title1 whitespace-pre-line text-center text-[#707070]'>
            {description}
          </DialogDescription>
        </DialogHeader>

        {content && <div className='py-4'>{content}</div>}

        <DialogFooter className='flex-row gap-[12px] w-full pt-[20px] pb-[12px]'>
          <Button
            type='button'
            className='title1 text-[#333333]'
            variant='outline'
            onClick={() => {
              onCancel();
              onOpenChange(false);
            }}>
            <p className='title1'> 
              {cancelText}
            </p>
          </Button>
          <Button
            type='button'
            className='w-full title3 bg-[#8749FE] text-white rounded-[6px] hover:bg-[#7239d4] active:scale-95 active:opacity-70 transition-all duration-100'
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}>
              <p className='title3'>
                {confirmText}
              </p>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// 하위 호환성을 위한 별칭
export const SubmitConfirmDialog = ConfirmDialog;
