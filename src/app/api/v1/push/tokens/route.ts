// api/v1/push/token/route.ts
import { serverApiClient } from '@/services/ApiClient';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { env } from 'process';

export async function POST(req: Request) {
  try {
    // 쿠키에서 토큰 확인
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access-token')?.value;

    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { token, deviceId } = await req.json();
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // 서버용 API 클라이언트 사용
    const data = await serverApiClient.post('/push/tokens', {
      platform: 'WEB',
      deviceId: deviceId,
      fcmToken: token,
      userAgent: userAgent, // header에서 추출
    });

    return NextResponse.json(data);
  } catch (error: any) {
    const status = error.response?.status || 500;
    const msg = error.response?.data || error.message;
    return NextResponse.json({ error: msg }, { status });
  }
}
