import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getOrderById, formatOrderDate, getStatusBadgeClass } from '../data/orders'

const OrderConfirmation = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const orderData = getOrderById(id)
    setOrder(orderData)
  }, [id])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  if (!order) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <div className="success-icon mb-4">
          <i className="fas fa-check-circle fa-5x text-success"></i>
        </div>
        <h1 className="mb-3">Thank You for Your Order!</h1>
        <p className="lead text-muted">
          Your order has been placed successfully. You will receive an email confirmation shortly.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card mb-4">
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                <i className="fas fa-receipt me-2"></i>
                Order #{order.id}
              </h5>
              <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6 mb-4">
                  <h6 className="text-muted mb-2">Order Information</h6>
                  <p className="mb-1">
                    <i className="fas fa-calendar me-2 text-primary"></i>
                    <strong>Date:</strong> {formatOrderDate(order.created_at)}
                  </p>
                  <p className="mb-1">
                    <i className="fas fa-credit-card me-2 text-primary"></i>
                    <strong>Payment Method:</strong> {order.payment_method.toUpperCase()}
                  </p>
                </div>
                <div className="col-md-6 mb-4">
                  <h6 className="text-muted mb-2">Shipping Address</h6>
                  <p className="mb-0">
                    <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                    {order.shipping_address}
                  </p>
                </div>
              </div>

              <hr />

              <h6 className="text-muted mb-3">Order Items</h6>
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th className="text-center">Quantity</th>
                    <th className="text-end">Price</th>
                    <th className="text-end">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td className="text-center">{item.quantity}</td>
                      <td className="text-end">{formatPrice(item.price)}</td>
                      <td className="text-end">{formatPrice(item.price * item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-end">
                      <strong>Total:</strong>
                    </td>
                    <td className="text-end">
                      <strong className="text-success fs-5">{formatPrice(order.total_price)}</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          <div className="d-flex justify-content-between">
            <Link to="/orders" className="btn btn-outline-primary">
              <i className="fas fa-list me-2"></i>
              View All Orders
            </Link>
            <Link to="/products" className="btn btn-primary">
              <i className="fas fa-shopping-bag me-2"></i>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmation
