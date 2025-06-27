import { FC, useMemo } from 'react'
import { BaseProps } from '@/types/common'
import { i18n } from '@/lang'
import { SHOP_PRODUCTS, TEA_PRODUCT_NAMES } from '@/constants/products'
import ProductCard from './ProductCard'
import { SearchInput } from '@/components/shared/SearchInput'

interface ProductGridProps extends BaseProps {
  priceRange?: { min: number; max: number }
  selectedCategories?: string[]
  selectedFormats?: string[]
  searchQuery?: string
  onSearch?: (query: string) => void
}

const ProductGrid: FC<ProductGridProps> = ({ 
  lang, 
  priceRange,
  selectedCategories = [],
  selectedFormats = [],
  searchQuery = '',
  onSearch,
  className = '' 
}) => {
  const fontClass = lang === 'zh' ? 'font-zh' : 'font-en'
  const text = i18n[lang]

  // Filter products based on criteria
  const filteredProducts = useMemo(() => {
    return SHOP_PRODUCTS.filter(product => {
      // Search filter
      if (searchQuery) {
        const productName = TEA_PRODUCT_NAMES[product.key]?.[lang] || ''
        const lowerQuery = searchQuery.toLowerCase()
        const lowerName = productName.toLowerCase()
        if (!lowerName.includes(lowerQuery)) {
          return false
        }
      }

      // Price filter
      if (priceRange) {
        if (product.price < priceRange.min || product.price > priceRange.max) {
          return false
        }
      }

      // Category filter
      if (selectedCategories.length > 0 && product.category) {
        if (!selectedCategories.includes(product.category)) {
          return false
        }
      }

      // Format filter
      if (selectedFormats.length > 0 && product.format) {
        if (!selectedFormats.includes(product.format)) {
          return false
        }
      }

      return true
    })
  }, [searchQuery, priceRange, selectedCategories, selectedFormats, lang])

  const resultText = text.showingResults.replace('{count}', filteredProducts.length.toString())

  return (
    <div className={`w-full ${fontClass} ${className}`}>
      {/* Results Header */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">{resultText}</p>
        <div className="w-80">
          <SearchInput 
            lang={lang} 
            variant="expandable"
            onSearch={onSearch || (() => {})}
            placeholder={lang === 'zh' ? '搜尋商品...' : 'Search products...'}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={`${product.key}-${product.format}-${index}`}
            lang={lang}
            product={product}
          />
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {lang === 'zh' ? '沒有找到符合條件的商品' : 'No products found matching your criteria'}
          </p>
        </div>
      )}
    </div>
  )
}

export default ProductGrid
