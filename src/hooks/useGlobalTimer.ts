import { useState, useEffect } from 'react';

interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
}

export const useGlobalTimer = (visitTime: string): TimeRemaining => {
  const [currentTime, setCurrentTime] = useState(() => new Date());

  useEffect(() => {
    // 1초마다 현재 시간 업데이트
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // cleanup: 컴포넌트 언마운트 시 interval 정리
    return () => {
      clearInterval(intervalId);
    };
  }, []); // 빈 의존성 배열 - 한 번만 실행

  // 시간 계산
  const visit = new Date(visitTime);
  const diffMs = visit.getTime() - currentTime.getTime();

  if (diffMs <= 0) {
    return { hours: 0, minutes: 0, seconds: 0 };
  }

  const hours = Math.floor(diffMs / 3600000);
  const minutes = Math.floor((diffMs % 3600000) / 60000);
  const seconds = Math.floor((diffMs % 60000) / 1000);

  return { hours, minutes, seconds };
};
