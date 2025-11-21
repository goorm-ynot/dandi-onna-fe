importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

console.log('🚀 [Service Worker] Script loaded at:', new Date().toISOString());

// 버전 관리
const SW_VERSION = '1.0.5'; // 수정할 때마다 버전업시켜주기
const CACHE_NAME = `fcm-sw-v${SW_VERSION}`;

// Replace these with your own Firebase config keys...
// 본인의 Firebase 설정 키로 교체하세요...
const firebaseConfig = {
  apiKey: 'AIzaSyBvOLvPou5XN-dOo7Q4WxnTR6lfLULCJlQ',
  authDomain: 'dnadi-onna.firebaseapp.com',
  projectId: 'dnadi-onna',
  storageBucket: 'dnadi-onna.firebasestorage.app',
  messagingSenderId: '743475295051',
  appId: '1:743475295051:web:df690ebd96f95ac2bc2ece',
  measurementId: 'G-9XVCVW1T60',
};

firebase.initializeApp(firebaseConfig);
console.log('✅ [Service Worker] Firebase initialized');

const messaging = firebase.messaging();
console.log('✅ [Service Worker] Firebase messaging initialized');

// 리스너 등록 확인
console.log('📡 [Service Worker] Registering onBackgroundMessage listener...');

messaging.onBackgroundMessage((payload) => {
  console.log('════════════════════════════════════════════════════════');
  console.log('📱 [FCM BACKGROUND MESSAGE RECEIVED - Service Worker]');
  console.log('⏰ Timestamp:', new Date().toISOString());
  console.log('📦 Full Payload:', JSON.stringify(payload, null, 2));
  console.log('📋 Payload Structure:');
  console.log('  - notification:', payload.notification);
  console.log('  - data:', payload.data);
  console.log('  - fcmOptions:', payload.fcmOptions);
  console.log('  - from:', payload.from);
  console.log('  - messageId:', payload.messageId);
  console.log('════════════════════════════════════════════════════════');

  // payload.fcmOptions?.link comes from our backend API route handle
  // payload.fcmOptions?.link는 백엔드 API 라우트 핸들러에서 전달됩니다.
  // payload.data.link comes from the Firebase Console where link is the 'key'
  // payload.data.link는 Firebase 콘솔에서 'link'가 키로 설정된 경우 전달됩니다.
  const link = payload.fcmOptions?.link || payload.data?.link || payload.data?.deeplink;

  if (link) {
    console.log('🔗 Link found in background message:', link);
  } else {
    console.log('ℹ️ No link in background message');
  }

  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: './images/logo/apple-touch-icon.png',
    data: { url: link },
  };

  console.log('🔔 Showing notification:', notificationTitle);
  self.registration.showNotification(notificationTitle, notificationOptions);
});

console.log('✅ [Service Worker] onBackgroundMessage listener registered');

// ======= 업데이트 리로드 기능 추가 =========

// Service Worker 설치 이벤트
self.addEventListener('install', (event) => {
  console.log(`⚙️ [Service Worker] Installing version ${SW_VERSION} at:`, new Date().toISOString());
  // 즉시 활성화 (기존 SW 교체)
  self.skipWaiting();

  // client에게 업데이트 알림
  event.waitUntil(
    caches.open(CACHE_NAME).then(() => {
      console.log(`📦 [Service Worker] Cache ${CACHE_NAME} opened`);
    })
  );
});

// Service Worker 활성화 이벤트
self.addEventListener('activate', (event) => {
  console.log(`🔄 [Service Worker] Activated version ${SW_VERSION} at:`, new Date().toISOString());
  event.waitUntil(
    Promise.all([
      // 기존 캐시 정리
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName.startsWith('fcm-sw-v')) {
              console.log(`🗑️ [Service Worker] Deleting old cache: ${cacheName}`);
              return caches.delete(cacheName);
            }
          })
        );
      }),

      // 모든 클라이언트 제어
      self.clients.claim(),

      // 클라이언트에게 업데이트 완료 알림
      self.clients.matchAll().then((clients) => {
        console.log(`📢 [Service Worker] Notifying ${clients.length} clients of update`);
        clients.forEach((client) => {
          client.postMessage({
            type: 'SW_UPDATED',
            version: SW_VERSION,
            message: `Service Worker가 버전 ${SW_VERSION}으로 업데이트되었습니다.`,
          });
        });
      }),
    ])
  );
});

self.addEventListener('notificationclick', function (event) {
  console.log('════════════════════════════════════════════════════════');
  console.log('🖱️ [NOTIFICATION CLICKED - Service Worker]');
  console.log('⏰ Click Timestamp:', new Date().toISOString());
  console.log('📋 Notification data:', event.notification.data);
  console.log('📋 Notification title:', event.notification.title);
  console.log('📋 Notification body:', event.notification.body);
  console.log('════════════════════════════════════════════════════════');

  event.notification.close();

  // This checks if the client is already open and if it is, it focuses on the tab. If it is not open, it opens a new tab with the URL passed in the notification payload
  // 클라이언트가 이미 열려 있는지 확인하고, 열려 있으면 해당 탭에 포커스합니다. 열려 있지 않으면 알림 페이로드에 전달된 URL로 새 탭을 엽니다.
  event.waitUntil(
    clients
      // https://developer.mozilla.org/en-US/docs/Web/API/Clients/matchAll
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then(function (clientList) {
        const url = event.notification.data.url;

        if (!url) {
          console.warn('⚠️ No URL found in notification data');
          return;
        }

        console.log('🔗 Target URL:', url);
        console.log('👥 Active clients count:', clientList.length);

        // If relative URL is passed in firebase console or API route handler, it may open a new window as the client.url is the full URL i.e. https://example.com/ and the url is /about whereas if we passed in the full URL, it will focus on the existing tab i.e. https://example.com/about
        // Firebase 콘솔이나 API 라우트 핸들러에서 상대 URL이 전달되면 새 창이 열릴 수 있습니다. client.url은 전체 URL(예: https://example.com/)이고 url은 /about이기 때문입니다. 반면 전체 URL을 전달하면 기존 탭에 포커스됩니다(예: https://example.com/about).
        for (const client of clientList) {
          console.log('🔍 Checking client:', client.url);
          if (client.url === url && 'focus' in client) {
            console.log('✅ Found matching client, focusing...');
            return client.focus();
          }
        }

        if (clients.openWindow) {
          console.log('🆕 Opening new window with URL:', url);
          return clients.openWindow(url);
        }
      })
  );
});
