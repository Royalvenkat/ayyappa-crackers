import { jsPDF } from 'jspdf'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import CheckoutForm from '../components/CheckoutForm'
import OrderSummary from '../components/OrderSummary'
import { useCart } from '../context/CartContext'

const SHOP_EMAIL = 'ayyappacrackers@gmail.com'
const ORDER_STORAGE_KEY = 'ayyappa_orders'

const formatMoney = (amount) => `₹${Number(amount || 0).toLocaleString('en-IN')}`

const loadSavedOrders = () => {
  try {
    const storedOrders = localStorage.getItem(ORDER_STORAGE_KEY)
    return storedOrders ? JSON.parse(storedOrders) : []
  } catch {
    return []
  }
}

const generateOrderPdf = ({ customerName, phone, email, alternatePhone, address, landmark, deliveryDate, deliverySlot, items, subtotal, discountAmount, finalTotal }) => {
  const pdf = new jsPDF()

  pdf.setFillColor(255, 244, 230)
  pdf.rect(0, 0, 210, 40, 'F')
  pdf.setTextColor(194, 65, 12)
  pdf.setFontSize(20)
  pdf.text('Ayyappa Crackers', 14, 20)
  pdf.setFontSize(11)
  pdf.setTextColor(31, 41, 55)
  pdf.text(`Order for: ${customerName}`, 14, 30)

  let y = 52
  const addLine = (label, value) => {
    pdf.setFont('helvetica', 'bold')
    pdf.text(`${label}:`, 14, y)
    pdf.setFont('helvetica', 'normal')
    pdf.text(String(value || 'Not provided'), 60, y)
    y += 8
  }

  addLine('Mobile', phone)
  addLine('Email', email || 'Not provided')
  addLine('Alternate', alternatePhone || 'Not provided')
  addLine('Delivery Date', deliveryDate)
  addLine('Time', deliverySlot)
  addLine('Landmark', landmark || 'Not provided')

  pdf.setFont('helvetica', 'bold')
  pdf.text('Address:', 14, y)
  y += 7
  pdf.setFont('helvetica', 'normal')
  const addressLines = pdf.splitTextToSize(address, 170)
  pdf.text(addressLines, 14, y)
  y += addressLines.length * 7 + 8

  pdf.setFont('helvetica', 'bold')
  pdf.text('Items', 14, y)
  y += 8

  items.forEach((item) => {
    const line = `${item.name} x ${item.qty} - ${formatMoney(item.price * item.qty)}`
    pdf.setFont('helvetica', 'normal')
    pdf.text(line, 14, y)
    y += 7
  })

  y += 6
  pdf.setFont('helvetica', 'bold')
  pdf.text('Subtotal:', 120, y)
  pdf.setFont('helvetica', 'normal')
  pdf.text(formatMoney(subtotal), 165, y)

  y += 8
  pdf.setFont('helvetica', 'bold')
  pdf.text('Discount:', 120, y)
  pdf.setFont('helvetica', 'normal')
  pdf.text(formatMoney(discountAmount), 165, y)

  y += 8
  pdf.setFont('helvetica', 'bold')
  pdf.text('Grand Total:', 120, y)
  pdf.setFont('helvetica', 'normal')
  pdf.text(formatMoney(finalTotal), 165, y)

  return pdf.output('datauristring')
}

const initialFormData = {
  name: '',
  phone: '',
  email: '',
  alternatePhone: '',
  address: '',
  landmark: '',
  deliveryDate: '',
  deliverySlot: '',
}

const Checkout = () => {
  const { cart, calculateGrandTotal, clearCart } = useCart()
  const [formData, setFormData] = useState(initialFormData)
  const [savedOrders, setSavedOrders] = useState(loadSavedOrders)
  const [selectedCoupon, setSelectedCoupon] = useState(() => {
    const savedCoupon = sessionStorage.getItem('selectedCoupon')
    return savedCoupon ? JSON.parse(savedCoupon) : null
  })

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
  const discountAmount = selectedCoupon ? subtotal * (selectedCoupon.discountPercent / 100) : 0
  const finalTotal = Math.max(0, subtotal - discountAmount)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const {
      name,
      phone,
      email,
      alternatePhone,
      address,
      landmark,
      deliveryDate,
      deliverySlot,
    } = formData

    if (!name.trim() || !phone.trim() || !address.trim() || !deliveryDate || !deliverySlot) {
      alert('Please fill in all required details before submitting your order.')
      return
    }

    if (phone.replace(/\D/g, '').length !== 10) {
      alert('Please enter a valid 10-digit mobile number.')
      return
    }

    if (alternatePhone && alternatePhone.replace(/\D/g, '').length !== 10) {
      alert('Please enter a valid 10-digit alternate number.')
      return
    }

    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Please enter a valid email address.')
      return
    }

    const lineItems = cart
      .map((item) => `${item.name} × ${item.qty} = ${formatMoney(item.price * item.qty)}`)
      .join('\n')

    const orderRows = cart
      .map((item) => `${item.name} | Qty: ${item.qty} | ${formatMoney(item.price * item.qty)}`)
      .join('\n')

    const landmarkText = landmark?.trim() ? `\nLandmark: ${landmark.trim()}` : ''
    const orderText = `Ayyappa Crackers Order Confirmation\n\nCustomer Name: ${name.trim()}\nMobile Number: ${phone}\nEmail: ${email || 'Not provided'}\nAlternate Number: ${alternatePhone || 'Not provided'}\nAddress: ${address}\n${landmarkText}\nDelivery Date: ${deliveryDate}\nTime: ${deliverySlot}\n\nOrder Items:\n${lineItems}\n\nSubtotal: ${formatMoney(subtotal)}\nDiscount: ${formatMoney(discountAmount)}\nGrand Total: ${formatMoney(finalTotal)}\n\nThis order has been submitted successfully. Thank you for shopping with Ayyappa Crackers.`

    const orderId = `AYP-${Date.now().toString().slice(-8)}`
    const pdfDataUrl = generateOrderPdf({
      customerName: name.trim(),
      phone,
      email,
      alternatePhone,
      address,
      landmark: landmark?.trim() || 'Not provided',
      deliveryDate,
      deliverySlot,
      items: cart,
      subtotal,
      discountAmount,
      finalTotal,
    })

    const orderRecord = {
      id: orderId,
      customerName: name.trim(),
      phone,
      email: email || 'Not provided',
      alternatePhone: alternatePhone || 'Not provided',
      address,
      landmark: landmark?.trim() || 'Not provided',
      deliveryDate,
      deliverySlot,
      subtotal,
      discountAmount,
      finalTotal,
      createdAt: new Date().toISOString(),
      pdf: pdfDataUrl,
    }

    const updatedOrders = [orderRecord, ...savedOrders]
    setSavedOrders(updatedOrders)
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(updatedOrders))

    const cleanWhatsAppText = `Order Confirmation\nOrder ID: ${orderId}\n\nCustomer: ${name.trim()}\nPhone: ${phone}\nEmail: ${email || 'Not provided'}\nAddress: ${address}\n${landmarkText}\nDelivery Date: ${deliveryDate}\nTime: ${deliverySlot}\n\nItem | Qty | Amount\n${orderRows}\n\nSubtotal: ${formatMoney(subtotal)}\nDiscount: ${formatMoney(discountAmount)}\nGrand Total: ${formatMoney(finalTotal)}`
    const whatsappUrl = `https://wa.me/8801235761?text=${encodeURIComponent(cleanWhatsAppText)}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')

    if (pdfDataUrl) {
      const pdfWindow = window.open(pdfDataUrl, '_blank', 'noopener,noreferrer')
      if (pdfWindow) {
        pdfWindow.focus()
      }

      const link = document.createElement('a')
      link.href = pdfDataUrl
      link.download = `Ayyappa-Crackers-Order-${orderId}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }

    const customerMailTo = email
      ? `mailto:${email}?subject=${encodeURIComponent('Your order is placed - Ayyappa Crackers')}&body=${encodeURIComponent(orderText)}`
      : null
    const shopMailTo = `mailto:${SHOP_EMAIL}?subject=${encodeURIComponent('New customer order - Ayyappa Crackers')}&body=${encodeURIComponent(orderText)}`

    if (customerMailTo) {
      window.open(customerMailTo, '_blank', 'noopener,noreferrer')
    }

    window.open(shopMailTo, '_blank', 'noopener,noreferrer')

    clearCart()
    sessionStorage.removeItem('selectedCoupon')
    setFormData(initialFormData)
    setSelectedCoupon(null)
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <section>
          <h1 className="mb-6 text-3xl font-black text-slate-900 dark:text-slate-50">Checkout</h1>
          <CheckoutForm formData={formData} onChange={handleChange} onSubmit={handleSubmit} />
        </section>

        <aside>
          <OrderSummary cart={cart} subtotal={subtotal} buttonText="" />
        </aside>
      </div>

      {savedOrders.length > 0 && (
        <section className="rounded-[2rem] border border-orange-100 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#B45309] dark:text-[#FFD54F]">Saved Orders</p>
              <h2 className="mt-2 text-2xl font-black text-slate-900 dark:text-slate-50">PDF Order Table</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-orange-200 text-left text-sm dark:divide-slate-700">
              <thead>
                <tr className="bg-orange-50 dark:bg-slate-900/60">
                  <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-100">Order ID</th>
                  <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-100">Customer</th>
                  <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-100">Phone</th>
                  <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-100">Date</th>
                  <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-100">Total</th>
                  <th className="px-4 py-3 font-bold text-slate-700 dark:text-slate-100">PDF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-100 dark:divide-slate-700">
                {savedOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-orange-50/60 dark:hover:bg-slate-700/60">
                    <td className="px-4 py-3 font-bold text-[#B45309] dark:text-[#FFD54F]">{order.id}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{order.customerName}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{order.phone}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-200">{order.deliveryDate}</td>
                    <td className="px-4 py-3 font-bold text-slate-900 dark:text-slate-100">{formatMoney(order.finalTotal)}</td>
                    <td className="px-4 py-3">
                      <a
                        href={order.pdf}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex rounded-full bg-[#FF6B00] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#E63946]"
                        download={`Ayyappa-Crackers-Order-${order.id}.pdf`}
                      >
                        Save PDF
                      </a>
                    </td>
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
