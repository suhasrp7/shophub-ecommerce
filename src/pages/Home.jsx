import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { getFeaturedProducts } from '../data/products'
import { categories, getCategoryIcon } from '../data/categories'

const Home = () => {
  const featuredProducts = getFeaturedProducts()

  return (
    <>
      <section className="hero-section text-center">
        <div className="container position-relative">
          <h1 className="mb-3">Welcome to ShopHub</h1>
          <p className="lead mb-4" style={{ color: '#fbbf24' }}>Discover millions of products at great prices</p>
          <Link to="/products" className="btn btn-warning btn-lg">
            <i className="fas fa-shopping-bag me-2"></i>
            Shop Now
          </Link>
        </div>
      </section>

      <div className="container">
        <section className="py-4">
          <h2 className="h5 mb-4 fw-bold">
            <i className="fas fa-th-large me-2"></i>
            Shop by Category
          </h2>
          <div className="row g-3">
            {categories.map(category => (
              <div key={category.id} className="col-4 col-md-2">
                <Link to={`/products?category=${category.name}`} className="text-decoration-none">
                  <div className="category-card p-3 text-center">
                    <i className={`fas ${getCategoryIcon(category.icon)} mb-2`} style={{ fontSize: '2rem', color: 'var(--primary-color)' }}></i>
                    <h6 className="mb-1" style={{ fontSize: '12px' }}>{category.name}</h6>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h5 fw-bold mb-0">
              <i className="fas fa-fire me-2 text-warning"></i>
              Featured Products
            </h2>
            <Link to="/products" className="btn btn-sm btn-outline-primary">
              See more <i className="fas fa-chevron-right ms-1"></i>
            </Link>
          </div>
          <div className="row g-3">
            {featuredProducts.map(product => (
              <div key={product.id} className="col-6 col-md-3 col-lg-3">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        <section className="py-4">
          <h2 className="h5 fw-bold mb-4">
            <i className="fas fa-star me-2 text-warning"></i>
            Best Sellers
          </h2>
          <div className="row g-3">
            {featuredProducts.slice(0, 4).map(product => (
              <div key={product.id} className="col-6 col-md-3">
                <Link to={`/product/${product.id}`} className="text-decoration-none">
                  <div className="d-flex gap-3 p-3 bg-white rounded" style={{ border: '1px solid #d5d9d9' }}>
                    <img 
                      src={product.images?.[0] || product.image} 
                      alt={product.name}
                      style={{ width: '80px', height: '80px', objectFit: 'contain' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/80x80?text=No'
                      }}
                    />
                    <div>
                      <h6 className="mb-1 text-dark" style={{ fontSize: '13px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {product.name}
                      </h6>
                      <div className="text-warning small mb-1">
                        {'★'.repeat(Math.round(product.rating || 4))}
                        <span className="text-muted ms-1">({product.reviewCount || 0})</span>
                      </div>
                      <span className="fw-bold text-success">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="py-4">
          <h2 className="h5 fw-bold mb-4">
            <i className="fas fa-bolt me-2 text-warning"></i>
            Deals Under $200
          </h2>
          <div className="row g-3">
            {featuredProducts.filter(p => p.price < 200).slice(0, 4).map(product => (
              <div key={product.id} className="col-6 col-md-3">
                <Link to={`/product/${product.id}`} className="text-decoration-none">
                  <div className="product-card">
                    <img 
                      src={product.images?.[0] || product.image} 
                      alt={product.name}
                      className="card-img-top"
                      style={{ height: '180px', objectFit: 'contain' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x180?text=No'
                      }}
                    />
                    <div className="card-body p-3">
                      <span className="badge bg-danger mb-2">-{Math.round(Math.random() * 30 + 10)}%</span>
                      <h6 className="text-dark mb-1" style={{ fontSize: '13px' }}>{product.name}</h6>
                      <span className="fw-bold text-success fs-5">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="container-fluid py-4" style={{ background: '#232f3e' }}>
        <div className="container">
          <div className="row text-center text-white">
            <div className="col-md-4 mb-3 mb-md-0">
              <i className="fas fa-truck fa-2x mb-2 text-warning"></i>
              <h5 className="mb-1">Free Delivery</h5>
              <p className="mb-0 small text-white-50">On orders over $50</p>
            </div>
            <div className="col-md-4 mb-3 mb-md-0">
              <i className="fas fa-shield-alt fa-2x mb-2 text-warning"></i>
              <h5 className="mb-1">Secure Shopping</h5>
              <p className="mb-0 small text-white-50">100% secure payment</p>
            </div>
            <div className="col-md-4">
              <i className="fas fa-undo fa-2x mb-2 text-warning"></i>
              <h5 className="mb-1">Easy Returns</h5>
              <p className="mb-0 small text-white-50">30-day return policy</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home
