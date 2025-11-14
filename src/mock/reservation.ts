// ✅ 임시 목데이터 (export 제거)
export const mockReservations = [
  {
    reservationNo: 'A00001',
    time: '2025-11-26T12:30:00',
    menus: [
      { menuId: 'M-101', name: '아메리카노', qty: 4, price: 3000 },
      { menuId: 'M-202', name: '치즈케이크', qty: 3, price: 7000 },
    ],
    contact: '010-1234-5678',
    status: 'PENDING',
  },
  {
    reservationNo: 'A00002',
    time: '2025-11-12T11:30:00',
    menus: [
      { menuId: 'M-105', name: '카페라떼', qty: 1, price: 3500 },
      { menuId: 'M-301', name: '샌드위치', qty: 2, price: 5500 },
    ],
    contact: '010-2233-4455',
    status: 'VISIT_DONE',
  },
  {
    reservationNo: 'A00003',
    time: '2025-11-12T12:00:00',
    menus: [{ menuId: 'M-201', name: '카푸치노', qty: 1, price: 3500 }],
    contact: '010-6789-1122',
    status: 'NOSHOW',
  },
  {
    reservationNo: 'A00004',
    time: '2025-11-12T13:15:00',
    menus: [
      { menuId: 'M-404', name: '레몬에이드', qty: 3, price: 5000 },
      { menuId: 'M-305', name: '베이글', qty: 1, price: 5500 },
    ],
    contact: '010-4567-8910',
    status: 'PENDING',
  },
  {
    reservationNo: 'A00005',
    time: '2025-11-12T14:45:00',
    menus: [{ menuId: 'M-501', name: '콜드브루', qty: 2, price: 4000 }],
    contact: '010-3333-9999',
    status: 'VISIT_DONE',
  },
  {
    reservationNo: 'A00006',
    time: '2025-11-12T15:28:00',
    menus: [
      { menuId: 'M-601', name: '에스프레소', qty: 1, price: 3000 },
      { menuId: 'M-602', name: '티라미수', qty: 1, price: 6000 },
    ],
    contact: '010-7654-1234',
    status: 'PENDING',
  },
  {
    reservationNo: 'A00007',
    time: '2025-11-12T15:30:00',
    menus: [{ menuId: 'M-701', name: '핫초코', qty: 2, price: 4500 }],
    contact: '010-4455-6677',
    status: 'NOSHOW',
  },
];
