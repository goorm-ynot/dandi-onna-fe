import serverApiClient from '@/services/ApiClient';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { storeId, visitTime, paymentMethod, totalAmount, appliedDiscountAmount, items } = body;

    const response = await serverApiClient.post('/orders', {
      storeId,
      visitTime,
      paymentMethod,
      totalAmount,
      appliedDiscountAmount,
      items,
    });

    return NextResponse.json((response as any).data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to create order' }, { status: error.status || 500 });
  }
}
