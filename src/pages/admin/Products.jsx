import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAllProducts, deleteProduct, getStockStatus } from '../../data/products'
import { useToast } from '../../context/ToastContext'

const Products = () => {
  const [productList, setProductList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const { showToast } = useToast()

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = () => {
    setProductList(getAllProducts())
  }

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteProduct(id)
      loadProducts()
      showToast('Product deleted successfully!', 'success')
    }
  }

  const filteredProducts = productList.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="fas fa-box me-2"></i>
          Products ({productList.length})
        </h2>
        <Link to="/admin/products/add" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>
          Add Product
        </Link>
      </div>

      <div className="admin-card mb-4">
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <select className="form-select">
              <option>All Categories</option>
              <option>Electronics</option>
              <option>Accessories</option>
              <option>Furniture</option>
              <option>Cameras</option>
              <option>Audio</option>
              <option>Gaming</option>
            </select>
          </div>
        </div>
      </div>

      <div className="admin-card">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th style={{ width: '70px' }}>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th style={{ width: '150px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => {
                const stockStatus = getStockStatus(product.stock)
                return (
                  <tr key={product.id}>
                    <td>
                      <img
                        src={product.images?.[0] || product.image}
                        alt={product.name}
                        className="rounded"
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/60x60?text=No'
                        }}
                      />
                    </td>
                    <td>
                      <strong>{product.name}</strong>
                    </td>
                    <td>{product.category}</td>
                    <td>{product.brand || '-'}</td>
                    <td className="fw-bold text-success">{formatPrice(product.price)}</td>
                    <td>{product.stock}</td>
                    <td>
                      <span className={`stock-badge ${stockStatus.class}`}>
                        {stockStatus.text}
                      </span>
                    </td>
                    <td>
                      <Link
                        to={`/admin/products/edit/${product.id}`}
                        className="btn btn-outline-primary btn-sm me-1"
                        title="Edit"
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
                      <button 
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(product.id, product.name)}
                        title="Delete"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                )
              })}
              {filteredProducts.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    <i className="fas fa-box fa-3x text-muted mb-3"></i>
                    <p className="text-muted">No products found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Products
