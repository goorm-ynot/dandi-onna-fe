// /api/v1/home/route.ts

import { NextResponse, NextRequest } from 'next/server';
import serverApiClient from '@/services/ApiClient';

// 홈 화면 데이터 반환
export async function GET(request: NextRequest) {
  try {
    const requestParams = request.nextUrl.searchParams;
    // 필요한 쿼리 파라미터가 있다면 여기에 추가
    // const lat = requestParams.get('lat') || 37.389858;
    // const lon = requestParams.get('lng') || 127.096352;
    const lat = 37.389858;
    const lon = 127.096352;
    const page = requestParams.get('page') || 0;
    const size = requestParams.get('size') || 10;

    // null 값 체크
    if (lat === null || lon === null) {
      return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 });
    }

    // 백엔드 API 호출
    const response = await serverApiClient.get('/home/stores', {
      params: {
        lat,
        lon,
        page,
        size,
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch data' }, { status: error.status || 500 });
  }
}
