/** @type {import('next').NextConfig} */
import nextPWA from '@ducanh2912/next-pwa';

const withPWA = nextPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https?.*/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'offlineCache',
        expiration: {
          maxEntries: 200,
        },
      },
    },
  ],
});

const nextConfig = {
  // ✅ 압축 및 기본 최적화 (안전함)
  compress: true,
  poweredByHeader: false,

  // ✅ 이미지 최적화 강화
  images: {
    // domains: ['placehold.co', 'dandi-pre.s3.ap-northeast-2.amazonaws.com', '667c21b29534.ngrok-free.app'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox",

    // 🎯 성능 최적화 추가
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1년 캐시

    // 🎯 S3 이미지는 최적화 스킵 (Query String 때문에 502 오류 방지)
    unoptimized: false, // 기본값
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dandi-pre.s3.ap-northeast-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 's3.ap-northeast-2.amazonaws.com',
        pathname: '/dandi-pre/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: '667c21b29534.ngrok-free.app',  // 🎯 반드시 명시해야 함
      },
      {
        protocol: 'http',
        hostname: '222.101.227.127',
        port: '19090'
      }
    ],
  },

  // ✅ polyfill 최적화 설정
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  // ✅ 캐시 헤더 최적화 (Document latency 개선) - 수정됨
  async headers() {
    return [
      {
        // 정적 자산 캐싱
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // 이미지 캐싱 - 수정된 패턴
        source: '/:path*\\.(jpg|jpeg|png|webp|avif|ico|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, s-maxage=31536000',
          },
        ],
      },
      {
        // 폰트 캐싱 - 수정된 패턴
        source: '/:path*\\.(woff|woff2|eot|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // next.config.mjs의 webpack 설정 강화
  webpack: (config, { dev, isServer }) => {
    // 🎯 Browserslist 설정 (레거시 polyfill 제거)
    config.module.rules.forEach((rule) => {
      if (rule.loader === 'babel-loader' || rule.use?.some?.((u) => u.loader === 'babel-loader')) {
        // Babel에서 모던 브라우저 대상으로 설정
        if (rule.options) {
          rule.options.targets = {
            chrome: '90',
            firefox: '88',
            safari: '14',
            edge: '90',
          };
        }
      }
    });

    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,

          // 🎯 React Query 별도 청크
          reactQuery: {
            test: /[\\/]node_modules[\\/]@tanstack[\\/]/,
            name: 'react-query',
            chunks: 'all',
            priority: 20,
          },

          // 🎯 Radix UI 별도 청크
          radixUI: {
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            name: 'radix-ui',
            chunks: 'all',
            priority: 20,
          },

          // 🎯 Firebase 별도 청크
          firebase: {
            test: /[\\/]node_modules[\\/]firebase[\\/]/,
            name: 'firebase',
            chunks: 'all',
            priority: 20,
          },

          // 🎯 기본 vendor 청크
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
        },
      };
    }
    return config;
  },
};

export default withPWA(nextConfig);
