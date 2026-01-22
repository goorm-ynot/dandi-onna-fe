/**
 * 사업자 정보 섹션 컴포넌트
 * - 가게명, 대표자명, 사업자 등록번호, 통신판매업 신고번호, 사업자 주소 표시
 * - 읽기 전용
 */

import { Label } from '@/components/ui/label';
import React from 'react';

interface StoreInfo {
  name: string;
  addressRoad: string;
  ownerName?: string;
  businessNumber?: string;
  salesNumber?: string;
}

interface StoreInfoSectionProps {
  storeInfo: StoreInfo;
}

export const StoreInfoSection = ({ storeInfo }: StoreInfoSectionProps) => {
  return (
    <div className='m-40 p-24 flex flex-col gap-[8px] w-full bg-white border border-border-mypage rounded-md'>
      <Label className='body5 text-label-semibold'>사업자 정보</Label>
      <Label className='caption4 text-label-medium'>
        ※ 사업자 정보는 수정할 수 없습니다. 변경이 필요한 경우 고객센터에 문의해주세요.
      </Label>
      
      <div className='flex flex-col gap-16'>
        <InfoRow label='가게명' value={storeInfo.name} />
        <InfoRow label='대표자명' value={storeInfo.ownerName || storeInfo.name} />
        <InfoRow label='사업자 등록번호' value={storeInfo.businessNumber || '123-30-03123'} />
        <InfoRow label='통신판매업 신고번호' value={storeInfo.salesNumber || '12123-12312-123123'} />
        <InfoRow label='사업자 주소' value={storeInfo.addressRoad} isLast />
      </div>
    </div>
  );
};

interface InfoRowProps {
  label: string;
  value: string;
  isLast?: boolean;
}

const InfoRow = ({ label, value, isLast = false }: InfoRowProps) => {
  return (
    <div className={`flex flex-row justify-between py-12 ${!isLast ? 'border-b border-border-mypage' : ''}`}>
      <p className='body4 text-foreground-secondary'>{label}</p>
      <p className='body4 text-foreground-normal-subtle'>{value}</p>
    </div>
  );
};
