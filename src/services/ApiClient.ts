// src/lib/serverApiClient.ts
import axios, { AxiosHeaders, AxiosInstance, AxiosRequestConfig } from 'axios';
import { cookies } from 'next/headers';

class ServerApiClient {
  private baseURL: string;
  private axiosInstance: AxiosInstance;

  constructor() {
    this.baseURL = `${process.env.BACKEND_URL}/${process.env.API_BASE}`;
    // this.baseURL = `${process.env.BACKEND_URL}`;

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
      async (error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('🚨 [DEV] API Error:', {
            status: error.response?.status,
            data: error.response?.data,
            message: error.message,
            callUrlWithBaseUrl: this.baseURL + error.config?.url,
          });
        }
        // TODO: 500 에러페이지로 이동

        // 403/401 에러 시 토큰 재발급 시도
        if (
          // (error.response?.status === 403 || error.response?.status === 401) &&
          error.response?.status === 403 &&
          error.config &&
          !error.config._retry
        ) {
          error.config._retry = true; // 무한 루프 방지

          try {
            console.log('🔄 [Interceptor] Attempting token refresh...');
            // 🔧 refresh 토큰을 쿠키에서 읽어오기
            const cookieStore = await cookies();
            const refreshToken = cookieStore.get('refresh-token')?.value;

            if (!refreshToken) {
              console.error('❌ [Interceptor] No refresh token found');
              return Promise.reject(error);
            }

            console.log('🔍 [DEV] Using refresh token:', refreshToken?.substring(0, 20) + '...');

            // refresh 토큰으로 access 토큰 재발급
            const refreshResponse = await this.axiosInstance.post<{
              success: boolean;
              code: string;
              message: string;
              data: { accessToken: string };
            }>(
              '/auth/token/refresh',
              { refreshToken } // 바디에 포함
            );

            console.log('✅ [Interceptor] Token refreshed successfully');

            // 새로운 access 토큰 추출
            const newAccessToken = refreshResponse.data.data.accessToken;

            if (!newAccessToken) {
              console.error('❌ [Interceptor] No access token in refresh response');
              return Promise.reject(error);
            }

            // 쿠키에 새로운 access 토큰 저장
            // 배포 시 secure: true 옵션 추가 고려
            console.log('🧾 [Interceptor] Storing new access token in cookies...');
            cookieStore.set('access-token', newAccessToken, {
              httpOnly: true,
            });

            // 실패했던 원래 요청에 새 토큰 적용
            error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;

            // 실패했던 원래 요청 재시도
            return this.axiosInstance(error.config);
          } catch (refreshError: any) {
            // 🔧 리프레시 시도 후 모든 에러는 메인으로 리다이렉트
            console.error('❌ [Interceptor] Token refresh failed:', refreshError);
            console.log('🚪 [Interceptor] Redirecting to main page due to refresh failure...');

            await this.handleAuthFailure();
            return Promise.reject(error);
          }
        }

        // 🔧 직접적인 401 에러도 처리
        if (error.response?.status === 401 || error.response?.status === 500) {
          const errorCode = error.response?.data?.code;

          // 특정 에러 코드들에 대해 메인으로 리다이렉트
          const authFailureCodes = [
            'AUTH_INVALID_TOKEN',
            'AUTH_TOKEN_EXPIRED',
            'AUTH_TOKEN_BLACKLISTED',
            'AUTH_INVALID_TOKEN_SIGNATURE',
          ];

          if (authFailureCodes.includes(errorCode)) {
            console.log('🚪 [Interceptor] Auth failure detected, redirecting to main...');
            await this.handleAuthFailure();
          }
        }

        return Promise.reject(error);
      }
    );
  }
  /**
   * 인증 실패 시 쿠키 삭제 및 에러 throw
   */
  private async handleAuthFailure() {
    try {
      console.log('🧹 [Auth] Clearing cookies...');

      // 쿠키 삭제
      const cookieStore = await cookies();
      cookieStore.delete('access-token');
      cookieStore.delete('refresh-token');

      console.log('✅ [Auth] Cookies cleared');
    } catch (error) {
      console.error('❌ [Auth] Failed to clear cookies:', error);
    }

    // 클라이언트에서 처리할 수 있도록 에러 throw
    throw new Error('AUTH_FAILURE');
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
