import { useState } from 'react'

// Import images
import testOneImg from '@/assets/images/firstProduct/test-one-1-e1686990967731.jpg'
import giftBoxImg from '@/assets/images/firstProduct/02-禮盒-2.png'
import irTbImg from '@/assets/images/firstProduct/IR-TB.png'

interface Product {
  id: string
  name: string
  image: string
  price?: string
}

interface ProductGalleryProps {
  lang: 'en' | 'zh'
}

const ProductGallery = ({ lang }: ProductGalleryProps) => {
  const products: Product[] = [
    {
      id: '1',
      name: lang === 'zh' ? '測試產品一' : 'Test One',
      image: testOneImg,
      price: '30.0'
    },
    {
      id: '2',
      name: lang === 'zh' ? '禮盒套裝' : 'Gift Box Set',
      image: giftBoxImg,
      price: '43.5'
    },
    {
      id: '3',
      name: lang === 'zh' ? 'IR-TB 茶包' : 'IR-TB Tea Bags',
      image: irTbImg,
      price: '26.0'
    }
  ]

  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 justify-items-center mb-16">
          {products.map((product) => (
            <div
              key={product.id}
              className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative overflow-hidden shadow-xl bg-white group-hover:shadow-2xl transition-shadow duration-300">
                {/* Image Container with fixed aspect ratio */}
                <div className="relative w-[400px] h-[570px] overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                      hoveredProduct === product.id 
                        ? 'transform scale-110' 
                        : 'transform scale-100'
                    }`}
                    style={{
                      transformOrigin: 'center center'
                    }}
                  />
                  
                  {/* Hover border effect */}
                  <div className={`absolute inset-0 border-4 border-green-400 transition-opacity duration-300 ${
                    hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                  }`} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Header Section - Moved to bottom */}
        <div className="text-center">
          <h2 className="text-[32px] font-semibold text-gray-800 mb-6">
            {lang === 'zh' ? '100% 天然產品' : '100% Natural Products'}
          </h2>
          <p className="text-[16px] text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {lang === 'zh' 
              ? '我們的產品都是純天然的，不含任何添加劑。所有茶葉產品都保證只含有您選擇的茶葉，不混合其他類型的茶葉。'
              : 'Our products are all natural with no additives. All tea products are guaranteed to contain only your tea of choice, with no blend in other types of tea.'
            }
          </p>
          <div className="w-24 h-1 bg-gray-400 mx-auto"></div>
        </div>
      </div>
    </section>
  )
}

export default ProductGallery
