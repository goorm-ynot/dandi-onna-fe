import serverApiClient from '@/services/ApiClient';
import { NextRequest, NextResponse } from 'next/server';

// GET 요청 - 특정 가게의 노쇼 글 목록 조회
export async function GET(request: NextRequest, { params }: { params: { storeId: string } }) {
  const { storeId } = params;
  try {
    const requestUrl = request.nextUrl;
    const page = requestUrl.searchParams.get('page') || '0';
    const size = requestUrl.searchParams.get('size') || '10';

    const response = serverApiClient.get(`/stores/${storeId}/no-show-posts`, {
      params: {
        storeId: storeId,
        page: page,
        size: size,
      },
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch data' }, { status: error.status || 500 });
  }
}
