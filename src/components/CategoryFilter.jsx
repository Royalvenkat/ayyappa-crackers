const CategoryFilter = ({ categories, activeCategory, onSelect }) => (
  <div className="flex flex-wrap gap-2">
    {categories.map((category) => (
      <button
        key={category}
        type="button"
        onClick={() => onSelect(category)}
        className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
          activeCategory === category
            ? 'border-orange-500 bg-orange-500 text-white shadow-md'
            : 'border-orange-200 bg-white text-slate-700 hover:border-orange-300 hover:text-orange-600'
        }`}
      >
        {category}
      </button>
    ))}
  </div>
)

export default CategoryFilter
