import { FC, useEffect } from 'react'
import { GoogleLogin, CredentialResponse } from '@react-oauth/google'
import { useAuth } from '../../hooks'
import type { Language } from '../../types/common'

interface GoogleLoginButtonProps {
  lang: Language
  onSuccess?: () => void
  onError?: () => void
}

const GoogleLoginButton: FC<GoogleLoginButtonProps> = ({
  lang,
  onSuccess,
  onError,
}) => {
  const { login } = useAuth()

  useEffect(() => {
    // 確認 Google Client ID 已正確載入
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    if (!clientId) {
      console.error('Google Client ID 未設定！請檢查 .env 檔案中的 VITE_GOOGLE_CLIENT_ID')
    }
  }, [])

  const handleSuccess = (credentialResponse: CredentialResponse) => {
    console.log('Google 登入成功，收到憑證:', credentialResponse)
    if (credentialResponse.credential) {
      login(credentialResponse.credential)
      onSuccess?.()
    } else {
      console.error('未收到憑證')
      onError?.()
    }
  }

  const handleError = () => {
    console.error('Google 登入失敗')
    onError?.()
  }

  return (
    <div className="w-full">
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <GoogleLogin
          onSuccess={handleSuccess}
          onError={handleError}
          text="signin_with"
          shape="rectangular"
          theme="outline"
          size="large"
          locale={lang === 'zh' ? 'zh_TW' : 'en'}
          context={lang === 'zh' ? 'signin' : 'signin'}
          ux_mode="popup"
          auto_select={false}
          use_fedcm_for_prompt={false}
        />
      </div>
    </div>
  )
}

export default GoogleLoginButton
