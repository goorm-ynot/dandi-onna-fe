import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email, password, role } = await req.json();

  // ✅ 실제 로그인 로직 (API 호출 or DB 검증)
  const res = await fetch(`${process.env.BACKEND_URL}/${process.env.API_BASE}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  const { accessJWE: accessToken, refreshJWE: refreshToken } = await res.json();

  const response = NextResponse.json({ role });

  // ✅ 쿠키 설정 (HTTP-Only)
  response.cookies.set('access-token', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 15, // 15분
  });

  response.cookies.set('refresh-token', refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7일
  });

  response.cookies.set('user-role', role, { sameSite: 'lax' });

  return response;
}
