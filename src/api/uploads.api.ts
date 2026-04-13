/**
 * 圖片上傳服務介面
 * 用於商品圖片、用戶頭像等圖片管理
 * 預留未來連接後台 CMS 的圖片管理功能
 */

import { apiClient } from './client'

// ============= 類型定義 =============

export interface UploadedImage {
  id: string
  url: string
  thumbnailUrl?: string
  filename: string
  size: number
  mimeType: string
  width?: number
  height?: number
  uploadedAt: string
}

export interface UploadProgress {
  loaded: number
  total: number
  percentage: number
}

export interface ImageUploadOptions {
  maxSizeMB?: number          // 最大檔案大小（MB）
  maxWidth?: number           // 最大寬度（自動壓縮）
  maxHeight?: number          // 最大高度（自動壓縮）
  quality?: number            // 壓縮品質 (0-1)
  generateThumbnail?: boolean // 是否產生縮圖
  onProgress?: (progress: UploadProgress) => void
}

export interface ImageValidationResult {
  valid: boolean
  error?: string
}

// ============= 圖片驗證工具 =============

/**
 * 驗證圖片檔案
 */
export function validateImage(
  file: File,
  options: ImageUploadOptions = {}
): ImageValidationResult {
  const {
    maxSizeMB = 5,
  } = options

  // 檢查檔案類型
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: `不支援的圖片格式。請使用 JPG、PNG、WebP 或 GIF。`,
    }
  }

  // 檢查檔案大小
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      error: `圖片大小不能超過 ${maxSizeMB}MB。當前大小: ${(file.size / 1024 / 1024).toFixed(2)}MB`,
    }
  }

  return { valid: true }
}

/**
 * 獲取圖片尺寸
 */
export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve({
        width: img.width,
        height: img.height,
      })
    }

    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('無法讀取圖片尺寸'))
    }

    img.src = url
  })
}

/**
 * 壓縮圖片
 */
export async function compressImage(
  file: File,
  options: ImageUploadOptions = {}
): Promise<File> {
  const {
    maxWidth = 1920,
    maxHeight = 1920,
    quality = 0.9,
  } = options

  return new Promise((resolve, reject) => {
    const img = new Image()
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      reject(new Error('Canvas context not available'))
      return
    }

    img.onload = () => {
      let { width, height } = img

      // 計算縮放比例
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height)
        width = width * ratio
        height = height * ratio
      }

      canvas.width = width
      canvas.height = height

      // 繪製壓縮後的圖片
      ctx.drawImage(img, 0, 0, width, height)

      // 轉換為 Blob
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('圖片壓縮失敗'))
            return
          }

          const compressedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          })

          resolve(compressedFile)
        },
        file.type,
        quality
      )
    }

    img.onerror = () => {
      reject(new Error('無法載入圖片'))
    }

    img.src = URL.createObjectURL(file)
  })
}

// ============= Upload API 服務 =============

/**
 * 圖片上傳 API 服務
 */
export const uploadsApi = {
  /**
   * 上傳單張圖片
   * TODO: 連接後台 CMS API
   */
  async uploadImage(
    file: File,
    options?: ImageUploadOptions
  ): Promise<UploadedImage> {
    // 驗證圖片
    const validation = validateImage(file, options)
    if (!validation.valid) {
      throw new Error(validation.error)
    }

    // 如果需要壓縮
    let fileToUpload = file
    if (options?.maxWidth || options?.maxHeight) {
      fileToUpload = await compressImage(file, options)
    }

    // 建立 FormData
    const formData = new FormData()
    formData.append('file', fileToUpload)
    
    if (options?.generateThumbnail) {
      formData.append('generateThumbnail', 'true')
    }

    // 發送請求
    // TODO: 實現進度追蹤
    return apiClient.post<UploadedImage>('/api/uploads/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  /**
   * 上傳多張圖片
   * TODO: 連接後台 CMS API
   */
  async uploadImages(
    files: File[],
    options?: ImageUploadOptions
  ): Promise<UploadedImage[]> {
    const uploadPromises = files.map((file) => this.uploadImage(file, options))
    return Promise.all(uploadPromises)
  },

  /**
   * 刪除圖片
   * TODO: 連接後台 CMS API
   */
  async deleteImage(imageId: string): Promise<void> {
    return apiClient.delete(`/api/uploads/${imageId}`)
  },

  /**
   * 獲取圖片列表（後台管理）
   * TODO: 連接後台 CMS API
   */
  async getImages(params?: {
    page?: number
    limit?: number
    category?: string
  }): Promise<{
    data: UploadedImage[]
    total: number
  }> {
    return apiClient.get('/api/admin/uploads', params as Record<string, unknown>)
  },
}

// ============= 使用範例 =============

/**
 * 前端使用範例：
 * 
 * ```tsx
 * import { uploadsApi, validateImage } from '@/api/uploads.api'
 * 
 * function ImageUploadComponent() {
 *   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
 *     const file = e.target.files?.[0]
 *     if (!file) return
 * 
 *     // 驗證
 *     const validation = validateImage(file, { maxSizeMB: 5 })
 *     if (!validation.valid) {
 *       alert(validation.error)
 *       return
 *     }
 * 
 *     // 上傳
 *     try {
 *       const result = await uploadsApi.uploadImage(file, {
 *         maxWidth: 1920,
 *         maxHeight: 1920,
 *         quality: 0.9,
 *         generateThumbnail: true,
 *         onProgress: (progress) => {
 *           console.log(`上傳進度: ${progress.percentage}%`)
 *         },
 *       })
 * 
 *       console.log('上傳成功:', result.url)
 *     } catch (error) {
 *       console.error('上傳失敗:', error)
 *     }
 *   }
 * 
 *   return <input type="file" accept="image/*" onChange={handleFileChange} />
 * }
 * ```
 */
