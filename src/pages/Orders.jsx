import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getOrdersByUser, formatOrderDate, getStatusBadgeClass } from '../data/orders'

const Orders = () => {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)

  useEffect(() => {
    if (user) {
      setOrders(getOrdersByUser(user.id))
    }
  }, [user])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const handleViewDetails = (order) => {
    setSelectedOrder(order)
  }

  if (orders.length === 0) {
    return (
      <div className="container py-5 text-center">
        <i className="fas fa-shopping-bag fa-5x text-muted mb-4"></i>
        <h2>No orders yet</h2>
        <p className="text-muted mb-4">Start shopping to see your orders here!</p>
        <Link to="/products" className="btn btn-primary btn-lg">
          <i className="fas fa-shopping-bag me-2"></i>
          Start Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">
        <i className="fas fa-box me-2"></i>
        My Orders
      </h1>

      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
              <th>Items</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>
                  <strong className="text-primary">{order.id}</strong>
                </td>
                <td>{formatOrderDate(order.created_at)}</td>
                <td>
                  <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
                <td className="fw-bold">{formatPrice(order.total_price)}</td>
                <td>{order.items.length} item{order.items.length !== 1 ? 's' : ''}</td>
                <td>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleViewDetails(order)}
                    data-bs-toggle="modal"
                    data-bs-target="#orderModal"
                  >
                    <i className="fas fa-eye me-1"></i>
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="modal fade" id="orderModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            {selectedOrder && (
              <>
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">
                    <i className="fas fa-receipt me-2"></i>
                    Order {selectedOrder.id}
                  </h5>
                  <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h6>Order Information</h6>
                      <p className="mb-1"><strong>Date:</strong> {formatOrderDate(selectedOrder.created_at)}</p>
                      <p className="mb-1">
                        <strong>Status:</strong>{' '}
                        <span className={`status-badge ${getStatusBadgeClass(selectedOrder.status)}`}>
                          {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                        </span>
                      </p>
                      <p className="mb-1">
                        <strong>Payment:</strong> {selectedOrder.payment_method.toUpperCase()}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <h6>Shipping Address</h6>
                      <p className="text-muted mb-0">{selectedOrder.shipping_address}</p>
                    </div>
                  </div>

                  <h6>Order Items</h6>
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{formatPrice(item.price)}</td>
                          <td>{item.quantity}</td>
                          <td>{formatPrice(item.price * item.quantity)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan="3" className="text-end"><strong>Total:</strong></td>
                        <td><strong className="text-success">{formatPrice(selectedOrder.total_price)}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <Link to={`/order-confirmation/${selectedOrder.id}`} className="btn btn-primary">
                    <i className="fas fa-print me-2"></i>
                    View Full Details
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
