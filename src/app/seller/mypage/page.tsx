/** 사업자 마이페이지 */
import DashBoardLayout from '@/components/layout/DashboardLayout';
import React from 'react';

function Mypage() {
    return ( 
        <DashBoardLayout>
            <div className='max-w-[1400px] w-full h-full flex flex-col gap-4 justify-center items-center pb-20 pt-40'>
                <h1 className='title7'>가게 설정</h1>
                <p className='caption4'>가게 정보 및 노쇼 기본 정책을 설정하실 수 있습니다.</p>

            </div>
        </DashBoardLayout>
     );
}

export default Mypage;