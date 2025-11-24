/** 시간 모니터링 훅
 * 특정 시간(예약시간)에서 15분이 넘어가는거 체크하는 훅
 */
// hooks/useReservationTimer.ts
import { useEffect, useRef, useCallback } from 'react';
import { useReservationStore } from '@/store/useReservationStore';

export const useReservationTimer = () => {
  const { reservations, markAsExpired } = useReservationStore();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const checkExpiredReservations = useCallback(() => {
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
  }, [reservations, markAsExpired]);

  // Cleanup function
  const cleanUpTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    // 즉시 한 번 체크
    checkExpiredReservations();
    cleanUpTimer();
    // 1분마다 체크 > 30초
    timerRef.current = setInterval(checkExpiredReservations, 30000);

    // Cleanup: 언마운트 또는 의존성 변경 시 interval 제거
    return () => {
      cleanUpTimer();
    };
  }, [reservations]);

  // 수동으로 체크하는 함수
  const forceCheck = useCallback(() => {
    checkExpiredReservations();
  }, [checkExpiredReservations]);

  return { forceCheck };
};
