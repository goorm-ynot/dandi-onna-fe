import KakaoMap from '@/components/Map/kakaoMap';
import React from 'react';

export default function page() {
  return (
    <div className='p-4 flex flex-col gap-4 justify-center items-center'>
      <h1 className='text-3xl'>지도 테스트</h1>
      <div className='border border-gray-800 rounded w-full '>
        <KakaoMap lat={33.5563} lng={126.79581} height={360} />
      </div>
    </div>
  );
}
