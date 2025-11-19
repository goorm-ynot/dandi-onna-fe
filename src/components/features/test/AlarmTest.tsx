'use client';
import Alarm from '@/components/features/alarm/Alarm';
import React, { useState } from 'react';

export function AlarmTest() {
  const [visibleAlarms, setVisibleAlarms] = useState<Record<string, boolean>>({
    success: true,
    error: true,
    warning: true,
    info: true,
    successAutoClose: false,
  });

  const toggleAlarm = (key: string) => {
    setVisibleAlarms((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const closeAlarm = (key: string) => {
    setVisibleAlarms((prev) => ({
      ...prev,
      [key]: false,
    }));
  };

  return (
    <div className='space-y-4 w-full'>
      {/* Success Alarm with Close Button */}
      <div className='border-l-4 border-blue-500 p-3 bg-white rounded'>
        <div className='flex items-center justify-between mb-2'>
          <h2 className='font-semibold text-base'>Success - 제목 포함</h2>
          <button
            onClick={() => toggleAlarm('success')}
            className='px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600'>
            {visibleAlarms.success ? '숨기기' : '표시'}
          </button>
        </div>
        {visibleAlarms.success && (
          <Alarm type='success' title='성공!' message='주문이 완료되었습니다' onClose={() => closeAlarm('success')} />
        )}
      </div>

      {/* Error Alarm with Close Button */}
      <div className='border-l-4 border-blue-500 p-3 bg-white rounded'>
        <div className='flex items-center justify-between mb-2'>
          <h2 className='font-semibold text-base'>Error - 메시지만</h2>
          <button
            onClick={() => toggleAlarm('error')}
            className='px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600'>
            {visibleAlarms.error ? '숨기기' : '표시'}
          </button>
        </div>
        {visibleAlarms.error && (
          <Alarm
            type='error'
            message='오류가 발생했습니다'
            autoClose
            duration={3000}
            onClose={() => closeAlarm('error')}
          />
        )}
      </div>

      {/* Warning Alarm */}
      <div className='border-l-4 border-blue-500 p-3 bg-white rounded'>
        <div className='flex items-center justify-between mb-2'>
          <h2 className='font-semibold text-base'>Warning - 제목 포함</h2>
          <button
            onClick={() => toggleAlarm('warning')}
            className='px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600'>
            {visibleAlarms.warning ? '숨기기' : '표시'}
          </button>
        </div>
        {visibleAlarms.warning && (
          <Alarm
            type='warning'
            title='주의'
            message='변경 사항이 저장되지 않았습니다'
            onClose={() => closeAlarm('warning')}
          />
        )}
      </div>

      {/* Info Alarm */}
      <div className='border-l-4 border-blue-500 p-3 bg-white rounded'>
        <div className='flex items-center justify-between mb-2'>
          <h2 className='font-semibold text-base'>Info - 제목 포함</h2>
          <button
            onClick={() => toggleAlarm('info')}
            className='px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600'>
            {visibleAlarms.info ? '숨기기' : '표시'}
          </button>
        </div>
        {visibleAlarms.info && (
          <Alarm type='info' title='정보' message='새로운 업데이트가 있습니다' onClose={() => closeAlarm('info')} />
        )}
      </div>

      {/* Success Alarm with Auto Close */}
      <div className='border-l-4 border-blue-500 p-3 bg-white rounded'>
        <div className='flex items-center justify-between mb-2'>
          <h2 className='font-semibold text-base'>Success - 자동 닫기 (3초)</h2>
          <button
            onClick={() => toggleAlarm('successAutoClose')}
            className='px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600'>
            {visibleAlarms.successAutoClose ? '숨기기' : '표시'}
          </button>
        </div>
        {visibleAlarms.successAutoClose && (
          <Alarm
            type='success'
            title='성공!'
            message='작업이 완료되었습니다 (3초 후 자동 닫힘)'
            autoClose
            duration={3000}
            onClose={() => closeAlarm('successAutoClose')}
          />
        )}
      </div>

      {/* No Close Button */}
      <div className='border-l-4 border-blue-500 p-3 bg-white rounded'>
        <div className='flex items-center justify-between mb-2'>
          <h2 className='font-semibold text-base'>Info - 닫기 버튼 없음</h2>
        </div>
        <Alarm type='info' title='알림' message='닫기 버튼이 없는 알람입니다' />
      </div>
    </div>
  );
}
