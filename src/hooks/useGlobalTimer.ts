import { useState, useEffect, useCallback, useMemo } from 'react';

interface TimeRemaining {
  hours: number;
  minutes: number;
  seconds: number;
}

// 글로벌 타이머 관리를 위한 싱글톤 클래스
class GlobalTimerManager {
  private static instance: GlobalTimerManager;
  private currentTime: Date = new Date();
  private listeners: Set<() => void> = new Set();
  private intervalId: NodeJS.Timeout | null = null;

  private constructor() {
    this.start();
  }

  static getInstance(): GlobalTimerManager {
    if (!GlobalTimerManager.instance) {
      GlobalTimerManager.instance = new GlobalTimerManager();
    }
    return GlobalTimerManager.instance;
  }

  private start() {
    if (this.intervalId) return;

    // 1초마다 현재 시간 업데이트
    this.intervalId = setInterval(() => {
      this.currentTime = new Date();
      this.notifyListeners();
    }, 1000);
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }

  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);

    // 구독 해제 함수 반환
    return () => {
      this.listeners.delete(listener);

      // 리스너가 없으면 타이머 정리
      if (this.listeners.size === 0 && this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    };
  }

  getCurrentTime(): Date {
    return this.currentTime;
  }
}

// 글로벌 타이머를 사용하는 커스텀 훅
export const useGlobalTimer = (visitTime: string): TimeRemaining => {
  const [, forceUpdate] = useState(0);
  const timerManager = useMemo(() => GlobalTimerManager.getInstance(), []);

  // 타이머 구독
  useEffect(() => {
    const unsubscribe = timerManager.subscribe(() => {
      forceUpdate((n) => n + 1);
    });

    return unsubscribe;
  }, [timerManager]);

  // 시간 계산 (메모이제이션)
  const timeRemaining = useMemo(() => {
    const now = timerManager.getCurrentTime();
    const visit = new Date(visitTime);
    const diffMs = visit.getTime() - now.getTime();

    if (diffMs <= 0) {
      return { hours: 0, minutes: 0, seconds: 0 };
    }

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    return { hours, minutes, seconds };
  }, [visitTime, timerManager.getCurrentTime().getTime()]);

  return timeRemaining;
};
