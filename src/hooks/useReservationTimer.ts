/** 시간 모니터링 훅
 * 특정 시간(예약시간)에서 15분이 넘어가는거 체크하는 훅
 */
// hooks/useReservationTimer.ts
import { useEffect, useRef, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { reservationStorage } from '@/lib/reservationStorage';

const EXPIRE_MINUTES = 15;
const EXPIRE_MS = EXPIRE_MINUTES * 60 * 1000;

export const useReservationTimer = () => {
  const queryClient = useQueryClient();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 날짜까지 함께 체크하는 코드
  const checkExpiredReservations = useCallback(() => {
    const now = Date.now();
    const reservations = reservationStorage.getAll();
    let hasChanges = false;

    reservations
      .filter((r) => r.status === 'PENDING' && !r.expired)
      .forEach((reservation) => {
        const visitMS = new Date(reservation.time).getTime();
        const expiredMS = visitMS + EXPIRE_MS;

        if (now >= expiredMS) {
          reservationStorage.markAsExpired(reservation.reservationNo);
          hasChanges = true;
        }
      });

    // 변경사항이 있으면 React Query 캐시 무효화
    if (hasChanges) {
      queryClient.invalidateQueries({ queryKey: ['reservations'] });
    }
  }, [queryClient]);

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
    // 30초마다 체크
    timerRef.current = setInterval(checkExpiredReservations, 30000);

    // Cleanup: 언마운트 또는 의존성 변경 시 interval 제거
    return () => {
      cleanUpTimer();
    };
  }, [checkExpiredReservations]);

  // 수동으로 체크하는 함수
  const forceCheck = useCallback(() => {
    checkExpiredReservations();
  }, [checkExpiredReservations]);

  return { forceCheck };
};
