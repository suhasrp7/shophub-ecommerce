import { useState, useEffect } from 'react'
import { getAllOrders, updateOrderStatus, formatOrderDate, getStatusBadgeClass } from '../../data/orders'
import { useToast } from '../../context/ToastContext'

const AdminOrders = () => {
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const { showToast } = useToast()

  useEffect(() => {
    setOrders(getAllOrders())
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus)
    setOrders(getAllOrders())
    showToast(`Order status updated to ${newStatus}`, 'success')
  }

  return (
    <div className="container-fluid">
      <h2 className="mb-4">
        <i className="fas fa-shopping-bag me-2"></i>
        Orders Management
      </h2>

      <div className="admin-card">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? orders.map(order => (
                <tr key={order.id}>
                  <td><strong>{order.id}</strong></td>
                  <td>{formatOrderDate(order.created_at)}</td>
                  <td>{order.items.length}</td>
                  <td className="fw-bold text-success">{formatPrice(order.total_price)}</td>
                  <td className="text-uppercase">{order.payment_method}</td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      style={{ width: '130px' }}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => setSelectedOrder(order)}
                      data-bs-toggle="modal"
                      data-bs-target="#orderModal"
                    >
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">No orders yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="modal fade" id="orderModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            {selectedOrder && (
              <>
                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">Order #{selectedOrder.id}</h5>
                  <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h6>Order Information</h6>
                      <p className="mb-1"><strong>Date:</strong> {formatOrderDate(selectedOrder.created_at)}</p>
                      <p className="mb-1"><strong>Payment:</strong> {selectedOrder.payment_method.toUpperCase()}</p>
                      <p className="mb-1">
                        <strong>Status:</strong>{' '}
                        <span className={`status-badge ${getStatusBadgeClass(selectedOrder.status)}`}>
                          {selectedOrder.status}
                        </span>
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
                        <td><strong>{formatPrice(selectedOrder.total_price)}</strong></td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOrders
