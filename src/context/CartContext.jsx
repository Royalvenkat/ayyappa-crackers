import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export const AUTO_DISCOUNT_TIERS = [
  { min: 1000, percent: 15, label: '₹1,000+ gets 15% off' },
  { min: 5000, percent: 20, label: '₹5,000+ gets 20% off' },
  { min: 10000, percent: 25, label: '₹10,000+ gets 25% off' },
]

export const getAutoDiscount = (cartOrSubtotal) => {
  const subtotal =
    typeof cartOrSubtotal === 'number'
      ? cartOrSubtotal
      : cartOrSubtotal.reduce((total, item) => total + item.price * item.qty, 0)

  const eligibleTier = [...AUTO_DISCOUNT_TIERS]
    .filter((tier) => subtotal >= tier.min)
    .sort((a, b) => b.min - a.min)[0]

  if (!eligibleTier) {
    const firstTier = AUTO_DISCOUNT_TIERS[0]
    const remaining = Math.max(0, firstTier.min - subtotal)
    return {
      percent: 0,
      amount: 0,
      label: `Add ₹${remaining.toLocaleString('en-IN')} more to unlock ${firstTier.percent}% off`,
      nextTier: firstTier,
      remainingToUnlock: remaining,
    }
  }

  const amount = subtotal * (eligibleTier.percent / 100)

  return {
    percent: eligibleTier.percent,
    amount,
    label: eligibleTier.label,
    nextTier: [...AUTO_DISCOUNT_TIERS].find((tier) => subtotal < tier.min) || null,
    remainingToUnlock: [...AUTO_DISCOUNT_TIERS].find((tier) => subtotal < tier.min)?.min
      ? Math.max(0, [...AUTO_DISCOUNT_TIERS].find((tier) => subtotal < tier.min).min - subtotal)
      : 0,
  }
}

export const getEligibleCoupons = (cart = []) => {
  const subtotal = cart.reduce((total, item) => total + item.price * item.qty, 0)
  return AUTO_DISCOUNT_TIERS.filter((tier) => subtotal >= tier.min).map((tier) => ({
    code: `AUTO-${tier.min}`,
    label: tier.label,
    discountPercent: tier.percent,
  }))
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
