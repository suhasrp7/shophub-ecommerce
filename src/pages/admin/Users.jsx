import { useState, useEffect } from 'react'
import { getAllUsers } from '../../data/users'
import { getOrdersByUser } from '../../data/orders'

const AdminUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    setUsers(getAllUsers())
  }, [])

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <div className="container-fluid">
      <h2 className="mb-4">
        <i className="fas fa-users me-2"></i>
        Users Management
      </h2>

      <div className="admin-card">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? users.map(user => (
                <tr key={user.id}>
                  <td>{user.id.substring(0, 8)}</td>
                  <td>
                    <strong>{user.name}</strong>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone || '-'}</td>
                  <td>
                    <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{formatDate(user.created_at)}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="text-center py-4">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminUsers
