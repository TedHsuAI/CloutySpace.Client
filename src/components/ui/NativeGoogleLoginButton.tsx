import { FC, useEffect, useRef } from 'react'
import { useAuth } from '../../hooks'
import type { Language } from '../../types/common'

// 定義 Google Identity Services 的類型
interface GoogleCredentialResponse {
  credential: string
  select_by: string
}

interface GoogleIdentityServices {
  google: {
    accounts: {
      id: {
        initialize: (config: {
          client_id: string
          callback: (response: GoogleCredentialResponse) => void
          auto_prompt: boolean
        }) => void
        renderButton: (element: HTMLElement, config: {
          theme: string
          size: string
          text: string
          shape: string
          logo_alignment: string
          width: string
        }) => void
        prompt: () => void
      }
    }
  }
}

declare global {
  interface Window extends GoogleIdentityServices {
    handleGoogleCredentialResponse?: (response: GoogleCredentialResponse) => void
  }
}

interface NativeGoogleLoginButtonProps {
  lang: Language
  onSuccess?: () => void
  onError?: () => void
}

const NativeGoogleLoginButton: FC<NativeGoogleLoginButtonProps> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lang,
  onSuccess,
  onError,
}) => {
  const { login } = useAuth()
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 動態載入 Google Identity Services
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    
    script.onload = () => {
      // 設定全域回調函數
      window.handleGoogleCredentialResponse = (response: GoogleCredentialResponse) => {
        try {
          console.log('Google 認證成功:', response)
          
          // 使用 Google Identity Services 返回的 JWT credential
          login(response.credential)
          onSuccess?.()
        } catch (error) {
          console.error('處理 Google 認證失敗:', error)
          onError?.()
        }
      }

      // 初始化 Google Identity Services
      if (window.google?.accounts?.id) {
        try {
          window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: window.handleGoogleCredentialResponse,
            auto_prompt: false
          })

          // 渲染登入按鈕
          if (buttonRef.current) {
            window.google.accounts.id.renderButton(buttonRef.current, {
              theme: 'outline',
              size: 'large',
              text: 'signin_with',
              shape: 'rectangular',
              logo_alignment: 'left',
              width: '320'
            })
          }
        } catch (error) {
          console.error('Google 按鈕初始化失敗:', error)
          onError?.()
        }
      }
    }

    script.onerror = () => {
      console.error('Google Identity Services 腳本載入失敗')
      onError?.()
    }

    document.head.appendChild(script)

    return () => {
      // 清理
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
      delete window.handleGoogleCredentialResponse
    }
  }, [login, onSuccess, onError])

  return (
    <div className="w-full">
      {/* Google Identity Services 按鈕將渲染在這裡 */}
      <div 
        ref={buttonRef} 
        className="w-full flex justify-center"
        style={{ minHeight: '44px' }}
      ></div>
    </div>
  )
}

export default NativeGoogleLoginButton
