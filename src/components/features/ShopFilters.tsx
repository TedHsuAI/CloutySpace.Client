import { FC, useState } from 'react'
import { BaseProps } from '@/types/common'
import { i18n } from '@/lang'
import { TEA_CATEGORIES, TEA_FORMATS } from '@/constants/products'

interface ShopFiltersProps extends BaseProps {
  onPriceFilter?: (min: number, max: number) => void
  onCategoryFilter?: (categories: string[]) => void
  onFormatFilter?: (formats: string[]) => void
}

const ShopFilters: FC<ShopFiltersProps> = ({ 
  lang, 
  onPriceFilter,
  onCategoryFilter,
  onFormatFilter,
  className = '' 
}) => {
  const [minPrice, setMinPrice] = useState<number>(0)
  const [maxPrice, setMaxPrice] = useState<number>(100)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedFormats, setSelectedFormats] = useState<string[]>([])

  const fontClass = lang === 'zh' ? 'font-zh' : 'font-en'
  const text = i18n[lang]

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter(c => c !== category)
    
    setSelectedCategories(newCategories)
    onCategoryFilter?.(newCategories)
  }

  const handleFormatChange = (format: string, checked: boolean) => {
    const newFormats = checked
      ? [...selectedFormats, format]
      : selectedFormats.filter(f => f !== format)
    
    setSelectedFormats(newFormats)
    onFormatFilter?.(newFormats)
  }

  return (
    <div className={`w-full space-y-6 p-4 ${fontClass} ${className}`}>
      {/* Price Filter */}
      <div className="pb-4">
        <h3 className="text-base font-semibold mb-3">{text.filterByPrice}</h3>
        <div className="space-y-3">
          {/* Price Range Display */}
          <div className="flex justify-between items-center max-w-[250px]">
            <span className="text-xs text-gray-600">${minPrice}</span>
            <span className="text-xs text-gray-600">${maxPrice}</span>
          </div>
          
          {/* Range Sliders Container */}
          <div className="w-full max-w-[250px]">
            <div className="range-slider" style={{ maxWidth: '250px' }}>
              {/* Background track */}
              <div className="absolute h-1 bg-gray-200 top-2 left-1.5 right-1.5"></div>
              
              {/* Active range track */}
              <div 
                className="absolute h-1 bg-gray-700 top-2"
                style={{
                  left: `calc(${minPrice}% + 6px)`,
                  width: `calc(${maxPrice - minPrice}% - 12px)`,
                  minWidth: minPrice === maxPrice ? '0px' : 'auto'
                }}
              />
              
              {/* Min range input */}
              <input
                type="range"
                min="0"
                max="100"
                value={minPrice}
                onChange={(e) => {
                  const value = Number(e.target.value)
                  if (value <= maxPrice) {
                    setMinPrice(value)
                    onPriceFilter?.(value, maxPrice)
                  }
                }}
                className="range-input"
              />
              
              {/* Max range input */}
              <input
                type="range"
                min="0"
                max="100"
                value={maxPrice}
                onChange={(e) => {
                  const value = Number(e.target.value)
                  if (value >= minPrice) {
                    setMaxPrice(value)
                    onPriceFilter?.(minPrice, value)
                  }
                }}
                className="range-input"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="pb-4">
        <h3 className="text-base font-semibold mb-3">{text.categories}</h3>
        <div className="space-y-2">
          {Object.entries(TEA_CATEGORIES).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategories.includes(key)}
                onChange={(e) => handleCategoryChange(key, e.target.checked)}
                className="border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="text-sm text-gray-700">{value[lang]}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Format Filter */}
      <div className="pb-4">
        <h3 className="text-base font-semibold mb-3">{text.teaFormat}</h3>
        <div className="space-y-2">
          {Object.entries(TEA_FORMATS).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedFormats.includes(key)}
                onChange={(e) => handleFormatChange(key, e.target.checked)}
                className="border-gray-300 text-amber-600 focus:ring-amber-500"
              />
              <span className="text-sm text-gray-700">{value[lang]}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShopFilters
