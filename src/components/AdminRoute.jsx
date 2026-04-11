import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const AdminRoute = () => {
  const { user, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!user || !isAdmin()) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="d-flex">
      <AdminSidebar />
      <div className="flex-grow-1 p-4" style={{ background: '#f8f9fa' }}>
        <Outlet />
      </div>
    </div>
  )
}

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar col-md-2 col-lg-2 d-none d-md-block">
      <div className="text-center mb-4">
        <h4 className="text-white">
          <i className="fas fa-user-shield me-2"></i>
          Admin
        </h4>
      </div>
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link" href="/admin">
            <i className="fas fa-tachometer-alt me-2"></i>
            Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin/products">
            <i className="fas fa-box me-2"></i>
            Products
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin/orders">
            <i className="fas fa-shopping-bag me-2"></i>
            Orders
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin/users">
            <i className="fas fa-users me-2"></i>
            Users
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin/categories">
            <i className="fas fa-tags me-2"></i>
            Categories
          </a>
        </li>
        <li className="nav-item mt-5">
          <a className="nav-link" href="/">
            <i className="fas fa-home me-2"></i>
            Back to Store
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/admin/login">
            <i className="fas fa-sign-out-alt me-2"></i>
            Logout
          </a>
        </li>
      </ul>
    </div>
  )
}

export default AdminRoute
