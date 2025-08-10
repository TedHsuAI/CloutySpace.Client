import { FC, useState } from 'react'
import { useAuth } from '@/hooks'
import { LoginModal } from '@/components/features'
import QuickLoginButton from '@/components/ui/QuickLoginButton'

interface LoginDropdownProps {
  onClose: () => void
  className?: string
  lang: 'en' | 'zh'
}

const LoginDropdown: FC<LoginDropdownProps> = ({ onClose, className = '', lang }) => {
  const { hasEverLoggedIn } = useAuth()
  const [showFullLogin, setShowFullLogin] = useState(false)

  const handleShowFullLogin = () => {
    setShowFullLogin(true)
  }

  const handleCloseFullLogin = () => {
    setShowFullLogin(false)
  }

  // 如果選擇顯示完整登入，顯示原本的 LoginModal
  if (showFullLogin) {
    return (
      <LoginModal 
        lang={lang}
        onClose={() => {
          handleCloseFullLogin()
          onClose()
        }}
      />
    )
  }

  // 如果曾經登入過，優先顯示快速重新登入界面
  if (hasEverLoggedIn) {
    return (
      <div className={`bg-white rounded-lg shadow-lg border p-4 w-72 ${className}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">歡迎回來</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            ✕
          </button>
        </div>
        
        <QuickLoginButton 
          onLogin={handleShowFullLogin}
          onUseOtherAccount={handleShowFullLogin}
          className="border-0 shadow-none p-0 mb-4"
        />

        <div className="border-t pt-3">
          <button
            onClick={handleShowFullLogin}
            className="w-full text-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            使用信箱密碼登入
          </button>
        </div>
      </div>
    )
  }

  // 如果從未登入過，顯示登入選項選單
  return (
    <div className={`bg-white rounded-lg shadow-lg border p-4 w-72 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">選擇登入方式</h3>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-3">
        {/* 完整登入選項（包含信箱密碼和 Google 登入） */}
        <button
          onClick={handleShowFullLogin}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="font-medium text-gray-700">登入</span>
        </button>

        {/* 其他登入選項可以在這裡添加 */}
        {/* 例如：Facebook, Line 等 */}
      </div>
    </div>
  )
}

export default LoginDropdown
