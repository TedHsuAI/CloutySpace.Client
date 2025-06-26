import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import child_process from 'child_process'
import dotenv from 'dotenv'
import UnoCSS from 'unocss/vite'
dotenv.config()

// 以下區段為 VS2022 生成用於產生 HTTPS 憑證與反向代理的設定，可依需求移除
const isInDocker = process.env.DOCKER === 'true'

const baseFolder = process.env.APPDATA
    ? `${process.env.APPDATA}/ASP.NET/https`
    : `${process.env.HOME}/.aspnet/https`

const certificateName = 'cloutyspace.client'
const certFile = path.join(baseFolder, `${certificateName}.pem`)
const keyFile = path.join(baseFolder, `${certificateName}.key`)

if (!isInDocker && (!fs.existsSync(certFile) || !fs.existsSync(keyFile))) {
    const result = child_process.spawnSync(
        'dotnet',
        ['dev-certs', 'https', '--export-path', certFile, '--format', 'Pem', '--no-password'],
        { stdio: 'inherit' }
    )

    if (result.status !== 0) {
        throw new Error('Could not create certificate.')
    }
}

const backendPort = process.env.ASPNETCORE_HTTPS_PORT || '5001'
const target = `https://localhost:${backendPort}`

export default defineConfig({
    plugins: [react(), UnoCSS()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    build: {
        outDir: '../Cloutyspace.Server/wwwroot',
        emptyOutDir: true,
    },
    server: {
        port: parseInt(process.env.DEV_SERVER_PORT || '5173'),
        proxy: {
            '/weatherforecast': {
                target,
                secure: false,
                changeOrigin: true,
            },
        },
        ...(isInDocker
            ? {}
            : {
                https: {
                    key: fs.readFileSync(keyFile),
                    cert: fs.readFileSync(certFile),
                },
            }),
    },
})

// 移除 VS2022 專案不再使用的憑證產生程式碼
