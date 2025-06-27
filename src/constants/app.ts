// 應用程式基本常量
export const APP_NAME = 'CloutySpace'
export const APP_VERSION = '1.0.0'

// 支援的語言
export const SUPPORTED_LANGUAGES = ['en', 'zh'] as const

// API 相關常量
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'
export const API_TIMEOUT = 10000

// 本地儲存鍵值
export const STORAGE_KEYS = {
  LANGUAGE: 'app_language',
  USER_TOKEN: 'user_token', 
  USER_PREFERENCES: 'user_preferences',
} as const

// 路由常量
export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/products',
  ABOUT: '/about',
  CONTACT: '/contact', 
  LOGIN: '/login',
} as const

// 響應式斷點
export const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const

// 動畫持續時間
export const ANIMATION_DURATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const
