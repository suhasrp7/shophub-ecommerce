export const reviews = [
  {
    id: 1,
    productId: 1,
    userId: 'user_1',
    userName: 'John D.',
    rating: 5,
    title: 'Best laptop I have ever owned!',
    comment: 'Absolutely incredible machine. The M3 Max chip handles everything I throw at it - 4K video editing, 3D rendering, everything is lightning fast. Battery life is amazing, easily lasts a full workday. The display is stunning with true blacks and incredible brightness.',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=200'
    ],
    verified: true,
    helpful: 45,
    created_at: '2024-03-15'
  },
  {
    id: 2,
    productId: 1,
    userId: 'user_2',
    userName: 'Sarah M.',
    rating: 4,
    title: 'Great but expensive',
    comment: 'The performance is outstanding, no complaints there. Docked one star because the price is quite high, but you definitely get what you pay for. The speakers sound great and the keyboard is comfortable for long typing sessions.',
    images: [],
    verified: true,
    helpful: 23,
    created_at: '2024-03-10'
  },
  {
    id: 3,
    productId: 2,
    userId: 'user_3',
    userName: 'Mike R.',
    rating: 5,
    title: 'Best noise canceling headphones',
    comment: 'These are incredible! The noise cancellation is the best I have ever experienced. Put them on and the world disappears. Sound quality is rich and detailed. Comfortable enough to wear for hours. Battery life is fantastic.',
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200'],
    verified: true,
    helpful: 67,
    created_at: '2024-02-28'
  },
  {
    id: 4,
    productId: 7,
    userId: 'user_4',
    userName: 'Emily W.',
    rating: 5,
    title: 'Love my new iPhone!',
    comment: 'The titanium design feels premium and is much lighter than I expected. Camera quality is outstanding, especially the 5x optical zoom. USB-C is so convenient. Battery easily lasts all day with heavy use.',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200',
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=200'
    ],
    verified: true,
    helpful: 89,
    created_at: '2024-03-18'
  },
  {
    id: 5,
    productId: 5,
    userId: 'user_5',
    userName: 'Alex K.',
    rating: 4,
    title: 'Great sound, great battery',
    comment: 'Solid Bluetooth speaker with impressive sound for its size. The battery easily lasts a full day at the beach. Waterproof rating gives peace of mind. Only wish it had a little more bass.',
    images: [],
    verified: true,
    helpful: 34,
    created_at: '2024-02-15'
  }
]

let adminReviews = [...reviews]

export const getReviewsByProductId = (productId) => {
  const allReviews = adminReviews.length > 0 ? adminReviews : reviews
  return allReviews.filter(r => r.productId === parseInt(productId))
}

export const addReview = (review) => {
  const newReview = {
    id: Date.now(),
    ...review,
    verified: true,
    helpful: 0,
    created_at: new Date().toISOString()
  }
  adminReviews.push(newReview)
  saveReviews()
  updateProductReviewStats(review.productId)
  return newReview
}

export const updateProductReviewStats = (productId) => {
  const productReviews = adminReviews.filter(r => r.productId === parseInt(productId))
  if (productReviews.length > 0) {
    const avgRating = productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
    localStorage.setItem(`shophub_product_${productId}_rating`, avgRating.toFixed(1))
    localStorage.setItem(`shophub_product_${productId}_reviews`, productReviews.length.toString())
  }
}

export const markHelpful = (reviewId) => {
  const index = adminReviews.findIndex(r => r.id === parseInt(reviewId))
  if (index !== -1) {
    adminReviews[index].helpful += 1
    saveReviews()
  }
}

export const getAverageRating = (productId) => {
  const productReviews = adminReviews.filter(r => r.productId === parseInt(productId))
  if (productReviews.length === 0) return 0
  return productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
}

export const getReviewStats = (productId) => {
  const productReviews = adminReviews.filter(r => r.productId === parseInt(productId))
  const ratings = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  productReviews.forEach(r => {
    ratings[r.rating]++
  })
  return ratings
}

export const saveReviews = () => {
  localStorage.setItem('shophub_reviews', JSON.stringify(adminReviews))
}

export const loadReviews = () => {
  const stored = localStorage.getItem('shophub_reviews')
  if (stored) {
    adminReviews = JSON.parse(stored)
  }
}
