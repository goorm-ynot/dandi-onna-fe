import Script from 'next/script';
import React from 'react';
import { Map } from 'react-kakao-maps-sdk';

interface kakaoMap {
  lat: number;
  lng: number;
  height: number;
}

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_APP_JS_KEY}&autoload=false`;
export default function KakaoMap({ lat, lng, height }: kakaoMap) {
  return (
    <div>
      <Script src={KAKAO_SDK_URL} strategy='beforeInteractive' />
      <Map center={{ lat: lat, lng: lng }} style={{ width: '100%', height: `${height}px` }} level={5}></Map>
    </div>
  );
}
