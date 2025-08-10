import { FC, useEffect } from 'react'
import { useAuth } from '@/hooks'

// 定義 Google Identity Services 的類型
interface GoogleCredentialResponse {
  credential: string
  select_by: string
}

declare global {
  interface Window {
    google?: {
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
}

interface QuickLoginButtonProps {
  onLogin: () => void
  onUseOtherAccount?: () => void
  className?: string
}

const QuickLoginButton: FC<QuickLoginButtonProps> = ({ onLogin, onUseOtherAccount, className = '' }) => {
  const { lastUserInfo, login } = useAuth()

  // 載入 Google Identity Services 腳本
  useEffect(() => {
    if (window.google?.accounts?.id) {
      return // 已經載入
    }

    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    
    script.onload = () => {
      if (window.google?.accounts?.id) {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: (response: GoogleCredentialResponse) => {
            try {
              console.log('快速登入成功:', response)
              login(response.credential)
            } catch (error) {
              console.error('快速登入失敗:', error)
            }
          },
          auto_prompt: false
        })
      }
    }

    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [login])

  const handleGoogleLogin = () => {
    if (!window.google?.accounts?.id) {
      console.error('Google Identity Services 尚未載入')
      return
    }

    // 嘗試顯示 One Tap 登入
    try {
      window.google.accounts.id.prompt()
    } catch (error) {
      console.error('顯示 Google 登入提示失敗:', error)
      // 如果失敗，回退到完整登入流程
      onLogin()
    }
  }

  if (!lastUserInfo) {
    return null
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg border p-4 ${className}`}>
      <div className="text-sm text-gray-600 mb-3">
        以「{lastUserInfo.given_name || lastUserInfo.name}」的身分繼續
      </div>
      
      <div className="flex items-center gap-3 mb-4">
        {lastUserInfo.picture && (
          <img
            src={lastUserInfo.picture}
            alt={lastUserInfo.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        )}
        <div className="flex-1">
          <div className="font-medium text-gray-900">
            {lastUserInfo.name}
          </div>
          <div className="text-sm text-gray-500">
            {lastUserInfo.email}
          </div>
        </div>
      </div>

      <button
        onClick={handleGoogleLogin}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        繼續
      </button>

      <div className="mt-3 text-center">
        <button 
          onClick={onUseOtherAccount || onLogin}
          className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          使用其他帳戶
        </button>
      </div>
    </div>
  )
}

export default QuickLoginButton
