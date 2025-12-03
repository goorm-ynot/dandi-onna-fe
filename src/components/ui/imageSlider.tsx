import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
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
      <div className={`w-[206px] h-[178px] bg-gray-200 rounded-lg flex items-center justify-center ${className}`}>
        <span className='text-gray-500'>No images</span>
      </div>
    );
  }

  return (
    <div
      className={`relative w-[206px] select-none ${className}`}
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}>
      {/* 이미지 컨테이너 */}
      <div
        className='w-[206px] h-[178px] overflow-hidden rounded-lg cursor-grab active:cursor-grabbing flex items-center justify-center'
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}>
        <div
          className='flex h-full transition-transform duration-300 ease-in-out items-center'
          style={{
            transform: `translateX(-${currentIndex * 206}px)`,
            width: `${images.length * 206}px`,
          }}>
          {images.map((image, index) => (
            <div key={index} className='w-[206px] h-[178px] flex-shrink-0 relative flex items-center justify-center'>
              <Image
                src={image}
                alt={`Slide ${index + 1}`}
                fill
                sizes='206px'
                quality={100}
                unoptimized={true}
                className='object-contain'
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 설명 텍스트 */}
      <div className='flex flex-col justify-center items-center mt-4 text-[#4c4c4c] gap-0'>
        <p className='text-center body1 '>
          사장님의 아까운 빈자리가<br/>당신에겐 특별한 행운이 됩니다.
          </p>
      </div>

      {/* 인디케이터 점들 */}
      {images.length > 1 && (
        <div className='flex justify-center gap-2 pt-[40px]'>
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
