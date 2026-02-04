// /api/v1/stores/me/mypage/route.ts

import serverApiClient from '@/services/ApiClient';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // 가게 마이페이지 정보 가져오기
    const response = await serverApiClient.get('/stores/me/mypage');

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { 
        success: false,
        code: 'ERROR',
        message: error.message || 'Failed to fetch store mypage data',
        data: null
      }, 
      { status: 500 }
    );
  }
}
