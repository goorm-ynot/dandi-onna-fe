import { SortState } from '@/types/boardData';
import { Dispatch, SetStateAction } from 'react';

/**
 * 정렬 상태를 토글하는 핸들러 함수
 * @param key 정렬할 컬럼 키
 * @param setSortState 정렬 상태를 업데이트하는 setState 함수
 */
export function handleSortToggle(key: string, setSortState: Dispatch<SetStateAction<SortState>>): void {
  setSortState((prevState) => {
    let newOrder: 'asc' | 'desc' | null = 'asc';
    if (prevState.key === key) {
      if (prevState.order === 'asc') {
        newOrder = 'desc';
      } else if (prevState.order === 'desc') {
        newOrder = null;
      }
    }
    return { key, order: newOrder };
  });
}

/**
 * 배열 데이터를 정렬하는 범용 유틸리티 함수
 * @param data 정렬할 데이터 배열
 * @param sortState 정렬 상태 (key, order)
 * @returns 정렬된 데이터 배열
 */
export function sortData<T extends Record<string, any>>(data: T[], sortState: SortState): T[] {
  if (!sortState.key || !sortState.order) {
    return data;
  }

  return [...data].sort((a, b) => {
    const key = sortState.key as keyof T;
    const aValue = a[key];
    const bValue = b[key];

    // 시간 정렬 특별 처리 (time, visitTime 모두 지원)
    if (key === 'time' || key === 'visitTime') {
      const aTime = new Date(aValue as unknown as string).getTime();
      const bTime = new Date(bValue as unknown as string).getTime();
      return sortState.order === 'asc' ? aTime - bTime : bTime - aTime;
    }

    // 문자열 정렬
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const result = aValue.localeCompare(bValue);
      return sortState.order === 'asc' ? result : -result;
    }

    // 숫자 정렬
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortState.order === 'asc' ? aValue - bValue : bValue - aValue;
    }

    // 기본 정렬
    if (aValue < bValue) return sortState.order === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortState.order === 'asc' ? 1 : -1;
    return 0;
  });
}
