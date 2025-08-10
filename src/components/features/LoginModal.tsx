import { FC, useCallback, useEffect, useState } from 'react'
import { BaseProps, LoginCredentials } from '@/types/common'
import FloatingInput from '@/components/ui/FloatingInput'
import GoogleMaterialButton from '@/components/ui/GoogleMaterialButton'
import { useAuth } from '@/hooks'
import { i18n } from '@/lang'

interface LoginModalProps extends BaseProps {
  onClose: () => void
  onLogin?: (credentials: LoginCredentials) => void
  onRegister?: () => void
  isLoading?: boolean
}

const LoginModal: FC<LoginModalProps> = ({
  lang,
  onClose,
  onLogin,
  onRegister,
  isLoading = false
}) => {
  const { isAuthenticated } = useAuth()
  const [formData, setFormData] = useState<LoginCredentials>({ email: '', password: '' }) // email field reused as username internally
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<Partial<LoginCredentials>>({})

  useEffect(() => {
    if (isAuthenticated) onClose()
  }, [isAuthenticated, onClose])

  const validateForm = useCallback((): boolean => {
    const newErrors: Partial<LoginCredentials> = {}
    if (!formData.email.trim()) {
      newErrors.email = i18n[lang].errorUsernameRequired
    } else if (formData.email.trim().length < 3) {
      newErrors.email = i18n[lang].errorUsernameMinLength
    }
    if (!formData.password.trim()) {
      newErrors.password = i18n[lang].errorPasswordRequired
    } else if (formData.password.length < 6) {
      newErrors.password = i18n[lang].errorPasswordMinLength
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData, lang])

  const handleInputChange = useCallback((field: keyof LoginCredentials, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }))
  }, [errors])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    onLogin?.(formData)
  }, [validateForm, onLogin, formData])

  const handleGoogleLoginSuccess = () => {
    onClose()
  }

  const handleGoogleLogin = () => {
    console.log('Google login clicked')
    // 這裡可以之後加入 Google 登入邏輯
  }

  if (isAuthenticated) return null

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={handleBackgroundClick}
    >
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        className="bg-white w-full max-w-[420px] shadow-lg border border-gray-300 px-8 py-8 relative flex flex-col items-center select-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-4">
          <h2 id="login-modal-title" className="text-xl font-semibold m-0">{i18n[lang].login}</h2>
        </div>

        <div className="w-full mt-2">
          {/* Google 按鈕移到下面 */}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 w-[356px]">
          <div className="flex flex-col gap-5 items-start w-full">
            <div className="w-full">
              <FloatingInput
                label={i18n[lang].username}
                type="text"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
            <div className="w-full">
              <FloatingInput
                label={i18n[lang].password}
                type="password"
                value={formData.password}
                onChange={(value) => handleInputChange('password', value)}
              />
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>
          </div>

          <div className="flex justify-between items-center text-sm w-full">
            <label className="flex items-center gap-2 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded"
              />
              <span>{i18n[lang].rememberMe}</span>
            </label>
            <button
              type="button"
              className="text-gray-500 text-sm font-medium hover:text-gray-700 transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              {i18n[lang].lostPassword}
            </button>
          </div>

          <div className="w-full flex justify-start">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[38px] border border-gray-400 text-gray-700 bg-transparent transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:border-gray-600 hover:text-gray-900 text-sm font-medium"
            >
              {isLoading ? i18n[lang].loggingIn : i18n[lang].login}
            </button>
          </div>

          <div className="w-full mt-4">
            <GoogleMaterialButton 
              lang={lang}
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full"
            />
          </div>
        </form>

        <div className="mt-5 flex items-center justify-between text-xs text-gray-500 w-[356px]">
          <span className="text-left">{i18n[lang].notMemberYet}</span>
          <button
            type="button"
            onClick={() => onRegister?.()}
            className="text-gray-500 text-xs font-medium hover:text-gray-700 transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            {i18n[lang].registerNow}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
