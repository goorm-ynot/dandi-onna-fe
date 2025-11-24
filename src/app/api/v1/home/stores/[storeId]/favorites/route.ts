// 찜하기
// /api/v1/home/stores/[storeId]/favorites
import { serverApiClient } from '@/services/ApiClient';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, { params }: { params: Promise<{ storeId: string }> }) {
  try {
    const { storeId } = await params;

    const response = await serverApiClient.post(`/favorites`, {
      storeId,
    });

    return NextResponse.json((response as any).data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to add favorite' }, { status: error.status || 500 });
  }
}

// 찜 해제하기
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ storeId: string }> }) {
  try {
    const { storeId } = await params;

    const response = await serverApiClient.delete('/favorites', {
      data: { storeId },
    });

    return NextResponse.json((response as any).data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to remove favorite' }, { status: error.status || 500 });
  }
}
