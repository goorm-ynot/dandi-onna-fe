'use client';

import { useEffect, useState, useCallback } from 'react';

type PermissionState = 'granted' | 'denied' | 'prompt' | 'unsupported' | null;

interface GeolocationConsentResult {
  permission: PermissionState;
  location: GeolocationPosition | null;
  requestPermission: () => void;
}

export const useGeolocationConsent = (): GeolocationConsentResult => {
  const [permission, setPermission] = useState<PermissionState>(null);
  const [location, setLocation] = useState<GeolocationPosition | null>(null);

  // 권한 상태 확인 함수
  const checkPermission = useCallback(async () => {
    if (!('geolocation' in navigator)) {
      setPermission('unsupported');
      return;
    }

    // 일부 브라우저는 navigator.permissions 지원하지 않음
    if ('permissions' in navigator) {
      try {
        const status = await navigator.permissions.query({ name: 'geolocation' });
        setPermission(status.state as PermissionState);

        status.onchange = () => {
          setPermission(status.state as PermissionState);
        };
      } catch {
        setPermission('prompt');
      }
    } else {
      setPermission('prompt');
    }
  }, []);

  // 사용자에게 위치 권한 요청
  const requestPermission = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setPermission('unsupported');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation(pos);
        setPermission('granted');
      },
      (err) => {
        console.warn('Geolocation error:', err);
        if (err.code === err.PERMISSION_DENIED) setPermission('denied');
      }
    );
  }, []);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return { permission, location, requestPermission };
};
