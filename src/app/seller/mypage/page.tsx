/** 사업자 마이페이지 */
'use client';

import { StoreInfoSection } from '@/components/features/mypage/StoreInfoSection';
import DashBoardLayout from '@/components/layout/DashboardLayout';
import { useStoreMypage } from '@/hooks/useStoreMypage';

import React from 'react';

function Mypage() {
    const { data: storeInfo, isLoading, error } = useStoreMypage();

    return ( 
        <DashBoardLayout>
            <div className='max-w-[1400px] w-full h-full flex flex-col gap-40 justify-center items-start pb-20 pt-40'>
                {/* title + description */}
                <div className='flex flex-col gap-20'>
                    <h1 className='title7 text-label-semibold'>가게 설정</h1>
                    <p className='body3 text-label-medium'>가게 정보 및 노쇼 기본 정책을 설정하실 수 있습니다.</p>
                </div>                

                {isLoading && (
                    <div className='mt-40'>
                        <p className='body2 text-gray-500'>로딩 중...</p>
                    </div>
                )}

                {error && (
                    <div className='mt-40'>
                        <p className='body2 text-system-red-strong'>오류가 발생했습니다.</p>
                    </div>
                )}

                {storeInfo && <StoreInfoSection storeInfo={storeInfo} />}
            </div>
        </DashBoardLayout>
     );
}

export default Mypage;