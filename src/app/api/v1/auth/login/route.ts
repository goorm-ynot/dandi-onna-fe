// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {

//   const { loginId, password, role } = await req.json();

//   // ✅ 실제 로그인 로직 (API 호출 or DB 검증)
//   const res = await fetch(`${process.env.BACKEND_URL}/${process.env.API_BASE}/auth/login`, {
//     method: 'POST',
//     body: JSON.stringify({ loginId, password }),
//     headers: { 'Content-Type': 'application/json' },
//   });

//   if (process.env.NODE_ENV === 'development') {
//     console.log('개발 환경에서만 보이는 로그');
//     console.log('🔧 [DEV] Headers:', res);
//   }

//   const { accessJWE: accessToken, refreshJWE: refreshToken } = await res.json();

//   const response = NextResponse.json({ role });

//   // ✅ 쿠키 설정 (HTTP-Only)
//   response.cookies.set('access-token', accessToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'lax',
//     maxAge: 60 * 30, // 30분
//   });

//   response.cookies.set('refresh-token', refreshToken, {
//     httpOnly: true,
//     secure: process.env.NODE_ENV === 'production',
//     sameSite: 'lax',
//     maxAge: 60 * 60 * 24 * 7, // 7일
//   });

//   response.cookies.set('user-role', role, { sameSite: 'lax' });

//   return response;
// }
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { loginId, password, role } = await req.json();

    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 [DEV] Login request:', { loginId, password, role });
    }

    // 백엔드 API 호출
    const res = await fetch(`${process.env.BACKEND_URL}/${process.env.API_BASE}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ loginId, password: password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 [DEV] Backend response status:', res.status);
      console.log('🔧 [DEV] Backend response headers:', res.headers);
    }

    // 백엔드에서 에러 응답이 온 경우
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ message: res }));

      if (process.env.NODE_ENV === 'development') {
        console.log('🚨 [DEV] Backend error response:', errorData);
      }

      return NextResponse.json(
        {
          error: errorData.message || '로그인에 실패했습니다',
          code: errorData.code || 'LOGIN_FAILED',
        },
        { status: res.status }
      );
    }

    // 실제로 이렇게 날라오는게 맞는지 확인 필요
    const responseData = await res.json();
    //...
    const { accessToken, refreshToken } = responseData.data;

    // 토큰이 없는 경우
    if (!accessToken || !refreshToken) {
      if (process.env.NODE_ENV === 'development') {
        console.log('🚨 [DEV] Missing tokens in response:', responseData);
      }

      return NextResponse.json({ error: '인증 토큰을 받지 못했습니다' }, { status: 500 });
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('✅ [DEV] Login successful, setting cookies');
    }

    const response = NextResponse.json({
      success: true,
      role,
      message: '로그인에 성공했습니다',
    });

    // 쿠키 설정
    response.cookies.set('access-token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 1, // 1일
    });

    response.cookies.set('refresh-token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7일
    });

    response.cookies.set('user-role', role, {
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7일
    });

    return response;
  } catch (error) {
    // 모든 예외 처리
    console.error('🚨 Login API Error:', error);

    if (process.env.NODE_ENV === 'development') {
      console.error('🚨 [DEV] Detailed error:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
    }

    // 네트워크 에러인지 확인
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return NextResponse.json(
        {
          error: '서버에 연결할 수 없습니다. 잠시 후 다시 시도해주세요.',
          code: 'NETWORK_ERROR',
        },
        { status: 503 }
      );
    }

    // JSON 파싱 에러인지 확인
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: '서버 응답을 처리할 수 없습니다.',
          code: 'PARSE_ERROR',
        },
        { status: 500 }
      );
    }

    // 기타 에러
    return NextResponse.json(
      {
        error: '로그인 처리 중 오류가 발생했습니다.',
        code: 'INTERNAL_ERROR',
      },
      { status: 500 }
    );
  }
}
