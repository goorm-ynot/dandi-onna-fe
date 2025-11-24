import { mockReservations } from '@/mock/reservation';
import { NextRequest, NextResponse } from 'next/server';

// ✅ GET 요청: mockReservations에서 특정 데이터 리턴 (쿼리 파라미터 포함)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const reservationNo = searchParams.get('reservationNo');

    // 🔧 객체를 배열로 변환하여 검색
    const allReservations = Object.values(mockReservations).flat();
    const searchDatainMock = allReservations.filter((data) => data.reservationNo === reservationNo);

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
