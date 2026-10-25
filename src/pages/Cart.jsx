import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import OrderSummary from '../components/OrderSummary'
import { getEligibleCoupons, useCart } from '../context/CartContext'

const Cart = () => {
  const {
    cart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    calculateGrandTotal,
  } = useCart()

  const subtotal = calculateGrandTotal()
  const [selectedCoupon, setSelectedCoupon] = useState(() => {
    const savedCoupon = sessionStorage.getItem('selectedCoupon')
    return savedCoupon ? JSON.parse(savedCoupon) : null
  })

  const eligibleCoupons = getEligibleCoupons(cart)
  const discountAmount = selectedCoupon ? subtotal * (selectedCoupon.discountPercent / 100) : 0

  useEffect(() => {
    if (selectedCoupon) {
      sessionStorage.setItem('selectedCoupon', JSON.stringify(selectedCoupon))
      return
    }

    sessionStorage.removeItem('selectedCoupon')
  }, [selectedCoupon])

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center pb-10">
        <div className="max-w-xl rounded-[2rem] border border-dashed border-orange-200 bg-white p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl dark:bg-slate-700">
            🛒
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-50">Your cart is empty</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Add some festive favorites before checking out.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-block rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            Explore products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-8 pb-10 lg:grid-cols-[1.4fr_0.8fr]">
      <section className="space-y-5">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-50">Your cart</h1>
          <button
            type="button"
            onClick={clearCart}
            className="text-sm font-semibold text-red-500 hover:text-red-600 dark:text-red-300"
          >
            Clear cart
          </button>
        </div>

        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            removeFromCart={removeFromCart}
          />
        ))}
      </section>

      <aside className="space-y-4">
        <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h2 className="text-xl font-black text-slate-900 dark:text-slate-50">Available coupons</h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Choose the discount based on your cart value and any combo pack added.
          </p>

          <div className="mt-4 space-y-2">
            {eligibleCoupons.length > 0 ? (
              eligibleCoupons.map((coupon) => (
                <button
                  key={coupon.code}
                  type="button"
                  onClick={() => setSelectedCoupon(coupon)}
                  className={`flex w-full items-center justify-between rounded-2xl border px-3 py-3 text-left transition ${
                    selectedCoupon?.code === coupon.code
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm dark:border-emerald-500 dark:bg-emerald-900/25 dark:text-emerald-200'
                      : 'border-orange-100 bg-white text-slate-700 hover:border-orange-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100'
                  }`}
                >
                  <span>
                    <span className="block text-sm font-bold">{coupon.label}</span>
                    <span className="text-xs">{coupon.code}</span>
                  </span>
                  <span className="text-xs font-bold">{coupon.discountPercent}% OFF</span>
                </button>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-orange-200 p-3 text-sm text-slate-600 dark:border-slate-600 dark:text-slate-300">
                No coupon is available for this cart right now.
              </div>
            )}
          </div>

          {selectedCoupon && (
            <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-sm font-semibold text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">
              Selected coupon: {selectedCoupon.label} • ₹{discountAmount.toFixed(0)} discount
            </div>
          )}
        </div>

        <OrderSummary
          cart={cart}
          subtotal={subtotal}
          discountAmount={discountAmount}
          buttonText="Continue to checkout"
        />
      </aside>
    </div>
  )
}

export default Cart
