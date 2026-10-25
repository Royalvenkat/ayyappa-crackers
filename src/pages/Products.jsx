import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { categories, comboPacks, getCategorySlug, products } from '../data/products'

const Products = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState('Red Bijili')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const categoryFromUrl = new URLSearchParams(location.search).get('category')

    if (!categoryFromUrl) {
      setSelectedCategory('Red Bijili')
      return
    }

    const match = categories.find((category) => getCategorySlug(category) === categoryFromUrl)
    setSelectedCategory(match || 'Red Bijili')
  }, [location.search])

  const allProducts = products

  const isComboCategory = selectedCategory === 'Combo Packs'

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    if (isComboCategory) {
      if (!normalizedSearch) {
        return comboPacks
      }

      return comboPacks.filter((combo) => {
        const comboText = `${combo.name} ${combo.includes.join(' ')}`.toLowerCase()
        return comboText.includes(normalizedSearch)
      })
    }

    if (normalizedSearch) {
      return allProducts.filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(normalizedSearch) ||
          product.category.toLowerCase().includes(normalizedSearch)

        return matchesSearch
      })
    }

    return allProducts.filter((product) => product.category === selectedCategory)
  }, [allProducts, isComboCategory, searchTerm, selectedCategory])

  const featuredProducts = isComboCategory ? comboPacks : allProducts.filter((product) => product.category === selectedCategory)

  const exploreProducts = allProducts
    .filter((product) => product.category !== selectedCategory)
    .slice(0, 6)

  const handleCategoryChange = (value) => {
    setSelectedCategory(value)

    const slug = getCategorySlug(value)
    navigate(`/products?category=${slug}`)
  }

  const filterOptions = categories

  return (
    <div className="space-y-8 pb-10">
      <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-[#F7D7B4] dark:border dark:border-slate-700 dark:bg-slate-800 md:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#B45309] dark:text-[#FFD54F]">Products</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-slate-50 md:text-4xl">
              Discover festive crackers
            </h1>
          </div>

          <div className="w-full max-w-md">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Search</span>
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search across all categories"
                className="w-full rounded-2xl border border-[#F7D7B4] bg-white px-4 py-3 text-base text-slate-800 outline-none transition focus:border-[#FF6B00] focus:ring-4 focus:ring-[#FFE1B5] dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50 dark:placeholder:text-slate-300"
              />
            </label>
          </div>
        </div>

        <div className="mt-5">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Category Filter</span>
            <select
              value={selectedCategory}
              onChange={(event) => handleCategoryChange(event.target.value)}
              className="w-full rounded-2xl border border-[#F7D7B4] bg-white px-4 py-3 text-base text-slate-800 outline-none transition focus:border-[#FF6B00] focus:ring-4 focus:ring-[#FFE1B5] dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50 md:max-w-xs"
            >
              {filterOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => handleCategoryChange(option)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                selectedCategory === option
                  ? 'bg-[#FF6B00] text-white shadow-md'
                  : 'border border-[#F7D7B4] bg-white text-slate-700 hover:border-[#FFB35C] hover:text-[#B45309] dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:hover:border-[#FF8A00] dark:hover:text-[#FFD54F]'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </section>

      {!searchTerm && (
        <section>
          <div className="mb-5">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#B45309] dark:text-[#FFD54F]">Featured Category</p>
            <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-slate-50">
              {isComboCategory ? 'Combo Packs' : `${selectedCategory} Products`}
            </h2>
          </div>
          <div className="space-y-4">
            {isComboCategory
              ? comboPacks.map((combo) => (
                  <div key={combo.id} className="rounded-[1.8rem] border border-orange-200 bg-gradient-to-br from-[#FFF7ED] via-[#FFF3D0] to-[#FFE7B8] p-5 shadow-sm dark:border-slate-700 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B45309] dark:text-[#FFD54F]">Combo Pack</p>
                        <h3 className="mt-2 text-2xl font-black text-slate-900 dark:text-slate-50">{combo.name}</h3>
                        <p className="mt-3 text-3xl font-black text-[#FF6B00] dark:text-[#FF8A00]">₹{combo.price.toLocaleString('en-IN')}</p>
                      </div>
                      <button
                        type="button"
                        className="rounded-full bg-[#FF6B00] px-5 py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#E63946]"
                      >
                        Add Combo
                      </button>
                    </div>
                    <ul className="mt-4 grid gap-2 text-sm text-slate-700 dark:text-slate-200 md:grid-cols-2">
                      {combo.includes.map((item) => (
                        <li key={item} className="rounded-2xl border border-orange-100 bg-white/60 px-3 py-2 dark:border-slate-600 dark:bg-slate-700/60">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              : featuredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>
      )}

      {!searchTerm && (
        <section className="rounded-[2rem] border border-[#F7D7B4] bg-gradient-to-br from-[#FFF7ED] via-[#FFF3D0] to-[#FFE7B8] p-5 dark:border-slate-700 dark:from-slate-800 dark:via-slate-800 dark:to-slate-900 md:p-6">
          <div className="mb-5">
            <h2 className="text-2xl font-black text-slate-900 dark:text-slate-50">Explore More Categories</h2>
          </div>

          <div className="overflow-hidden">
            <div className="marquee-track flex min-w-max gap-4 md:gap-5">
              {[...exploreProducts, ...exploreProducts].map((product, index) => (
                <div
                  key={`${product.id}-${index}`}
                  className="w-[260px] rounded-[1.5rem] border border-[#F7D7B4] bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-600 dark:bg-slate-800 md:w-[280px]"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-200 to-amber-200 text-2xl">
                      {product.emoji}
                    </div>
                    <span className="rounded-full bg-[#FFF3D5] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B45309] dark:bg-slate-700 dark:text-[#FFD54F]">
                      {product.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 dark:text-slate-50">{product.name}</h3>
                  <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">Qty: {product.quantity}</p>
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="text-xl font-black text-slate-900 dark:text-slate-50">₹{product.price}</span>
                    <button
                      type="button"
                      className="rounded-full bg-[#FF6B00] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#E63946]"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {searchTerm ? (
        <section>
          <div className="mb-5">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600 dark:text-[#FFD54F]">
              {filteredProducts.length} results
            </p>
            <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-slate-50">Search results</h2>
          </div>
          {filteredProducts.length > 0 ? (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl border border-dashed border-orange-200 bg-white p-10 text-center dark:border-slate-600 dark:bg-slate-800">
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-50">No products found</h3>
              <p className="mt-2 text-slate-600 dark:text-slate-300">Try another search term or choose a different category.</p>
            </div>
          )}
        </section>
      ) : null}
    </div>
  )
}

export default Products
