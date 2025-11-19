import { getNowDateHyphenString } from '@/lib/dateParse';
import { mockOrderListResponse } from '@/mock/reservation';
import serverApiClient from '@/services/ApiClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // URL에서 쿼리파라미터 추출
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date') || getNowDateHyphenString();
    const size = searchParams.get('size') || '10';
    const page = searchParams.get('page') || '0';

    if (process.env.NODE_ENV === 'development') {
      console.log('Query Params:', { date, page, size });
    }

    // ✅ await 추가 및 백엔드 API 호출
    const response = await serverApiClient.get('/owner/orders', {
      params: {
        page: page,
        size: size,
        date: date,
      },
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Response from serverApiClient:', response);
    }

    // ✅ 백엔드 응답을 그대로 반환
    return NextResponse.json(response, { status: 200 });

    // 임시 응답
    // return NextResponse.json(mockOrderListResponse, { status: 200 });
  } catch (error: any) {
    console.error('❌ Error fetching order data:', error);

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

// 손님 방문 여부 업데이트
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json({ error: 'orderId가 필요합니다.' }, { status: 400 });
    }

    const response = await serverApiClient.post(`/owner/orders/${orderId}/complete`, {
      storeMemo: '테스트 메모',
    });

    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Response from serverApiClient:', response);
    }

    // ✅ 백엔드 응답을 그대로 반환
    return NextResponse.json(response, { status: 200 });
  } catch (error: any) {
    console.error('❌ Error fetching order data:', error);

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
