import { formatCurrency } from '../utils/formatCurrency'

const CartItem = ({ item, increaseQuantity, decreaseQuantity, removeFromCart }) => (
  <div className="flex flex-col gap-4 rounded-2xl border border-orange-100 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p className="text-lg font-bold text-slate-900 dark:text-slate-50">{item.name}</p>
      <p className="text-sm text-slate-500 dark:text-slate-300">{item.category}</p>
      <p className="mt-2 text-base font-semibold text-orange-600 dark:text-[#FFD54F]">
        {formatCurrency(item.price)} each
      </p>
    </div>

    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-2 py-1 dark:border-slate-600 dark:bg-slate-700">
        <button
          type="button"
          className="h-8 w-8 rounded-full bg-white text-lg font-bold text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-100"
          onClick={() => decreaseQuantity(item.id)}
          aria-label={`Decrease quantity of ${item.name}`}
        >
          −
        </button>
        <span className="min-w-8 text-center text-base font-bold text-slate-800 dark:text-slate-100">{item.qty}</span>
        <button
          type="button"
          className="h-8 w-8 rounded-full bg-white text-lg font-bold text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-100"
          onClick={() => increaseQuantity(item.id)}
          aria-label={`Increase quantity of ${item.name}`}
        >
          +
        </button>
      </div>

      <div className="text-right">
        <p className="text-base font-bold text-slate-900 dark:text-slate-50">
          {formatCurrency(item.price * item.qty)}
        </p>
        <button
          type="button"
          onClick={() => removeFromCart(item.id)}
          className="mt-1 text-sm font-medium text-red-500 hover:text-red-600 dark:text-red-300"
        >
          Remove
        </button>
      </div>
    </div>
  </div>
)

export default CartItem
