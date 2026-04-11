import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllOrders, getTotalOrders, getTotalRevenue, getPendingOrdersCount } from '../../data/orders'
import { getAllUsers } from '../../data/users'
import { products } from '../../data/products'
import { formatOrderDate, getStatusBadgeClass } from '../../data/orders'

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    totalUsers: 0,
    pendingOrders: 0
  })
  const [recentOrders, setRecentOrders] = useState([])

  useEffect(() => {
    setStats({
      totalOrders: getTotalOrders(),
      totalRevenue: getTotalRevenue(),
      totalProducts: products.length,
      totalUsers: getAllUsers().length,
      pendingOrders: getPendingOrdersCount()
    })
    setRecentOrders(getAllOrders().slice(0, 5))
  }, [])

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  return (
    <div className="container-fluid">
      <h2 className="mb-4">
        <i className="fas fa-tachometer-alt me-2"></i>
        Dashboard
      </h2>

      <div className="row g-4 mb-4">
        <div className="col-md-6 col-lg-3">
          <div className="admin-card">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-muted mb-1">Total Revenue</p>
                <h3 className="mb-0 text-success">{formatPrice(stats.totalRevenue)}</h3>
              </div>
              <div className="icon success">
                <i className="fas fa-dollar-sign"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="admin-card">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-muted mb-1">Total Orders</p>
                <h3 className="mb-0">{stats.totalOrders}</h3>
              </div>
              <div className="icon primary">
                <i className="fas fa-shopping-bag"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="admin-card">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-muted mb-1">Products</p>
                <h3 className="mb-0">{stats.totalProducts}</h3>
              </div>
              <div className="icon warning">
                <i className="fas fa-box"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-3">
          <div className="admin-card">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p className="text-muted mb-1">Users</p>
                <h3 className="mb-0">{stats.totalUsers}</h3>
              </div>
              <div className="icon danger">
                <i className="fas fa-users"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="admin-card">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0">Recent Orders</h4>
              <Link to="/admin/orders" className="btn btn-outline-primary btn-sm">
                View All
              </Link>
            </div>
            
            {recentOrders.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map(order => (
                      <tr key={order.id}>
                        <td><strong>{order.id}</strong></td>
                        <td>{formatOrderDate(order.created_at)}</td>
                        <td>
                          <span className={`status-badge ${getStatusBadgeClass(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="fw-bold">{formatPrice(order.total_price)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-muted text-center py-4 mb-0">No orders yet</p>
            )}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="admin-card">
            <h4 className="mb-4">Quick Actions</h4>
            <div className="d-grid gap-2">
              <Link to="/admin/products/add" className="btn btn-primary">
                <i className="fas fa-plus me-2"></i>
                Add New Product
              </Link>
              <Link to="/admin/orders" className="btn btn-outline-primary">
                <i className="fas fa-shopping-bag me-2"></i>
                Manage Orders
              </Link>
              <Link to="/admin/users" className="btn btn-outline-primary">
                <i className="fas fa-users me-2"></i>
                View Users
              </Link>
            </div>
          </div>

          <div className="admin-card mt-4">
            <h4 className="mb-4">Order Status</h4>
            {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(status => (
              <div key={status} className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-capitalize">{status}</span>
                <span className="badge bg-secondary">
                  {getAllOrders().filter(o => o.status === status).length}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
