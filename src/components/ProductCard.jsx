import { useState } from 'react'
import { useCart } from '../context/CartContext'
import { formatCurrency } from '../utils/formatCurrency'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const handleAddToCart = () => {
    addToCart({ ...product, qty })
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-orange-100 bg-white p-4 shadow-sm transition hover:shadow-lg dark:border-slate-700 dark:bg-slate-800 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFE9C6] to-[#FFD77A] text-3xl shadow-inner">
          {product.emoji}
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B45309] dark:text-[#FFD54F]">{product.category}</p>
          <h3 className="mt-1 text-lg font-black text-slate-900 dark:text-slate-50">{product.name}</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">Qty: {product.quantity}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
        <div className="text-left md:text-right">
          <p className="text-sm text-slate-500 dark:text-slate-300">Price</p>
          <p className="text-2xl font-black text-slate-900 dark:text-slate-50">{formatCurrency(product.price)}</p>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-2 py-1.5 dark:border-slate-600 dark:bg-slate-700">
          <button
            type="button"
            onClick={() => setQty((current) => Math.max(1, current - 1))}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-bold text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-100"
            aria-label={`Decrease quantity for ${product.name}`}
          >
            −
          </button>
          <input
            type="number"
            min="1"
            value={qty}
            onChange={(event) => {
              const value = Number(event.target.value)
              setQty(Number.isFinite(value) && value > 0 ? value : 1)
            }}
            className="w-14 rounded-full border border-orange-200 bg-white px-2 py-1 text-center text-base font-bold text-slate-800 outline-none focus:border-orange-400 dark:border-slate-500 dark:bg-slate-800 dark:text-slate-100"
            aria-label={`Quantity for ${product.name}`}
          />
          <button
            type="button"
            onClick={() => setQty((current) => current + 1)}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg font-bold text-slate-700 shadow-sm dark:bg-slate-800 dark:text-slate-100"
            aria-label={`Increase quantity for ${product.name}`}
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className={`rounded-full px-5 py-3 text-sm font-bold text-white transition duration-200 ${
            added ? 'bg-[#0F9D58] hover:bg-[#0C8A4C]' : 'bg-[#FF6B00] hover:bg-[#E63946]'
          } ${added ? 'animate-[bounce_0.45s_ease-in-out]' : 'hover:scale-[1.02]'}`}
        >
          {added ? 'Added ✓' : 'Add to Cart'}
        </button>
      </div>

      {added && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 md:col-span-full dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-200">
          {product.name} added to cart
        </div>
      )}
    </article>
  )
}

export default ProductCard
