// lib/api.ts
import axios from 'axios';

type AxiosInstanceType = ReturnType<typeof axios.create>;
type AxiosRequestConfigType = Parameters<AxiosInstanceType['get']>[1];
type AxiosResponseType<T = any> = { data: T; status: number; statusText?: string; headers?: any; config?: any };

interface ApiResponse<T = any> {
  data: T;
  message: string;
  status: number;
}

class ApiClient {
  private instance: AxiosInstanceType;

  constructor() {
    this.instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // 요청 인터셉터
    this.instance.interceptors.request.use(
      (config) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

        if (token) {
          if (!config.headers) config.headers = {} as any;
          (config.headers as any).Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 응답 인터셉터
    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config as any;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
              const response = await this.instance.post('/auth/refresh', {
                refreshToken,
              });

              const { accessToken } = (response as any).data;
              localStorage.setItem('accessToken', accessToken);

              return this.instance(originalRequest);
            }
          } catch (refreshError) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/';
          }
        }

        return Promise.reject(error);
      }
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfigType): Promise<ApiResponse<T>> {
    const response = await this.instance.get(url, config as any);
    return (response as any).data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfigType): Promise<ApiResponse<T>> {
    const response = await this.instance.post(url, data, config as any);
    return (response as any).data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfigType): Promise<ApiResponse<T>> {
    const response = await this.instance.put(url, data, config as any);
    return (response as any).data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfigType): Promise<ApiResponse<T>> {
    const response = await this.instance.delete(url, config as any);
    return (response as any).data;
  }
}

export const apiClient = new ApiClient();
