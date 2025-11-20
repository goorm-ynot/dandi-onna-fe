import { useRef, useCallback } from 'react';

export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number = 1000 // 1초 기본값
): ((...args: Parameters<T>) => void) => {
  const lastRun = useRef<number>(Date.now());

  return useCallback(
    (...args: Parameters<T>) => {
      const now = Date.now();

      if (now - lastRun.current >= delay) {
        lastRun.current = now;
        callback(...args);
      }
    },
    [callback, delay]
  );
};
