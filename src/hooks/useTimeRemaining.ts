import { useState, useEffect } from 'react';

interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
}

export const useTimeRemaining = (visitTime: string): TimeRemaining => {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() => {
    const now = new Date();
    const visit = new Date(visitTime);
    const diffMs = visit.getTime() - now.getTime();

    if (diffMs <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  });

  useEffect(() => {
    // 초기 계산
    const calculateTime = () => {
      const now = new Date();
      const visit = new Date(visitTime);
      const diffMs = visit.getTime() - now.getTime();

      if (diffMs <= 0) {
        setTimeRemaining({ hours: 0, minutes: 0, seconds: 0 });
        // 시간이 끝났으므로 인터벌 종료
        clearInterval(interval);
        return;
      }

      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTimeRemaining({ hours, minutes, seconds });
    };

    // 1초마다 업데이트
    let interval = setInterval(calculateTime, 1000);

    // 초기 실행
    calculateTime();

    return () => clearInterval(interval);
  }, [visitTime]);

  return timeRemaining;
};
