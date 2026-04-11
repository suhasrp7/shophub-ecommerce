export const products = [
  {
    id: 1,
    name: 'MacBook Pro 16" M3 Max',
    description: 'The most powerful MacBook Pro ever with M3 Max chip. Features a stunning Liquid Retina XDR display with ProMotion, all-day battery life, and incredible performance for pro workflows. Perfect for video editing, 3D rendering, and software development.',
    price: 2499.00,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500'
    ],
    category: 'Electronics',
    stock: 15,
    rating: 4.8,
    reviewCount: 234,
    brand: 'Apple',
    features: ['M3 Max chip', '36GB RAM', '1TB SSD', '16-inch Display'],
    created_at: '2024-01-15'
  },
  {
    id: 2,
    name: 'Sony WH-1000XM5 Wireless Headphones',
    description: 'Industry-leading noise cancellation with exceptional sound quality. Features 30-hour battery life, multipoint connection, speak-to-chat technology, and premium comfort for all-day wear. Crystal clear calls with 4 beamforming microphones.',
    price: 349.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500'
    ],
    category: 'Accessories',
    stock: 45,
    rating: 4.7,
    reviewCount: 189,
    brand: 'Sony',
    features: ['30hr Battery', 'ANC', 'Bluetooth 5.2', 'Speak-to-Chat'],
    created_at: '2024-02-10'
  },
  {
    id: 3,
    name: 'Modern Leather 3-Seater Sofa',
    description: 'Luxurious 3-seater sofa with premium Italian leather upholstery. Features high-density foam cushions, solid wood frame, and elegant design that complements any living space. Includes 2 matching throw pillows.',
    price: 1899.00,
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
      'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=500',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500'
    ],
    category: 'Furniture',
    stock: 8,
    rating: 4.5,
    reviewCount: 67,
    brand: 'ModernLiving',
    features: ['Italian Leather', 'Solid Wood Frame', 'High-Density Foam', '2 Pillows Included'],
    created_at: '2024-01-20'
  },
  {
    id: 4,
    name: 'Canon EOS R5 Mirrorless Camera',
    description: 'Professional mirrorless camera with 45MP full-frame sensor, 8K video recording, and advanced autofocus system with subject tracking. In-body image stabilization. Perfect for professional photographers and videographers.',
    price: 3899.00,
    images: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500',
      'https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?w=500'
    ],
    category: 'Cameras',
    stock: 12,
    rating: 4.9,
    reviewCount: 156,
    brand: 'Canon',
    features: ['45MP Sensor', '8K Video', '5-Axis IBIS', 'Dual Card Slots'],
    created_at: '2024-03-05'
  },
  {
    id: 5,
    name: 'Bose SoundLink Flex Bluetooth Speaker',
    description: 'Portable Bluetooth speaker with premium sound quality, 12-hour battery life, and water-resistant design. PositionIQ technology automatically optimizes sound based on orientation. Perfect for outdoor adventures.',
    price: 149.00,
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500',
      'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=500'
    ],
    category: 'Audio',
    stock: 60,
    rating: 4.6,
    reviewCount: 312,
    brand: 'Bose',
    features: ['12hr Battery', 'IP67 Waterproof', 'PositionIQ', 'Party Mode'],
    created_at: '2024-02-28'
  },
  {
    id: 6,
    name: 'PlayStation 5 Console Bundle',
    description: 'Next-generation gaming console with ultra-fast SSD, ray tracing, and 4K gaming. Includes DualSense controller with haptic feedback. Bundle includes 2 controllers and 3 game vouchers.',
    price: 559.99,
    images: [
      'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500',
      'https://images.unsplash.com/photo-1622297845775-5ff3fef71b13?w=500'
    ],
    category: 'Gaming',
    stock: 0,
    rating: 4.9,
    reviewCount: 1247,
    brand: 'Sony',
    features: ['825GB SSD', '4K Gaming', 'Ray Tracing', 'DualSense Controller'],
    created_at: '2024-01-10'
  },
  {
    id: 7,
    name: 'iPhone 15 Pro Max 256GB',
    description: 'Apple flagship smartphone with A17 Pro chip, titanium design, and advanced camera system. Features ProMotion display, Action button, and all-day battery life. USB-C charging with USB 3 speeds.',
    price: 1199.00,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500',
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=500',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500'
    ],
    category: 'Electronics',
    stock: 25,
    rating: 4.8,
    reviewCount: 892,
    brand: 'Apple',
    features: ['A17 Pro Chip', 'Titanium Design', '48MP Camera', 'USB-C'],
    created_at: '2024-03-15'
  },
  {
    id: 8,
    name: 'Samsung 65" 4K QLED Smart TV',
    description: '65-inch 4K QLED smart TV with Quantum HDR, Object Tracking Sound, and built-in voice assistants. Features Neural Quantum Processor for stunning picture quality. Perfect for home entertainment.',
    price: 1299.99,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500',
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=500'
    ],
    category: 'Electronics',
    stock: 18,
    rating: 4.5,
    reviewCount: 423,
    brand: 'Samsung',
    features: ['65" QLED', '4K Resolution', 'Quantum HDR', 'Smart Hub'],
    created_at: '2024-02-05'
  },
  {
    id: 9,
    name: 'Herman Miller Aeron Ergonomic Chair',
    description: 'Premium ergonomic office chair with lumbar support, adjustable armrests, and breathable mesh back. Designed for all-day comfort during work. Fully adjustable for personalized support.',
    price: 1395.00,
    images: [
      'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=500',
      'https://images.unsplash.com/photo-1541558869434-2840d308329a?w=500'
    ],
    category: 'Furniture',
    stock: 30,
    rating: 4.7,
    reviewCount: 567,
    brand: 'Herman Miller',
    features: ['PostureFit SL', '8Z Pellicle Mesh', 'Adjustable Arms', '12-Year Warranty'],
    created_at: '2024-01-25'
  },
  {
    id: 10,
    name: 'DJI Mavic 3 Pro Drone',
    description: 'Professional drone with Hasselblad camera, 46-minute flight time, and omnidirectional obstacle sensing. Tri-camera system with 4/3 CMOS sensor. Perfect for aerial photography and videography.',
    price: 2199.00,
    images: [
      'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500',
      'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=500'
    ],
    category: 'Cameras',
    stock: 5,
    rating: 4.8,
    reviewCount: 89,
    brand: 'DJI',
    features: ['Hasselblad Camera', '46min Flight', 'Omnidirectional Sensing', 'Tri-Camera'],
    created_at: '2024-03-01'
  },
  {
    id: 11,
    name: 'Corsair K100 RGB Mechanical Keyboard',
    description: 'RGB mechanical keyboard with Cherry MX switches, programmable keys, and aircraft-grade aluminum frame. Features per-key RGB lighting and magnetic wrist rest. Built for competitive gaming.',
    price: 229.99,
    images: [
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500',
      'https://images.unsplash.com/photo-1595044426077-d36d9236d54a?w=500'
    ],
    category: 'Gaming',
    stock: 42,
    rating: 4.6,
    reviewCount: 234,
    brand: 'Corsair',
    features: ['OPX Switches', 'Per-Key RGB', 'iCUE Software', 'Aluminum Frame'],
    created_at: '2024-02-15'
  },
  {
    id: 12,
    name: 'Samsung 25W Wireless Charging Pad',
    description: 'Fast wireless charger compatible with all Qi-enabled devices. Features sleek design, LED indicator, and built-in safety protections. Includes cooling fan for fast charging.',
    price: 49.99,
    images: [
      'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=500',
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500'
    ],
    category: 'Accessories',
    stock: 100,
    rating: 4.4,
    reviewCount: 567,
    brand: 'Samsung',
    features: ['25W Fast Charge', 'Qi Certified', 'Cooling Fan', 'LED Indicator'],
    created_at: '2024-01-30'
  },
  {
    id: 13,
    name: 'Apple Watch Ultra 2',
    description: 'The most rugged and capable Apple Watch ever. Features titanium case, 49mm display, dual-frequency GPS, and up to 36 hours of battery life. Perfect for extreme adventures.',
    price: 799.00,
    images: [
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500'
    ],
    category: 'Electronics',
    stock: 20,
    rating: 4.8,
    reviewCount: 345,
    brand: 'Apple',
    features: ['49mm Display', 'Titanium Case', '36hr Battery', 'Dual GPS'],
    created_at: '2024-03-20'
  },
  {
    id: 14,
    name: 'Nike Air Max 270 Running Shoes',
    description: 'Lightweight running shoes with Max Air unit for cushioned comfort. Features breathable mesh upper and rubber outsole for traction. Perfect for running and everyday wear.',
    price: 150.00,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500'
    ],
    category: 'Fashion',
    stock: 55,
    rating: 4.6,
    reviewCount: 890,
    brand: 'Nike',
    features: ['Max Air Unit', 'Mesh Upper', 'Rubber Outsole', 'Lightweight'],
    created_at: '2024-02-20'
  },
  {
    id: 15,
    name: 'Dyson V15 Detect Vacuum',
    description: 'Powerful cordless vacuum with laser dust detection and LCD screen showing real-time particle counts. Features 60-minute runtime and HEPA filtration. Captures 99.99% of particles.',
    price: 749.99,
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=500'
    ],
    category: 'Home',
    stock: 15,
    rating: 4.7,
    reviewCount: 234,
    brand: 'Dyson',
    features: ['Laser Detection', '60min Runtime', 'HEPA Filtration', 'LCD Screen'],
    created_at: '2024-01-15'
  },
  {
    id: 16,
    name: 'Kindle Paperwhite 11th Gen',
    description: '6.8" glare-free display with adjustable warm light. Thinner, lighter design with 10 weeks of battery life. 8GB storage holds thousands of books. Waterproof for reading anywhere.',
    price: 139.99,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500'
    ],
    category: 'Electronics',
    stock: 40,
    rating: 4.8,
    reviewCount: 1234,
    brand: 'Amazon',
    features: ['6.8" Display', '10 Week Battery', '8GB Storage', 'Waterproof'],
    created_at: '2024-03-10'
  }
]

let adminProducts = [...products]

export const getProductById = (id) => {
  const product = adminProducts.find(p => p.id === parseInt(id))
  return product || products.find(p => p.id === parseInt(id))
}

export const getProductsByCategory = (category) => {
  if (!category || category === 'all') return adminProducts.length > 0 ? adminProducts : products
  const filtered = adminProducts.length > 0 ? adminProducts : products
  return filtered.filter(p => p.category.toLowerCase() === category.toLowerCase())
}

export const searchProducts = (query) => {
  const q = query.toLowerCase()
  const allProducts = adminProducts.length > 0 ? adminProducts : products
  return allProducts.filter(p => 
    p.name.toLowerCase().includes(q) || 
    p.description.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.brand?.toLowerCase().includes(q)
  )
}

export const getFeaturedProducts = () => {
  const allProducts = adminProducts.length > 0 ? adminProducts : products
  return [...allProducts].sort(() => Math.random() - 0.5).slice(0, 8)
}

export const getRelatedProducts = (productId, category) => {
  const allProducts = adminProducts.length > 0 ? adminProducts : products
  return allProducts.filter(p => p.category === category && p.id !== productId).slice(0, 4)
}

export const getAllProducts = () => {
  return adminProducts.length > 0 ? adminProducts : products
}

export const getStockStatus = (stock) => {
  if (stock === 0) return { text: 'Out of Stock', class: 'out-of-stock' }
  if (stock <= 5) return { text: 'Only ' + stock + ' left!', class: 'low-stock' }
  return { text: 'In Stock', class: 'in-stock' }
}

export const addProduct = (product) => {
  const newProduct = {
    ...product,
    id: Date.now(),
    rating: 0,
    reviewCount: 0,
    created_at: new Date().toISOString()
  }
  adminProducts.push(newProduct)
  saveProducts()
  return newProduct
}

export const updateProduct = (id, updates) => {
  const index = adminProducts.findIndex(p => p.id === parseInt(id))
  if (index !== -1) {
    adminProducts[index] = { ...adminProducts[index], ...updates }
    saveProducts()
    return adminProducts[index]
  }
  return null
}

export const deleteProduct = (id) => {
  adminProducts = adminProducts.filter(p => p.id !== parseInt(id))
  saveProducts()
}

export const saveProducts = () => {
  localStorage.setItem('shophub_products', JSON.stringify(adminProducts))
}

export const loadProducts = () => {
  const stored = localStorage.getItem('shophub_products')
  if (stored) {
    adminProducts = JSON.parse(stored)
  }
}
