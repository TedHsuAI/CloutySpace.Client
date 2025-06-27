import { BaseProps, TeaProduct } from '@/types/common'
import { TEA_PRODUCTS, TEA_PRODUCT_NAMES } from '@/constants/products'

interface TeaProductGridProps extends BaseProps {
  products?: TeaProduct[]
  onProductClick?: (product: TeaProduct) => void
  gridCols?: 2 | 3 | 4
}

interface TeaProductCardProps {
  product: TeaProduct
  name: string
  onClick?: () => void
}

const TeaProductCard = ({ product, name, onClick }: TeaProductCardProps) => {
  console.log('TeaProductCard rendering:', { product, name })
  
  return (
    <div 
      className="bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex-1 overflow-hidden h-full">
        <img
          src={product.image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            console.error('圖片載入失敗:', product.image)
            e.currentTarget.style.display = 'none'
          }}
          onLoad={() => {
            console.log('圖片載入成功:', product.image)
          }}
        />
      </div>
      <div className="p-3 text-center flex-shrink-0">
        <h3 className="font-medium text-gray-800 mb-2 text-base group-hover:text-blue-600 transition-colors">
          {name}
        </h3>
        <p className="text-sm font-medium text-gray-500">
          ${product.price.toFixed(1)}
        </p>
      </div>
    </div>
  )
}

const TeaProductGrid = ({ 
  lang, 
  products = TEA_PRODUCTS,
  onProductClick,
  gridCols = 2,
  className = ''
}: TeaProductGridProps) => {
  // 使用明確的類名而不是動態組合
  const gridClasses = {
    2: 'grid-cols-2',
    3: 'grid-cols-3', 
    4: 'grid-cols-4'
  }
  
  const gridClass = gridClasses[gridCols] || 'grid-cols-2'

  const handleProductClick = (product: TeaProduct) => {
    if (onProductClick) {
      onProductClick(product)
    } else {
      console.log('Product clicked:', product)
    }
  }

  // 除錯日誌
  console.log('TeaProductGrid rendering:', { 
    lang, 
    productsCount: products.length, 
    gridCols, 
    gridClass,
    products: products.map(p => ({ key: p.key, hasImage: !!p.image }))
  })

  if (!products.length) {
    return (
      <div className={`w-full h-full px-4 flex items-center justify-center ${className}`}>
        <p className="text-gray-500">沒有產品資料</p>
      </div>
    )
  }

  return (
    <div className={`w-full h-full px-4 ${className}`}>
      <div className={`grid ${gridClass} gap-4 h-full`}>
        {products.map((product, index) => (
          <TeaProductCard
            key={`${product.key}-${index}`}
            product={product}
            name={TEA_PRODUCT_NAMES[product.key][lang]}
            onClick={() => handleProductClick(product)}
          />
        ))}
      </div>
    </div>
  )
}

export default TeaProductGrid
