/**
 * 統一的 API 客戶端
 * 提供標準化的 HTTP 請求處理、錯誤處理和認證管理
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://136.117.227.188:8080'

export interface ApiError {
  message: string
  status: number
  code?: string
}

export class ApiClient {
  private baseUrl: string
  private defaultHeaders: HeadersInit

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  /**
   * 獲取認證 token（從 localStorage）
   */
  private getAuthToken(): string | null {
    return localStorage.getItem('cloutyspace_auth_token')
  }

  /**
   * 建立請求 headers
   */
  private buildHeaders(customHeaders?: HeadersInit): HeadersInit {
    const headers = { ...this.defaultHeaders, ...customHeaders }
    
    // 添加認證 token
    const token = this.getAuthToken()
    if (token) {
      ;(headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
    }

    return headers
  }

  /**
   * 處理 API 回應
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ApiError = {
        message: `HTTP Error: ${response.status}`,
        status: response.status,
      }

      try {
        const errorData = await response.json()
        error.message = errorData.message || error.message
        error.code = errorData.code
      } catch {
        // JSON 解析失敗，使用預設錯誤訊息
      }

      throw error
    }

    // 處理 204 No Content
    if (response.status === 204) {
      return {} as T
    }

    return response.json()
  }

  /**
   * GET 請求
   */
  async get<T>(endpoint: string, params?: Record<string, unknown>, options?: RequestInit): Promise<T> {
    let url = `${this.baseUrl}${endpoint}`
    
    // 添加查詢參數
    if (params && Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
      url += `?${searchParams.toString()}`
    }

    const response = await fetch(url, {
      method: 'GET',
      headers: this.buildHeaders(options?.headers),
      ...options,
    })

    return this.handleResponse<T>(response)
  }

  /**
   * POST 請求
   */
  async post<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const response = await fetch(url, {
      method: 'POST',
      headers: this.buildHeaders(options?.headers),
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })

    return this.handleResponse<T>(response)
  }

  /**
   * PUT 請求
   */
  async put<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const response = await fetch(url, {
      method: 'PUT',
      headers: this.buildHeaders(options?.headers),
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })

    return this.handleResponse<T>(response)
  }

  /**
   * DELETE 請求
   */
  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const response = await fetch(url, {
      method: 'DELETE',
      headers: this.buildHeaders(options?.headers),
      ...options,
    })

    return this.handleResponse<T>(response)
  }

  /**
   * PATCH 請求
   */
  async patch<T>(endpoint: string, data?: unknown, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const response = await fetch(url, {
      method: 'PATCH',
      headers: this.buildHeaders(options?.headers),
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })

    return this.handleResponse<T>(response)
  }
}

// 預設客戶端實例
export const apiClient = new ApiClient()
