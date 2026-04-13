import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { TeaProduct } from '@/types/common'

const CART_STORAGE_KEY = 'cloutyspace_cart'

interface CartItem extends TeaProduct {
  quantity: number
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (product: TeaProduct) => void
  removeFromCart: (productKey: string, format?: string) => void
  isInCart: (product: TeaProduct) => boolean
  getTotalItems: () => number
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
  // Initialize cart from localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY)
      return storedCart ? JSON.parse(storedCart) : []
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error)
      return []
    }
  })

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems))
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error)
    }
  }, [cartItems])

  const addToCart = (product: TeaProduct) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => 
        item.key === product.key && item.format === product.format
      )
      
      if (existingItem) {
        return prev.map(item =>
          item.key === product.key && item.format === product.format
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        return [...prev, { ...product, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (productKey: string, format?: string) => {
    setCartItems(prev => 
      prev.filter(item => !(item.key === productKey && item.format === format))
    )
  }

  const isInCart = (product: TeaProduct) => {
    return cartItems.some(item => 
      item.key === product.key && item.format === product.format
    )
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const clearCart = () => {
    setCartItems([])
  }

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    isInCart,
    getTotalItems,
    clearCart
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
