import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getProductById, getRelatedProducts, getStockStatus } from '../data/products'
import { getReviewsByProductId, addReview, getReviewStats } from '../data/reviews'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { isAuthenticated, user } = useAuth()
  const { showToast } = useToast()
  
  const [product, setProduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [reviews, setReviews] = useState([])
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [activeTab, setActiveTab] = useState('description')
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    images: []
  })

  useEffect(() => {
    const productData = getProductById(id)
    if (productData) {
      setProduct(productData)
      setRelatedProducts(getRelatedProducts(productData.id, productData.category))
      setReviews(getReviewsByProductId(productData.id))
      setSelectedImage(0)
      setQuantity(1)
    }
  }, [id])

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product not found</h2>
        <Link to="/products" className="btn btn-primary mt-3">
          Back to Products
        </Link>
      </div>
    )
  }

  const stockStatus = getStockStatus(product.stock)
  const images = product.images || [product.image]
  const reviewStats = getReviewStats(product.id)
  const totalReviews = reviews.length || product.reviewCount || 0

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      showToast('Please login to add items to cart', 'error')
      navigate('/login')
      return
    }
    
    if (product.stock === 0) {
      showToast('This product is out of stock', 'error')
      return
    }
    
    addToCart({ ...product, id: product.id }, quantity)
    showToast(`${product.name} added to cart!`, 'success')
  }

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      showToast('Please login to continue', 'error')
      navigate('/login')
      return
    }
    
    if (product.stock === 0) {
      showToast('This product is out of stock', 'error')
      return
    }
    
    addToCart({ ...product, id: product.id }, quantity)
    navigate('/checkout')
  }

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(q => q + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1)
    }
  }

  const handleSubmitReview = (e) => {
    e.preventDefault()
    if (!newReview.title || !newReview.comment) {
      showToast('Please fill in all fields', 'error')
      return
    }
    
    addReview({
      productId: product.id,
      userId: user?.id || 'guest',
      userName: user?.name || 'Anonymous',
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      images: newReview.images
    })
    
    setReviews(getReviewsByProductId(product.id))
    setShowReviewForm(false)
    setNewReview({ rating: 5, title: '', comment: '', images: [] })
    showToast('Review submitted successfully!', 'success')
  }

  const renderStars = (rating, interactive = false, onSelect = () => {}) => {
    return (
      <div className="stars">
        {[1, 2, 3, 4, 5].map(star => (
          <i
            key={star}
            className={`fas fa-star ${star <= rating ? 'text-warning' : 'text-muted'}`}
            style={{ cursor: interactive ? 'pointer' : 'default' }}
            onClick={() => interactive && onSelect(star)}
          ></i>
        ))}
      </div>
    )
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price)
  }

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/products">Products</Link></li>
          <li className="breadcrumb-item"><Link to={`/products?category=${product.category}`}>{product.category}</Link></li>
          <li className="breadcrumb-item active">{product.name}</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-lg-5 mb-4">
          <div className="card border-0 shadow-sm">
            <div className="position-relative">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="card-img-top"
                style={{ height: '400px', objectFit: 'contain' }}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/500x400?text=No+Image'
                }}
              />
              {product.stock === 0 && (
                <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ background: 'rgba(0,0,0,0.5)' }}>
                  <span className="badge bg-danger fs-4">Out of Stock</span>
                </div>
              )}
            </div>
            {images.length > 1 && (
              <div className="card-body">
                <div className="d-flex gap-2 flex-wrap">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className={`rounded cursor-pointer ${selectedImage === index ? 'border border-primary' : 'border'}`}
                      style={{ width: '70px', height: '70px', objectFit: 'cover', cursor: 'pointer' }}
                      onClick={() => setSelectedImage(index)}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/70x70?text=No'
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="mb-3">
            <span className="badge bg-secondary me-2">{product.brand}</span>
            <span className="badge bg-info">{product.category}</span>
          </div>
          
          <h2 className="mb-2">{product.name}</h2>
          
          <div className="d-flex align-items-center mb-3">
            {renderStars(product.rating || 4)}
            <span className="ms-2 text-muted">
              {product.rating?.toFixed(1) || '4.5'} ({totalReviews} reviews)
            </span>
          </div>
          
          <div className="mb-3">
            <span className="display-6 fw-bold text-success">{formatPrice(product.price)}</span>
          </div>

          <div className="mb-3">
            {stockStatus.text === 'In Stock' ? (
              <span className="text-success fw-bold"><i className="fas fa-check-circle me-1"></i> In Stock</span>
            ) : stockStatus.text.includes('left') ? (
              <span className="text-warning fw-bold"><i className="fas fa-exclamation-circle me-1"></i> {stockStatus.text}</span>
            ) : (
              <span className="text-danger fw-bold"><i className="fas fa-times-circle me-1"></i> Out of Stock</span>
            )}
          </div>

          <p className="text-muted mb-4">{product.description}</p>

          {product.features && product.features.length > 0 && (
            <div className="mb-4">
              <h6>Key Features:</h6>
              <ul className="list-unstyled">
                {product.features.map((feature, i) => (
                  <li key={i} className="mb-1"><i className="fas fa-check text-success me-2"></i>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {product.stock > 0 && (
            <div className="mb-4">
              <label className="form-label fw-bold">Quantity:</label>
              <div className="d-flex align-items-center gap-3">
                <div className="input-group" style={{ width: '140px' }}>
                  <button className="btn btn-outline-secondary" type="button" onClick={decrementQuantity} disabled={quantity <= 1}>-</button>
                  <input
                    type="number"
                    className="form-control text-center"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
                    min="1"
                    max={product.stock}
                  />
                  <button className="btn btn-outline-secondary" type="button" onClick={incrementQuantity} disabled={quantity >= product.stock}>+</button>
                </div>
                <span className="text-muted">{product.stock} available</span>
              </div>
            </div>
          )}

          <div className="d-flex gap-3 mb-4">
            <button
              className="btn btn-outline-primary btn-lg flex-grow-1"
              onClick={handleAddToCart}
              disabled={product.stock === 0}
            >
              <i className="fas fa-cart-plus me-2"></i>
              Add to Cart
            </button>
            <button
              className="btn btn-warning btn-lg flex-grow-1"
              onClick={handleBuyNow}
              disabled={product.stock === 0}
            >
              <i className="fas fa-bolt me-2"></i>
              Buy Now
            </button>
          </div>

          <div className="card bg-light border-0">
            <div className="card-body">
              <div className="d-flex gap-3">
                <i className="fas fa-truck text-primary fs-4"></i>
                <div>
                  <strong>Free Delivery</strong>
                  <p className="mb-0 small text-muted">on orders over $50</p>
                </div>
              </div>
              <hr />
              <div className="d-flex gap-3">
                <i className="fas fa-undo text-primary fs-4"></i>
                <div>
                  <strong>30-Day Returns</strong>
                  <p className="mb-0 small text-muted"> hassle-free returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3">
          <div className="card border">
            <div className="card-header bg-white">
              <h6 className="mb-0">Delivery Options</h6>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <i className="fas fa-map-marker-alt text-muted me-2"></i>
                <span>Select delivery location</span>
              </div>
              <div className="mb-3">
                <i className="fas fa-calendar text-muted me-2"></i>
                <span>Delivery in 2-4 business days</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'description' ? 'active' : ''}`}
                onClick={() => setActiveTab('description')}
              >
                Description
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({totalReviews})
              </button>
            </li>
          </ul>

          {activeTab === 'description' && (
            <div className="card">
              <div className="card-body">
                <h5>Product Description</h5>
                <p>{product.description}</p>
                {product.features && (
                  <>
                    <h5 className="mt-4">Technical Details</h5>
                    <table className="table table-striped">
                      <tbody>
                        {product.features.map((feature, i) => (
                          <tr key={i}>
                            <td width="200"><strong>{feature.split(' ')[0]}</strong></td>
                            <td>{feature.split(' ').slice(1).join(' ')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4 text-center border-end">
                      <h2 className="text-warning mb-0">{product.rating?.toFixed(1) || '4.5'}</h2>
                      {renderStars(product.rating || 4)}
                      <p className="text-muted mt-2">{totalReviews} global ratings</p>
                    </div>
                    <div className="col-md-8">
                      {[5, 4, 3, 2, 1].map(star => (
                        <div key={star} className="d-flex align-items-center mb-2">
                          <span className="me-2">{star} star</span>
                          <div className="progress flex-grow-1" style={{ height: '8px' }}>
                            <div 
                              className="progress-bar bg-warning" 
                              style={{ width: `${totalReviews > 0 ? (reviewStats[star] / totalReviews) * 100 : 0}%` }}
                            ></div>
                          </div>
                          <span className="ms-2 text-muted">{reviewStats[star]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {isAuthenticated && (
                    <div className="mt-4 text-center">
                      <button 
                        className="btn btn-primary"
                        onClick={() => setShowReviewForm(!showReviewForm)}
                      >
                        <i className="fas fa-pen me-2"></i>
                        {showReviewForm ? 'Cancel' : 'Write a Review'}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {showReviewForm && (
                <div className="card mb-4 border-primary">
                  <div className="card-header bg-primary text-white">
                    <h5 className="mb-0"><i className="fas fa-pen me-2"></i>Write Your Review</h5>
                  </div>
                  <div className="card-body">
                    <form onSubmit={handleSubmitReview}>
                      <div className="mb-3">
                        <label className="form-label">Rating</label>
                        <div className="fs-3">
                          {renderStars(newReview.rating, true, (r) => setNewReview({ ...newReview, rating: r }))}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Review Title</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Summarize your experience"
                          value={newReview.title}
                          onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Your Review</label>
                        <textarea
                          className="form-control"
                          rows="4"
                          placeholder="Share your thoughts about this product..."
                          value={newReview.comment}
                          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                          required
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Add Photos (URLs)</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter image URL (optional, comma separated for multiple)"
                          onChange={(e) => setNewReview({ 
                            ...newReview, 
                            images: e.target.value.split(',').map(url => url.trim()).filter(url => url) 
                          })}
                        />
                      </div>
                      <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" id="verifiedPurchase" checked disabled />
                        <label className="form-check-label" htmlFor="verifiedPurchase">
                          Verified Purchase
                        </label>
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Submit Review
                      </button>
                    </form>
                  </div>
                </div>
              )}

              <h5 className="mb-4">Customer Reviews</h5>
              {reviews.length > 0 ? reviews.map(review => (
                <div key={review.id} className="card mb-3">
                  <div className="card-body">
                    <div className="d-flex justify-content-between mb-2">
                      <div>
                        <strong>{review.userName}</strong>
                        {review.verified && <span className="badge bg-success ms-2">Verified Purchase</span>}
                      </div>
                      <small className="text-muted">{new Date(review.created_at).toLocaleDateString()}</small>
                    </div>
                    <div className="mb-2">{renderStars(review.rating)}</div>
                    <h6 className="fw-bold">{review.title}</h6>
                    <p className="mb-2">{review.comment}</p>
                    {review.images && review.images.length > 0 && (
                      <div className="d-flex gap-2 mb-3">
                        {review.images.map((img, i) => (
                          <img key={i} src={img} alt="Review" style={{ width: '80px', height: '80px', objectFit: 'cover' }} className="rounded" />
                        ))}
                      </div>
                    )}
                    <div className="d-flex align-items-center gap-3">
                      <button className="btn btn-sm btn-outline-secondary">
                        <i className="fas fa-thumbs-up me-1"></i>
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-5">
                  <i className="fas fa-comments fa-4x text-muted mb-3"></i>
                  <p className="text-muted">No reviews yet. Be the first to review this product!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="mt-5">
          <h3 className="mb-4">Products Related to "{product.category}"</h3>
          <div className="row g-4">
            {relatedProducts.map(p => (
              <div key={p.id} className="col-6 col-md-3">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetail
