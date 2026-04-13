/**
 * API Client - 通用的 API 請求處理
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

/**
 * 從 localStorage 取得 auth token 並組成 headers
 */
export const getAuthHeaders = (): HeadersInit => {
  const token = localStorage.getItem('cloutyspace_auth_token')
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  return headers
}

/**
 * API 錯誤類型
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

/**
 * 通用 API 請求函數
 */
export async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const config: RequestInit = {
    ...options,
    mode: 'cors',
    credentials: 'omit',
    headers: {
      ...getAuthHeaders(),
      ...options.headers,
    },
  }

  try {
    const response = await fetch(url, config)
    
    // 嘗試解析 JSON
    let data: any
    try {
      data = await response.json()
    } catch {
      data = null
    }

    if (!response.ok) {
      throw new ApiError(
        data?.message || data?.error || `API 請求失敗: ${response.statusText}`,
        response.status,
        data
      )
    }

    return data as T
  } catch (error) {
    if (error instanceof ApiError) {
      throw error
    }
    
    // 檢查是否為 CORS 或網路錯誤
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new ApiError(
        'CORS 錯誤：無法連線到後端伺服器，請確認後端已正確設定 CORS 政策',
        undefined,
        error
      )
    }
    
    // 其他網路錯誤
    throw new ApiError(
      error instanceof Error ? error.message : '網路連線失敗，請稍後再試',
      undefined,
      error
    )
  }
}

/**
 * GET 請求
 */
export async function get<T>(endpoint: string, options?: RequestInit): Promise<T> {
  return request<T>(endpoint, { ...options, method: 'GET' })
}

/**
 * POST 請求
 */
export async function post<T>(
  endpoint: string,
  body?: any,
  options?: RequestInit
): Promise<T> {
  return request<T>(endpoint, {
    ...options,
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  })
}

/**
 * PUT 請求
 */
export async function put<T>(
  endpoint: string,
  body?: any,
  options?: RequestInit
): Promise<T> {
  return request<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
  })
}

/**
 * DELETE 請求
 */
export async function del<T>(endpoint: string, options?: RequestInit): Promise<T> {
  return request<T>(endpoint, { ...options, method: 'DELETE' })
}
