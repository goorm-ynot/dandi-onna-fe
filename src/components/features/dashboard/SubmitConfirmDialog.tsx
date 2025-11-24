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
      <DialogContent className='sm:max-w-md p-[12px] min-w-[280px] min-h-[142px] rounded-16'>
        <DialogHeader className='flex flex-col justify-center items-center gap-3 pt-20'>
          <DialogTitle className='title5'>{title}</DialogTitle>
          <DialogDescription className='title4 whitespace-pre-line text-center'>
            {description}
          </DialogDescription>
        </DialogHeader>

        {content && <div className='py-4'>{content}</div>}

        <DialogFooter className='gap-3 w-full pt-20 pb-12'>
          <Button
            type='button'
            variant='outline'
            onClick={() => {
              onCancel();
              onOpenChange(false);
            }}>
            {cancelText}
          </Button>
          <Button
            type='button'
            className='w-full'
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
