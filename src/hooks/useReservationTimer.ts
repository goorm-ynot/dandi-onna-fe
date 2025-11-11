/** 시간 모니터링 훅
 * 특정 시간(예약시간)에서 15분이 넘어가는거 체크하는 훅
 */
// hooks/useReservationTimer.ts
import { useEffect, useRef } from 'react';
import { useReservationStore } from '@/store/useReservationStore';

export const useReservationTimer = () => {
  const { reservations, markAsExpired } = useReservationStore();
  const timerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const checkExpiredReservations = () => {
      const now = new Date();

      reservations.forEach((reservation) => {
        if (reservation.status === 'PENDING' && !reservation.expired) {
          const visitTime = new Date(reservation.time);
          const expiredTime = new Date(visitTime.getTime() + 15 * 60 * 1000); // +15분

          if (now >= expiredTime) {
            markAsExpired(reservation.reservationNo);
          }
        }
      });
    };

    // 1분마다 체크
    timerRef.current = setInterval(checkExpiredReservations, 60000);

    // 즉시 한 번 체크
    checkExpiredReservations();

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [reservations, markAsExpired]);

  // 수동으로 체크하는 함수도 제공
  const forceCheck = () => {
    // 체크 로직 실행
  };

  return { forceCheck };
};
