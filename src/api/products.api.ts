/**
 * 商品相關 API
 * 目前使用本地常量數據，未來將連接後台 CMS 管理系統
 */

import { apiClient } from './client'
import { TEA_PRODUCTS } from '@/constants/products'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: ProductImage[]
  category: string
  stock: number
  sku: string
  attributes?: Record<string, string>
  createdAt?: string
  updatedAt?: string
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
}

export interface ProductListParams {
  page?: number
  limit?: number
  category?: string
  search?: string
  sortBy?: 'price' | 'name' | 'createdAt'
  order?: 'asc' | 'desc'
}

export interface ProductListResponse {
  data: Product[]
  total: number
  page: number
  limit: number
}

/**
 * 商品 API 服務
 */
export const productsApi = {
  /**
   * 獲取商品列表
   * TODO: 未來將從後台 API 獲取
   */
  async getList(params?: ProductListParams): Promise<ProductListResponse> {
    // 目前返回本地數據
    // 未來實現: return apiClient.get<ProductListResponse>('/api/products', { params })
    
    const allProducts = TEA_PRODUCTS as unknown as Product[]
    const { page = 1, limit = 12 } = params || {}
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit

    return Promise.resolve({
      data: allProducts.slice(startIndex, endIndex),
      total: allProducts.length,
      page,
      limit,
    })
  },

  /**
   * 根據 ID 獲取單個商品
   * TODO: 未來將從後台 API 獲取
   */
  async getById(id: string): Promise<Product | null> {
    // 目前從本地數據查找
    // 未來實現: return apiClient.get<Product>(`/api/products/${id}`)
    
    const product = TEA_PRODUCTS.find(p => p.key === id) as unknown as Product
    return Promise.resolve(product || null)
  },

  /**
   * 搜尋商品
   * TODO: 未來將使用後台搜尋 API
   */
  async search(query: string): Promise<Product[]> {
    // 目前使用本地過濾
    // 未來實現: return apiClient.get<Product[]>('/api/products/search', { params: { q: query } })
    
    const allProducts = TEA_PRODUCTS as unknown as Product[]
    const filtered = allProducts.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description?.toLowerCase().includes(query.toLowerCase())
    )
    return Promise.resolve(filtered)
  },

  /**
   * 根據分類獲取商品
   * TODO: 未來將從後台 API 獲取
   */
  async getByCategory(category: string): Promise<Product[]> {
    // 目前使用本地過濾
    // 未來實現: return apiClient.get<Product[]>(`/api/products/category/${category}`)
    
    const allProducts = TEA_PRODUCTS as unknown as Product[]
    const filtered = allProducts.filter(p => p.category === category)
    return Promise.resolve(filtered)
  },

  // === 以下為後台管理 API（未來實現）===

  /**
   * 創建新商品（後台管理功能）
   * TODO: 連接後台 CMS API
   */
  async create(data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    return apiClient.post<Product>('/api/admin/products', data)
  },

  /**
   * 更新商品（後台管理功能）
   * TODO: 連接後台 CMS API
   */
  async update(id: string, data: Partial<Product>): Promise<Product> {
    return apiClient.put<Product>(`/api/admin/products/${id}`, data)
  },

  /**
   * 刪除商品（後台管理功能）
   * TODO: 連接後台 CMS API
   */
  async delete(id: string): Promise<void> {
    return apiClient.delete(`/api/admin/products/${id}`)
  },

  /**
   * 更新商品庫存（後台管理功能）
   * TODO: 連接後台 CMS API
   */
  async updateStock(id: string, stock: number): Promise<Product> {
    return apiClient.patch<Product>(`/api/admin/products/${id}/stock`, { stock })
  },
}
