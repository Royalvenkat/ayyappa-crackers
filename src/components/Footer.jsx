import { Link } from 'react-router-dom'

const Footer = () => (
  <footer className="border-t border-orange-200 bg-[#FFF8F0] transition-colors duration-300 dark:border-slate-700 dark:bg-[#0F172A]">
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-3 lg:px-8">
      <div>
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-amber-400 text-lg shadow-md shadow-orange-200">
            🎇
          </div>
          <div>
            <p className="text-lg font-black tracking-tight text-orange-600">AYYAPPA</p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-600 dark:text-slate-300">Crackers</p>
          </div>
        </div>
        <p className="max-w-sm text-sm leading-6 text-slate-600 dark:text-slate-300">
          Bright Moments • Festive Memories.
        </p>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-slate-800 dark:text-slate-100">
          Quick Links
        </h3>
        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <li>
            <Link to="/" className="transition hover:text-orange-600 dark:hover:text-[#FFD54F]">Home</Link>
          </li>
          <li>
            <Link to="/products" className="transition hover:text-orange-600 dark:hover:text-[#FFD54F]">Products</Link>
          </li>
          <li>
            <Link to="/cart" className="transition hover:text-orange-600 dark:hover:text-[#FFD54F]">Cart</Link>
          </li>
          <li>
            <Link to="/checkout" className="transition hover:text-orange-600 dark:hover:text-[#FFD54F]">Checkout</Link>
          </li>
        </ul>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-slate-800 dark:text-slate-100">
          Visit Us
        </h3>
        <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
          Festive shopping made easy.
          <br />
          Fast delivery and premium quality.
        </p>
      </div>
    </div>

    <div className="border-t border-orange-200 bg-orange-50 py-4 text-center text-sm text-slate-600 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
      © 2026 AYYAPPA CRACKERS KATTEDAN. All rights reserved.
    </div>
  </footer>
)

export default Footer
