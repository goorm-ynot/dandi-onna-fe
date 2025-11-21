// components/Alarm.jsx
'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface AlarmProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number; // ms
}

const Alarm = ({ type = 'info', title, message, onClose, autoClose = false, duration = 3000 }: AlarmProps) => {
  // 자동 닫기
  React.useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50 text-green-800';
      case 'error':
        return 'border-red-200 bg-red-50 text-red-800';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50 text-yellow-800';
      default:
        return 'border-none ';
    }
  };

  return (
    <Alert className={`relative ${getTypeStyles()} shadow-lg min-w-[300px] max-w-[400px] p-20`}>
      <AlertDescription>
        {title && (
          <div className='flex items-center justify-between mb-1'>
            <div className='title5'>{title}</div>
            {onClose && (
              <Button variant='ghost' size='icon' className='h-6 w-6 -mt-1' onClick={onClose}>
                <X className='icon-l' />
              </Button>
            )}
          </div>
        )}
        <div className='title1 pt-12 whitespace-pre-wrap break-words'>{message}</div>
      </AlertDescription>
    </Alert>
  );
};

export default Alarm;
