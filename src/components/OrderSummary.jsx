import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/formatCurrency'

const OrderSummary = ({
  cart,
  subtotal,
  discountAmount = 0,
  discountPercent = 0,
  discountLabel = '',
  nextTierMessage = '',
  buttonText = 'Continue to checkout',
}) => {
  const grandTotal = Math.max(0, subtotal - discountAmount)
  const hasDiscount = discountAmount > 0

  return (
    <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h2 className="text-xl font-black text-slate-900 dark:text-slate-50">Order summary</h2>

      <div className="mt-4 rounded-2xl border border-orange-200 bg-gradient-to-r from-[#fff7ed] to-[#ffedd5] p-3 dark:border-slate-600 dark:from-slate-700 dark:to-slate-800">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#B45309] dark:text-[#FFD54F]">
          <span className="train-engine">🚂</span>
          <span>Auto discount</span>
        </div>

        <p className="mt-2 text-sm font-semibold text-slate-700 dark:text-slate-100">
          {hasDiscount
            ? `${discountPercent}% auto discount applied`
            : nextTierMessage || (discountLabel || 'Add ₹1,000 to unlock 10% off')}
        </p>
      </div>

      <div className="mt-5 space-y-3">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-300">
            <span>
              {item.name} × {item.qty}
            </span>
            <span>{formatCurrency(item.price * item.qty)}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 border-t border-orange-100 pt-4 dark:border-slate-700">
        <div className="flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
          <span>Order summary</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="mt-2 flex items-center justify-between text-sm text-emerald-600 dark:text-emerald-300">
            <span>Discount</span>
            <span>-{formatCurrency(discountAmount)}</span>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between text-lg font-black text-slate-900 dark:text-slate-50">
          <span>Total</span>
          <span>{formatCurrency(grandTotal)}</span>
        </div>
      </div>

      {buttonText && (
        <Link
          to="/checkout"
          className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#FF6B00] px-5 py-3 text-base font-semibold text-white transition hover:bg-[#E63946]"
        >
          {buttonText}
        </Link>
      )}
    </div>
  )
}

export default OrderSummary
