import React from 'react';
import Image, { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallback?: string;
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

  return (
    <div className={`relative ${className}`}>
      {/* 로딩 상태 스켈레톤 */}
      {isLoading && <div className='absolute inset-0 bg-neutral-200 animate-pulse rounded-lg' />}

      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        onError={handleError}
        onLoadingComplete={handleLoadingComplete}
        className={`${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        {...props}
      />
    </div>
  );
}
