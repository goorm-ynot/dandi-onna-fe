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
             <div className='max-w-[1400px] w-full h-full flex flex-col gap-40 justify-start items-start pt-40 pb-20'>
                 {/* title + description */}
                 <div className='flex flex-col gap-20'>
                     <h1 className='title7 text-label-semibold'>가게 설정</h1>
                     <p className='body3 text-label-medium'>가게의 사업자 정보를 확인하실 수 있습니다.</p>
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