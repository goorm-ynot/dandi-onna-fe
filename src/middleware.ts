// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const LOGIN_PATH = '/';
const UNAUTHORIZED_PATH = '/unauthorized';

// 경로별 허용 역할 정의
const ROUTE_PERMISSIONS = {
  '/seller': ['OWNER', 'ADMIN'],
  '/customer': ['CONSUMER'], // customer 경로는 CONSUMER만
  // 필요시 더 세분화
  // '/admin': ['ADMIN'],
};

export async function middleware(request: NextRequest) {
  const userRole = request.cookies.get('user-role')?.value;
  const pathname = request.nextUrl.pathname;

  // 디버깅 로그
  if (process.env.NODE_ENV === 'development') {
    console.log('🔒 Middleware executed for:', pathname);
    console.log('🔒 User role from cookie:', userRole);
  }

  // 로그인되지 않은 사용자
  if (!userRole) {
    if (process.env.NODE_ENV === 'development') {
      console.log('❌ No user role found, redirecting to login');
    }
    const redirectUrl = new URL(LOGIN_PATH, request.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // 현재 경로에 대한 허용 역할 찾기
  let allowedRoles: string[] = [];

  for (const [routePrefix, roles] of Object.entries(ROUTE_PERMISSIONS)) {
    if (pathname.startsWith(routePrefix)) {
      allowedRoles = roles;
      break;
    }
  }

  // 허용된 역할이 없는 경우 (매칭되는 경로가 없음)
  if (allowedRoles.length === 0) {
    if (process.env.NODE_ENV === 'development') {
      console.log('⚠️  No route permission defined for:', pathname);
    }
    return NextResponse.next();
  }

  // 권한 체크
  if (!allowedRoles.includes(userRole)) {
    if (process.env.NODE_ENV === 'development') {
      console.log(`❌ Access denied. Required: ${allowedRoles.join(', ')}, Got: ${userRole}`);
    }
    return NextResponse.redirect(new URL(UNAUTHORIZED_PATH, request.url));
  }

  // 정상 접근
  if (process.env.NODE_ENV === 'development') {
    console.log('✅ Access granted for role:', userRole);
  }

  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'no-store');
  return response;
}

export const config = {
  matcher: [
    '/seller/:path*',
    '/customer/:path*', // customer 경로 추가
    // 필요시 다른 경로도 추가
  ],
};
