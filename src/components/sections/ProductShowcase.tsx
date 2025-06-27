import { useState } from 'react'
import { BaseProps, Product } from '@/types/common'

// Import images
import testOneImg from '@/assets/images/firstProduct/test-one-1-e1686990967731.jpg'
import giftBoxImg from '@/assets/images/firstProduct/02-禮盒-2.png'
import irTbImg from '@/assets/images/firstProduct/IR-TB.png'

interface ProductShowcaseProps extends BaseProps {
  products?: Product[]
  title?: string
  description?: string
}

interface ProductCardProps {
  product: Product
  isHovered: boolean
  onHover: (id: string | null) => void
}

const getDefaultProducts = (lang: 'en' | 'zh'): Product[] => [
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

const ProductCard = ({ product, isHovered, onHover }: ProductCardProps) => (
  <div
    className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2"
    onMouseEnter={() => onHover(product.id)}
    onMouseLeave={() => onHover(null)}
  >
    <div className="relative overflow-hidden shadow-xl bg-white group-hover:shadow-2xl transition-shadow duration-300">
      <div className="relative w-[400px] h-[570px] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isHovered 
              ? 'transform scale-110' 
              : 'transform scale-100'
          }`}
          style={{
            transformOrigin: 'center center'
          }}
        />
        
        <div className={`absolute inset-0 border-4 border-green-400 transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />
      </div>
    </div>
  </div>
)

const ProductShowcase = ({ 
  lang, 
  products,
  title,
  description,
  className = ''
}: ProductShowcaseProps) => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const displayProducts = products || getDefaultProducts(lang)
  
  const defaultTitle = lang === 'zh' ? '100% 天然產品' : '100% Natural Products'
  const defaultDescription = lang === 'zh' 
    ? '我們的產品都是純天然的，不含任何添加劑。所有茶葉產品都保證只含有您選擇的茶葉，不混合其他類型的茶葉。'
    : 'Our products are all natural with no additives. All tea products are guaranteed to contain only your tea of choice, with no blend in other types of tea.'

  return (
    <section className={`py-16 px-4 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 justify-items-center mb-16">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isHovered={hoveredProduct === product.id}
              onHover={setHoveredProduct}
            />
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-[32px] font-semibold text-gray-800 mb-6">
            {title || defaultTitle}
          </h2>
          <p className="text-[16px] text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {description || defaultDescription}
          </p>
          <div className="w-24 h-1 bg-gray-400 mx-auto"></div>
        </div>
      </div>
    </section>
  )
}

export default ProductShowcase