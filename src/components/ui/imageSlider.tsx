import React, { useState, useEffect, useRef } from 'react';
import { Button } from './button';

interface ImageSliderProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number; // n초 간격 (밀리초 단위)
  className?: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, autoPlay = true, interval = 3000, className = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // 다음 슬라이드로 이동
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  // 이전 슬라이드로 이동
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // 특정 슬라이드로 이동
  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // 자동 재생 기능
  useEffect(() => {
    if (autoPlay && images.length > 1) {
      intervalRef.current = setInterval(goToNext, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, interval, currentIndex, images.length]);

  // 자동 재생 일시 정지/재개
  const pauseAutoPlay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const resumeAutoPlay = () => {
    if (autoPlay && images.length > 1) {
      intervalRef.current = setInterval(goToNext, interval);
    }
  };

  // 터치/마우스 이벤트 핸들러
  const handleStart = (clientX: number) => {
    setIsDragging(true);
    startX.current = clientX;
    currentX.current = clientX;
    pauseAutoPlay();
  };

  const handleMove = (clientX: number) => {
    if (!isDragging) return;
    currentX.current = clientX;
  };

  const handleEnd = () => {
    if (!isDragging) return;

    const diffX = currentX.current - startX.current;
    const threshold = 50; // 스와이프 감지 임계값

    if (Math.abs(diffX) > threshold) {
      if (diffX > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    }

    setIsDragging(false);
    resumeAutoPlay();
  };

  // 터치 이벤트
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  // 마우스 이벤트
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleMouseLeave = () => {
    handleEnd();
  };

  if (!images || images.length === 0) {
    return (
      <div className={`w-[304px] h-[293px] bg-gray-200 rounded-lg flex items-center justify-center ${className}`}>
        <span className='text-gray-500'>No images</span>
      </div>
    );
  }

  return (
    <div
      className={`relative w-[304px] select-none ${className}`}
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}>
      {/* 이미지 컨테이너 */}
      <div
        className='w-[304px] h-[293px] overflow-hidden rounded-lg cursor-grab active:cursor-grabbing'
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}>
        <div
          className='flex h-full transition-transform duration-300 ease-in-out'
          style={{
            transform: `translateX(-${currentIndex * 304}px)`,
            width: `${images.length * 304}px`,
          }}>
          {images.map((image, index) => (
            <div key={index} className='w-[304px] h-[293px] flex-shrink-0'>
              <img src={image} alt={`Slide ${index + 1}`} className='w-full h-full object-cover' draggable={false} />
            </div>
          ))}
        </div>
      </div>

      {/* 인디케이터 점들 */}
      {images.length > 1 && (
        <div className='flex justify-center gap-2 mt-4'>
          {images.map((_, index) => (
            <Button
              key={index}
              onClick={() => goToSlide(index)}
              className={` rounded-full transition-all duration-200 ${
                index === currentIndex ? 'bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              size={'icon'}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
