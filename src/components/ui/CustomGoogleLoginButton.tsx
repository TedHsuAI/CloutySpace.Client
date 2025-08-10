import { FC, useEffect } from 'react'
import { useGoogleLogin } from '@react-oauth/google'
import { useAuth } from '../../hooks'
import type { Language } from '../../types/common'
import { i18n } from '../../lang'
import { checkCORSSettings, checkGoogleOAuthConfig } from '../../utils/corsChecker'

interface CustomGoogleLoginButtonProps {
  lang: Language
  onSuccess?: () => void
  onError?: () => void
}

const CustomGoogleLoginButton: FC<CustomGoogleLoginButtonProps> = ({
  lang,
  onSuccess,
  onError,
}) => {
  const { login } = useAuth()
  const t = i18n[lang]

  useEffect(() => {
    // 只在開發環境下進行診斷
    if (import.meta.env.DEV) {
      checkCORSSettings()
      checkGoogleOAuthConfig()
    }
  }, [])

  // 備用 API 處理函數
  const tryAlternativeAPI = async (accessToken: string) => {
    const alternativeApis = [
      'https://www.googleapis.com/oauth2/v3/userinfo',
      'https://www.googleapis.com/plus/v1/people/me',
      'https://openidconnect.googleapis.com/v1/userinfo'
    ]

    for (const apiUrl of alternativeApis) {
      try {
        console.log(`嘗試備用 API: ${apiUrl}`)
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json'
          }
        })

        if (response.ok) {
          const userInfo = await response.json()
          console.log(`備用 API 成功 (${apiUrl}):`, userInfo)
          
          // 處理用戶資訊（與主要流程相同）
          const payload = {
            sub: String(userInfo.sub || userInfo.id || ''),
            email: String(userInfo.email || ''),
            name: String(userInfo.name || ''),
            picture: String(userInfo.picture || ''),
            given_name: String(userInfo.given_name || ''),
            family_name: String(userInfo.family_name || ''),
            exp: Math.floor(Date.now() / 1000) + 3600
          }

          const mockCredential = btoa(encodeURIComponent(JSON.stringify(payload)))
          login(mockCredential)
          onSuccess?.()
          return
        }
      } catch (error) {
        console.error(`備用 API ${apiUrl} 失敗:`, error)
      }
    }
    
    throw new Error('所有 Google API 端點都失敗')
  }

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log('Google OAuth 成功，token:', tokenResponse)
        console.log('Access Token:', tokenResponse.access_token)
        
        // 使用更穩定的 Google API 端點和更詳細的錯誤處理
        const apiUrl = 'https://www.googleapis.com/oauth2/v1/userinfo'
        console.log('準備請求:', apiUrl)
        
        const userInfoResponse = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${tokenResponse.access_token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        })
        
        console.log('API 回應狀態:', userInfoResponse.status)
        console.log('API 回應標頭:', Object.fromEntries(userInfoResponse.headers.entries()))
        
        if (userInfoResponse.ok) {
          const userInfo = await userInfoResponse.json()
          console.log('用戶資訊:', userInfo)
          
          // 安全的 Base64 編碼函數，處理 Unicode 字符
          const safeBase64Encode = (obj: Record<string, unknown>) => {
            try {
              const jsonString = JSON.stringify(obj)
              // 使用 encodeURIComponent 處理 Unicode 字符，然後再編碼
              const encodedString = encodeURIComponent(jsonString)
              return btoa(encodedString)
            } catch (error) {
              console.error('Base64 編碼失敗:', error)
              // 備用方案：直接返回 JSON 字符串
              return JSON.stringify(obj)
            }
          }
          
          // 移除非英文字符的安全函數
          const sanitizeString = (str: string) => {
            return str.replace(/[^\u0020-\u007E]/g, '') // 只保留可打印的 ASCII 字符
          }
          
          // 創建一個模擬的 JWT payload，確保所有字段都是安全的
          const payload = {
            sub: String(userInfo.id || ''),
            email: String(userInfo.email || ''),
            name: sanitizeString(String(userInfo.name || '')),
            picture: String(userInfo.picture || ''),
            given_name: sanitizeString(String(userInfo.given_name || '')),
            family_name: sanitizeString(String(userInfo.family_name || '')),
            exp: Math.floor(Date.now() / 1000) + 3600 // 1小時後過期
          }
          
          const mockCredential = safeBase64Encode(payload)
          console.log('處理後的用戶資料:', payload)
          
          login(mockCredential)
          onSuccess?.()
        } else {
          // 詳細的錯誤處理
          const errorText = await userInfoResponse.text()
          console.error('Google API 詳細錯誤:')
          console.error('狀態碼:', userInfoResponse.status)
          console.error('狀態文字:', userInfoResponse.statusText)
          console.error('錯誤內容:', errorText)
          
          // 嘗試備用方案 - 使用 v3 API
          if (userInfoResponse.status === 404) {
            console.log('嘗試使用備用 API 端點...')
            await tryAlternativeAPI(tokenResponse.access_token)
          } else {
            throw new Error(`Google API 錯誤 ${userInfoResponse.status}: ${errorText}`)
          }
        }
      } catch (error) {
        console.error('Google 登入處理失敗:', error)
        onError?.()
      }
    },
    onError: (error) => {
      console.error('Google 登入失敗:', error)
      console.log('重新檢查 CORS 設定...')
      checkCORSSettings()
      onError?.()
    },
    scope: 'openid profile email',
    flow: 'implicit' // 明確指定使用 implicit flow
  })

  return (
    <button
      onClick={() => googleLogin()}
      className="w-full flex items-center justify-center gap-3 rounded-lg border border-gray-300 py-3 px-4 text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {/* Google SVG Icon */}
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      
      <span className="text-gray-700">
        {t.loginWithGoogle}
      </span>
    </button>
  )
}

export default CustomGoogleLoginButton
