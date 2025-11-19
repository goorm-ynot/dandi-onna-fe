import { mockOrderDetailResponse } from '@/mock/reservation';
import serverApiClient from '@/services/ApiClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const orderId = searchParams.get('orderId');

    if (process.env.NODE_ENV === 'development') {
      console.log('Query Params:', { orderId });
    }

    if (!orderId) {
      return NextResponse.json({ error: 'orderId is required' }, { status: 400 });
    }

    // ✅ await 추가 및 백엔드 API 호출
    const response = await serverApiClient.get(`/owner/orders/${orderId}`);

    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Response from serverApiClient:', response);
    }

    // ✅ 백엔드 응답을 그대로 반환
    return NextResponse.json(response, { status: 200 });

    // 임시응답
    // return NextResponse.json(mockOrderDetailResponse, { status: 200 });
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
