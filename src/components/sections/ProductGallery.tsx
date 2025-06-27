import { BaseProps, CarouselItem } from '@/types/common'
import { ImageCarousel } from '@/components/shared'
import { TeaProductGrid } from '@/components/features'

// Import images for carousel
import homeImage1 from '@/assets/images/secondProduct/Home-image-1.webp'
import homeImage2 from '@/assets/images/secondProduct/Home-image-2.webp'
import homeImage3 from '@/assets/images/secondProduct/Home-image-3.webp'

interface ProductGalleryProps extends BaseProps {}

const ProductGallery = ({ lang }: ProductGalleryProps) => {
  const carouselImages: CarouselItem[] = [
    { id: '1', image: homeImage1, alt: 'Home image 1' },
    { id: '2', image: homeImage2, alt: 'Home image 2' },
    { id: '3', image: homeImage3, alt: 'Home image 3' },
  ]

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[600px] lg:min-h-[800px] items-start">
          {/* 左側：圖片輪播區域 */}
          <div className="h-full">
            <ImageCarousel 
              lang={lang} 
              images={carouselImages}
            />
          </div>

          {/* 右側：產品網格區域 */}
          <div className="h-full">
            <TeaProductGrid lang={lang} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductGallery
