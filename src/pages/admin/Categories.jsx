import { categories } from '../../data/categories'
import { products } from '../../data/products'

const AdminCategories = () => {
  const getProductCount = (categoryName) => {
    return products.filter(p => p.category === categoryName).length
  }

  return (
    <div className="container-fluid">
      <h2 className="mb-4">
        <i className="fas fa-tags me-2"></i>
        Categories Management
      </h2>

      <div className="admin-card">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th>ID</th>
                <th>Category Name</th>
                <th>Icon</th>
                <th>Products</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td><strong>{category.name}</strong></td>
                  <td>
                    <i className={`fas fa-${category.icon} text-primary`}></i>
                  </td>
                  <td>{getProductCount(category.name)} products</td>
                  <td>
                    <button className="btn btn-outline-primary btn-sm me-1">
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="btn btn-outline-danger btn-sm" disabled>
                      <i className="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminCategories
