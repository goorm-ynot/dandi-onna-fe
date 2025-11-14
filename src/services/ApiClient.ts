// src/lib/serverApiClient.ts
import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';

class ServerApiClient {
  private baseURL: string;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.baseURL = `${process.env.BACKEND_URL}/${process.env.API_BASE}`;

    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: { 'Content-Type': 'application/json' },
    });

    // 요청 인터셉터: 쿠키 기반 인증 헤더 추가
    this.axiosInstance.interceptors.request.use(async (config) => {
      const cookieStore = await cookies();
      const accessToken = cookieStore.get('access-token')?.value;

      const headers = new AxiosHeaders(config.headers);

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('📡 [DEV] API Request:', {
          method: config.method,
          url: config.url,
          headers: config.headers,
          data: config.data,
        });
      }

      return { ...config, headers };
    });

    // 응답 인터셉터: 에러 처리 및 개발 환경 로그
    this.axiosInstance.interceptors.response.use(
      (response) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ [DEV] API Response:', {
            status: response.status,
            data: response.data,
          });
        }
        return response;
      },
      (error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('🚨 [DEV] API Error:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
          });
        }
        return Promise.reject(error);
      }
    );
  }

  /** GET */
  async get<T>(endpoint: string, config?: AxiosRequestConfig) {
    const res = await this.axiosInstance.get<T>(endpoint, config);
    return res.data;
  }

  /** POST */
  async post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig) {
    const res = await this.axiosInstance.post<T>(endpoint, data, config);
    return res.data;
  }

  /** PUT */
  async put<T>(endpoint: string, data?: any, config?: AxiosRequestConfig) {
    const res = await this.axiosInstance.put<T>(endpoint, data, config);
    return res.data;
  }

  /** PATCH */
  async patch<T>(endpoint: string, data?: any, config?: AxiosRequestConfig) {
    const res = await this.axiosInstance.patch<T>(endpoint, data, config);
    return res.data;
  }

  /** DELETE */
  async delete<T>(endpoint: string, config?: AxiosRequestConfig) {
    const res = await this.axiosInstance.delete<T>(endpoint, config);
    return res.data;
  }
}

export const serverApiClient = new ServerApiClient();
export default serverApiClient;
