import { Link } from 'react-router-dom'
import CartItem from '../components/CartItem'
import OrderSummary from '../components/OrderSummary'
import { AUTO_DISCOUNT_TIERS, getAutoDiscount, useCart } from '../context/CartContext'

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
  const autoDiscount = getAutoDiscount(subtotal)
  const discountAmount = autoDiscount.amount

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
          <h2 className="text-xl font-black text-slate-900 dark:text-slate-50">Auto discount</h2>
          <div className="mt-3 flex items-center gap-2 rounded-2xl border border-orange-200 bg-gradient-to-r from-[#fff7ed] to-[#ffedd5] p-3 text-sm font-semibold text-[#B45309] dark:border-slate-600 dark:from-slate-700 dark:to-slate-800 dark:text-[#FFD54F]">
            <span className="train-engine">🚂</span>
            <span>{autoDiscount.percent > 0 ? `${autoDiscount.percent}% discount active` : autoDiscount.label}</span>
          </div>

          <div className="discount-tier-track mt-4 text-sm">
            {AUTO_DISCOUNT_TIERS.map((tier) => {
              const isActive = subtotal >= tier.min

              return (
                <div key={tier.min} className="discount-tier-step">
                  <div className={`discount-tier-line ${isActive ? 'active' : ''}`} />
                  <div className={`discount-tier-dot ${isActive ? 'active' : ''}`}>
                    {tier.percent}%
                  </div>
                  <div className={`discount-tier-label ${isActive ? 'active' : ''}`}>
                    {tier.min >= 10000 ? '10K+' : tier.min >= 5000 ? '5K+' : '1K+'}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <OrderSummary
          cart={cart}
          subtotal={subtotal}
          discountAmount={discountAmount}
          discountPercent={autoDiscount.percent}
          discountLabel={autoDiscount.label}
          nextTierMessage={autoDiscount.nextTier ? `Add ₹${autoDiscount.remainingToUnlock.toLocaleString('en-IN')} more to unlock ${autoDiscount.nextTier.percent}% off` : 'Best discount unlocked'}
          buttonText="Continue to checkout"
        />
      </aside>
    </div>
  )
}

export default Cart
