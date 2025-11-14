import { mockReservations } from '@/mock/reservation';
import { NextRequest, NextResponse } from 'next/server';

// ✅ GET 요청: mockReservations에서 특정 데이터 리턴 (쿼리 파라미터 포함)
export async function GET(request: NextRequest) {
  try {
    // 📌 URL에서 쿼리 파라미터 추출
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');
    const reservationNo = searchParams.get('reservationNo');

    const searchDatainMock = mockReservations.filter((data) => data.reservationNo === reservationNo);

    return NextResponse.json(
      {
        data: searchDatainMock,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch data' }, { status: 500 });
  }
}
