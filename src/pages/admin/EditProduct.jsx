import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { getProductById, updateProduct } from '../../data/products'
import { categories } from '../../data/categories'
import { useToast } from '../../context/ToastContext'

const EditProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    brand: '',
    images: [''],
    features: []
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const product = getProductById(id)
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        stock: product.stock.toString(),
        category: product.category,
        brand: product.brand || '',
        images: product.images?.length > 0 ? product.images : [''],
        features: product.features || []
      })
    }
  }, [id])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images]
    newImages[index] = value
    setFormData({ ...formData, images: newImages })
  }

  const addImageField = () => {
    if (formData.images.length < 6) {
      setFormData({ ...formData, images: [...formData.images, ''] })
    }
  }

  const removeImageField = (index) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index)
      setFormData({ ...formData, images: newImages })
    }
  }

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData({ ...formData, features: newFeatures.filter(f => f !== '') })
  }

  const addFeatureField = () => {
    setFormData({ ...formData, features: [...formData.features, ''] })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.description || !formData.price || !formData.stock || !formData.category) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    const validImages = formData.images.filter(img => img.trim() !== '')
    if (validImages.length === 0) {
      showToast('Please add at least one product image', 'error')
      return
    }

    setLoading(true)

    const product = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      category: formData.category,
      brand: formData.brand || formData.category,
      images: validImages,
      features: formData.features.filter(f => f.trim() !== '')
    }

    updateProduct(id, product)
    
    setTimeout(() => {
      showToast('Product updated successfully!', 'success')
      navigate('/admin/products')
    }, 500)
  }

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <i className="fas fa-edit me-2"></i>
          Edit Product
        </h2>
        <Link to="/admin/products" className="btn btn-outline-secondary">
          <i className="fas fa-arrow-left me-2"></i>
          Back
        </Link>
      </div>

      <div className="admin-card">
        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            <div className="col-md-8">
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">Basic Information</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label">Product Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Description *</label>
                    <textarea
                      className="form-control"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="4"
                      required
                    ></textarea>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Price ($) *</label>
                        <input
                          type="number"
                          className="form-control"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          step="0.01"
                          min="0"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Stock Quantity *</label>
                        <input
                          type="number"
                          className="form-control"
                          name="stock"
                          value={formData.stock}
                          onChange={handleChange}
                          min="0"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Category *</label>
                        <select
                          className="form-select"
                          name="category"
                          value={formData.category}
                          onChange={handleChange}
                          required
                        >
                          {categories.map(cat => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                          ))}
                          <option value="Fashion">Fashion</option>
                          <option value="Home">Home</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Brand</label>
                        <input
                          type="text"
                          className="form-control"
                          name="brand"
                          value={formData.brand}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Product Images</h5>
                  <button type="button" className="btn btn-sm btn-primary" onClick={addImageField}>
                    <i className="fas fa-plus me-1"></i> Add Image
                  </button>
                </div>
                <div className="card-body">
                  {formData.images.map((img, index) => (
                    <div key={index} className="input-group mb-2">
                      <span className="input-group-text">Image {index + 1}</span>
                      <input
                        type="url"
                        className="form-control"
                        value={img}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        placeholder="https://example.com/image.jpg"
                      />
                      <button 
                        type="button" 
                        className="btn btn-outline-danger"
                        onClick={() => removeImageField(index)}
                        disabled={formData.images.length <= 1}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Product Features</h5>
                  <button type="button" className="btn btn-sm btn-primary" onClick={addFeatureField}>
                    <i className="fas fa-plus me-1"></i> Add Feature
                  </button>
                </div>
                <div className="card-body">
                  {formData.features.map((feature, index) => (
                    <div key={index} className="input-group mb-2">
                      <span className="input-group-text"><i className="fas fa-check"></i></span>
                      <input
                        type="text"
                        className="form-control"
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">Image Preview</h5>
                </div>
                <div className="card-body">
                  {formData.images[0] ? (
                    <img
                      src={formData.images[0]}
                      alt="Preview"
                      className="img-thumbnail w-100"
                      style={{ height: '200px', objectFit: 'contain' }}
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+URL'
                      }}
                    />
                  ) : (
                    <div className="text-center text-muted py-5">
                      <i className="fas fa-image fa-4x mb-2"></i>
                      <p>No image</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Actions</h5>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Updating...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-save me-2"></i>
                          Update Product
                        </>
                      )}
                    </button>
                    <Link to="/admin/products" className="btn btn-outline-secondary">
                      Cancel
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditProduct
