/** @type {import('next').NextConfig} */
import nextPWA from '@ducanh2912/next-pwa';
// 없이도 pwa 가능
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
  images: {
    domains: ['placehold.co', 'dandi-pre.s3.ap-northeast-2.amazonaws.com'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox",
  },
  // kakao map 설정 추가
  experimental: {
    esmExternals: 'loose',
  },
  webpack: (config) => {
    // 카카오 맵 SDK를 위한 웹팩 설정
    config.module.rules.push({
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules\/(?!(react-kaka-maps-sdk)\/).*/,
    });
    return config;
  },
};

// export default nextConfig;
export default withPWA(nextConfig);
