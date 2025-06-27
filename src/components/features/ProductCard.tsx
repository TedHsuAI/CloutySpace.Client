import { FC, useCallback } from 'react'
import { BaseProps, TeaProduct } from '@/types/common'
import { TEA_PRODUCT_NAMES, TEA_CATEGORIES, TEA_FORMATS } from '@/constants/products'
import { useCart } from '@/contexts/CartContext'

interface ProductCardProps extends BaseProps {
  product: TeaProduct
}

const ProductCard: FC<ProductCardProps> = ({ 
  lang, 
  product,
  className = '' 
}) => {
  const { addToCart, removeFromCart, isInCart } = useCart()
  const fontClass = lang === 'zh' ? 'font-zh' : 'font-en'
  
  const productName = TEA_PRODUCT_NAMES[product.key]?.[lang] || 'Unknown Product'
  const categoryName = product.category ? TEA_CATEGORIES[product.category as keyof typeof TEA_CATEGORIES]?.[lang] : ''
  const formatName = product.format ? TEA_FORMATS[product.format as keyof typeof TEA_FORMATS]?.[lang] : ''
  
  const productInCart = isInCart(product)

  const handleCartAction = useCallback(() => {
    // 如果產品有變體選項（如禮盒），執行選擇選項邏輯
    if (product.hasVariants) {
      console.log('Opening product options for:', product)
      // 這裡可以打開選項選擇器或導航到產品詳情頁
      return
    }
    
    if (productInCart) {
      removeFromCart(product.key, product.format)
    } else {
      addToCart(product)
    }
  }, [productInCart, addToCart, removeFromCart, product])

  const getActionText = () => {
    // 如果產品有變體選項（如禮盒），顯示 SELECT OPTION
    if (product.hasVariants) {
      return lang === 'zh' ? '選擇選項' : 'SELECT OPTION'
    }
    
    if (productInCart) {
      return lang === 'zh' ? '查看購物車' : 'View Cart'
    }
    return lang === 'zh' ? '加入購物車' : 'Add to Cart'
  }

  return (
    <>
      <div className={`bg-white overflow-hidden shadow-md hover:shadow-lg transition-shadow ${fontClass} ${className}`}>
        {/* Product Image */}
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={product.image}
            alt={productName}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Product Info */}
        <div className="p-4">
          {/* Category and Format */}
          {(categoryName || formatName) && (
            <div className="flex flex-wrap gap-2 mb-2">
              {categoryName && (
                <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800">
                  {categoryName}
                </span>
              )}
              {formatName && (
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-800">
                  {formatName}
                </span>
              )}
            </div>
          )}
          
          {/* Product Name and Price */}
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-medium text-gray-900">
              {productName}
            </h3>
            <div className="relative cursor-pointer price-button" onClick={handleCartAction}>
              <span className="price-text text-lg font-medium text-black">
                ${product.price.toFixed(1)}
              </span>
              <span className="action-text text-xs font-medium">
                {getActionText()}
                <span
                  className="action-text-bg"
                  aria-hidden="true"
                ></span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .price-button {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 60px;
          height: 28px;
        }
        
        .price-text {
          position: relative;
          z-index: 2;
          transition: opacity 0.3s ease;
        }
        
        .action-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          opacity: 0;
          color: #666;
          transition: opacity 0.3s ease;
          white-space: nowrap;
          padding: 0 6px;
          font-size: 0.75rem;
          line-height: 1rem;
        }
        
        .action-text-bg {
          position: absolute;
          left: 50%;
          top: 50%;
          height: 50%;
          width: calc(100% + 8px);
          background: #e5e5e5;
          border-radius: 0 0 4px 4px;
          z-index: 0;
          opacity: 0.5;
          transform: translate(-50%, 0) scaleX(0);
          transform-origin: center;
          transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
          pointer-events: none;
        }
        
        .price-button:hover .price-text {
          opacity: 0;
        }
        
        .price-button:hover .action-text {
          opacity: 1;
        }
        
        .price-button:hover .action-text-bg {
          transform: translate(-50%, 0) scaleX(1);
        }
      `}</style>
    </>
  )
}

export default ProductCard
