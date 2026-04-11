import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { createOrder } from '../data/orders'

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: '',
    city: '',
    state: '',
    zip: '',
    paymentMethod: 'cod'
  })
  const [processing, setProcessing] = useState(false)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const subtotal = getCartTotal()
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.street || !formData.city || !formData.state || !formData.zip) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    setProcessing(true)

    try {
      const order = createOrder({
        user_id: user.id,
        items: cart.map(item => ({
          product_id: item.product_id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total_price: total,
        shipping_address: `${formData.firstName} ${formData.lastName}, ${formData.street}, ${formData.city}, ${formData.state} ${formData.zip}`,
        payment_method: formData.paymentMethod
      })

      clearCart()
      showToast('Order placed successfully!', 'success')
      navigate(`/order-confirmation/${order.id}`)
    } catch (error) {
      showToast('Failed to place order. Please try again.', 'error')
    } finally {
      setProcessing(false)
    }
  }

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <i className="fas fa-shopping-cart fa-5x text-muted mb-4"></i>
        <h2>Your cart is empty</h2>
        <p className="text-muted mb-4">Add some products before checking out!</p>
        <button onClick={() => navigate('/products')} className="btn btn-primary btn-lg">
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="container py-4">
      <h1 className="h3 mb-4 border-bottom pb-3">
        <i className="fas fa-lock me-2"></i>
        Checkout
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-8">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-user me-2"></i>
                  Contact Information
                </h5>
              </div>
              <div className="card-body">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card mb-4">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-map-marker-alt me-2"></i>
                  Shipping Address
                </h5>
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">Street Address *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="street"
                    value={formData.street}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                    required
                  />
                </div>
                <div className="row g-3">
                  <div className="col-md-4">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">State *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label">ZIP Code *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="zip"
                      value={formData.zip}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h5 className="mb-0">
                  <i className="fas fa-wallet me-2"></i>
                  Payment Method
                </h5>
              </div>
              <div className="card-body">
                <div className="form-check mb-3 p-3 border rounded">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="cod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="cod">
                    <strong>Cash on Delivery (COD)</strong>
                    <p className="mb-0 text-muted small ms-4">Pay when you receive your order</p>
                  </label>
                </div>
                <div className="form-check mb-3 p-3 border rounded">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="card"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="card">
                    <strong>Credit/Debit Card</strong>
                    <p className="mb-0 text-muted small ms-4">Visa, Mastercard, American Express</p>
                  </label>
                </div>
                <div className="form-check p-3 border rounded">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="paypal"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="paypal">
                    <strong>PayPal</strong>
                    <p className="mb-0 text-muted small ms-4">Pay securely with your PayPal account</p>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="order-summary">
              <h4>Order Summary</h4>
              
              <div className="mb-3 pb-3 border-bottom">
                <p className="text-muted small mb-2">Items ({cart.reduce((sum, item) => sum + item.quantity, 0)}):</p>
                {cart.slice(0, 3).map(item => (
                  <div key={item.product_id} className="d-flex gap-2 mb-2">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/50x50?text=No'
                      }}
                    />
                    <div className="flex-grow-1">
                      <p className="mb-0 small" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {item.name}
                      </p>
                      <small className="text-muted">Qty: {item.quantity}</small>
                    </div>
                    <span className="small fw-bold">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
                {cart.length > 3 && (
                  <small className="text-muted">+ {cart.length - 3} more items</small>
                )}
              </div>
              
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-success fw-bold">FREE</span>
                  ) : (
                    formatPrice(shipping)
                  )}
                </span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Tax (8%)</span>
                <span>{formatPrice(tax)}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong className="text-success fs-5">{formatPrice(total)}</strong>
              </div>

              {subtotal < 50 && (
                <div className="alert alert-warning py-2 small mb-3">
                  Add {formatPrice(50 - subtotal)} more for FREE shipping!
                </div>
              )}

              <button
                type="submit"
                className="btn btn-warning w-100 py-2 mb-3"
                disabled={processing}
              >
                {processing ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-lock me-2"></i>
                    Place Order
                  </>
                )}
              </button>

              <div className="text-center small text-muted">
                <i className="fas fa-shield-alt me-1"></i>
                Your payment is secure and encrypted
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Checkout
