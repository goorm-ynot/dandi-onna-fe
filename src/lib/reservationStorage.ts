/**
 * localStorage를 사용한 예약 데이터 관리 유틸리티
 * Single source of truth로 localStorage 사용
 */

import { Reservation } from '@/types/boardData';

const STORAGE_KEY = 'mockReservations';

export const reservationStorage = {
  /**
   * localStorage에서 모든 예약 데이터 가져오기
   */
  getAll: (): Reservation[] => {
    if (typeof window === 'undefined') return [];
    
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to parse reservations from localStorage:', error);
      return [];
    }
  },

  /**
   * localStorage에 예약 데이터 저장
   */
  setAll: (reservations: Reservation[]): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(reservations));
    } catch (error) {
      console.error('Failed to save reservations to localStorage:', error);
    }
  },

  /**
   * 특정 예약을 LATE 상태로 업데이트
   */
  markAsExpired: (reservationNo: string): Reservation[] => {
    const reservations = reservationStorage.getAll();
    const updated = reservations.map((res) =>
      res.reservationNo === reservationNo ? { ...res, status: 'LATE' as const, expired: true } : res
    );
    reservationStorage.setAll(updated);
    return updated;
  },

  /**
   * 특정 예약의 상태 업데이트
   */
  updateStatus: (reservationNo: string, status: Reservation['status']): Reservation[] => {
    const reservations = reservationStorage.getAll();
    const updated = reservations.map((res) =>
      res.reservationNo === reservationNo ? { ...res, status, expired: false } : res
    );
    reservationStorage.setAll(updated);
    return updated;
  },

  /**
   * 만료된 예약 필터링
   */
  getExpired: (): Reservation[] => {
    const reservations = reservationStorage.getAll();
    return reservations.filter((res) => res.expired);
  },

  /**
   * 상태별 필터링
   */
  filterByStatus: (status: string): Reservation[] => {
    const reservations = reservationStorage.getAll();
    
    if (status === 'all' || !status) {
      return reservations;
    }
    
    if (status === 'LATE') {
      return reservations.filter((res) => res.expired || res.status === 'LATE');
    }
    
    return reservations.filter((res) => res.status === status);
  },

  /**
   * localStorage 초기화 (테스트용)
   */
  clear: (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEY);
  },
};
