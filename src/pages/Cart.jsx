import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart()
  const { isAuthenticated } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      showToast('Please login to checkout', 'error')
      navigate('/login')
      return
    }
    navigate('/checkout')
  }

  if (cart.length === 0) {
    return (
      <div className="container py-5 text-center">
        <i className="fas fa-shopping-cart fa-5x text-muted mb-4"></i>
        <h2>Your cart is empty</h2>
        <p className="text-muted mb-4">Add some products to get started!</p>
        <Link to="/products" className="btn btn-primary btn-lg">
          <i className="fas fa-shopping-bag me-2"></i>
          Continue Shopping
        </Link>
      </div>
    )
  }

  const subtotal = getCartTotal()
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + shipping

  return (
    <div className="container py-5">
      <h1 className="mb-4">
        <i className="fas fa-shopping-cart me-2"></i>
        Shopping Cart
      </h1>

      <div className="row">
        <div className="col-lg-8">
          <div className="table-responsive">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th style={{ width: '100px' }}>Product</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item.product_id}>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="rounded"
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/80x80?text=No+Image'
                        }}
                      />
                    </td>
                    <td>
                      <Link to={`/product/${item.product_id}`} className="text-decoration-none text-dark">
                        <strong>{item.name}</strong>
                      </Link>
                      {item.stock === 0 && (
                        <div className="text-danger small">Out of Stock</div>
                      )}
                      {item.stock > 0 && item.stock <= 5 && (
                        <div className="text-warning small">Only {item.stock} left</div>
                      )}
                    </td>
                    <td>{formatPrice(item.price)}</td>
                    <td>
                      <div className="quantity-control">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <i className="fas fa-minus"></i>
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.product_id, parseInt(e.target.value) || 1)}
                          min="1"
                          max={item.stock}
                          style={{ width: '60px' }}
                        />
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                          disabled={item.quantity >= item.stock}
                        >
                          <i className="fas fa-plus"></i>
                        </button>
                      </div>
                    </td>
                    <td className="fw-bold">{formatPrice(item.price * item.quantity)}</td>
                    <td>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => {
                          removeFromCart(item.product_id)
                          showToast(`${item.name} removed from cart`, 'info')
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <Link to="/products" className="btn btn-outline-primary">
              <i className="fas fa-arrow-left me-2"></i>
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="order-summary">
            <h4>Order Summary</h4>
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Shipping</span>
              <span>
                {shipping === 0 ? (
                  <span className="text-success">FREE</span>
                ) : (
                  formatPrice(shipping)
                )}
              </span>
            </div>
            {subtotal < 50 && (
              <div className="alert alert-info small mb-2">
                <i className="fas fa-info-circle me-1"></i>
                Add {formatPrice(50 - subtotal)} more for free shipping!
              </div>
            )}
            <hr />
            <div className="d-flex justify-content-between mb-4">
              <strong>Total</strong>
              <strong className="text-success fs-5">{formatPrice(total)}</strong>
            </div>
            <button
              className="btn btn-primary btn-lg w-100"
              onClick={handleCheckout}
            >
              <i className="fas fa-lock me-2"></i>
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
