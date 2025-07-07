# Docker 部署指南

## 🚀 快速開始

### 開發環境

```bash
# 構建並啟動開發容器
docker-compose --profile dev up --build

# 或使用 Docker 直接運行
docker build --target development -t cloutyspace-dev .
docker run -p 5173:5173 -v $(pwd):/app -v /app/node_modules cloutyspace-dev
```

開發服務器將在 http://localhost:5173 啟動

### 生產環境

```bash
# 構建並啟動生產容器
docker-compose --profile prod up --build

# 或使用 Docker 直接運行
docker build --target production -t cloutyspace-prod .
docker run -p 80:80 cloutyspace-prod
```

生產環境將在 http://localhost 啟動

## 📁 文件說明

- `Dockerfile` - 多階段構建配置
  - `development` - 開發環境，支援熱重載
  - `production` - 生產環境，使用 Nginx 提供靜態文件
- `.dockerignore` - 排除不必要的文件以減少構建上下文
- `nginx.conf` - Nginx 配置，包含 SPA 路由支援和性能優化
- `docker-compose.yml` - 容器編排配置

## 🔧 配置說明

### 環境變數

- `NODE_ENV` - 運行環境 (development/production)
- `DOCKER` - 標識是否在 Docker 中運行
- `DEV_SERVER_PORT` - 開發服務器端口 (默認 5173)

### 端口配置

- 開發環境: 5173
- 生產環境: 80
- HTTPS (可選): 443

## 🚢 部署選項

### 1. 單容器部署

```bash
# 構建生產鏡像
docker build -t cloutyspace:latest .

# 運行容器
docker run -d -p 80:80 --name cloutyspace cloutyspace:latest
```

### 2. Docker Compose 部署

```bash
# 生產環境
docker-compose --profile prod up -d

# 查看日誌
docker-compose logs -f
```

### 3. 與後端服務整合

如果有後端 API 服務，可以修改 `nginx.conf` 中的代理配置：

```nginx
location /api/ {
    proxy_pass http://backend-service:5001/;
    # ... 其他代理配置
}
```

然後在 `docker-compose.yml` 中添加後端服務。

## 🎯 性能優化

### 構建優化

- 使用 `.dockerignore` 排除不必要文件
- 多階段構建減少最終鏡像大小
- 使用 Alpine Linux 基礎鏡像

### 運行時優化

- Nginx Gzip 壓縮
- 靜態資源緩存
- 安全標頭配置

## 🔍 故障排除

### 常見問題

1. **端口衝突**
   ```bash
   # 更改端口映射
   docker run -p 8080:80 cloutyspace:latest
   ```

2. **文件權限問題**
   ```bash
   # 檢查文件權限
   ls -la dist/
   
   # 如需要，調整權限
   chmod -R 755 dist/
   ```

3. **開發環境熱重載不工作**
   - 確保使用正確的 volume 映射
   - 檢查 `--host 0.0.0.0` 參數

### 調試命令

```bash
# 查看容器日誌
docker logs <container-id>

# 進入容器調試
docker exec -it <container-id> /bin/sh

# 查看 Nginx 配置
docker exec <container-id> nginx -t
```

## 🌟 最佳實踐

1. **安全性**
   - 使用非 root 用戶運行應用
   - 定期更新基礎鏡像
   - 掃描鏡像漏洞

2. **性能**
   - 啟用 Gzip 壓縮
   - 設置適當的緩存策略
   - 使用 CDN 分發靜態資源

3. **監控**
   - 配置健康檢查
   - 收集應用日誌
   - 監控資源使用情況

4. **部署**
   - 使用容器編排平台 (Kubernetes, Docker Swarm)
   - 實施滾動更新
   - 配置自動擴展
