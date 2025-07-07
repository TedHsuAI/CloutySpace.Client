import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import UnoCSS from 'unocss/vite'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  // 保留您原有的插件設定
  plugins: [react(), UnoCSS()],

  // 保留您原有的路徑別名設定
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },

  // 保留您原有的生產打包設定
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    // 我們已移除 rollupOptions.output.manualChunks 設定。
    // 這個設定在 Docker 環境中有時會導致模組解析問題，
    // 例如我們遇到的 'Could not resolve entry module "react-router-dom"'。
    // 移除後，Vite 會使用其預設、高效的程式碼分割策略，這更為穩定。
  },

  // 'server' 的設定僅用於開發伺服器 (npm run dev)，不會影響生產打包 (npm run build)。
  server: {
    // 監聽所有網路介面，方便在開發時從其他裝置訪問
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },
})