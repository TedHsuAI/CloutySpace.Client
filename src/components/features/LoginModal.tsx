import { FC, useState, useCallback } from 'react'
import { BaseProps, LoginCredentials } from '@/types/common'
import FloatingInput from '@/components/ui/FloatingInput'
import GoogleLoginButton from '@/components/ui/GoogleLoginButton'

interface LoginModalProps extends BaseProps {
  onClose: () => void
  onLogin?: (credentials: LoginCredentials) => void
  onGoogleLogin?: () => void
  onRegister?: () => void
  isLoading?: boolean
}

const LoginModal: FC<LoginModalProps> = ({ 
  lang,
  onClose, 
  onLogin,
  onGoogleLogin,
  onRegister,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<LoginCredentials>({
    email: '',
    password: ''
  })
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<Partial<LoginCredentials>>({})
  
  // 移除未使用的變數 t

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<LoginCredentials> = {}
    
    if (!formData.email.trim()) {
      newErrors.email = lang === 'zh' ? '請輸入電子郵件' : 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = lang === 'zh' ? '請輸入有效的電子郵件' : 'Please enter a valid email'
    }
    
    if (!formData.password.trim()) {
      newErrors.password = lang === 'zh' ? '請輸入密碼' : 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = lang === 'zh' ? '密碼至少需要6個字符' : 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, lang])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    if (onLogin) {
      onLogin(formData)
    }
  }, [formData, validateForm, onLogin])

  const handleInputChange = useCallback((field: keyof LoginCredentials, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }, [errors])

  return (
    <>
      {/* 背景遮罩層 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4 sm:p-8"
        onClick={onClose}
      >
        {/* Modal 本體 */}
        <div
          className="bg-white w-full max-w-[360px] sm:max-w-[420px] md:max-w-[420px] rounded-xl shadow-lg px-6 py-6 sm:px-8 relative"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 關閉按鈕 */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label={lang === 'zh' ? '關閉' : 'Close'}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* 標題 */}
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold mb-1">
              {lang === 'zh' ? '登入' : 'Login'}
            </h2>
            <p className="text-sm text-gray-500">
              {lang === 'zh' ? '歡迎回來！請登入您的帳號。' : 'Welcome back! Please login to your account.'}
            </p>
          </div>

          {/* 表單 */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 輸入欄位 */}
            <div className="flex flex-col gap-6 items-start w-full">
              <div className="w-full">
                <FloatingInput
                  label={lang === 'zh' ? '電子郵件' : 'Email'}
                  type="email"
                  value={formData.email}
                  onChange={(value) => handleInputChange('email', value)}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div className="w-full">
                <FloatingInput
                  label={lang === 'zh' ? '密碼' : 'Password'}
                  type="password"
                  value={formData.password}
                  onChange={(value) => handleInputChange('password', value)}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                )}
              </div>
            </div>

            {/* 記住我 + 忘記密碼 */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded"
                />
                {lang === 'zh' ? '記住我' : 'Remember me'}
              </label>
              <a href="#" className="text-blue-500 hover:underline">
                {lang === 'zh' ? '忘記密碼？' : 'Lost your password?'}
              </a>
            </div>

            {/* 登入按鈕 */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading 
                ? (lang === 'zh' ? '登入中...' : 'Logging in...') 
                : (lang === 'zh' ? '登入' : 'Login')
              }
            </button>
          </form>

          {/* 註冊提示 */}
          <div className="mt-6 text-center text-sm text-gray-500">
            {lang === 'zh' ? '還不是會員？' : 'Not a member yet?'}{' '}
            <button 
              onClick={onRegister} 
              className="text-blue-500 hover:underline"
            >
              {lang === 'zh' ? '立即註冊' : 'Register now'}
            </button>
          </div>

          {/* Google 登入按鈕 */}
          <div className="mt-4">
            <GoogleLoginButton 
              onClick={onGoogleLogin || (() => console.log('Google login clicked'))}
              text={lang === 'zh' ? '使用 Google 登入' : 'Log in with Google'}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginModal
