// api/v1/owner/no-show-post-schedules 호출
import serverApiClient from "@/services/ApiClient";
import { NextRequest, NextResponse } from "next/server";

// POST 요청: 백엔드에 노쇼 지연 등록 생성 요청
export async function POST (request: NextRequest) {
    try {
        // 요청 바디에서 데이터 추출
        const requestBody = await request.json();
        console.log('Request Body:', requestBody);

        const presetId = requestBody.presetId;
        const items = requestBody.items;

        const response = await serverApiClient.post('/owner/no-show-post-schedules', {
            presetId,
            items
        });

        return NextResponse.json(response, { status: 200 });
    } catch (error: any) {
        console.error('❌ Error creating no-show post schedules:', error);

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
        return NextResponse.json({ error: error.message || 'Failed to create no-show post schedules' }, { status: 500 });
    }
}

// GET: 백엔드에 노쇼 지연 등록 목록 조회 요청
export async function GET (request: NextRequest) {
    try {
        const requestBody = await request.json();
        console.log('Request Body:', requestBody);
        const page = requestBody.page;
        const size = requestBody.size;
        const status = requestBody.status; // - QUEUED, PROCESSING, PUBLISHED, CANCELLED, FAILED 중 1개

        const response = await serverApiClient.get('/owner/no-show-post-schedules', {
            params: { page, size, status}
        });

        return NextResponse.json(response, { status: 200 });
    } catch (error: any) {
        console.error('❌ Error fetching no-show post schedules:', error);
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
        return NextResponse.json({ error: error.message || 'Failed to fetch no-show post schedules' }, { status: 500 });
    }
}