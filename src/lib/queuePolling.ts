/**
 * Client-side polling helper for no-show schedule queue
 */

import { QueueScheduleStatus } from '@/types/boardData';

export interface QueuePollResponse {
  data: QueuePollItem[];
  totalPages?: number;
  currentPage?: number;
  totalElements?: number;
}

export interface QueuePollItem {
  scheduleId: string | number;
  presetId: string | number;
  status: QueueScheduleStatus;
  createdAt: string;
  publishAt?: string;
  items: QueueScheduleItem[];
}

export interface QueueScheduleItem {
  reservationNo: string;
  menuName: string;
  quantity: number;
  discountPercent: number;
  unitPrice?: number;
  visitTime?: string;
}

/**
 * Fetch no-show schedules from the polling endpoint
 * 
 * @param params - Optional query parameters for filtering
 * @returns Promise resolving to QueuePollResponse
 */
export async function fetchNoshowSchedules(params?: {
  page?: number;
  size?: number;
  status?: QueueScheduleStatus;
}): Promise<QueuePollResponse> {
  // GET 요청은 query parameter로 전송
  const searchParams = new URLSearchParams();
  if (params?.page !== undefined) searchParams.append('page', params.page.toString());
  if (params?.size !== undefined) searchParams.append('size', params.size.toString());
  if (params?.status) searchParams.append('status', 'QUEUED'); // QUEUED 상태만 조회하도록 고정 (현재 요구사항 기준)

  const url = `/api/v1/seller/noshow/schedules${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch no-show schedules: ${response.statusText}`);
  }

  const data: QueuePollResponse = await response.json();
  return data;
}
