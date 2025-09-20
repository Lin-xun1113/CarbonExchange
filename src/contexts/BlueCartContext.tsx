import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface CartItem {
  id: number
  name: string
  price: number
  carbon: number
  quantity: number
  image: string
}

interface BlueCartContextType {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (itemId: number) => void
  updateCartQuantity: (itemId: number, quantity: number) => void
  clearCart: () => void
  getCartTotal: () => { totalPrice: number; totalCarbon: number }
}

const BlueCartContext = createContext<BlueCartContextType | undefined>(undefined)

export const BlueCartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('blueCartItems')
    return savedCart ? JSON.parse(savedCart) : []
  })

  // 保存购物车到localStorage
  useEffect(() => {
    localStorage.setItem('blueCartItems', JSON.stringify(cartItems))
  }, [cartItems])

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
    return cartItems.reduce((acc, item) => {
      return {
        totalPrice: acc.totalPrice + (item.price * item.carbon * item.quantity),
        totalCarbon: acc.totalCarbon + (item.carbon * item.quantity)
      }
    }, { totalPrice: 0, totalCarbon: 0 })
  }

  return (
    <BlueCartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      getCartTotal
    }}>
      {children}
    </BlueCartContext.Provider>
  )
}

export const useBlueCart = () => {
  const context = useContext(BlueCartContext)
  if (!context) {
    throw new Error('useBlueCart must be used within a BlueCartProvider')
  }
  return context
}
