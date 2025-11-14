import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: '로그아웃되었습니다',
  });

  // 모든 인증 쿠키 삭제
  response.cookies.delete('access-token');
  response.cookies.delete('refresh-token');
  response.cookies.delete('user-role');

  return response;
}
