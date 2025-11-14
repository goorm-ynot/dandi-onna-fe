// src/app/api/users/route.ts
import { NextResponse, NextRequest } from 'next/server';
import { mockReservations } from '@/mock/reservation'; // mock 데이터

// ✅ GET 요청: mockReservations 리턴 (쿼리 파라미터 포함)
export async function GET(request: NextRequest) {
  try {
    // 📌 URL에서 쿼리 파라미터 추출
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');
    const status = searchParams.get('status');
    const sort = searchParams.get('sort');
    const cursor = searchParams.get('cursor');
    const size = searchParams.get('size');

    console.log('Query Params:', { date, status, sort, cursor, size });
    const filterMockReservations = mockReservations.filter((value) => {
      // status가 'all'이거나 null/undefined인 경우 모든 데이터 반환
      if (status === 'all' || !status) {
        return true;
      }

      // 나머지 경우는 status와 비교
      return value.status === status;
    });

    return NextResponse.json(
      {
        data: filterMockReservations,
        total: mockReservations.length / 10,
        cursor: 1,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch data' }, { status: 500 });
  }
}
