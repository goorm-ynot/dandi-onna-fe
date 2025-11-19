// 로그인과 사용자 데이터 관련 컨트롤 훅

export const useUserHook = () => {
  const handleLogin = async (data: { loginId: string; password: string; role: string }) => {
    try {
      const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('로그인에 실패했습니다.');
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/v1/auth/logout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('로그아웃에 실패했습니다.');
      }

      const result = await response.json();

      // 로그아웃 후 강제 리다이렉트 (middleware 재실행을 위해)
      window.location.href = '/';

      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // FCM Token post 호출
  const postFcmToken = async (token: string, deviceId: string) => {
    try {
      const response = await fetch('/api/v1/push/tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, deviceId }),
      });

      if (!response.ok) {
        throw new Error('FCM 토큰 전송에 실패했습니다.');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    // action
    handleLogin,
    handleLogout,
    postFcmToken,
  };
};
