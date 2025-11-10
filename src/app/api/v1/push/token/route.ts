// api/v1/push/token/route.ts
import { serverApiClient } from '@/services/ApiClient';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function PUT(req: Request) {
  try {
    // 쿠키에서 토큰 확인
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access-token')?.value;

    if (!accessToken) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { token } = await req.json();

    // 서버용 API 클라이언트 사용
    const data = await serverApiClient.post('/push/tokens', { token });

    return NextResponse.json(data);
  } catch (error) {
    console.error('Push token update error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
