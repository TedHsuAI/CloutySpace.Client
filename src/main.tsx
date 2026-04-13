import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext'
import 'uno.css'
import './global.css'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

// 調試：確認 Client ID 是否正確載入
if (!clientId) {
  console.error('❌ Google Client ID 未設定！請檢查 .env 檔案中的 VITE_GOOGLE_CLIENT_ID')
} else {
  console.log('✅ Google Client ID 已載入:', clientId.substring(0, 20) + '...')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <AuthProvider>
        <div className="font-en">
          <App />
        </div>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
