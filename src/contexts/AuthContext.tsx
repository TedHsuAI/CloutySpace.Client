import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { jwtDecode } from 'jwt-decode'

interface User {
  id: string
  email: string
  name: string
  picture?: string
  given_name?: string
  family_name?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  login: (credential: string) => void
  logout: () => void
  isAuthenticated: boolean
  isLoading: boolean
  hasEverLoggedIn: boolean
  lastUserInfo: User | null
}

interface GoogleJwtPayload {
  sub: string
  email: string
  name: string
  picture?: string
  given_name?: string
  family_name?: string
  exp: number
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
        // 驗證 token 是否過期
        const decodedToken = jwtDecode<GoogleJwtPayload>(storedToken)
        const currentTime = Date.now() / 1000

        if (decodedToken.exp && decodedToken.exp > currentTime) {
          setToken(storedToken)
          setUser(JSON.parse(storedUser))
        } else {
          // Token 過期，清除儲存的資料
          localStorage.removeItem(TOKEN_KEY)
          localStorage.removeItem(USER_KEY)
        }
      } catch (error) {
        console.error('Error validating stored token:', error)
        localStorage.removeItem(TOKEN_KEY)
        localStorage.removeItem(USER_KEY)
      }
    }
    setIsLoading(false)
  }, [])

  const login = (credential: string) => {
    try {
      let decodedToken: GoogleJwtPayload
      
      // 檢查是否為自訂的 base64 編碼格式
      try {
        // 嘗試解碼 base64 和 URI 編碼
        const decodedBase64 = atob(credential)
        const decodedURI = decodeURIComponent(decodedBase64)
        const parsed = JSON.parse(decodedURI)
        decodedToken = parsed
        console.log('使用自訂編碼格式解碼成功')
      } catch {
        try {
          // 嘗試直接 base64 解碼
          const decodedBase64 = atob(credential)
          const parsed = JSON.parse(decodedBase64)
          decodedToken = parsed
          console.log('使用簡單 base64 解碼成功')
        } catch {
          try {
            // 嘗試直接 JSON 解析
            const parsed = JSON.parse(credential)
            decodedToken = parsed
            console.log('使用直接 JSON 解析成功')
          } catch {
            // 最後嘗試作為 JWT 解碼
            decodedToken = jwtDecode<GoogleJwtPayload>(credential)
            console.log('使用 JWT 解碼成功')
          }
        }
      }
      
      // 提取用戶資訊
      const userData: User = {
        id: decodedToken.sub,
        email: decodedToken.email,
        name: decodedToken.name,
        picture: decodedToken.picture,
        given_name: decodedToken.given_name,
        family_name: decodedToken.family_name,
      }

      // 儲存到狀態
      setUser(userData)
      setToken(credential)
      setHasEverLoggedIn(true)
      setLastUserInfo(userData)

      // 儲存到 localStorage
      localStorage.setItem(TOKEN_KEY, credential)
      localStorage.setItem(USER_KEY, JSON.stringify(userData))
      localStorage.setItem(LOGIN_HISTORY_KEY, 'true')
      localStorage.setItem(LAST_USER_KEY, JSON.stringify(userData))

      console.log('用戶登入成功:', userData)
    } catch (error) {
      console.error('登入失敗:', error)
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
