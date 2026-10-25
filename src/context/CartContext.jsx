import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export const getEligibleCoupons = (cart = []) => {
  const subtotal = cart.reduce((total, item) => total + item.price * item.qty, 0)
  const coupons = []

  const pushCoupon = (code, label, discountPercent) => {
    coupons.push({ code, label, discountPercent })
  }

  if (subtotal < 1000) {
    pushCoupon('UNDER1K10', 'Under ₹1K 10%', 10)
  }

  if (subtotal > 2000) {
    pushCoupon('ABOVE2K15', 'Above ₹2K 15%', 15)
  }

  if (subtotal > 5000) {
    pushCoupon('ABOVE5K25', 'Above ₹5K 25%', 25)
  }

  if (subtotal > 25000) {
    pushCoupon('ABOVE25K35', 'Above ₹25K 35%', 35)
  }

  return coupons
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    const itemQty = Number(product.qty ?? 1)

    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id)

      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + itemQty } : item,
        )
      }

      return [...currentCart, { ...product, qty: itemQty }]
    })
  }

  const removeFromCart = (productId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId))
  }

  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId ? { ...item, qty: item.qty + 1 } : item,
      ),
    )
  }

  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId ? { ...item, qty: item.qty - 1 } : item,
        )
        .filter((item) => item.qty > 0),
    )
  }

  const clearCart = () => setCart([])

  const calculateGrandTotal = () =>
    cart.reduce((total, item) => total + item.price * item.qty, 0)

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      calculateGrandTotal,
    }),
    [cart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used inside CartProvider')
  }

  return context
}
