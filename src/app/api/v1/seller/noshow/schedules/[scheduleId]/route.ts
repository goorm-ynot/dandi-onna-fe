import serverApiClient from "@/services/ApiClient";
import { NextRequest, NextResponse } from "next/server";

// GET: 백엔드에 노쇼 지연 등록 상세 조회 요청
export async function GET (request: NextRequest) {
    try {
        // params 읽기
        const { searchParams } = new URL(request.url);
        const scheduleId = searchParams.get('scheduleId');

        // 백엔드 API 호출
        const response = await serverApiClient.get(`/owner/no-show-post-schedules/${scheduleId}`);

        return NextResponse.json(response, { status: 200 });

    } catch (error: any) {
        console.log('❌ Error fetching no-show post schedule details:', error);
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
        return NextResponse.json({ error: error.message || 'Failed to fetch no-show post schedule details' }, { status: 500 });
    }
}