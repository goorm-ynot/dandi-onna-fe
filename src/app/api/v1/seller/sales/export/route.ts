import serverApiClient from "@/services/ApiClient";
import { NextRequest, NextResponse } from "next/server";

/**
 * 판매자 매출 데이터 엑셀 내보내기 API 라우트 핸들러
 */
export async function POST (request: NextRequest){
    try {
        const body = await request.json();
        // console.log('Received export request body:', body.params);
        const {startDate, endDate, includeDetail} = body.params;
        // console.log('Export sales data request received with params:', {startDate, endDate, includeDetail});
        if(!startDate || !endDate) {
            return NextResponse.json(
                { message: 'startDate and endDate are required' },
                { status: 400 }
            );
        }
        const response = await serverApiClient.post('/owner/sales/export', {
            startDate,
            endDate,
            includeDetail,
        }) as { data: any; status: number };

        return NextResponse.json(response.data, {status: response.status});
    } catch (error: any) {
        console.error('Error exporting sales data:', error);
        // 에러 응답 반환
        return NextResponse.json(
            { message: 'Failed to export sales data', error: error.message || 'Unknown error' },
            { status: error.status || 500 }
        );
    }
}