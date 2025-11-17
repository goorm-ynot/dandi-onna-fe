import { mockNoshowMenuDetail } from '@/mock/reservation';
import serverApiClient from '@/services/ApiClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const postId = searchParams.get('postId');
    console.log('postId 넘어왔는지 확인: ', postId);
    if (!postId) return NextResponse.json({ error: 'noshowPostId is required' }, { status: 400 });

    const response = await serverApiClient.get('/owner/no-show-posts/' + postId);

    return NextResponse.json(response, { status: 200 });

    // 임시 mock 데이터 반환
    // return NextResponse.json(mockNoshowMenuDetail, { status: mockNoshowMenuDetail.success ? 200 : 500 });
  } catch (error: any) {
    console.error('❌ Error fetching noshow data:', error);

    // 403 에러인 경우 특별 처리
    if (error.response?.status === 403) {
      return NextResponse.json(
        {
          error: '접근 권한이 없습니다. 로그인을 확인해주세요.',
          code: 'FORBIDDEN',
        },
        { status: 403 }
      );
    }

    return NextResponse.json({ error: error.message || 'Failed to fetch data' }, { status: 500 });
  }
}
