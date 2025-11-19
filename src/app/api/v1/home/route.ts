// /api/v1/home/route.ts

import serverApiClient from '@/services/ApiClient';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // 내가 주문 한 가게 목록 가져오기
    const response = await serverApiClient.get('/home');

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch data' }, { status: 500 });
  }
}
