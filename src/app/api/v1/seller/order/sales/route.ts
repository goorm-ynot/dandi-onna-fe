import serverApiClient from "@/services/ApiClient";
import { NextRequest, NextResponse } from "next/server";

/**
 * /api/v1/owner/sales?startDate=2025.12.01&endDate=2025.12.30&page=0&size=10
 */
export async function GET(request: NextRequest) {
    const BASE_URL = '/owner/sales';
    try {
        // URL에서 쿼리파라미터 추출
        const searchParams = request.nextUrl.searchParams;
        const startDate = searchParams.get('startDate') || '';
        const endDate = searchParams.get('endDate') || '';
        const page = Number(searchParams.get('page')) || 0;
        const size = Number(searchParams.get('size')) || 10;
        const orderType = searchParams.get('orderType') || 'all'; // 현재 노쇼밖에없음

        if(process.env.NODE_ENV === 'development') {
            console.log('✅ Received query params:', { startDate, endDate, page, size, BASE_URL });
        }

        // 날짜 없을 땐 fail
        if (!startDate || !endDate) {
            return NextResponse.json({ error: 'startDate and endDate are required' }, { status: 400 });
        }

        // ✅ await 추가 및 백엔드 API 호출
        const response = await serverApiClient.get(BASE_URL, {
            params: {
                startDate: startDate,
                endDate: endDate,
                page: page,
                size: size,
            },
        });

        // ✅ 백엔드 응답을 그대로 반환
        return NextResponse.json(response, { status: 200 });
    } catch (error: any) {
        console.error('❌ Error fetching sales data:', error);
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
        return NextResponse.json({ error: error.message || 'Failed to fetch data' }, { status: error.response?.status || 500 });
    }
}