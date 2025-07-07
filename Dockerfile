# 多階段構建 - 構建階段
FROM node:20-alpine AS builder

# 設定工作目錄
WORKDIR /app

# 安裝 pnpm (可選，如果專案使用 pnpm)
# RUN npm install -g pnpm

# 複製 package 文件
COPY package*.json ./

# 安裝依賴
# 在 builder 階段，我們需要開發依賴來執行 build
RUN npm ci --silent

# 複製源代碼
COPY . .

# 構建應用程式
RUN npm run build

# 生產階段 - 使用 nginx 提供靜態文件
FROM nginx:alpine AS production

# 複製 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 複製構建結果到 nginx 目錄
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 啟動 nginx
CMD ["nginx", "-g", "daemon off;"]

# 開發階段 (可選)
FROM node:20-alpine AS development

WORKDIR /app

# 複製 package 文件
COPY package*.json ./

# 安裝所有依賴 (包括開發依賴)
RUN npm install

# 複製源代碼
COPY . .

# 暴露開發服務器端口
EXPOSE 5173

# 啟動開發服務器
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
