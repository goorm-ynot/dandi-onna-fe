import { mockNoshowMenu } from '@/mock/reservation';
import serverApiClient from '@/services/ApiClient';
import { NextRequest, NextResponse } from 'next/server';
import { mock } from 'node:test';

// GET 요청: 백엔드에서 노쇼 데이터 가져오기
export async function GET(request: NextRequest) {
  try {
    // URL에서 쿼리파라미터 추출
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');
    const size = searchParams.get('size') || '10';
    const page = searchParams.get('page') || '0';

    console.log('Query Params:', { date, page, size });

    // ✅ await 추가 및 백엔드 API 호출
    const response = await serverApiClient.get('/owner/no-show-posts', {
      params: {
        page: page,
        size: size,
        date: date,
      },
    });

    console.log('✅ Response from serverApiClient:', response);

    // ✅ 백엔드 응답을 그대로 반환
    return NextResponse.json(response, { status: 200 });

    // 임시 mock 데이터 반환
    // return NextResponse.json(mockNoshowMenu, { status: mockNoshowMenu.success ? 200 : 500 });
  } catch (error: any) {
    console.error('❌ Error fetching noshow data:', error);

    // 인터셉터에서 토큰 재발급을 처리하므로 여기서는 에러만 반환
    if (error.response?.status === 403) {
      return NextResponse.json(
        {
          error: '접근 권한이 없습니다. 다시 로그인해주세요.',
          code: 'FORBIDDEN',
        },
        { status: 403 }
      );
    }

    return NextResponse.json({ error: error.message || 'Failed to fetch data' }, { status: 500 });
  }
}
