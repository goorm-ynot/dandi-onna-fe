// import React from 'react';

// export default function dashboard() {
//   return (
//     <div className='w-screen h-screen flex flex-col '>
//       {/* seller 헤더 */}
//       {/* seller 사이드 메뉴 */}
//       {/* 아... 이건 레이아웃에 들어가야하지 */}
//       <div className='flex-1 flex flex-col justify-center items-center p-6'>
//         <h1 className='text-2xl font-bold mb-4'>환영합니다!</h1>
//         <p className='text-gray-600 text-center mb-8'>사장님 전용 페이지입니다!</p>
//         {/* 온보딩 단계들 */}
//       </div>
//     </div>
//   );
// }
'use client';

import * as React from 'react';
import { ColumnDef, SortingState, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TableSelectTrigger,
} from '@/components/ui/select';

// ✅ 타입 정의
type Payment = {
  id: string;
  amount: number;
  status: 'noshow' | 'processing' | 'disabled';
  email: string;
};

// ✅ 더미 API
async function fetchPayments({
  page,
  sort,
}: {
  page: number;
  sort: SortingState;
}): Promise<{ data: Payment[]; totalPages: number }> {
  console.log('🚀 API 호출:', { page, sort });

  await new Promise((res) => setTimeout(res, 200));

  const allData: Payment[] = [
    { id: 'a1', amount: 500, status: 'noshow', email: 'alice@test.com' },
    { id: 'b1', amount: 200, status: 'processing', email: 'bob@test.com' },
    { id: 'c1', amount: 800, status: 'disabled', email: 'carol@test.com' },
    { id: 'd1', amount: 300, status: 'processing', email: 'dave@test.com' },
    { id: 'e1', amount: 100, status: 'processing', email: 'eve@test.com' },
    { id: 'a2', amount: 500, status: 'noshow', email: 'alice@test.com' },
    { id: 'b2', amount: 200, status: 'processing', email: 'bob@test.com' },
    { id: 'c2', amount: 800, status: 'disabled', email: 'carol@test.com' },
    { id: 'd2', amount: 300, status: 'processing', email: 'dave@test.com' },
    { id: 'e2', amount: 100, status: 'processing', email: 'eve@test.com' },
    { id: 'a3', amount: 500, status: 'noshow', email: 'alice@test.com' },
    { id: 'b3', amount: 200, status: 'processing', email: 'bob@test.com' },
    { id: 'c3', amount: 800, status: 'disabled', email: 'carol@test.com' },
    { id: 'd3', amount: 300, status: 'processing', email: 'dave@test.com' },
    { id: 'e3', amount: 100, status: 'processing', email: 'eve@test.com' },
  ];

  const pageSize = 10;
  const totalPages = Math.ceil(allData.length / pageSize);
  const paginated = allData.slice((page - 1) * pageSize, page * pageSize);

  return { data: paginated, totalPages };
}

// ✅ 디바운스 훅
function useDebounce(callback: () => void, delay: number, deps: any[]) {
  React.useEffect(() => {
    const handler = setTimeout(() => callback(), delay);
    return () => clearTimeout(handler);
  }, deps);
}

// ✅ 컬럼 정의
const getColumns = (handleStatusChange: (id: string, newStatus: Payment['status']) => void): ColumnDef<Payment>[] => [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant='ghost'
          className='flex items-center gap-2'
          onClick={() => column.toggleSorting(isSorted === 'asc')}>
          번호
          {isSorted === 'asc' ? <ChevronUp size={16} /> : isSorted === 'desc' ? <ChevronDown size={16} /> : null}
        </Button>
      );
    },
    cell: ({ row }) => <div className='w-auto'>{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      const isSorted = column.getIsSorted();
      return (
        <Button
          variant='ghost'
          className='flex items-center gap-2'
          onClick={() => column.toggleSorting(isSorted === 'asc')}>
          Email
          {isSorted === 'asc' ? <ChevronUp size={16} /> : isSorted === 'desc' ? <ChevronDown size={16} /> : null}
        </Button>
      );
    },
    cell: ({ row }) => <div className='lowercase'>{row.getValue('email')}</div>,
  },
  {
    accessorKey: 'amount',
    header: () => <div className='text-right'>Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);
      return <div className='text-right font-medium'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'status',
    header: () => <div className='text-center'>Status</div>,
    cell: ({ row }) => {
      const id = row.getValue('id') as string;
      const currentStatus = row.getValue('status') as Payment['status'];

      return (
        <div className='flex justify-center'>
          <Select
            value={currentStatus}
            onValueChange={(newStatus) => handleStatusChange(id, newStatus as Payment['status'])}>
            <TableSelectTrigger variant={currentStatus} className='w-[80px] h-[26px] px-3 '>
              <SelectValue placeholder='Status' />
            </TableSelectTrigger>
            <SelectContent>
              <SelectItem value='processing'>방문예정</SelectItem>
              <SelectItem value='noshow'>노쇼</SelectItem>
              <SelectItem value='disabled'>방문완료</SelectItem>
            </SelectContent>
          </Select>
        </div>
      );
    },
  },
];

export default function DataTableWithStatusSelect() {
  const [data, setData] = React.useState<Payment[]>([]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [page, setPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  // ✅ status 변경 핸들러
  const handleStatusChange = (id: string, newStatus: Payment['status']) => {
    console.log(`📝 상태 변경 [${id}] → ${newStatus}`);

    // (예시) 실제로는 API 호출
    setData((prev) => prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item)));
  };

  // ✅ React Table 구성
  const table = useReactTable({
    data,
    columns: getColumns(handleStatusChange),
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    manualPagination: true,
    onSortingChange: setSorting,
    state: { sorting },
  });

  // ✅ 정렬/페이지 변경 시 API 호출
  useDebounce(
    () => {
      setLoading(true);
      fetchPayments({ page, sort: sorting }).then((res) => {
        setData(res.data);
        setTotalPages(res.totalPages);
        setLoading(false);
      });
    },
    400,
    [sorting, page]
  );

  return (
    <div className='w-screen h-screen flex flex-col '>
      <div className='flex-1 flex flex-col justify-center items-center p-6'>
        <div className='overflow-hidden rounded-md bg-zinc-100 p-3  w-[80%] max-w-5xl'>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={4} className='text-center h-24'>
                    Loading...
                  </TableCell>
                </TableRow>
              ) : data.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className='text-center h-24'>
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* ✅ 페이지네이션 */}
        <div className='flex items-center justify-center gap-2 mt-4'>
          <Button variant='link' size='sm' onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>
            {'<'}
          </Button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <Button key={i} size='sm' variant={page === i + 1 ? 'outline' : 'link'} onClick={() => setPage(i + 1)}>
              {i + 1}
            </Button>
          ))}
          <Button
            variant='link'
            size='sm'
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}>
            {'>'}
          </Button>
        </div>
      </div>
    </div>
  );
}
