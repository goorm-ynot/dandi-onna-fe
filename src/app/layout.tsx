import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import Providers from './providers';

const pretendard = localFont({
  src: '../../public/fonts/pretendard/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  variable: '--font-pretendard',
  preload: true, // 🎯 폰트 preload 활성화
});

// 🎯 SEO 최적화된 메타데이터
export const metadata: Metadata = {
  title: {
    default: '단디온나',
    template: '%s | 단디온나',
  },
  description: '단디온나 - 스마트한 온보딩 서비스로 더 나은 경험을 시작하세요.',
  keywords: ['단디온나', '온보딩', '서비스', '앱'],
  authors: [{ name: '단디온나팀' }],
  creator: '단디온나',
  publisher: '단디온나',

  // 🎯 Open Graph (소셜 미디어 공유)
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://dandi-onna-fe.vercel.app',
    siteName: '단디온나',
    title: '단디온나',
    description: '단디온나 - 스마트한 온보딩 서비스로 더 나은 경험을 시작하세요.',
    images: [
      {
        url: '/og-image.jpg', // 1200x630 권장
        width: 1200,
        height: 630,
        alt: '단디온나 로고',
      },
    ],
  },

  // 🎯 Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: '단디온나',
    description: '단디온나 - 스마트한 온보딩 서비스',
    images: ['/twitter-image.jpg'], // 1200x600 권장
    creator: '@dandi_onna',
  },

  // 🎯 앱 관련 메타데이터
  applicationName: '단디온나',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '단디온나',
  },

  // 🎯 PWA 관련
  manifest: '/manifest.json',

  // 🎯 검색 엔진 최적화
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // 🎯 기타 SEO
  category: 'technology',
};

// 🎯 뷰포트 설정 (성능 + 사용성)
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      {' '}
      {/* 🎯 한국어로 변경 */}
      <head>
        {/* 🎯 Critical preconnects (Document latency 개선) */}
        <link rel='preconnect' href='https://cdn.jsdelivr.net' />
        <link rel='preconnect' href='https://dandi-pre.s3.ap-northeast-2.amazonaws.com' />
        <link rel='dns-prefetch' href='https://placehold.co' />

        {/* 🎯 Favicon 및 아이콘들 */}
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#000000' />

        {/* 🎯 성능 최적화를 위한 리소스 힌트 */}
        <link
          rel='preload'
          href='/fonts/pretendard/PretendardVariable.woff2'
          as='font'
          type='font/woff2'
          crossOrigin='anonymous'
        />

        {/* 🎯 JSON-LD 구조화 데이터 (SEO) */}
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: '단디온나',
              description: '단디온나 - 스마트한 온보딩 서비스',
              url: 'https://dandi-onna-fe.vercel.app',
              applicationCategory: 'BusinessApplication',
              operatingSystem: 'All',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'KRW',
              },
            }),
          }}
        />
      </head>
      <body
        className={`${pretendard.variable} font-pretendard bg-white min-h-screen flex flex-col justify-center items-center antialiased`}>
        {/* 🎯 스킵 네비게이션 (접근성) */}
        <a
          href='#main-content'
          className='sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white p-2 rounded z-50'>
          메인 컨텐츠로 건너뛰기
        </a>

        <Providers>
          <div className='mx-auto bg-white'>
            <Toaster position='top-right' />
            <main id='main-content'>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
