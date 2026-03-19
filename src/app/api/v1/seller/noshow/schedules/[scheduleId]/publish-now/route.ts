/** 게시 대기 중 글 즉시 등록 API 라우트 */

import serverApiClient from "@/services/ApiClient";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest){
    try {
        //따로 파라미터는 shceduleId만 필요함
        const { searchParams } = new URL(request.url);
        const scheduleId = searchParams.get('scheduleId');
        console.log('Publishing no-show post schedule immediately for scheduleId:', scheduleId);

        const response = await serverApiClient.post(`/owner/no-show-post-schedules/${scheduleId}/publish-now`);

        return NextResponse.json(response, { status: 200 });
    } catch (error: any) {
        console.error('❌ Error publishing no-show post schedule immediately:', error);
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
        return NextResponse.json({ error: error.message || 'Failed to publish no-show post schedule immediately' }, { status: 500 });  
    }
}