import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { categories, getCategorySlug, products } from '../data/products'

const CategoryPage = () => {
  const { slug } = useParams()

  const categoryName = categories.find((category) => getCategorySlug(category) === slug)

  const categoryProducts = products.filter(
    (product) => getCategorySlug(product.category) === slug,
  )

  if (!categoryName) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center pb-10">
        <div className="max-w-lg rounded-[2rem] border border-dashed border-orange-200 bg-white p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-50">Category not found</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">The requested cracker category does not exist.</p>
          <Link
            to="/"
            className="mt-6 inline-block rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            Back to home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-10">
      <section className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-orange-100 dark:border dark:border-slate-700 dark:bg-slate-800 dark:ring-slate-700 md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600">Category</p>
            <h1 className="mt-2 text-3xl font-black text-slate-900 dark:text-slate-50 md:text-4xl">{categoryName}</h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to="/products"
              className="rounded-full border border-orange-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-orange-300 hover:text-orange-600 dark:border-slate-600 dark:text-slate-200 dark:hover:border-slate-500 dark:hover:text-[#FFD54F]"
            >
              Browse products
            </Link>
            <Link
              to="/cart"
              className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-500 dark:bg-[#FF8A00] dark:text-slate-900 dark:hover:bg-[#FFC107]"
            >
              View cart
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-600 dark:text-[#FFD54F]">
            {categoryProducts.length} products
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default CategoryPage
