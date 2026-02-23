'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAlarmStore } from '@/store/useAlarmStore';
import type { Unsubscribe } from 'firebase/messaging';

async function getNotificationPermissionAndToken() {
  // Step 1: Check if Notifications are supported in the browser.
  if (!('Notification' in window)) {
    console.info('This browser does not support desktop notification');
    return null;
  }

  // Step 2: Check if permission is already granted.
  if (Notification.permission === 'granted') {
    // 🎯 Dynamic import - Firebase만 필요할 때 로드
    const { fetchToken } = await import('@/firebase');
    return await fetchToken();
  }

  // Step 3: If permission is not denied, request permission from the user.
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      // 🎯 Dynamic import - Firebase만 필요할 때 로드
      const { fetchToken } = await import('@/firebase');
      return await fetchToken();
    }
  }

  console.log('Notification permission not granted.');
  return null;
}

const useFcmToken = () => {
  const router = useRouter(); // Initialize the router for navigation.
  // 네비게이션을 위한 라우터를 초기화합니다.
  const { showAlarm } = useAlarmStore(); // Get showAlarm from alarm store
  // 알람 스토어에서 showAlarm 함수를 가져옵니다.
  const [notificationPermissionStatus, setNotificationPermissionStatus] = useState<NotificationPermission | null>(null); // State to store the notification permission status.
  // 알림 권한 상태를 저장하는 state입니다.
  const [token, setToken] = useState<string | null>(null); // State to store the FCM token.
  // FCM 토큰을 저장하는 state입니다.
  const retryLoadToken = useRef(0); // Ref to keep track of retry attempts.
  // 재시도 횟수를 추적하는 ref입니다.
  const isLoading = useRef(false); // Ref to keep track if a token fetch is currently in progress.
  // 토큰 가져오기가 현재 진행 중인지 추적하는 ref입니다.

  const loadToken = async () => {
    // Step 4: Prevent multiple fetches if already fetched or in progress.
    // 4단계: 이미 가져왔거나 진행 중인 경우 중복 요청을 방지합니다.
    if (isLoading.current) return;

    isLoading.current = true; // Mark loading as in progress.
    // 로딩 중으로 표시합니다.
    const token = await getNotificationPermissionAndToken(); // Fetch the token.
    // 토큰을 가져옵니다.

    // Step 5: Handle the case where permission is denied.
    // 5단계: 권한이 거부된 경우를 처리합니다.
    if (Notification.permission === 'denied') {
      setNotificationPermissionStatus('denied');
      console.info(
        '%cPush Notifications issue - permission denied',
        'color: green; background: #c7c7c7; padding: 8px; font-size: 20px'
      );
      isLoading.current = false;
      return;
    }

    // Step 6: Retry fetching the token if necessary. (up to 3 times)
    // 6단계: 필요한 경우 토큰 가져오기를 재시도합니다. (최대 3회)
    // This step is typical initially as the service worker may not be ready/installed yet.
    // 서비스 워커가 아직 준비되지 않았거나 설치되지 않았을 수 있으므로 초기에는 일반적인 단계입니다.
    if (!token) {
      if (typeof window !== 'undefined' && sessionStorage.getItem('fcm-sw-registration-failed') === '1') {
        console.warn('FCM token retry skipped: service worker registration previously failed in this session.');
        isLoading.current = false;
        return;
      }

      if (retryLoadToken.current >= 3) {
        alert('Unable to load token, refresh the browser');
        console.info(
          '%cPush Notifications issue - unable to load token after 3 retries',
          'color: green; background: #c7c7c7; padding: 8px; font-size: 20px'
        );
        isLoading.current = false;
        return;
      }

      retryLoadToken.current += 1;
      console.error('An error occurred while retrieving token. Retrying...');
      isLoading.current = false;
      await loadToken();
      return;
    }

    // Step 7: Set the fetched token and mark as fetched.
    // 7단계: 가져온 토큰을 설정하고 완료로 표시합니다.
    setNotificationPermissionStatus(Notification.permission);
    setToken(token);
    isLoading.current = false;
  };

  // Fixed: Added loadToken to dependencies array and wrapped in useCallback to prevent infinite loop
  // 수정됨: 무한 루프를 방지하기 위해 loadToken을 의존성 배열에 추가하고 useCallback으로 래핑했습니다.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const memoizedLoadToken = useCallback(loadToken, []); // Memoize loadToken
  // loadToken을 메모이제이션합니다.
  // Note: loadToken is intentionally omitted from the dependency array to prevent infinite loops
  // 참고: loadToken은 무한 루프를 방지하기 위해 의도적으로 의존성 배열에서 제외되었습니다.
  // as it contains state setters and can be called recursively
  // state setter를 포함하고 있고 재귀적으로 호출될 수 있기 때문입니다.

  useEffect(() => {
    // Step 8: Initialize token loading when the component mounts.
    // 8단계: 컴포넌트가 마운트될 때 토큰 로딩을 초기화합니다.
    if ('Notification' in window) {
      memoizedLoadToken();
    }
  }, [memoizedLoadToken]);

  useEffect(() => {
    const setupListener = async () => {
      if (!token) return; // Exit if no token is available.

      // console.log(`onMessage registered with token ${token}`);

      // 🎯 Dynamic import Firebase messaging functions only when token is available
      const { onMessage } = await import('firebase/messaging');
      const { messaging } = await import('@/firebase');

      const m = await messaging();
      if (!m) return;

      // Step 9: Register a listener for incoming FCM messages.
      // 9단계: 들어오는 FCM 메시지에 대한 리스너를 등록합니다.
      const unsubscribe = onMessage(m, (payload) => {
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📱 [FCM FOREGROUND MESSAGE RECEIVED]');
        console.log('⏰ Timestamp:', new Date().toISOString());
        console.log('🔔 Permission Status:', Notification.permission);
        console.log('📦 Full Payload:', JSON.stringify(payload, null, 2));
        console.log('📋 Payload Structure:');
        console.log('  - notification:', payload.notification);
        console.log('  - data:', payload.data);
        console.log('  - fcmOptions:', payload.fcmOptions);
        console.log('  - from:', payload.from);
        console.log('  - messageId:', payload.messageId);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

        if (Notification.permission !== 'granted') {
          console.warn('⚠️ Notification permission not granted, skipping notification display');
          return;
        }

        const link = payload.fcmOptions?.link || payload.data?.link || payload.data?.deepLink;
        const isConsumer = payload.data?.isconsumer === 'true' ? true : false;

        if (link) {
          console.log('🔗 Link found in payload, showing alarm with action button');
          console.log('🔗 Link URL:', link);

          showAlarm(
            `${payload.data?.body || 'This is a new message'}`,
            'info',
            payload.data?.title || 'New message',
            isConsumer,
            link
          );

          // Navigate to link after showing alarm
          // 알람 표시 후 링크로 이동
          setTimeout(() => {
            console.log('🔗 Navigating to:', link);
            router.replace(link);
          }, 1000);
        } else {
          console.log('ℹ️ No link in payload, showing simple alarm');
          showAlarm(
            `${payload.data?.body || 'This is a new message'}`,
            'info',
            payload.data?.title || 'New message',
            isConsumer,
            link
          );
        } // --------------------------------------------
        // Disable this if you only want toast notifications.
        // 토스트 알림만 원하는 경우 이 부분을 비활성화하세요.
        const n = new Notification(payload.data?.title || 'New message', {
          body: payload.data?.body || 'This is a new message',
          icon: './images/logo/apple-touch-icon.png',
          data: link ? { url: link } : undefined,
        });
        console.log('debugged useFcmToken: ', n);

        // Step 10: Handle notification click event to navigate to a link if present.
        // 10단계: 링크가 있는 경우 알림 클릭 이벤트를 처리하여 해당 링크로 이동합니다.
        n.onclick = (event) => {
          console.log('🖱️ [NOTIFICATION CLICKED]');
          console.log('⏰ Click Timestamp:', new Date().toISOString());
          event.preventDefault();
          const link = (event.target as any)?.data?.url;
          if (link) {
            console.log('🔗 Navigating to link:', link);
            router.replace(link);
          } else {
            console.warn('⚠️ No link found in the notification payload');
          }
        };
        // --------------------------------------------
      });

      return unsubscribe;
    };

    let unsubscribe: Unsubscribe | null = null;

    setupListener().then((unsub) => {
      if (unsub) {
        unsubscribe = unsub;
      }
    });

    // Step 11: Cleanup the listener when the component unmounts.
    // 11단계: 컴포넌트가 언마운트될 때 리스너를 정리합니다.
    return () => unsubscribe?.();
    // Original code:
    // 원본 코드:
    // }, [token, router, toast]);

    // Fixed: Removed toast from dependencies as it's an external function
    // 수정됨: toast는 외부 함수이므로 의존성에서 제거했습니다.
    // that doesn't need to trigger useEffect
    // useEffect를 트리거할 필요가 없기 때문입니다.
  }, [token, router]);

  return { token, notificationPermissionStatus }; // Return the token and permission status.
  // 토큰과 권한 상태를 반환합니다.
};

export default useFcmToken;
