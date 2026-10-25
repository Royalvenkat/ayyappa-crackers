import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { categories, comboPacks, getCategorySlug } from '../data/products'

const categoryIcons = ['🎇', '✨', '🌼', '🌀', '💥', '🎁', '💣', '🚀', '🎊']

const Home = () => {
  const location = useLocation()
  const activeCategory = new URLSearchParams(location.search).get('category')
  const { addToCart } = useCart()
  const [animatedComboId, setAnimatedComboId] = useState(null)

  const handleAddCombo = (combo) => {
    addToCart({
      id: combo.id,
      name: combo.name,
      category: 'Combo Packs',
      price: combo.price,
      qty: 1,
      emoji: '🎁',
    })

    setAnimatedComboId(combo.id)
    window.setTimeout(() => setAnimatedComboId(null), 450)
  }

  return (
    <div className="space-y-12 pb-10">
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-[#FF6B00] via-[#FF8A1A] to-[#FFC107] p-8 text-white shadow-[0_18px_40px_rgba(255,107,0,0.22)] md:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.28),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.12),transparent_24%)]" />
        <div className="absolute -right-6 top-8 text-8xl opacity-20">🎉</div>
        <div className="absolute bottom-3 right-12 text-6xl opacity-25">🚀</div>
        <div className="relative grid gap-8 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
          <div>
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-orange-100">
              Bright Moments • Festive Memories
            </p>
            <h1 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
              AYYAPPA CRACKERS KATTEDAN
            </h1>
            <p className="mt-5 max-w-2xl text-base text-orange-50 md:text-lg">
              Explore festive celebrations with premium crackers, colorful combos, and trusted quality for every family moment.
            </p>
            <div className="mt-8">
              <Link
                to="/products"
                className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-slate-900"
              >
                Shop Now
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-xs rounded-[2rem] border border-white/30 bg-white/10 p-5 shadow-2xl backdrop-blur-sm">
              <div className="rounded-[1.8rem] bg-gradient-to-br from-[#fff7d6] via-[#ffe7bf] to-[#ffd2a8] p-4 text-center text-slate-900 shadow-inner">
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border-[6px] border-[#d4af37] bg-[radial-gradient(circle,_#fff3d6,_#ffc107_70%,_#ff8a1a)] text-4xl font-black tracking-[0.18em] text-[#5b2a00] shadow-[inset_0_0_16px_rgba(255,255,255,0.75)]">
                  A
                </div>
                <div className="mt-4 text-xs font-black uppercase tracking-[0.35em] text-[#7c2d12]">
                  Ayyappa
                </div>
                <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.28em] text-[#7c2d12]">
                  crackers • 2023
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-left text-sm font-bold">
                  <div className="rounded-2xl bg-white/60 p-3">Sparkles</div>
                  <div className="rounded-2xl bg-white/60 p-3">Rockets</div>
                  <div className="rounded-2xl bg-white/60 p-3">Bombs</div>
                  <div className="rounded-2xl bg-white/60 p-3">Wala</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600 dark:text-[#FFD54F]">Categories</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-slate-50">Browse by cracker type</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category, index) => {
            const categorySlug = getCategorySlug(category)
            const isSelected = activeCategory === categorySlug

            return (
              <Link
                key={category}
                to={`/products?category=${categorySlug}`}
                className={`group flex flex-col items-center gap-3 rounded-2xl border p-4 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  isSelected
                    ? 'border-[#FF6B00] bg-gradient-to-r from-[#FF6B00] to-[#FFC107] text-white shadow-[0_12px_25px_rgba(255,107,0,0.18)]'
                    : 'border-[#F7D7B4] bg-white hover:border-[#FFB35C] dark:border-slate-700 dark:bg-slate-800 dark:hover:border-[#FF8A00]'
                }`}
              >
                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl text-4xl shadow-inner transition duration-300 group-hover:scale-110 ${
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-gradient-to-br from-[#FFF1D6] to-[#FFD77A] text-slate-800'
                  }`}
                >
                  {categoryIcons[index]}
                </div>
                <span className={`text-xs font-bold uppercase tracking-[0.15em] ${isSelected ? 'text-white' : 'text-slate-700 dark:text-slate-200'}`}>
                  {category}
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      <section>
        <div className="mb-6">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600 dark:text-[#FFD54F]">Special Combo Packs</p>
          <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-slate-50">🎆 Special Combo Packs</h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {comboPacks.map((combo) => (
            <div key={combo.id} className="rounded-3xl border border-[#F7D7B4] bg-gradient-to-br from-[#FFF7ED] via-[#FFF3D0] to-[#FFE7B8] p-5 shadow-sm dark:border-slate-700 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#B45309] dark:text-[#FFD54F]">Combo Pack</p>
              <h3 className="mt-3 text-2xl font-black text-slate-900 dark:text-slate-50">{combo.name}</h3>
              <p className="mt-4 text-3xl font-black text-[#FF6B00] dark:text-[#FF8A00]">₹{combo.price.toLocaleString('en-IN')}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-200">
                {combo.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 inline-block h-2 w-2 rounded-full bg-orange-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => handleAddCombo(combo)}
                className={`mt-6 inline-flex rounded-full px-5 py-3 text-sm font-bold text-white transition hover:bg-[#E63946] ${
                  animatedComboId === combo.id
                    ? 'animate-[bounce_0.45s_ease-in-out] bg-[#16A34A] hover:bg-[#15803D]'
                    : 'bg-[#FF6B00]'
                }`}
              >
                {animatedComboId === combo.id ? 'Added ✓' : 'Add Combo'}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-[#F7D7B4] bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800 md:p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#B45309] dark:text-[#FFD54F]">Explore</p>
            <h2 className="mt-2 text-3xl font-black text-slate-900 dark:text-slate-50">Explore our crackers</h2>
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.5rem] bg-gradient-to-r from-[#FFF7ED] via-[#FFF3D0] to-[#FFE7B8] p-3 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900">
          <div className="marquee-track flex min-w-max gap-4">
            {[...categories, ...categories].map((category, index) => {
              const categorySlug = getCategorySlug(category)

              return (
                <Link
                  key={`${category}-${index}`}
                  to={`/products?category=${categorySlug}`}
                  className="flex w-[220px] items-center gap-3 rounded-2xl border border-[#F7D7B4] bg-white px-4 py-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-600 dark:bg-slate-800"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#FFF1D6] to-[#FFD77A] text-2xl">
                    {categoryIcons[index % categoryIcons.length]}
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#B45309] dark:text-[#FFD54F]">Category</p>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{category}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
