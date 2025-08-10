# Google OAuth 登入設置說明

## 已完成的設置

### 1. 已安裝的套件
- `@react-oauth/google`: Google OAuth 客戶端庫
- `jwt-decode`: JWT token 解碼庫

### 2. 已創建的文件
- `src/contexts/AuthContext.tsx`: 認證上下文
- `src/hooks/useAuth.ts`: 認證 hook
- `src/components/ui/GoogleLoginButton.tsx`: Google 登入按鈕組件
- `src/components/ui/UserProfile.tsx`: 用戶資訊顯示組件
- `src/components/pages/AuthTestPage.tsx`: 登入功能測試頁面

### 3. Token 儲存位置
Token 會自動儲存在以下兩個地方：

1. **瀏覽器 localStorage**
   - Key: `cloutyspace_auth_token`
   - 包含完整的 Google JWT token

2. **React Context 狀態**
   - 通過 `useAuth()` hook 可以訪問
   - `const { token, user, isAuthenticated } = useAuth()`

### 4. 如何獲取 Token

```typescript
import { useAuth } from '@/hooks'

function MyComponent() {
  const { token, user, isAuthenticated } = useAuth()
  
  // 使用 token 進行 API 調用
  if (token) {
    fetch('/api/protected-endpoint', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
  }
}
```

### 5. 需要設置的 Google Client ID

在 `.env` 文件中設置您的 Google Client ID：

```
VITE_GOOGLE_CLIENT_ID=YOUR_ACTUAL_GOOGLE_CLIENT_ID_HERE
```

## 如何獲取 Google Client ID

1. 前往 [Google Cloud Console](https://console.cloud.google.com/)
2. 創建新項目或選擇現有項目
3. 啟用 Google+ API
4. 前往「憑證」頁面
5. 點擊「創建憑證」> 「OAuth 2.0 客戶端 ID」
6. 選擇「Web 應用程式」
7. 在「已授權的 JavaScript 來源」中添加：
   - `http://localhost:5173` (開發環境)
   - 您的生產環境域名
8. 複製客戶端 ID 並將其添加到 `.env` 文件中

## 測試

1. 設置好 Google Client ID 後
2. 運行 `npm run dev`
3. 點擊右上角的「Google 登入測試」按鈕
4. 嘗試登入並查看 token 資訊

## Token 的使用

登入成功後，token 會包含以下用戶資訊：
- 用戶 ID (sub)
- 電子郵件 (email)
- 姓名 (name)
- 頭像 (picture)
- 名字 (given_name)
- 姓氏 (family_name)

這個 token 是 Google 簽發的 JWT，可以用來：
1. 驗證用戶身份
2. 向您的後端 API 發送請求
3. 獲取用戶的 Google 資料
