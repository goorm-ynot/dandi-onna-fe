// src/app/api/users/route.ts
import { NextResponse, NextRequest } from 'next/server';

// ✅ 임시 목데이터 (export 제거)
const mockReservations = [
  {
    reservationNo: 'RSV-001',
    time: '2025-11-12T10:00:00Z',
    menus: [
      { menuId: 'M-101', name: '아메리카노', qty: 2 },
      { menuId: 'M-202', name: '치즈케이크', qty: 1 },
    ],
    contact: '010-1234-5678',
    status: 'PENDING',
  },
  {
    reservationNo: 'RSV-002',
    time: '2025-11-12T11:30:00Z',
    menus: [
      { menuId: 'M-105', name: '카페라떼', qty: 1 },
      { menuId: 'M-301', name: '샌드위치', qty: 2 },
    ],
    contact: '010-2233-4455',
    status: 'VISIT_DONE',
  },
  {
    reservationNo: 'RSV-003',
    time: '2025-11-12T12:00:00Z',
    menus: [{ menuId: 'M-201', name: '카푸치노', qty: 1 }],
    contact: '010-6789-1122',
    status: 'NOSHOW',
  },
  {
    reservationNo: 'RSV-004',
    time: '2025-11-12T13:15:00Z',
    menus: [
      { menuId: 'M-404', name: '레몬에이드', qty: 3 },
      { menuId: 'M-305', name: '베이글', qty: 1 },
    ],
    contact: '010-4567-8910',
    status: 'PENDING',
  },
  {
    reservationNo: 'RSV-005',
    time: '2025-11-12T14:45:00Z',
    menus: [{ menuId: 'M-501', name: '콜드브루', qty: 2 }],
    contact: '010-3333-9999',
    status: 'VISIT_DONE',
  },
  {
    reservationNo: 'RSV-006',
    time: '2025-11-12T15:00:00Z',
    menus: [
      { menuId: 'M-601', name: '에스프레소', qty: 1 },
      { menuId: 'M-602', name: '티라미수', qty: 1 },
    ],
    contact: '010-7654-1234',
    status: 'PENDING',
  },
  {
    reservationNo: 'RSV-007',
    time: '2025-11-12T15:30:00Z',
    menus: [{ menuId: 'M-701', name: '핫초코', qty: 2 }],
    contact: '010-4455-6677',
    status: 'NOSHOW',
  },
  {
    reservationNo: 'RSV-008',
    time: '2025-11-12T16:00:00Z',
    menus: [
      { menuId: 'M-801', name: '그린티라떼', qty: 1 },
      { menuId: 'M-804', name: '치킨샐러드', qty: 1 },
    ],
    contact: '010-9876-5432',
    status: 'VISIT_DONE',
  },
  {
    reservationNo: 'RSV-009',
    time: '2025-11-12T17:15:00Z',
    menus: [{ menuId: 'M-901', name: '바닐라라떼', qty: 2 }],
    contact: '010-1599-7531',
    status: 'PENDING',
  },
  {
    reservationNo: 'RSV-010',
    time: '2025-11-12T18:00:00Z',
    menus: [
      { menuId: 'M-1001', name: '카라멜마키아토', qty: 1 },
      { menuId: 'M-1102', name: '쿠키', qty: 3 },
    ],
    contact: '010-7410-8520',
    status: 'VISIT_DONE',
  },
];

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

    return NextResponse.json(
      {
        data: mockReservations,
        total: mockReservations.length / 10,
        cursor: 1,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch data' }, { status: 500 });
  }
}
