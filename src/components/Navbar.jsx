import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Products', to: '/products' },
  { label: 'Cart', to: '/cart' },
  { label: 'Checkout', to: '/checkout' },
]

const Navbar = () => {
  const { cart } = useCart()
  const itemCount = cart.reduce((total, item) => total + item.qty, 0)
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme')
    if (storedTheme) {
      return storedTheme
    }

    return 'dark'
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <header className="sticky top-0 z-50 border-b border-orange-200 bg-[#FFF8F0]/95 backdrop-blur transition-colors duration-300 dark:border-slate-700 dark:bg-[#0F172A]/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="AYYAPPA CRACKERS KATTEDAN home">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-xl shadow-md shadow-orange-200">
            🎇
          </div>
          <div>
            <p className="text-lg font-black tracking-tight text-orange-600">AYYAPPA</p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">Crackers</p>
          </div>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-slate-700 hover:bg-orange-100 hover:text-orange-600 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))}
            aria-label="Toggle light and dark mode"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-orange-200 bg-white text-lg text-orange-600 shadow-sm transition hover:border-orange-300 hover:bg-orange-50 dark:border-slate-600 dark:bg-slate-800 dark:text-[#FFD54F] dark:hover:bg-slate-700"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <Link
            to="/cart"
            className="relative inline-flex items-center justify-center rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-[#FF8A00] dark:text-slate-900 dark:hover:bg-[#FFC107]"
            aria-label="View cart"
          >
            Cart
            <span className="ml-2 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-orange-500 px-2 text-xs font-bold text-white dark:bg-[#E63946]">
              {itemCount}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar
