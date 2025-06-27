import { useState, useEffect } from 'react'

// Import images
import homeImage1 from '@/assets/images/secondProduct/Home-image-1.webp'
import homeImage2 from '@/assets/images/secondProduct/Home-image-2.webp'
import homeImage3 from '@/assets/images/secondProduct/Home-image-3.webp'

interface ImageCarouselProps {
  lang: 'en' | 'zh'
}

const ImageCarousel = ({ lang }: ImageCarouselProps) => {
  const images = [homeImage1, homeImage2, homeImage3]
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null)

  // 重置輪播計時器
  const resetAutoPlay = () => {
    if (intervalId) {
      clearInterval(intervalId)
    }
    const newInterval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    setIntervalId(newInterval)
  }

  // 自動輪播功能
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    setIntervalId(interval)
    
    return () => {
      clearInterval(interval)
    }
  }, [])

  const goToPrevious = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    resetAutoPlay() // 重置輪播計時器
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 700)
  }

  const goToNext = () => {
    if (isTransitioning) return
    setIsTransitioning(true)
    setCurrentIndex((prev) => (prev + 1) % images.length)
    resetAutoPlay() // 重置輪播計時器
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 700)
  }

  return (
    <div className="relative w-full h-full bg-gray-100 overflow-hidden">
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
          {images.map((image, index) => (
            <div 
              key={index}
              className="w-full h-full flex-shrink-0"
              style={{ width: `${100 / images.length}%` }}
            >
              <img
                src={image}
                alt={`Home image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* 左右導航按鈕 */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 transition-all duration-300 hover:scale-110 z-10 opacity-80 hover:opacity-100 bg-transparent border-none outline-none"
          aria-label={lang === 'zh' ? '上一張圖片' : 'Previous image'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300" style={{ filter: 'drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.8)) drop-shadow(-2px -2px 6px rgba(0, 0, 0, 0.4))' }}>
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 transition-all duration-300 hover:scale-110 z-10 opacity-80 hover:opacity-100 bg-transparent border-none outline-none"
          aria-label={lang === 'zh' ? '下一張圖片' : 'Next image'}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-all duration-300" style={{ filter: 'drop-shadow(2px 2px 6px rgba(0, 0, 0, 0.8)) drop-shadow(-2px -2px 6px rgba(0, 0, 0, 0.4))' }}>
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* 鍵盤快捷鍵支援 */}
      <div 
        className="absolute inset-0 focus:outline-none"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') {
            goToPrevious()
          } else if (e.key === 'ArrowRight') {
            goToNext()
          }
        }}
        aria-label={lang === 'zh' ? '圖片輪播，使用方向鍵導航' : 'Image carousel, use arrow keys to navigate'}
      />
    </div>
  )
}

export default ImageCarousel
