import { FC, useState } from 'react'
import { useAuth } from '@/hooks'
import { LoginModal } from '@/components/features'
import QuickLoginButton from '@/components/ui/QuickLoginButton'
import { i18n } from '@/lang'

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
      <div className={`bg-white rounded-none shadow-md border border-gray-200 p-4 w-72 ${className}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">{i18n[lang].welcomeBack}</h3>
          <button
            onClick={onClose}
            className="rounded-full w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
          >
            ✕
          </button>
        </div>
        
        <QuickLoginButton 
          onLogin={handleShowFullLogin}
          onUseOtherAccount={handleShowFullLogin}
          className="border-0 shadow-none p-0 mb-4"
        />

        <div className="border-t border-gray-200 pt-3">
          <button
            onClick={handleShowFullLogin}
            className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            {i18n[lang].useEmailPassword}
          </button>
        </div>
      </div>
    )
  }

  // 如果從未登入過，顯示登入選項選單
  return (
    <div className={`bg-white rounded-none shadow-md border border-gray-200 p-5 w-72 ${className}`}>
      <div className="flex justify-between items-start mb-1">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{i18n[lang].chooseLoginMethod}</h3>
          <p className="text-gray-400 italic font-light text-sm mt-0.5">{i18n[lang].chooseLoginMethodSubtitle}</p>
        </div>
        <button
          onClick={onClose}
          className="rounded-full w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-3 mt-4">
        {/* 完整登入選項（包含信箱密碼和 Google 登入） */}
        <button
          onClick={handleShowFullLogin}
          className="relative overflow-hidden group w-full flex items-center justify-center gap-3 py-3.5 px-5 border border-gray-200 bg-gray-50/50 hover:bg-gray-100/80 shadow-sm rounded-none transition-colors"
        >
          <div className="absolute inset-0 bg-gray-200 opacity-0 group-hover:opacity-40 transition-opacity duration-300" />
          <svg className="w-5 h-5 text-gray-600 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span className="font-medium text-gray-700 relative z-10">{i18n[lang].login}</span>
        </button>

        {/* 其他登入選項可以在這裡添加 */}
        {/* 例如：Facebook, Line 等 */}
      </div>
    </div>
  )
}

export default LoginDropdown
