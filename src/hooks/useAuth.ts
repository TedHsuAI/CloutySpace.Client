import { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth 必須在 AuthProvider 內部使用')
  }
  return context
}

export default useAuth
