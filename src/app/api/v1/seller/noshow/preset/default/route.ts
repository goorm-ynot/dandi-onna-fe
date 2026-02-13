import serverApiClient from "@/services/ApiClient";
import { NextRequest, NextResponse } from "next/server";

// GET 요청: 백엔드에서 노쇼 기본 프리셋 가져오기
export async function GET(request: NextRequest) {
    try {
        // 쿼리파라미터 XX
        const response = await serverApiClient.get('/owner/no-show-presets/default');
        
        return NextResponse.json(response, { status: 200 });
    } catch (error: any) {
        console.error('❌ Error fetching default noshow preset:', error);
        
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

// PUT 요청: 백엔드에 노쇼 기본 프리셋 업데이트(없으면 생성, 있음 갱신함)
export async function PUT(request: NextRequest) {
    try {
        // no params
        const response = await serverApiClient.put('/owner/no-show-presets/default');
        
        return NextResponse.json(response, { status: 200 });        
    } catch (error: any) {
        console.error('❌ Error updating default noshow preset:', error);
        
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
        return NextResponse.json({ error: error.message || 'Failed to update data' }, { status: 500 });
    }
}