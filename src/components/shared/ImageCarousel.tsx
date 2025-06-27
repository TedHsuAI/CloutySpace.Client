import { useState, useEffect, useCallback } from 'react'
import { BaseProps, CarouselItem } from '@/types/common'
import { ANIMATION_DURATION } from '@/constants/app'

interface ImageCarouselProps extends BaseProps {
  images: CarouselItem[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showArrows?: boolean
  className?: string
}

interface NavigationButtonProps {
  direction: 'prev' | 'next'
  onClick: () => void
  ariaLabel: string
}

const NavigationButton = ({ direction, onClick, ariaLabel }: NavigationButtonProps) => {
  const isPrev = direction === 'prev'
  
  return (
    <button
      onClick={onClick}
      className={`absolute ${isPrev ? 'left-4' : 'right-4'} top-1/2 -translate-y-1/2 text-white p-2 transition-all duration-300 hover:scale-110 z-10 opacity-80 hover:opacity-100 bg-transparent border-none outline-none`}
      aria-label={ariaLabel}
    >
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="transition-all duration-300" 
        style={{ filter: 'drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.8)) drop-shadow(-2px -2px 6px rgba(0, 0, 0, 0.4))' }}
      >
        <path 
          d={isPrev ? "M15 18L9 12L15 6" : "M9 18L15 12L9 6"} 
          stroke="currentColor" 
          strokeWidth="3" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}

const ImageCarousel = ({ 
  images, 
  lang, 
  autoPlay = true,
  autoPlayInterval = 5000,
  showArrows = true,
  className = ''
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

  const resetAutoPlay = useCallback(() => {
    if (!autoPlay) return
    
    if (intervalId) {
      clearInterval(intervalId)
    }
    
    const newInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, autoPlayInterval)
    
    setIntervalId(newInterval)
  }, [autoPlay, autoPlayInterval, images.length, intervalId])

  // 自動輪播功能
  useEffect(() => {
    if (!autoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, autoPlayInterval)
    
    setIntervalId(interval)
    
    return () => {
      clearInterval(interval)
    }
  }, [autoPlay, autoPlayInterval, images.length])

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    resetAutoPlay()
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, ANIMATION_DURATION.SLOW)
  }, [isTransitioning, images.length, resetAutoPlay])

  const goToNext = useCallback(() => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % images.length)
    resetAutoPlay()
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, ANIMATION_DURATION.SLOW)
  }, [isTransitioning, images.length, resetAutoPlay])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      goToPrevious()
    } else if (e.key === 'ArrowRight') {
      goToNext()
    }
  }, [goToPrevious, goToNext])

  if (!images.length) {
    return <div className={`w-full h-full bg-gray-100 ${className}`} />
  }

  return (
    <div className={`relative w-full h-full bg-gray-100 overflow-hidden ${className}`}>
      {/* 主要圖片顯示區域 */}
      <div className="relative w-full h-full overflow-hidden">
        {/* 圖片容器 - 使用 transform 來滑動 */}
        <div 
          className="flex w-full h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / images.length}%)`,
            width: `${images.length * 100}%`
          }}
        >
          {images.map((image) => (
            <div 
              key={image.id}
              className="w-full h-full flex-shrink-0"
              style={{ width: `${100 / images.length}%` }}
            >
              <img
                src={image.image}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* 左右導航按鈕 */}
        {showArrows && images.length > 1 && (
          <>
            <NavigationButton
              direction="prev"
              onClick={goToPrevious}
              ariaLabel={lang === 'zh' ? '上一張圖片' : 'Previous image'}
            />
            <NavigationButton
              direction="next"
              onClick={goToNext}
              ariaLabel={lang === 'zh' ? '下一張圖片' : 'Next image'}
            />
          </>
        )}
      </div>

      {/* 鍵盤快捷鍵支援 */}
      <div 
        className="absolute inset-0 focus:outline-none"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        aria-label={lang === 'zh' ? '圖片輪播，使用方向鍵導航' : 'Image carousel, use arrow keys to navigate'}
      />
    </div>
  )
}

export default ImageCarousel
