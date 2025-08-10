# Google OAuth 設定指南

## 問題診斷

如果你看到 "使用 google.com 登入 localhost" 的錯誤，這表示 Google Cloud Console 中的 OAuth 設定不完整。

## 解決步驟

### 1. 前往 Google Cloud Console
- 打開 [Google Cloud Console](https://console.cloud.google.com/)
- 選擇你的專案

### 2. 啟用 Google+ API (如果需要)
- 前往 **API 和服務** > **程式庫**
- 搜尋 "Google+ API" 並啟用它

### 3. 設定 OAuth 同意畫面
- 前往 **API 和服務** > **OAuth 同意畫面**
- 選擇 **外部** 用戶類型
- 填寫必要資訊：
  - 應用程式名稱：CloutySpace
  - 用戶支援電子郵件：你的電子郵件
  - 開發人員聯絡資訊：你的電子郵件

### 4. 設定 OAuth 2.0 用戶端 ID
- 前往 **API 和服務** > **憑證**
- 點擊 **建立憑證** > **OAuth 2.0 用戶端 ID**
- 應用程式類型：**網頁應用程式**
- 名稱：CloutySpace Client
- **已授權的 JavaScript 來源**：
  ```
  http://localhost:5173
  http://localhost:5000
  http://localhost:3000
  ```
- **已授權的重新導向 URI**：
  ```
  http://localhost:5173
  http://localhost:5173/auth/callback
  ```

### 5. 更新環境變數
- 複製新的用戶端 ID
- 更新 `.env` 檔案中的 `VITE_GOOGLE_CLIENT_ID`

### 6. 測試設定
- 重新啟動開發伺服器
- 前往 http://localhost:5173/oauth-debug.html 測試
- 前往主應用程式測試登入功能

## 目前的用戶端 ID
```
35839759120-90afmlogombmf5dotfnsp2rgm4n6dhfr.apps.googleusercontent.com
```

## 故障排除

### 如果仍然出現錯誤：
1. 確認 Google Cloud Console 中的設定已保存
2. 等待 5-10 分鐘讓設定生效
3. 清除瀏覽器快取
4. 確認 `.env` 檔案中的用戶端 ID 是正確的

### 檢查控制台是否有以下訊息：
- ✅ Google Client ID 已載入: [ID 前 20 字符]...
- ✅ Google Identity Services 初始化成功

### 如果看到以下錯誤：
- ❌ "origin_mismatch" → 檢查已授權的 JavaScript 來源
- ❌ "unauthorized_client" → 檢查用戶端 ID 是否正確
- ❌ "access_denied" → 檢查 OAuth 同意畫面設定
