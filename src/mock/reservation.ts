// ✅ 임시 목데이터 UI 및 테스트용

// 초루 예약 목록 데이터
export const mockReservations = {
  CEO1: [
    {
      reservationNo: 'A00007',
      time: '2025-11-25T15:30:00',
      menus: [
        { menuId: 'cd3adeb8-0c1c-4da0-8399-472abe6f081d', name: '저녁 정식', qty: 5, price: 70000 },
        { menuId: 'd5fcc0c1-1acc-475e-871c-9a2993ee9097', name: '모둠초밥 10pcs', qty: 4, price: 28000 },
      ],
      contact: '010-4455-6677',
      status: 'NOSHOW',
    },
    {
      reservationNo: 'A00006',
      time: '2025-11-25T15:28:00',
      menus: [
        { menuId: 'e02bf703-5d60-497a-9889-b2e0f74de401', name: '1인 숙성 모둠회', qty: 6, price: 50000 },
        { menuId: 'cd3adeb8-0c1c-4da0-8399-472abe6f081d', name: '저녁 정식', qty: 5, price: 70000 },
        { menuId: 'd5fcc0c1-1acc-475e-871c-9a2993ee9097', name: '모둠초밥 10pcs', qty: 4, price: 28000 },
      ],
      contact: '010-7654-1234',
      status: 'PENDING',
    },
    {
      reservationNo: 'A00005',
      time: '2025-11-25T14:45:00',
      menus: [{ menuId: '859726a7-c607-433c-9bdf-6a79c428a3cf', name: '저녁 정식', qty: 5, price: 70000 }],
      contact: '010-3333-9999',
      status: 'VISIT_DONE',
    },
    {
      reservationNo: 'A00004',
      time: '2025-11-25T13:15:00',
      menus: [
        { menuId: '8faac229-a50d-4403-8f72-bb09a663d4c6', name: '1인 숙성 모둠회', qty: 2, price: 50000 },
        { menuId: '859726a7-c607-433c-9bdf-6a79c428a3cf', name: '저녁 정식', qty: 2, price: 70000 },
      ],
      contact: '010-4567-8910',
      status: 'PENDING',
    },
    {
      reservationNo: 'A00003',
      time: '2025-11-25T12:00:00',
      menus: [
        { menuId: 'bf09e054-f986-4a20-8993-cecd44008c85', name: '모둠초밥 10pcs', qty: 4, price: 28000 },
        { menuId: '859726a7-c607-433c-9bdf-6a79c428a3cf', name: '저녁 정식', qty: 1, price: 70000 },
      ],
      contact: '010-6789-1122',
      status: 'NOSHOW',
    },
    {
      reservationNo: 'A00002',
      time: '2025-11-25T11:30:00',
      menus: [{ menuId: '859726a7-c607-433c-9bdf-6a79c428a3cf', name: '저녁 정식', qty: 1, price: 70000 }],
      contact: '010-2233-4455',
      status: 'VISIT_DONE',
    },
    {
      reservationNo: 'A00001',
      time: '2025-11-25T12:30:00',
      menus: [
        { menuId: 'bf09e054-f986-4a20-8993-cecd44008c85', name: '모둠초밥 10pcs', qty: 4, price: 28000 },
        { menuId: '8faac229-a50d-4403-8f72-bb09a663d4c6', name: '1인 숙성 모둠회', qty: 3, price: 50000 },
      ],
      contact: '010-1234-5678',
      status: 'PENDING',
    },
  ],

  CEO2: [
    {
      reservationNo: 'B00010',
      time: '2025-11-25T18:45:00',
      menus: [
        { menuId: '6b5036ec-5741-439d-8049-9ed154dcc661', name: '해삼', qty: 1, price: 110000 },
        { menuId: '8149947e-0645-4e8d-9309-96f893ae26c3', name: '겨울 대방어 (특)(4인)', qty: 1, price: 120000 },
        { menuId: '7b4d9c9a-c04e-41d0-ba28-983a8f1fb474', name: '(두)모듬사시미(5인~)', qty: 1, price: 110000 },
      ],
      contact: '010-5555-3333',
      status: 'PENDING',
    },
    {
      reservationNo: 'B00009',
      time: '2025-11-25T17:15:00',
      menus: [
        { menuId: '8149947e-0645-4e8d-9309-96f893ae26c3', name: '겨울 대방어 (특)(4인)', qty: 2, price: 120000 },
        { menuId: '7b4d9c9a-c04e-41d0-ba28-983a8f1fb474', name: '(두)모듬사시미(5인~)', qty: 1, price: 110000 },
      ],
      contact: '010-9999-2222',
      status: 'PENDING',
    },
    {
      reservationNo: 'B00008',
      time: '2025-11-25T16:00:00',
      menus: [{ menuId: '7b4d9c9a-c04e-41d0-ba28-983a8f1fb474', name: '(두)모듬사시미(5인~)', qty: 1, price: 110000 }],
      contact: '010-8888-1111',
      status: 'PENDING',
    },
    {
      reservationNo: 'B00007',
      time: '2025-11-25T15:30:00',
      menus: [
        { menuId: '8149947e-0645-4e8d-9309-96f893ae26c3', name: '겨울 대방어 (특)(4인)', qty: 1, price: 120000 },
        { menuId: '6b5036ec-5741-439d-8049-9ed154dcc661', name: '해삼', qty: 2, price: 110000 },
      ],
      contact: '010-4455-6677',
      status: 'PENDING',
    },
    {
      reservationNo: 'B00006',
      time: '2025-11-25T15:28:00',
      menus: [
        { menuId: '7b4d9c9a-c04e-41d0-ba28-983a8f1fb474', name: '(두)모듬사시미(5인~)', qty: 2, price: 110000 },
        { menuId: '8149947e-0645-4e8d-9309-96f893ae26c3', name: '겨울 대방어 (특)(4인)', qty: 1, price: 120000 },
        { menuId: '6b5036ec-5741-439d-8049-9ed154dcc661', name: '해삼', qty: 1, price: 110000 },
      ],
      contact: '010-7654-1234',
      status: 'PENDING',
    },
    {
      reservationNo: 'B00005',
      time: '2025-11-25T14:45:00',
      menus: [{ menuId: '6b5036ec-5741-439d-8049-9ed154dcc661', name: '해삼', qty: 3, price: 110000 }],
      contact: '010-3333-9999',
      status: 'PENDING',
    },
    {
      reservationNo: 'B00004',
      time: '2025-11-25T13:15:00',
      menus: [
        { menuId: '7b4d9c9a-c04e-41d0-ba28-983a8f1fb474', name: '(두)모듬사시미(5인~)', qty: 1, price: 110000 },
        { menuId: '8149947e-0645-4e8d-9309-96f893ae26c3', name: '겨울 대방어 (특)(4인)', qty: 1, price: 120000 },
      ],
      contact: '010-4567-8910',
      status: 'PENDING',
    },
    {
      reservationNo: 'B00003',
      time: '2025-11-25T12:00:00',
      menus: [
        { menuId: '8149947e-0645-4e8d-9309-96f893ae26c3', name: '겨울 대방어 (특)(4인)', qty: 1, price: 120000 },
        { menuId: '6b5036ec-5741-439d-8049-9ed154dcc661', name: '해삼', qty: 1, price: 110000 },
      ],
      contact: '010-6789-1122',
      status: 'PENDING',
    },
    {
      reservationNo: 'B00002',
      time: '2025-11-25T11:30:00',
      menus: [{ menuId: '6b5036ec-5741-439d-8049-9ed154dcc661', name: '해삼', qty: 2, price: 110000 }],
      contact: '010-2233-4455',
      status: 'PENDING',
    },
    {
      reservationNo: 'B00001',
      time: '2025-11-25T12:30:00',
      menus: [
        { menuId: '8149947e-0645-4e8d-9309-96f893ae26c3', name: '겨울 대방어 (특)(4인)', qty: 1, price: 120000 },
        { menuId: '7b4d9c9a-c04e-41d0-ba28-983a8f1fb474', name: '(두)모듬사시미(5인~)', qty: 1, price: 110000 },
      ],
      contact: '010-1234-5678',
      status: 'PENDING',
    },
  ],

  CEO22: [
    {
      reservationNo: 'D00008',
      time: '2025-11-25T18:00:00',
      menus: [
        { menuId: 'fdb9df61-4e13-4238-ba2a-5e33d32aedff', name: '참가자미세꼬시', qty: 1, price: 49000 },
        { menuId: 'a4ff5574-7229-4307-b78d-1cec336e37f6', name: '모듬회 5인', qty: 1, price: 129000 },
      ],
      contact: '010-8765-4321',
      status: 'PENDING',
    },
    {
      reservationNo: 'D00007',
      time: '2025-11-25T17:15:00',
      menus: [
        { menuId: '9b450c0a-5993-4fae-87a9-60a29e076374', name: '대광어', qty: 1, price: 34000 },
        { menuId: '4588a6a4-3d9a-4cdb-899b-f42d6b52fcf2', name: '이시가리', qty: 1, price: 39000 },
        { menuId: '7d09d348-67dd-4f26-8b43-2a909dfc34d6', name: '이든스시', qty: 1, price: 11500 },
      ],
      contact: '010-5678-1234',
      status: 'PENDING',
    },
    {
      reservationNo: 'D00006',
      time: '2025-11-25T16:30:00',
      menus: [
        { menuId: 'fbc54bba-6ea3-4586-a012-0c2d8f400b53', name: '명품 활어 한판', qty: 2, price: 39000 },
        { menuId: '4469a051-9a33-4505-bfde-1357d869281b', name: '오색(五色) 바다 정식', qty: 1, price: 25000 },
      ],
      contact: '010-1234-9876',
      status: 'PENDING',
    },
    {
      reservationNo: 'D00005',
      time: '2025-11-25T15:45:00',
      menus: [{ menuId: 'a4ff5574-7229-4307-b78d-1cec336e37f6', name: '모듬회 5인', qty: 1, price: 129000 }],
      contact: '010-9999-0000',
      status: 'PENDING',
    },
    {
      reservationNo: 'D00004',
      time: '2025-11-25T15:00:00',
      menus: [
        { menuId: '4588a6a4-3d9a-4cdb-899b-f42d6b52fcf2', name: '이시가리', qty: 1, price: 39000 },
        { menuId: '7d09d348-67dd-4f26-8b43-2a909dfc34d6', name: '이든스시', qty: 3, price: 11500 },
      ],
      contact: '010-7777-8888',
      status: 'PENDING',
    },
    {
      reservationNo: 'D00003',
      time: '2025-11-25T13:30:00',
      menus: [
        { menuId: '9b450c0a-5993-4fae-87a9-60a29e076374', name: '대광어', qty: 1, price: 34000 },
        { menuId: 'fdb9df61-4e13-4238-ba2a-5e33d32aedff', name: '참가자미세꼬시', qty: 1, price: 49000 },
      ],
      contact: '010-5555-6666',
      status: 'NOSHOW',
    },
    {
      reservationNo: 'D00002',
      time: '2025-11-25T12:15:00',
      menus: [{ menuId: '4469a051-9a33-4505-bfde-1357d869281b', name: '오색(五色) 바다 정식', qty: 2, price: 25000 }],
      contact: '010-3333-4444',
      status: 'VISIT_DONE',
    },
    {
      reservationNo: 'D00001',
      time: '2025-11-25T11:00:00',
      menus: [
        { menuId: 'fbc54bba-6ea3-4586-a012-0c2d8f400b53', name: '명품 활어 한판', qty: 1, price: 39000 },
        { menuId: '7d09d348-67dd-4f26-8b43-2a909dfc34d6', name: '이든스시', qty: 2, price: 11500 },
      ],
      contact: '010-1111-2222',
      status: 'VISIT_DONE',
    },
  ],
};
// 사용법
// const reservations = mockReservations[loginId] || [];

// 노쇼 메뉴 상태 테스트용
export const mockNoshowMenu = {
  success: true,
  code: 'OK',
  message: '성공',
  data: {
    posts: [
      {
        postId: 2,
        menuId: '8faac229-a50d-4403-8f72-bb09a663d4c6',
        name: '1인 숙성 모둠회',
        visitTime: '2025-11-16T18:30:00+09:00',
        quantity: 7,
        discountPercent: 40,
      },
      {
        postId: 1,
        menuId: 'bf09e054-f986-4a20-8993-cecd44008c85',
        name: '모둠초밥 10pcs',
        visitTime: '2025-11-16T18:30:00+09:00',
        quantity: 1,
        discountPercent: 30,
      },
    ],
    pagination: {
      page: 0,
      size: 10,
      totalElements: 2,
      totalPages: 1,
      hasNext: false,
    },
  },
};

export const mockNoshowMenuDetail = {
  success: true,
  code: 'OK',
  message: '성공',
  data: {
    noshowPostsId: 2,
    menuId: '8faac229-a50d-4403-8f72-bb09a663d4c6',
    visitTime: '2025-11-16T18:30:00+09:00',
    name: '1인 숙성 모둠회',
    quantity: 7,
    price: 50000,
    discountPercent: 40,
  },
};

export const mockOrderListResponse = {
  success: true,
  code: 'SUCCESS',
  message: '주문 목록 조회 성공',
  data: {
    orders: [
      {
        orderId: 1001,
        visitTime: '2024-01-15T18:30:00.000Z',
        status: 'PENDING',
        menuNames: '김치찌개, 공기밥 2개, 계란후라이',
        consumerPhone: '010-1234-5678',
      },
      {
        orderId: 1002,
        visitTime: '2024-01-15T19:15:00.000Z',
        status: 'PENDING',
        menuNames: '된장찌개, 불고기정식',
        consumerPhone: '010-9876-5432',
      },
      {
        orderId: 1003,
        visitTime: '2024-01-15T12:00:00.000Z',
        status: 'COMPLETED',
        menuNames: '비빔밥, 미소국, 김치전',
        consumerPhone: '010-5555-1234',
      },
      {
        orderId: 1004,
        visitTime: '2024-01-15T13:45:00.000Z',
        status: 'PENDING',
        menuNames: '치킨마요덮밥, 콜라',
        consumerPhone: '010-7777-8888',
      },
      {
        orderId: 1005,
        visitTime: '2024-01-15T20:30:00.000Z',
        status: 'PENDING',
        menuNames: '삼겹살정식, 된장찌개, 공기밥',
        consumerPhone: '010-1111-2222',
      },
      {
        orderId: 1006,
        visitTime: '2024-01-16T11:30:00.000Z',
        status: 'COMPLETED',
        menuNames: '순두부찌개, 김치볶음밥, 계란국',
        consumerPhone: '010-3333-4444',
      },
      {
        orderId: 1007,
        visitTime: '2024-01-16T17:00:00.000Z',
        status: 'PENDING',
        menuNames: '떡볶이, 순대, 튀김 3종',
        consumerPhone: '010-6666-7777',
      },
      {
        orderId: 1008,
        visitTime: '2024-01-16T14:20:00.000Z',
        status: 'COMPLETED',
        menuNames: '냉면, 만두 5개',
        consumerPhone: '010-9999-0000',
      },
    ],
    pagination: {
      page: 0,
      size: 10,
      totalElements: 25,
      totalPages: 3,
      hasNext: true,
    },
  },
};

export const mockOrderDetailResponse = {
  success: true,
  code: 'OK',
  message: '성공',
  data: {
    orderId: 152,
    consumerId: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
    storeId: 'd4094607-2ba2-4c5e-887a-7f91cfb27e6e',
    visitTime: '2025-11-17T18:00:00+09:00',
    totalPrice: 45000,
    paidAmount: 27000,
    status: 'COMPLETED',
    paymentStatus: 'PAID',
    paymentMethod: '카카오페이',
    paymentTxId: 'PAY_20251117_000123',
    paymentMemo: '테스트 결제',
    paidAt: '2025-11-17T17:45:32+09:00',
    failedAt: null,
    refundedAt: null,
    storeMemo: '18시까지 방문 예정',
    createdAt: '2025-11-17T17:40:01+09:00',
    items: [
      {
        orderItemId: 301,
        menuName: '모둠초밥 10pcs',
        quantity: 2,
        unitPrice: 13500,
        discountPercent: 40,
        visitTime: '2025-11-17T18:00:00+09:00',
      },
      {
        orderItemId: 302,
        menuName: '사시미 플래터',
        quantity: 1,
        unitPrice: 18000,
        discountPercent: 40,
        visitTime: '2025-11-17T18:00:00+09:00',
      },
    ],
  },
};
