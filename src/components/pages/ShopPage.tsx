import { FC, useState, useCallback } from 'react'
import { BaseProps } from '@/types/common'
import ShopFilters from '@/components/features/ShopFilters'
import ProductGrid from '@/components/features/ProductGrid'

interface ShopPageProps extends BaseProps {
  onSearch?: (query: string) => void
}

const ShopPage: FC<ShopPageProps> = ({ 
  lang, 
  onSearch,
  className = '' 
}) => {
  const [priceRange, setPriceRange] = useState<{ min: number; max: number } | undefined>()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedFormats, setSelectedFormats] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')

  const fontClass = lang === 'zh' ? 'font-zh' : 'font-en'

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    if (onSearch) {
      onSearch(query)
    } else {
      console.log('Searching for:', query)
    }
  }, [onSearch])

  const handlePriceFilter = useCallback((min: number, max: number) => {
    setPriceRange({ min, max })
  }, [])

  const handleCategoryFilter = useCallback((categories: string[]) => {
    setSelectedCategories(categories)
  }, [])

  const handleFormatFilter = useCallback((formats: string[]) => {
    setSelectedFormats(formats)
  }, [])

  return (
    <main className={`min-h-screen bg-white pt-14 ${fontClass} ${className}`}>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white">
              <ShopFilters
                lang={lang}
                onPriceFilter={handlePriceFilter}
                onCategoryFilter={handleCategoryFilter}
                onFormatFilter={handleFormatFilter}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <ProductGrid
              lang={lang}
              priceRange={priceRange}
              selectedCategories={selectedCategories}
              selectedFormats={selectedFormats}
              searchQuery={searchQuery}
              onSearch={handleSearch}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default ShopPage
