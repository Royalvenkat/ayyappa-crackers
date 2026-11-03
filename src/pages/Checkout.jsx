import { useState } from 'react'
import { Link } from 'react-router-dom'
import CheckoutForm from '../components/CheckoutForm'
import OrderSummary from '../components/OrderSummary'
import { getAutoDiscount, useCart } from '../context/CartContext'

const SHOP_EMAIL = 'ayyappacrackers@gmail.com'
const WHATSAPP_RECIPIENT = '918801235761'
const ORDER_STORAGE_KEY = 'ayyappa_orders'

const formatMoney = (amount) => `₹${Number(amount || 0).toLocaleString('en-IN')}`
const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    }

    return entities[character]
  })

const loadSavedOrders = () => {
  try {
    const storedOrders = localStorage.getItem(ORDER_STORAGE_KEY)
    return storedOrders ? JSON.parse(storedOrders) : []
  } catch {
    return []
  }
}

const initialFormData = {
  name: '',
  phone: '',
  email: '',
  address: '',
  landmark: '',
  orderedOnBehalf: '',
  deliveryDate: '',
}

const Checkout = () => {
  const { cart, calculateGrandTotal, clearCart } = useCart()
  const [formData, setFormData] = useState(initialFormData)
  const [savedOrders, setSavedOrders] = useState(loadSavedOrders)

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center pb-10">
        <div className="max-w-xl rounded-[2rem] border border-dashed border-orange-200 bg-white p-10 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <h1 className="text-3xl font-black text-slate-900 dark:text-slate-50">Checkout is empty</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Please add items before placing your order.</p>
          <Link
            to="/products"
            className="mt-6 inline-block rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
          >
            Shop products
          </Link>
        </div>
      </div>
    )
  }

  const subtotal = calculateGrandTotal()
  const autoDiscount = getAutoDiscount(subtotal)
  const discountAmount = autoDiscount.amount
  const finalTotal = Math.max(0, subtotal - discountAmount)

  const handleChange = (event) => {
    const { name, value } = event.target
    const updatedValue = name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value
    setFormData((current) => ({ ...current, [name]: updatedValue }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const {
      name,
      phone,
      email,
      address,
      landmark,
      orderedOnBehalf,
      deliveryDate,
    } = formData

    if (!name.trim() || !phone.trim() || !address.trim() || !orderedOnBehalf || !deliveryDate) {
      alert('Please fill in all required details before submitting your order.')
      return
    }

    if (phone.replace(/\D/g, '').length !== 10) {
      alert('Please enter a valid 10-digit mobile number.')
      return
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.')
      return
    }

    const customerRows = [
      ['Name', name.trim()],
      ['Phone', phone],
      ['Email', email || 'Not provided'],
      ['Address', address],
      landmark?.trim() ? ['Landmark', landmark.trim()] : null,
      ['Order taken by', orderedOnBehalf],
      ['Delivery Date', deliveryDate],
    ]
      .filter(Boolean)
      .map(
        ([field, value]) =>
          `<tr><td>${escapeHtml(field)}</td><td>${escapeHtml(value)}</td></tr>`,
      )
      .join('')

    const itemRows = cart
      .map(
        (item) =>
          `<tr><td>${escapeHtml(item.name)}</td><td>${item.qty}</td><td>${formatMoney(item.price * item.qty)}</td></tr>`,
      )
      .join('')

    const orderText = `
      <h1>Ayyappa Crackers Order Confirmation</h1>
      <h2>Customer Details</h2>
      <table border="1">
        <thead><tr><th>Field</th><th>Value</th></tr></thead>
        <tbody>${customerRows}</tbody>
      </table>
      <h2>Order Items</h2>
      <table border="1">
        <thead><tr><th>Item</th><th>Qty</th><th>Amount</th></tr></thead>
        <tbody>${itemRows}</tbody>
      </table>
      <table border="1">
        <tbody>
          <tr><td>Subtotal</td><td>${formatMoney(subtotal)}</td></tr>
          <tr><td>Discount</td><td>${formatMoney(discountAmount)}</td></tr>
          <tr><td>Grand Total</td><td>${formatMoney(finalTotal)}</td></tr>
        </tbody>
      </table>
      <p>This order has been submitted successfully. Thank you for shopping with Ayyappa Crackers.</p>
    `

    const orderId = `AYP-${Date.now().toString().slice(-8)}`
    const orderRecord = {
      id: orderId,
      customerName: name.trim(),
      phone,
      email: email || 'Not provided',
      address,
      landmark: landmark?.trim() || 'Not provided',
      orderedOnBehalf,
      deliveryDate,
      subtotal,
      discountAmount,
      finalTotal,
      createdAt: new Date().toISOString(),
    }

    const updatedOrders = [orderRecord, ...savedOrders]
    setSavedOrders(updatedOrders)
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(updatedOrders))

    const whatsappItemLines = cart
      .map(
        (item) =>
          `- *${item.name}* | Qty: ${item.qty} | Amount: *${formatMoney(item.price * item.qty)}*`,
      )
      .join('\n')
    const cleanWhatsAppText = `Order Confirmation\nOrder ID: ${orderId}\n\nCustomer Details\nName: *${name.trim()}*\nMobile: *${phone}*\nEmail: ${email || 'Not provided'}\nAddress: ${address}\n${landmark?.trim() ? `Landmark: ${landmark.trim()}\n` : ''}Order taken by: *${orderedOnBehalf}*\nDelivery Date: ${deliveryDate}\n\nOrder Items\n${whatsappItemLines}\n\nSubtotal: *${formatMoney(subtotal)}*\nDiscount: *${formatMoney(discountAmount)}*\nGrand Total: *${formatMoney(finalTotal)}*`
    const whatsappUrl = `https://wa.me/${WHATSAPP_RECIPIENT}?text=${encodeURIComponent(cleanWhatsAppText)}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')

    const customerMailTo = email
      ? `mailto:${email}?subject=${encodeURIComponent('Your order is placed - Ayyappa Crackers')}&body=${encodeURIComponent(orderText)}`
      : null
    const shopMailTo = `mailto:${SHOP_EMAIL}?subject=${encodeURIComponent('New customer order - Ayyappa Crackers')}&body=${encodeURIComponent(orderText)}`

    if (customerMailTo) {
      window.open(customerMailTo, '_blank', 'noopener,noreferrer')
    }

    window.open(shopMailTo, '_blank', 'noopener,noreferrer')

    clearCart()
    setFormData(initialFormData)
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section>
          <h1 className="mb-6 text-3xl font-black text-slate-900 dark:text-slate-50">Checkout</h1>
          <CheckoutForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
        </section>

        <aside>
          <OrderSummary
            cart={cart}
            subtotal={subtotal}
            discountAmount={discountAmount}
            discountPercent={autoDiscount.percent}
            discountLabel={autoDiscount.label}
            nextTierMessage={
              autoDiscount.nextTier
                ? `Add ₹${autoDiscount.remainingToUnlock.toLocaleString('en-IN')} more to unlock ${autoDiscount.nextTier.percent}% off`
                : 'Best discount unlocked'
            }
            buttonText=""
          />
        </aside>
      </div>

      {savedOrders.length > 0 && (
        <section className="rounded-[2rem] border border-orange-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#B45309] dark:text-[#FFD54F]">Saved Orders</p>
              <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-slate-50">Order History</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-orange-200 text-left text-sm dark:divide-slate-700">
              <thead>
                <tr className="bg-orange-50 dark:bg-slate-900/60">
                  <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-100">Order ID</th>
                  <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-100">Customer</th>
                  <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-100">Order taken by</th>
                  <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-100">Phone</th>
                  <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-100">Date</th>
                  <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-100">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-100 dark:divide-slate-700">
                {savedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-orange-50/60 dark:hover:bg-slate-700/60">
                    <td className="px-4 py-3 font-bold text-[#B45309] dark:text-[#FFD54F]">{order.id}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{order.customerName}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{order.orderedOnBehalf || '—'}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{order.phone}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{order.deliveryDate}</td>
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">{formatMoney(order.finalTotal)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  )
}

export default Checkout
