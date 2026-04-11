import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { getStockStatus } from '../data/products'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  const { isAuthenticated } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()
  
  const stockStatus = getStockStatus(product.stock)
  const image = product.images?.[0] || product.image

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!isAuthenticated) {
      showToast('Please login to add items to cart', 'error')
      navigate('/login')
      return
    }
    
    if (product.stock === 0) {
      showToast('This product is out of stock', 'error')
      return
    }
    
    addToCart(product)
    showToast(`${product.name} added to cart!`, 'success')
  }

  const handleBuyNow = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (!isAuthenticated) {
      showToast('Please login to continue', 'error')
      navigate('/login')
      return
    }
    
    if (product.stock === 0) {
      showToast('This product is out of stock', 'error')
      return
    }
    
    addToCart(product)
    navigate('/checkout')
  }

  const renderStars = (rating) => {
    const stars = []
    const r = rating || 4
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i 
          key={i} 
          className={`fas fa-star ${i <= Math.round(r) ? 'text-warning' : 'text-muted'}`}
          style={{ fontSize: '12px' }}
        ></i>
      )
    }
    return stars
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  return (
    <Link to={`/product/${product.id}`} className="text-decoration-none">
      <div className="product-card h-100">
        <div className="position-relative">
          <img 
            src={image} 
            alt={product.name}
            className="card-img-top"
            style={{ height: '200px', objectFit: 'contain' }}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'
            }}
          />
          {product.stock === 0 && (
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" 
                 style={{ background: 'rgba(255,255,255,0.8)' }}>
              <span className="badge bg-danger fs-6">Out of Stock</span>
            </div>
          )}
          {product.stock > 0 && product.stock <= 5 && (
            <div className="position-absolute top-0 end-0 m-2">
              <span className="badge bg-warning text-dark">Only {product.stock} left</span>
            </div>
          )}
        </div>
        
        <div className="card-body d-flex flex-column p-3">
          <div className="mb-1">
            <small className="text-muted">{product.brand || product.category}</small>
          </div>
          
          <h6 className="card-title text-dark mb-2" style={{ 
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: '1.3',
            minHeight: '2.6em'
          }}>
            {product.name}
          </h6>
          
          <div className="mb-2">
            <div className="d-flex align-items-center">
              {renderStars(product.rating)}
              <span className="ms-1 small text-muted">({product.reviewCount || 0})</span>
            </div>
          </div>
          
          <div className="mt-auto">
            <div className="mb-2">
              <span className="fw-bold fs-5 text-success">{formatPrice(product.price)}</span>
            </div>
            
            <div className="d-flex gap-2">
              <button 
                className="btn btn-outline-primary btn-sm flex-grow-1"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <i className="fas fa-cart-plus me-1"></i>
                Add to Cart
              </button>
              <button 
                className="btn btn-warning btn-sm flex-grow-1"
                onClick={handleBuyNow}
                disabled={product.stock === 0}
              >
                <i className="fas fa-bolt me-1"></i>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
