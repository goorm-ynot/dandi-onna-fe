import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { formatDateTimeString, formatTimeString } from '@/lib/dateParse';
import { getPaymentMethodText } from '@/lib/utils';
import { OrderDetail, PaymentStatus } from '@/types/boardData';
import { PanelMode } from '@/types/PanleTypes';
import React from 'react';

// 결제 상태 라벨 변환
const getPaymentStatusLabel = (status?: PaymentStatus): string => {
  if (!status) return '-';
  const statusMap: Record<PaymentStatus, string> = {
    PENDING: '대기 중',
    PAID: '완료',
    FAILED: '실패',
    REFUNDED: '환불됨',
    CANCELLED: '취소됨',
  };
  return statusMap[status] || '-';
};

interface NoShowOrderPanel {
  mode: PanelMode;
  orderData: OrderDetail;
  onStatusUpdate?: (id: string, status: string) => void;
}

export default function NoShowOrderPanel({ mode, orderData, onStatusUpdate }: NoShowOrderPanel) {
  // 결제 정보를 미리 파싱해서 배열로 생성
  const parsedPaymentInfo = [
    { label: '결제 시간', value: orderData?.paidAt ? formatTimeString(new Date(orderData.paidAt)) : '-' },
    { label: '결제 수단', value: getPaymentMethodText(orderData?.paymentMethod) },
    { label: '결제 구분', value: '일시불' },
    { label: '승인번호', value: orderData?.paymentTxId || '-' },
    { label: '승인상태', value: getPaymentStatusLabel(orderData?.paymentStatus) },
  ];

  const sumPrice = (price: number, amount: number) => {
    const result = price * amount;
    return result.toLocaleString();
  };

  return (
    <div className='p-20 flex flex-col justify-between min-h-[758px]'>
      <div className='flex flex-col gap-24'>
        <Label className='title5'>주문 메뉴</Label>
        {/* 주문 메뉴  */}
        <div className='flex flex-col gap-16'>
          {orderData?.items &&
            orderData.items.map((item) => (
              <div key={item.orderItemId} className='grid grid-cols-4 gap-12  w-full'>
                <Label className='title1 col-span-2  text-label-semilight'>{item.menuName}</Label>
                <Label className='text-right title1 flex-none'>{item.quantity}</Label>
                <Label className='text-right title1 flex-none whitespace-nowrap'>{Number(item.unitPrice).toLocaleString()}원</Label>
              </div>
            ))}
        </div>
        {/* 구분선 1 */}
        <div className=''>
          <hr className='w-full border border-1 border-line-quaternary' />
        </div>

        <Label className='title5'>결제 정보</Label>
        <div className='flex flex-col gap-16'>
          <div className='flex flex-row justify-between items-center'>
            <Label className='title1 text-label-semilight'>기존 판매금액</Label>
            <Label className='body3 text-label'>{orderData?.totalPrice.toLocaleString()}원</Label>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <Label className='title1 text-label-semilight'>할인율</Label>
            <Label className='body3 text-label'>{orderData?.items[0].discountPercent}%</Label>
          </div>
          <div className='flex flex-row justify-between items-center'>
            <Label className='body3 text-foreground-normal'>최종 결제금액</Label>
            <div className='flex items-center gap-2 flex-shrink-0 text-label-bold'>
              <Label className='text-right body3 text-label-light line-through whitespace-nowrap'>
                {orderData?.totalPrice.toLocaleString()}원
              </Label>
              <Label className='text-right body7 whitespace-nowrap text-label-bold'>
                {orderData?.paidAmount.toLocaleString()}원
              </Label>
            </div>
          </div>
        </div>
        {/* 구분선 2 */}
        <div className=''>
          <hr className='w-full border border-1 border-line-normal' />
        </div>

        {/* 결제 관련 정보 */}
        <div className='flex flex-col gap-16'>
          {parsedPaymentInfo.map((info) => (
            <div key={info.label} className='flex flex-row justify-between items-center gap-8'>
              <Label className='title1 text-label-semilight whitespace-nowrap flex-shrink-0'>{info.label}</Label>
              <Label className='body3 text-label text-right flex-1'>{info.value}</Label>
            </div>
          ))}
        </div>
      </div>

      {/* 버튼들 */}
      <div className='grid grid-cols-2 gap-10 w-full'>
        <Button
          type='button'
          disabled={orderData?.status === 'COMPLETED' ? true : false}
          variant={'outline'}
          size={'lg'}
          className='w-full'>
          결제 취소
        </Button>
        <Button type='button' variant={'outline'} size={'lg'} className='w-full'>
          영수증 출력
        </Button>
        <Button
          type='button'
          variant={'default'}
          disabled={orderData?.status === 'COMPLETED' ? true : false}
          size={'lg'}
          className='w-full col-span-2'
          onClick={() => onStatusUpdate?.(orderData?.orderId.toString(), orderData?.status)}>
          노쇼 방문 완료
        </Button>
      </div>
    </div>
  );
}
