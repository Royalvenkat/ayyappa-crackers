const SearchBar = ({ value, onChange }) => (
  <label className="block">
    <span className="mb-2 block text-sm font-semibold text-slate-700">Search products</span>
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search crackers..."
      className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-base text-slate-800 shadow-sm outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
      aria-label="Search products"
    />
  </label>
)

export default SearchBar
