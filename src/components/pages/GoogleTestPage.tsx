import { FC, useState } from 'react'
import type { Language } from '@/types/common'
import { useAuth } from '@/hooks'
import CustomGoogleLoginButton from '@/components/ui/CustomGoogleLoginButton'

interface GoogleTestPageProps {
  lang: Language
}

const GoogleTestPage: FC<GoogleTestPageProps> = ({ lang }) => {
  const { user, logout } = useAuth()
  const [testResults, setTestResults] = useState<string[]>([])

  const addTestResult = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setTestResults(prev => [...prev, `${timestamp}: ${message}`])
  }

  const testGoogleAPI = async () => {
    addTestResult('開始測試 Google API...')
    
    const apiEndpoints = [
      'https://www.googleapis.com/oauth2/v1/userinfo',
      'https://www.googleapis.com/oauth2/v2/userinfo', 
      'https://www.googleapis.com/oauth2/v3/userinfo',
      'https://openidconnect.googleapis.com/v1/userinfo'
    ]

    for (const endpoint of apiEndpoints) {
      try {
        await fetch(endpoint, {
          method: 'HEAD',
          mode: 'no-cors'
        })
        addTestResult(`✅ ${endpoint} - 連接成功`)
      } catch (error) {
        addTestResult(`❌ ${endpoint} - 連接失敗: ${error}`)
      }
    }
  }

  const clearResults = () => {
    setTestResults([])
  }

  return (
    <main className="pt-14 min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Google OAuth 測試頁面</h1>
        
        {/* 用戶狀態 */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">用戶狀態</h2>
          {user ? (
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                {user.picture && (
                  <img 
                    src={user.picture} 
                    alt="User Avatar" 
                    className="w-12 h-12 rounded-full"
                  />
                )}
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                登出
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-600">尚未登入</p>
              <div className="max-w-xs">
                <CustomGoogleLoginButton 
                  lang={lang}
                  onSuccess={() => addTestResult('✅ Google 登入成功！')}
                  onError={() => addTestResult('❌ Google 登入失敗')}
                />
              </div>
            </div>
          )}
        </div>

        {/* 測試工具 */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">測試工具</h2>
          <div className="flex gap-4 flex-wrap">
            <button
              onClick={testGoogleAPI}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              測試 Google API 端點
            </button>
            <button
              onClick={() => {
                console.log('=== 環境資訊 ===')
                console.log('Origin:', window.location.origin)
                console.log('Client ID:', import.meta.env.VITE_GOOGLE_CLIENT_ID)
                console.log('User Agent:', navigator.userAgent)
                addTestResult('環境資訊已輸出到控制台')
              }}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              檢查環境
            </button>
            <button
              onClick={clearResults}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              清除結果
            </button>
          </div>
        </div>

        {/* 測試結果 */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">測試結果</h2>
          <div className="bg-gray-100 rounded p-4 h-64 overflow-y-auto">
            {testResults.length === 0 ? (
              <p className="text-gray-500">尚無測試結果</p>
            ) : (
              <div className="space-y-1">
                {testResults.map((result, index) => (
                  <div key={index} className="text-sm font-mono">
                    {result}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Google Cloud Console 設定指南 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4 text-yellow-800">Google Cloud Console 設定</h2>
          <div className="text-sm space-y-2">
            <p><strong>當前網址：</strong> {window.location.origin}</p>
            <p><strong>需要在 Google Cloud Console 中添加的 JavaScript 來源：</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>{window.location.origin}</li>
              <li>http://localhost:5173</li>
              <li>http://26.55.168.31:5173</li>
              <li>http://192.168.1.101:5173</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  )
}

export default GoogleTestPage
