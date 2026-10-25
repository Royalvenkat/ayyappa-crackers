const CheckoutForm = ({ formData, onChange, onSubmit }) => (
  <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-orange-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
    <div className="rounded-2xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm font-medium text-orange-700 dark:border-orange-500/50 dark:bg-orange-900/20 dark:text-orange-200">
      Delivery available only for Hyderabad locations. Delivery charges are extra and will be informed separately.
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Name</span>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={onChange}
          className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50 dark:placeholder:text-slate-300"
          aria-label="Customer name"
          required
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Mobile Number</span>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={onChange}
          className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50 dark:placeholder:text-slate-300"
          aria-label="Mobile number"
          required
        />
      </label>
    </div>

    <div className="grid gap-4 md:grid-cols-2">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Email</span>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50 dark:placeholder:text-slate-300"
          aria-label="Email"
          placeholder="Optional"
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Alternate Number</span>
        <input
          type="tel"
          name="alternatePhone"
          value={formData.alternatePhone}
          onChange={onChange}
          className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50 dark:placeholder:text-slate-300"
          aria-label="Alternate number"
          placeholder="Optional"
        />
      </label>
    </div>

    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Address</span>
      <textarea
        name="address"
        value={formData.address}
        onChange={onChange}
        rows="4"
        className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50 dark:placeholder:text-slate-300"
        aria-label="Delivery address"
        required
      />
    </label>

    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Landmark (Optional)</span>
      <input
        type="text"
        name="landmark"
        value={formData.landmark}
        onChange={onChange}
        className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50 dark:placeholder:text-slate-300"
        aria-label="Landmark"
        placeholder="Optional but recommended"
      />
    </label>

    <div className="grid gap-4 md:grid-cols-2">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Date</span>
        <input
          type="date"
          name="deliveryDate"
          value={formData.deliveryDate}
          onChange={onChange}
          className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50"
          aria-label="Delivery date"
          min={new Date().toISOString().split('T')[0]}
          required
        />
      </label>

      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">Time</span>
        <select
          name="deliverySlot"
          value={formData.deliverySlot}
          onChange={onChange}
          className="w-full rounded-2xl border border-orange-200 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-50"
          aria-label="Delivery time"
          required
        >
          <option value="">Select time</option>
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
      </label>
    </div>

    <button
      type="submit"
      className="w-full rounded-full bg-orange-500 px-5 py-3 text-base font-bold text-white transition hover:bg-orange-600"
    >
      Submit Order
    </button>
  </form>
)

export default CheckoutForm
