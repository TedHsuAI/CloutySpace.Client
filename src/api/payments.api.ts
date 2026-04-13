/**
 * 金流服務介面定義
 * 支援綠界（ECPay）和 PayPal
 * 目前僅定義接口，實際串接將於未來實現
 */

import { apiClient } from './client'

// ============= 通用類型定義 =============

export type PaymentProvider = 'ecpay' | 'paypal'

export type PaymentMethod = 
  | 'credit_card'      // 信用卡
  | 'ecpay_cvs'        // 綠界超商代碼繳費
  | 'ecpay_atm'        // 綠界 ATM 轉帳
  | 'ecpay_barcode'    // 綠界超商條碼繳費
  | 'paypal'           // PayPal

export type PaymentStatus = 
  | 'pending'          // 待付款
  | 'processing'       // 處理中
  | 'paid'             // 已付款
  | 'failed'           // 失敗
  | 'cancelled'        // 已取消
  | 'refunded'         // 已退款

export interface PaymentRequest {
  orderId: string
  amount: number
  currency: string
  provider: PaymentProvider
  method: PaymentMethod
  returnUrl: string
  notifyUrl: string
  description?: string
}

export interface PaymentResponse {
  transactionId: string
  status: PaymentStatus
  paymentUrl?: string      // 導向支付頁面的 URL
  formData?: Record<string, string>  // 用於 POST 表單的數據（ECPay）
  message?: string
}

export interface PaymentVerification {
  transactionId: string
  orderId: string
  amount: number
  status: PaymentStatus
  paidAt?: string
  provider: PaymentProvider
}

// ============= ECPay (綠界) 相關 =============

export interface ECPayConfig {
  merchantId: string
  hashKey: string
  hashIV: string
  paymentUrl: string      // 正式: https://payment.ecpay.com.tw/Cashier/AioCheckOut/V5
                          // 測試: https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5
}

export interface ECPayFormData {
  MerchantID: string
  MerchantTradeNo: string
  MerchantTradeDate: string
  PaymentType: string
  TotalAmount: string
  TradeDesc: string
  ItemName: string
  ReturnURL: string
  ChoosePayment: string
  CheckMacValue: string
  // 更多欄位參考綠界文檔
}

export interface ECPayCallbackData {
  MerchantID: string
  MerchantTradeNo: string
  StoreID?: string
  RtnCode: string          // 1 = 成功
  RtnMsg: string
  TradeNo: string
  TradeAmt: string
  PaymentDate: string
  PaymentType: string
  CheckMacValue: string
  // 更多欄位參考綠界文檔
}

// ============= PayPal 相關 =============

export interface PayPalConfig {
  clientId: string
  clientSecret: string
  mode: 'sandbox' | 'live'
}

export interface PayPalOrderResponse {
  id: string
  status: string
  links: Array<{
    href: string
    rel: string
    method: string
  }>
}

export interface PayPalCaptureResponse {
  id: string
  status: string
  purchase_units: Array<{
    payments: {
      captures: Array<{
        id: string
        status: string
        amount: {
          currency_code: string
          value: string
        }
      }>
    }
  }>
}

// ============= Payment API 服務 =============

/**
 * 金流 API 服務
 * TODO: 實際實現需在後端完成以保護敏感資訊（MerchantID, HashKey 等）
 */
export const paymentsApi = {
  /**
   * 創建支付交易
   * TODO: 連接後台 API，後端負責產生 ECPay CheckMacValue 或 PayPal Order
   */
  async createPayment(request: PaymentRequest): Promise<PaymentResponse> {
    return apiClient.post<PaymentResponse>('/api/payments/create', request)
  },

  /**
   * 驗證支付結果（ECPay 回調）
   * TODO: 後端接收綠界 ReturnURL 回調，驗證 CheckMacValue
   */
  async verifyECPayCallback(data: ECPayCallbackData): Promise<PaymentVerification> {
    return apiClient.post<PaymentVerification>('/api/payments/ecpay/verify', data)
  },

  /**
   * 創建 PayPal 訂單
   * TODO: 後端使用 PayPal SDK 創建訂單
   */
  async createPayPalOrder(orderId: string, amount: number): Promise<PayPalOrderResponse> {
    return apiClient.post<PayPalOrderResponse>('/api/payments/paypal/create-order', {
      orderId,
      amount,
    })
  },

  /**
   * 捕獲 PayPal 付款
   * TODO: 後端使用 PayPal SDK 捕獲已授權的付款
   */
  async capturePayPalOrder(paypalOrderId: string): Promise<PayPalCaptureResponse> {
    return apiClient.post<PayPalCaptureResponse>('/api/payments/paypal/capture', {
      orderID: paypalOrderId,
    })
  },

  /**
   * 查詢支付狀態
   * TODO: 連接後台 API
   */
  async getPaymentStatus(transactionId: string): Promise<PaymentVerification> {
    return apiClient.get<PaymentVerification>(`/api/payments/${transactionId}`)
  },

  /**
   * 申請退款
   * TODO: 連接後台 API，後端調用綠界或 PayPal 退款 API
   */
  async refund(transactionId: string, amount?: number): Promise<PaymentVerification> {
    return apiClient.post<PaymentVerification>(`/api/payments/${transactionId}/refund`, {
      amount,
    })
  },
}

// ============= 環境變數配置範例 =============

/**
 * .env 檔案需要添加以下環境變數：
 * 
 * # ECPay 綠界金流（測試環境）
 * VITE_ECPAY_MERCHANT_ID=2000132
 * VITE_ECPAY_HASH_KEY=5294y06JbISpM5x9
 * VITE_ECPAY_HASH_IV=v77hoKGq4kWxNNIS
 * VITE_ECPAY_PAYMENT_URL=https://payment-stage.ecpay.com.tw/Cashier/AioCheckOut/V5
 * 
 * # PayPal（Sandbox 測試環境）
 * VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
 * VITE_PAYPAL_MODE=sandbox
 * 
 * 注意：正式環境部署時，這些敏感資訊應該存放在後端環境變數中，
 * 前端僅接收後端處理過的安全數據。
 */
