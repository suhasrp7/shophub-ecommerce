import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products, getProductsByCategory, searchProducts } from '../data/products'
import { categories } from '../data/categories'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const category = searchParams.get('category') || 'all'
    const search = searchParams.get('search') || ''
    
    setSelectedCategory(category)
    setSearchQuery(search)
    
    let result = products
    
    if (search) {
      result = searchProducts(search)
    } else if (category !== 'all') {
      result = getProductsByCategory(category)
    }
    
    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        result = [...result].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    }
    
    setFilteredProducts(result)
  }, [searchParams, sortBy])

  const handleCategoryChange = (category) => {
    setSelectedCategory(category)
    const params = {}
    if (category !== 'all') params.category = category
    if (searchQuery) params.search = searchQuery
    setSearchParams(params)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    const params = {}
    if (searchQuery) params.search = searchQuery
    if (selectedCategory !== 'all') params.category = selectedCategory
    setSearchParams(params)
  }

  return (
    <div className="container py-5">
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="mb-4">
            <i className="fas fa-th me-2"></i>
            {searchQuery ? `Search Results for "${searchQuery}"` : 'All Products'}
          </h1>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-3 mb-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Categories</h5>
              <div className="d-flex flex-column gap-2">
                <label 
                  className={`category-filter ${selectedCategory === 'all' ? 'active' : ''}`}
                  style={{ cursor: 'pointer' }}
                >
                  <input
                    type="radio"
                    name="category"
                    value="all"
                    checked={selectedCategory === 'all'}
                    onChange={() => handleCategoryChange('all')}
                    className="me-2"
                  />
                  All Products
                </label>
                {categories.map(cat => (
                  <label 
                    key={cat.id}
                    className={`category-filter ${selectedCategory === cat.name ? 'active' : ''}`}
                    style={{ cursor: 'pointer' }}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={cat.name}
                      checked={selectedCategory === cat.name}
                      onChange={() => handleCategoryChange(cat.name)}
                      className="me-2"
                    />
                    {cat.name}
                  </label>
                ))}
              </div>

              <hr />

              <h5 className="card-title mb-3">Sort By</h5>
              <select 
                className="form-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>
          </div>
        </div>

        <div className="col-lg-9">
          <div className="row mb-4">
            <div className="col-md-8">
              <form onSubmit={handleSearch}>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button className="btn btn-primary" type="submit">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
            </div>
            <div className="col-md-4 text-end">
              <span className="text-muted">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </span>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="row g-4">
              {filteredProducts.map(product => (
                <div key={product.id} className="col-md-6 col-lg-4">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-5">
              <i className="fas fa-search fa-4x text-muted mb-3"></i>
              <h3 className="text-muted">No products found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Products
