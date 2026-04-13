import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { authenticateWithGoogle } from '../services/authService'
import type { AuthResponse } from '../types/auth'

interface User {
  id: string
  userId: string
  email: string
  name: string
  userName: string
  picture?: string
  memberLevel: number
  isRegister: boolean
  lastLoginAt: string
  given_name?: string
  family_name?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (credential: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
  hasEverLoggedIn: boolean
  lastUserInfo: User | null
}



const AuthContext = createContext<AuthContextType | undefined>(undefined)

const TOKEN_KEY = 'cloutyspace_auth_token'
const USER_KEY = 'cloutyspace_user'
const LOGIN_HISTORY_KEY = 'cloutyspace_login_history'
const LAST_USER_KEY = 'cloutyspace_last_user'

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [hasEverLoggedIn, setHasEverLoggedIn] = useState(false)
  const [lastUserInfo, setLastUserInfo] = useState<User | null>(null)

  // 檢查 localStorage 中是否有儲存的認證資訊
  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY)
    const storedUser = localStorage.getItem(USER_KEY)
    const loginHistory = localStorage.getItem(LOGIN_HISTORY_KEY)
    const lastUser = localStorage.getItem(LAST_USER_KEY)

    // 檢查是否曾經登入過
    if (loginHistory === 'true') {
      setHasEverLoggedIn(true)
    }

    // 載入上次的用戶資訊
    if (lastUser) {
      try {
        setLastUserInfo(JSON.parse(lastUser))
      } catch (error) {
        console.error('Error parsing last user info:', error)
      }
    }

    if (storedToken && storedUser) {
      try {
        // 直接載入儲存的資料 (token 過期驗證交由後端處理)
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error loading stored auth data:', error)
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (credential: string) => {
    try {
      console.log('🔐 開始 Google 登入驗證...')
      
      // 呼叫後端 API 進行認證
      const response: AuthResponse = await authenticateWithGoogle(credential)
      
      console.log('✅ 後端認證成功:', response)
      
      // 組裝用戶資料
      const userData: User = {
        id: response.userId,
        userId: response.userId,
        email: response.email,
        name: response.name,
        userName: response.userName,
        picture: response.picture,
        memberLevel: response.memberLevel,
        isRegister: response.isRegister,
        lastLoginAt: response.lastLoginAt,
      }

      // 儲存到狀態
      setUser(userData)
      setToken(response.accessToken)
      setHasEverLoggedIn(true)
      setLastUserInfo(userData)

      // 儲存到 localStorage (儲存後端的 accessToken)
      localStorage.setItem(TOKEN_KEY, response.accessToken)
      localStorage.setItem(USER_KEY, JSON.stringify(userData))
      localStorage.setItem(LOGIN_HISTORY_KEY, 'true')
      localStorage.setItem(LAST_USER_KEY, JSON.stringify(userData))

      console.log('✅ 用戶登入成功:', userData)
      
      // 檢查是否為新註冊用戶
      if (!response.isRegister) {
        console.log('ℹ️ 偵測到新用戶，需要完成註冊流程')
        // TODO: 導向註冊頁面完成註冊流程
        // 目前註冊頁面尚未實作，先保留此邏輯
      }
    } catch (error) {
      console.error('❌ 登入失敗:', error)
      // 拋出錯誤讓呼叫端處理
      throw error
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    // 注意：登出時不清除登入歷史和上次用戶資訊，只清除當前的 token 和 user
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    console.log('用戶已登出')
  }

  const value: AuthContextType = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user,
    isLoading,
    hasEverLoggedIn,
    lastUserInfo,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext
