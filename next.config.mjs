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
    domains: ['placehold.co', 'dandi-pre.s3.ap-northeast-2.amazonaws.com'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox",

    // 🎯 성능 최적화 추가
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1년 캐시
  },

  // ✅ polyfill 최적화 설정
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // ✅ 실험적 기능 (안전한 것들만)
  experimental: {
    esmExternals: 'loose',
    browsersListForSwc: true,
    legacyBrowsers: false,
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

  webpack: (config, { dev, isServer }) => {
    // 카카오 맵 SDK를 위한 웹팩 설정
    config.module.rules.push({
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules\/(?!(react-kaka-maps-sdk)\/).*/,
    });

    // ✅ production 최적화 (더 안전하게)
    if (!dev && !isServer) {
      // 번들 분할 최적화
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks.cacheGroups,
          // 벤더 라이브러리 분리
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          // 폰트 파일 분리
          fonts: {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            name: 'fonts',
            chunks: 'all',
            priority: 15,
          },
          // 이미지 파일 분리
          images: {
            test: /\.(jpg|jpeg|png|webp|avif|gif|svg)$/,
            name: 'images',
            chunks: 'all',
            priority: 15,
          },
        },
      };

      // ⚠️ 문제가 있었던 부분을 더 안전하게 수정
      const alias = config.resolve.alias || {};
      config.resolve.alias = {
        ...alias,
        // 특정 polyfill만 제거 (더 안전함)
        'core-js/modules/es.array.at.js': false,
        'core-js/modules/es.array.flat.js': false,
        'core-js/modules/es.array.flat-map.js': false,
        'core-js/modules/es.object.from-entries.js': false,
        'core-js/modules/es.object.has-own.js': false,
      };
    }

    return config;
  },
};

export default withPWA(nextConfig);
