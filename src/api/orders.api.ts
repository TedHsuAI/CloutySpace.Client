/**
 * 訂單相關 API
 * 預留訂單管理接口，未來連接後台系統
 */

import { apiClient } from './client'

export interface OrderItem {
  productId: string
  productName: string
  quantity: number
  price: number
  format?: string
}

export interface ShippingAddress {
  recipientName: string
  phone: string
  address: string
  city: string
  district: string
  postalCode: string
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  totalAmount: number
  shippingAddress: ShippingAddress
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentMethod: 'credit_card' | 'ecpay_cvs' | 'ecpay_atm' | 'paypal'
  orderStatus: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  trackingNumber?: string
  createdAt: string
  updatedAt: string
}

export interface CreateOrderRequest {
  items: OrderItem[]
  shippingAddress: ShippingAddress
  paymentMethod: Order['paymentMethod']
}

export interface OrderListParams {
  page?: number
  limit?: number
  status?: Order['orderStatus']
  paymentStatus?: Order['paymentStatus']
}

export interface OrderListResponse {
  data: Order[]
  total: number
  page: number
  limit: number
}

/**
 * 訂單 API 服務
 */
export const ordersApi = {
  /**
   * 創建訂單
   * TODO: 連接後台 API
   */
  async create(data: CreateOrderRequest): Promise<Order> {
    return apiClient.post<Order>('/api/orders', data)
  },

  /**
   * 獲取用戶訂單列表
   * TODO: 連接後台 API
   */
  async getList(params?: OrderListParams): Promise<OrderListResponse> {
    return apiClient.get<OrderListResponse>('/api/orders', params as Record<string, unknown>)
  },

  /**
   * 根據 ID 獲取訂單詳情
   * TODO: 連接後台 API
   */
  async getById(id: string): Promise<Order> {
    return apiClient.get<Order>(`/api/orders/${id}`)
  },

  /**
   * 取消訂單
   * TODO: 連接後台 API
   */
  async cancel(id: string): Promise<Order> {
    return apiClient.patch<Order>(`/api/orders/${id}/cancel`)
  },

  // === 以下為後台管理 API（未來實現）===

  /**
   * 獲取所有訂單（後台管理）
   * TODO: 連接後台 CMS API
   */
  async getAllOrders(params?: OrderListParams): Promise<OrderListResponse> {
    return apiClient.get<OrderListResponse>('/api/admin/orders', params as Record<string, unknown>)
  },

  /**
   * 更新訂單狀態（後台管理）
   * TODO: 連接後台 CMS API
   */
  async updateStatus(id: string, status: Order['orderStatus']): Promise<Order> {
    return apiClient.patch<Order>(`/api/admin/orders/${id}/status`, { status })
  },

  /**
   * 更新物流追蹤號碼（後台管理）
   * TODO: 連接後台 CMS API
   */
  async updateTracking(id: string, trackingNumber: string): Promise<Order> {
    return apiClient.patch<Order>(`/api/admin/orders/${id}/tracking`, { trackingNumber })
  },
}
