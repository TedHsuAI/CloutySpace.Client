import { FC, useCallback, useEffect, useState } from 'react'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'
import { BaseProps, LoginCredentials } from '@/types/common'
import FloatingInput from '@/components/ui/FloatingInput'
import GoogleIconButton from '@/components/ui/GoogleIconButton'
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
  const { isAuthenticated, login: authLogin } = useAuth()
  const [formData, setFormData] = useState<LoginCredentials>({ email: '', password: '' }) // email field reused as username internally
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<Partial<LoginCredentials>>({})
  const [showGoogleButton, setShowGoogleButton] = useState(false)
  const [googleLoginError, setGoogleLoginError] = useState<string>('')

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

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    console.log('✅ Google Login Success')
    
    if (credentialResponse.credential) {
      try {
        // 清除之前的錯誤訊息
        setGoogleLoginError('')
        
        console.log('🔑 Google JWT Token (ID Token):', credentialResponse.credential)
        
        // 調用 AuthContext 的 login (現在是 async 函數)
        await authLogin(credentialResponse.credential)
        
        // 登入成功，關閉 modal
        onClose()
      } catch (error) {
        // 登入失敗，顯示錯誤訊息
        console.error('❌ Google 登入認證失敗:', error)
        
        let errorMessage = '登入失敗，請稍後再試'
        if (error instanceof Error) {
          errorMessage = error.message
        }
        
        setGoogleLoginError(errorMessage)
        // 保持登入畫面開啟，不關閉 modal
      }
    } else {
      console.error('❌ No credential received from Google')
      setGoogleLoginError('未收到 Google 認證資訊')
    }
  }

  const handleGoogleError = () => {
    console.error('❌ Google Login Failed')
  }

  const handleGoogleLogin = () => {
    console.log('🚀 Opening Google Login...')
    setShowGoogleButton(true)
  }

  if (isAuthenticated) return null

  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center p-4 sm:p-8"
      onClick={handleBackgroundClick}
    >
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        className="bg-white w-full max-w-[420px] rounded-none shadow-md border border-gray-200 px-8 py-8 relative flex flex-col items-center select-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-6">
          <h2 id="login-modal-title" className="text-3xl font-medium m-0">{i18n[lang].login}</h2>
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
                className="rounded-none"
              />
              <span>{i18n[lang].rememberMe}</span>
            </label>
            <button
              type="button"
              className="text-gray-400 text-sm font-medium hover:text-gray-600 transition-colors cursor-pointer bg-transparent border-none p-0"
            >
              {i18n[lang].lostPassword}
            </button>
          </div>

          <div className="w-full flex justify-start">
            <button
              type="submit"
              disabled={isLoading}
              className="button type--A w-full h-[56px] text-sm font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="button__line"></div>
              <div className="button__line"></div>
              <span className="button__text">{isLoading ? i18n[lang].loggingIn : i18n[lang].login}</span>
              <div className="button__drow1"></div>
              <div className="button__drow2"></div>
            </button>
          </div>

          <style>{`
            .type--A {
              --line_color: #000000;
              --back_color: #E6DFF3;
            }
            .button {
              position: relative;
              z-index: 0;
              text-decoration: none;
              font-size: 14px;
              font-weight: bold;
              color: var(--line_color);
              letter-spacing: 2px;
              transition: all 0.3s ease;
              background: #ffffff;
              border: none;
            }
            .button__text {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 100%;
            }
            .button::before,
            .button::after,
            .button__text::before,
            .button__text::after {
              content: '';
              position: absolute;
              height: 2px;
              border-radius: 0;
              background: var(--line_color);
              transition: all 0.5s ease;
            }
            .button::before {
              top: 0;
              left: 54px;
              width: calc(100% - 56px * 2 - 16px);
            }
            .button::after {
              top: 0;
              right: 54px;
              width: 8px;
            }
            .button__text::before {
              bottom: 0;
              right: 54px;
              width: calc(100% - 56px * 2 - 16px);
            }
            .button__text::after {
              bottom: 0;
              left: 54px;
              width: 8px;
            }
            .button__line {
              position: absolute;
              top: 0;
              width: 56px;
              height: 100%;
              overflow: hidden;
            }
            .button__line::before {
              content: '';
              position: absolute;
              top: 0;
              width: 150%;
              height: 100%;
              box-sizing: border-box;
              border-radius: 0;
              border: solid 2px var(--line_color);
            }
            .button__line:nth-child(1),
            .button__line:nth-child(1)::before {
              left: 0;
            }
            .button__line:nth-child(2),
            .button__line:nth-child(2)::before {
              right: 0;
            }
            .button:hover {
              letter-spacing: 6px;
            }
            .button:hover::before,
            .button:hover .button__text::before {
              width: 8px;
            }
            .button:hover::after,
            .button:hover .button__text::after {
              width: calc(100% - 56px * 2 - 16px);
            }
            .button__drow1,
            .button__drow2 {
              position: absolute;
              z-index: -1;
              border-radius: 0;
              transform-origin: 16px 16px;
            }
            .button__drow1 {
              top: -16px;
              left: 40px;
              width: 32px;
              height: 0;
              transform: rotate(30deg);
            }
            .button__drow2 {
              top: 44px;
              left: 77px;
              width: 32px;
              height: 0;
              transform: rotate(-127deg);
            }
            .button__drow1::before,
            .button__drow1::after,
            .button__drow2::before,
            .button__drow2::after {
              content: "";
              position: absolute;
            }
            .button__drow1::before {
              bottom: 0;
              left: 0;
              width: 0;
              height: 32px;
              border-radius: 0;
              transform-origin: 16px 16px;
              transform: rotate(-60deg);
            }
            .button__drow1::after {
              top: -10px;
              left: 45px;
              width: 0;
              height: 32px;
              border-radius: 0;
              transform-origin: 16px 16px;
              transform: rotate(69deg);
            }
            .button__drow2::before {
              bottom: 0;
              left: 0;
              width: 0;
              height: 32px;
              border-radius: 0;
              transform-origin: 16px 16px;
              transform: rotate(-146deg);
            }
            .button__drow2::after {
              bottom: 26px;
              left: -40px;
              width: 0;
              height: 32px;
              border-radius: 0;
              transform-origin: 16px 16px;
              transform: rotate(-262deg);
            }
            .button__drow1,
            .button__drow1::before,
            .button__drow1::after,
            .button__drow2,
            .button__drow2::before,
            .button__drow2::after {
              background: var(--back_color);
            }
            .button:hover .button__drow1 {
              animation: drow1 ease-in 0.06s;
              animation-fill-mode: forwards;
            }
            .button:hover .button__drow1::before {
              animation: drow2 linear 0.08s 0.06s;
              animation-fill-mode: forwards;
            }
            .button:hover .button__drow1::after {
              animation: drow3 linear 0.03s 0.14s;
              animation-fill-mode: forwards;
            }
            .button:hover .button__drow2 {
              animation: drow4 linear 0.06s 0.2s;
              animation-fill-mode: forwards;
            }
            .button:hover .button__drow2::before {
              animation: drow3 linear 0.03s 0.26s;
              animation-fill-mode: forwards;
            }
            .button:hover .button__drow2::after {
              animation: drow5 linear 0.06s 0.32s;
              animation-fill-mode: forwards;
            }
            @keyframes drow1 {
              0% { height: 0; }
              100% { height: 100px; }
            }
            @keyframes drow2 {
              0% { width: 0; opacity: 0; }
              10% { opacity: 0; }
              11% { opacity: 1; }
              100% { width: 120px; }
            }
            @keyframes drow3 {
              0% { width: 0; }
              100% { width: 80px; }
            }
            @keyframes drow4 {
              0% { height: 0; }
              100% { height: 120px; }
            }
            @keyframes drow5 {
              0% { width: 0; }
              100% { width: 124px; }
            }
            .button:disabled {
              pointer-events: none;
            }
          `}</style>

          <div className="w-full mt-4 flex flex-col items-center">
            {googleLoginError && (
              <div className="w-[356px] mb-3 p-3 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                {googleLoginError}
              </div>
            )}
            
            {showGoogleButton ? (
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap={false}
                theme="outline"
                size="large"
                width="356"
                text="continue_with"
                locale={lang === 'zh' ? 'zh_TW' : 'en'}
              />
            ) : (
              <GoogleIconButton 
                onClick={handleGoogleLogin}
                disabled={isLoading}
                tooltipText={i18n[lang].loginWithGoogle}
              />
            )}
          </div>
        </form>

        <div className="mt-5 flex items-center justify-between text-xs text-gray-500 w-[356px]">
          <span className="text-left">{i18n[lang].notMemberYet}</span>
          <button
            type="button"
            onClick={() => onRegister?.()}
            className="text-gray-400 text-xs font-medium hover:text-gray-600 transition-colors cursor-pointer bg-transparent border-none p-0"
          >
            {i18n[lang].registerNow}
          </button>
        </div>
      </div>
    </div>
  )
}

export default LoginModal
