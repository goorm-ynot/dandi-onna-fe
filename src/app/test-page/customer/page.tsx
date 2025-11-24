// pages/test-api.tsx (또는 app/test/page.tsx)
'use client';

import { useEffect, useState } from 'react';

export default function TestAPI() {
  const [storeData, setStoreData] = useState(null);
  const [reservationData, setReservationData] = useState(null);
  const [loading, setLoading] = useState(false);

  const testStoreAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/home');
      const data = await response.json();

      setStoreData(data);
    } catch (error) {
      console.error('Store API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const testReservationAPI = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/home/stores');
      const data = await response.json();
      setReservationData(data);
    } catch (error) {
      console.error('Reservation API Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-8 w-screen'>
      <h1 className='text-2xl mb-4'>API 테스트</h1>

      <div className='space-y-4'>
        <button onClick={testStoreAPI} className='bg-blue-500 text-white px-4 py-2 rounded' disabled={loading}>
          Store API 테스트
        </button>

        <button onClick={testReservationAPI} className='bg-green-500 text-white px-4 py-2 rounded' disabled={loading}>
          Reservation API 테스트
        </button>

        {loading && <p>로딩 중...</p>}

        <pre className='bg-gray-100 p-4 rounded'>Store Data: {JSON.stringify(storeData, null, 2)}</pre>

        <pre className='bg-gray-100 p-4 rounded'>Reservation Data: {JSON.stringify(reservationData, null, 2)}</pre>
      </div>
    </div>
  );
}
