import React from 'react';
import Image, { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallback?: string;
  isLCP?: boolean; // 🎯 LCP 이미지 구분
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fallback = '/images/placeholder.png',
  priority = false,
  quality = 75,
  className = '',
  fill,
  isLCP = false, // LCP 여부
  ...props
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = React.useState(src);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleError = () => {
    setImageSrc(fallback);
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // 🎯 S3 이미지는 최적화 스킵 (Vercel Image Optimization 오류 방지)
  const isS3Image = src.includes('s3.ap-northeast-2.amazonaws.com');

  return (
    <div className={`relative w-full h-full`}>
      {/* LCP가 아닐 때만 로딩 상태 스켈레톤 */}
      {isLoading && !isLCP && <div className='absolute inset-0 bg-neutral-200 animate-pulse rounded-lg' />}

      <Image
        src={imageSrc}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        priority={priority || isLCP} // 🎯 LCP면 자동으로 priority
        quality={isLCP ? 85 : quality} // 🎯 LCP는 높은 품질
        fetchPriority={isLCP ? 'high' : 'auto'}
        onError={handleError}
        onLoadingComplete={handleLoadingComplete}
        unoptimized={isS3Image} // 🎯 S3 이미지는 최적화 스킵
        className={`${isLoading && !isLCP ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300 ${className}`}
        {...props}
      />
    </div>
  );
}
