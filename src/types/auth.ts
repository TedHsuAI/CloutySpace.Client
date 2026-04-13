/**
 * 認證相關的 TypeScript 型別定義
 */

/**
 * 後端認證 API 回傳的資料結構
 */
export interface AuthResponse {
  userId: string
  email: string
  name: string
  userName: string
  picture: string
  memberLevel: number
  isRegister: boolean
  accessToken: string
  expiresIn: number
  lastLoginAt: string
}

/**
 * API 錯誤回傳結構
 */
export interface AuthError {
  message: string
  error?: string
  statusCode?: number
}
