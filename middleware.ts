// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const ALLOWED_ROLES = ['OWNER', 'ADMIN'];
const LOGIN_PATH = '/';
const UNAUTHORIZED_PATH = '/unauthorized';

export async function middleware(request: NextRequest) {
  const userRole = request.cookies.get('user-role')?.value;

  // 로그인되지 않은 사용자
  if (!userRole) {
    const redirectUrl = new URL(LOGIN_PATH, request.url);
    redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // 권한 없는 사용자
  if (!ALLOWED_ROLES.includes(userRole)) {
    return NextResponse.redirect(new URL(UNAUTHORIZED_PATH, request.url));
  }

  // 정상 접근
  const response = NextResponse.next();
  response.headers.set('Cache-Control', 'no-store'); // 캐시 방지
  return response;
}

export const config = {
  matcher: ['/seller/:path*'],
};
