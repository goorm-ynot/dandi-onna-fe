// 🎯 Firebase를 동적으로 로드하여 번들 크기 최적화
// Client-side only, dynamically imported when needed to avoid LCP regression
let firebaseApp: any = null;

const getFirebaseConfig = () => ({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
});

// 🎯 Lazy initialize Firebase app (only when needed)
const initFirebaseApp = async () => {
  if (firebaseApp) return firebaseApp;

  try {
    const { getApp, getApps, initializeApp } = await import('firebase/app');
    firebaseApp = getApps().length === 0 ? initializeApp(getFirebaseConfig()) : getApp();
    return firebaseApp;
  } catch (err) {
    console.error('Failed to initialize Firebase:', err);
    return null;
  }
};

// 🎯 Lazy messaging initialization
export const messaging = async () => {
  try {
    const app = await initFirebaseApp();
    if (!app) return null;

    const { getMessaging, isSupported } = await import('firebase/messaging');
    const supported = await isSupported();
    return supported ? getMessaging(app) : null;
  } catch (err) {
    console.error('Failed to get messaging:', err);
    return null;
  }
};

// 🎯 Fetch FCM token (dynamically imported)
export const fetchToken = async () => {
  try {
    const fcmMessaging = await messaging();
    if (!fcmMessaging) return null;

    const { getToken } = await import('firebase/messaging');

    let serviceWorkerRegistration: ServiceWorkerRegistration | undefined;
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      serviceWorkerRegistration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
        scope: '/',
      });
      await navigator.serviceWorker.ready;
    }

    const token = await getToken(fcmMessaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      serviceWorkerRegistration,
    });

    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('fcm-sw-registration-failed');
    }

    return token;
  } catch (err) {
    console.error('An error occurred while fetching the token:', err);

    const firebaseError = err as { code?: string };

    if (typeof window !== 'undefined' && firebaseError.code === 'messaging/failed-service-worker-registration') {
      sessionStorage.setItem('fcm-sw-registration-failed', '1');
    }

    return null;
  }
};

// 🎯 Export app getter for future use (lazy init)
export const getApp = async () => {
  return await initFirebaseApp();
};
