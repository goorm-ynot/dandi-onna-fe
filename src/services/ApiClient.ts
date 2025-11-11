// src/lib/serverApiClient.ts
import { cookies } from 'next/headers';

class ServerApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = `${process.env.BACKEND_URL}/${process.env.API_BASE}`;
  }

  /** ✅ 쿠키 기반 인증 헤더 생성 */
  private async getAuthHeaders() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access-token')?.value;

    return {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    };
  }

  /** ✅ 공통 fetch 래퍼 */
  private async request<T>(method: string, endpoint: string, data?: any): Promise<T> {
    const headers = await this.getAuthHeaders();

    const res = await fetch(`${this.baseURL}${endpoint}`, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
      cache: 'no-store', // SSR 캐시 방지 (API 결과 즉시 반영)
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => '');
      throw new Error(`HTTP Error ${res.status}: ${res.statusText}\n${errorText || ''}`);
    }

    try {
      return await res.json();
    } catch {
      return {} as T; // 응답이 비어있을 경우
    }
  }

  /** GET: 조회 */
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>('GET', endpoint);
  }

  /** POST: 생성 */
  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>('POST', endpoint, data);
  }

  /** PUT: 전체 수정 */
  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>('PUT', endpoint, data);
  }

  /** PATCH: 부분 수정 */
  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>('PATCH', endpoint, data);
  }

  /** DELETE: 삭제 */
  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>('DELETE', endpoint);
  }
}

export const serverApiClient = new ServerApiClient();
export default serverApiClient;
