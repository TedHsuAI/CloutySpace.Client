import { useState, useRef, useCallback } from "react"
import { FaSearch } from "react-icons/fa"
import { BaseProps, SearchProps } from "@/types/common"
import { i18n } from "@/lang"

interface SearchInputProps extends BaseProps, SearchProps {
  variant?: 'expandable' | 'standard'
  size?: 'sm' | 'md' | 'lg'
}

const sizeStyles = {
  sm: {
    height: 'h-8',
    width: 'w-8',
    expandedWidth: 'w-56',
    icon: 'text-sm',
    input: 'px-2 py-2',
  },
  md: {
    height: 'h-10',
    width: 'w-10',
    expandedWidth: 'w-72',
    icon: 'text-lg',
    input: 'px-2 py-4',
  },
  lg: {
    height: 'h-12',
    width: 'w-12',
    expandedWidth: 'w-80',
    icon: 'text-xl',
    input: 'px-3 py-5',
  },
}

export const ExpandableSearchInput = ({ 
  lang, 
  placeholder,
  onSearch,
  className = '',
  size = 'md' 
}: SearchInputProps) => {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const styles = sizeStyles[size]

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onSearch(value.trim())
    }
  }, [value, onSearch])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    } else if (e.key === 'Escape') {
      setValue('')
      inputRef.current?.blur()
    }
  }, [handleSubmit])

  const isExpanded = focused || value

  return (
    <div className={`relative inline-block ${styles.width} ${styles.height} overflow-visible ${className}`}>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          placeholder={placeholder || i18n[lang].searchPlaceholder}
          name="text"
          type="text"
          value={value}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`
            absolute left-0 top-1/2 -translate-y-1/2
            ${styles.height} rounded-lg border-none outline-none
            ${styles.input} bg-transparent cursor-pointer
            transition-all duration-500 ease-in-out
            placeholder:text-transparent
            focus:placeholder:text-gray-500
            ${isExpanded ? `bg-white border border-gray-400 ${styles.expandedWidth} pl-10 shadow-lg z-50` : styles.width}
          `}
          style={{
            zIndex: isExpanded ? 50 : 1,
          }}
          aria-label={lang === 'zh' ? '搜尋' : 'Search'}
        />
        <div
          className="absolute left-3 pointer-events-none"
          style={{ top: 'calc(50% + 2px)', zIndex: 51 }}
        >
          <FaSearch className={`text-gray-600 ${styles.icon}`} />
        </div>
      </form>
    </div>
  )
}

export const StandardSearchInput = ({ 
  lang, 
  placeholder,
  onSearch,
  className = '',
  size = 'md' 
}: SearchInputProps) => {
  const [value, setValue] = useState("")
  const styles = sizeStyles[size]

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (value.trim()) {
      onSearch(value.trim())
    }
  }, [value, onSearch])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e)
    } else if (e.key === 'Escape') {
      setValue('')
    }
  }, [handleSubmit])

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit}>
        <input
          placeholder={placeholder || i18n[lang].searchPlaceholder}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`
            w-full ${styles.height} rounded-lg border border-gray-300 
            ${styles.input} pl-10 pr-4
            focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
            transition-colors duration-200
          `}
          aria-label={lang === 'zh' ? '搜尋' : 'Search'}
        />
        <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <FaSearch className={`text-gray-400 ${styles.icon}`} />
        </div>
      </form>
    </div>
  )
}

// 主要導出組件，根據 variant 選擇不同樣式
export const SearchInput = ({ variant = 'expandable', ...props }: SearchInputProps) => {
  return variant === 'expandable' 
    ? <ExpandableSearchInput {...props} />
    : <StandardSearchInput {...props} />
}
