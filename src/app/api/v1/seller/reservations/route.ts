// src/app/api/v1/seller/reservations/route.ts
import { NextResponse, NextRequest } from 'next/server';
import serverApiClient from '@/services/ApiClient';
import { cookies } from 'next/headers';

// ✅ GET 요청: localStorage 데이터를 클라이언트에서 전달받아 리턴
export async function GET(request: NextRequest) {
  try {
    // 📌 URL에서 쿼리 파라미터 추출
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get('date');
    const status = searchParams.get('status');
    const sort = searchParams.get('sort');
    const cursor = searchParams.get('cursor');
    const size = searchParams.get('size');
    const loginId = searchParams.get('userId') || 'CEO1';
    
    // 📌 localStorage 데이터를 클라이언트에서 전달받음 (JSON string)
    const reservationsData = searchParams.get('reservationsData');

    const cookieStore = await cookies();
    const storedLoginId = cookieStore.get('login-id')?.value || loginId;

    // localStorage에서 전달받은 데이터 파싱
    let reservations = [];
    if (reservationsData) {
      try {
        reservations = JSON.parse(decodeURIComponent(reservationsData));
      } catch (parseError) {
        console.error('Failed to parse reservations data:', parseError);
        return NextResponse.json({ error: 'Invalid reservations data format' }, { status: 400 });
      }
    }

    const filterMockReservations = reservations.filter((value: any) => {
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
        totalPage: Math.ceil(reservations.length / 10),
        cursor: Number(cursor) || 1,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch data' }, { status: 500 });
  }
}

// POST 요청 - 노쇼 예약 생성
export async function POST(request: NextRequest) {
  try {
    // 📌 POST 요청은 body에서 데이터 추출
    const body = await request.json();
    const { reservation } = body;

    console.log('POST Body:', { reservation });

    let result;
    if(reservation.isNoShowSale){
      result = await serverApiClient.post('/owner/no-show-posts/batch', {
        items: reservation.items,
        discountPercent: reservation.discountPercent,
        expireAt: reservation.expireAfterMinutes,
      });
    }
    else {
      // 지연 등록: preset 정보 포함
      result = await serverApiClient.post('/owner/no-show-post-schedules', {
        presetId: reservation.presetId,
        items: reservation.items,
        name: reservation.presetName,
        discountPercent: reservation.presetDiscountPercent,
        delayMinutes: reservation.presetDelayMinutes,
      })
    }

    // 받은 데이터 그대로 반환
    return NextResponse.json(result);
    // return NextResponse.json(
    //   {
    //     success: true,
    //     message: '예약이 생성되었습니다.',
    //     data: reservation,
    //   },
    //   { status: 201 }
    // );
  } catch (error: any) {
    console.error('POST Error:', error);

    // Axios 에러 응답에서 상세 정보 추출
    if (error.response) {
      return NextResponse.json(error.response.data || { error: error.message || 'Failed to create reservation' }, {
        status: error.response.status || 500,
      });
    }

    // 네트워크 에러 등 response가 없는 경우
    return NextResponse.json({ error: error.message || 'Failed to create reservation' }, { status: 500 });
  }
}
