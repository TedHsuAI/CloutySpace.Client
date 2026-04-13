// CORS 和 OAuth 診斷工具
export const checkCORSSettings = () => {
  const currentOrigin = window.location.origin
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  
  console.log('=== Google OAuth 診斷 ===')
  console.log('當前來源:', currentOrigin)
  console.log('Client ID:', clientId ? `${clientId.substring(0, 20)}...` : '未設定')
  
  // 檢查環境變數
  if (!clientId) {
    console.error('❌ VITE_GOOGLE_CLIENT_ID 未設定')
    return false
  }
  
  // 檢查 Client ID 格式
  if (!clientId.includes('.apps.googleusercontent.com')) {
    console.error('❌ Client ID 格式不正確')
    return false
  }
  
  console.log('✅ Client ID 格式正確')
  return true
}

export const validateGoogleAPIAccess = async (accessToken?: string) => {
  try {
    console.log('正在測試 Google API 連接...')
    
    if (accessToken) {
      // 如果有 access token，測試實際的 API 呼叫
      const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Accept': 'application/json'
        }
      })
      
      if (response.ok) {
        console.log('✅ Google API 驗證成功')
        return true
      } else {
        console.error('❌ Google API 驗證失敗:', response.status, response.statusText)
        return false
      }
    } else {
      // 沒有 token 時，只測試 API 的可達性（使用公開端點）
      await fetch('https://www.googleapis.com/oauth2/v1/certs', {
        method: 'HEAD',
        mode: 'no-cors'
      })
      console.log('✅ Google API 端點可達')
      return true
    }
  } catch (error) {
    console.error('❌ Google API 連接測試失敗:', error)
    return false
  }
}

// 新增：檢查 Google OAuth 配置的具體函數
export const checkGoogleOAuthConfig = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
  const currentOrigin = window.location.origin
  
  console.log('\n=== Google Cloud Console 設定提醒 ===')
  console.log('請確認以下設定已在 Google Cloud Console 中配置:')
  console.log('已授權的 JavaScript 來源:')
  console.log(`  ${currentOrigin}`)
  console.log('已授權的重新導向 URI:') 
  console.log(`  ${currentOrigin}`)
  
  return !!clientId
}
