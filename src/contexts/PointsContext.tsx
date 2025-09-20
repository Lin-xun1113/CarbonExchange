import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CartItem {
  id: number
  name: string
  points: number
  icon: string
  quantity: number
}

interface PointsContextType {
  points: number
  addPoints: (amount: number, reason: string) => void
  deductPoints: (amount: number, reason: string) => void
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (itemId: number) => void
  updateCartQuantity: (itemId: number, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => number
  pointsHistory: { amount: number; reason: string; timestamp: Date; type: 'add' | 'deduct' }[]
}

const PointsContext = createContext<PointsContextType | undefined>(undefined)

export const PointsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [points, setPoints] = useState<number>(() => {
    // 从localStorage获取积分，如果没有则使用默认值5000
    const savedPoints = localStorage.getItem('userPoints')
    return savedPoints ? parseInt(savedPoints) : 5000
  })

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // 从localStorage获取购物车数据
    const savedCart = localStorage.getItem('cartItems')
    return savedCart ? JSON.parse(savedCart) : []
  })

  const [pointsHistory, setPointsHistory] = useState<{ amount: number; reason: string; timestamp: Date; type: 'add' | 'deduct' }[]>(() => {
    const savedHistory = localStorage.getItem('pointsHistory')
    return savedHistory ? JSON.parse(savedHistory).map((item: any) => ({
      ...item,
      timestamp: new Date(item.timestamp)
    })) : []
  })

  // 保存积分到localStorage
  useEffect(() => {
    localStorage.setItem('userPoints', points.toString())
  }, [points])

  // 保存购物车到localStorage
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  // 保存积分历史到localStorage
  useEffect(() => {
    localStorage.setItem('pointsHistory', JSON.stringify(pointsHistory))
  }, [pointsHistory])

  const addPoints = (amount: number, reason: string) => {
    setPoints(prev => prev + amount)
    setPointsHistory(prev => [...prev, {
      amount,
      reason,
      timestamp: new Date(),
      type: 'add'
    }])
  }

  const deductPoints = (amount: number, reason: string) => {
    if (points >= amount) {
      setPoints(prev => prev - amount)
      setPointsHistory(prev => [...prev, {
        amount,
        reason,
        timestamp: new Date(),
        type: 'deduct'
      }])
      return true
    }
    return false
  }

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id)
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId))
  }

  const updateCartQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      )
    }
  }

  const clearCart = () => {
    setCartItems([])
  }

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.points * item.quantity), 0)
  }

  return (
    <PointsContext.Provider value={{
      points,
      addPoints,
      deductPoints,
      cartItems,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      getCartTotal,
      pointsHistory
    }}>
      {children}
    </PointsContext.Provider>
  )
}

export const usePoints = () => {
  const context = useContext(PointsContext)
  if (!context) {
    throw new Error('usePoints must be used within a PointsProvider')
  }
  return context
}
