/**
 * 認證服務 - 處理所有與後端認證相關的 API 呼叫
 */

import { post } from './api'
import type { AuthResponse } from '../types/auth'

/**
 * 使用 Google ID Token 向後端進行認證
 * @param idToken Google OAuth 返回的 ID Token
 * @returns 後端認證成功後的使用者資料與 access token
 */
export async function authenticateWithGoogle(idToken: string): Promise<AuthResponse> {
  return post<AuthResponse>('/api/GoogleAuth/Authenticate', {
    IdToken: idToken,
  })
}
