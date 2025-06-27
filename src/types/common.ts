export type Language = 'en' | 'zh'

export interface BaseProps {
  lang: Language
  className?: string
}

// 產品相關類型
export interface Product {
  id: string
  name: string
  image: string
  price?: string
  description?: string
  category?: string
}

export interface TeaProduct {
  key: 'i' | 'h' | 'm' | 's' | 'g'
  price: number
  image: string
  name?: string
  description?: string
  category?: string
  format?: string
  hasVariants?: boolean
}

// UI 相關類型
export interface CoreValue {
  icon: string
  title: string
  description: string
}

export interface ImageData {
  id: string
  title: string
  image: string
  alt: string
}

export interface CarouselItem {
  id: string
  image: string
  title?: string
  description?: string
  alt: string
}

// 導航相關類型
export interface NavItem {
  id: string
  label: string
  href: string
  isActive?: boolean
}

// 表單相關類型
export interface SearchProps {
  placeholder?: string
  onSearch: (query: string) => void
  className?: string
}

export interface LoginCredentials {
  email: string
  password: string
}

// 響應式設計類型
export type BreakpointSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

// 通用 API 響應類型
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}
