export const generateOrderId = () => 'ORD' + Date.now().toString().slice(-8)

export const getStoredOrders = () => {
  const orders = localStorage.getItem('shophub_orders')
  return orders ? JSON.parse(orders) : []
}

export const saveOrders = (orders) => {
  localStorage.setItem('shophub_orders', JSON.stringify(orders))
}

export const createOrder = (orderData) => {
  const orders = getStoredOrders()
  
  const newOrder = {
    id: generateOrderId(),
    user_id: orderData.user_id,
    items: orderData.items,
    total_price: orderData.total_price,
    status: 'pending',
    shipping_address: orderData.shipping_address,
    payment_method: orderData.payment_method,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
  
  orders.push(newOrder)
  saveOrders(orders)
  return newOrder
}

export const getOrdersByUser = (userId) => {
  const orders = getStoredOrders()
  return orders.filter(o => o.user_id === userId).sort((a, b) => 
    new Date(b.created_at) - new Date(a.created_at)
  )
}

export const getOrderById = (orderId) => {
  const orders = getStoredOrders()
  return orders.find(o => o.id === orderId)
}

export const getAllOrders = () => {
  const orders = getStoredOrders()
  return orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
}

export const updateOrderStatus = (orderId, status) => {
  const orders = getStoredOrders()
  const index = orders.findIndex(o => o.id === orderId)
  
  if (index === -1) {
    throw new Error('Order not found')
  }
  
  orders[index].status = status
  orders[index].updated_at = new Date().toISOString()
  saveOrders(orders)
  return orders[index]
}

export const getTotalOrders = () => getStoredOrders().length

export const getTotalRevenue = () => {
  const orders = getStoredOrders()
  return orders.reduce((sum, order) => sum + parseFloat(order.total_price), 0)
}

export const getPendingOrdersCount = () => {
  return getStoredOrders().filter(o => o.status === 'pending').length
}

export const getRecentOrders = (limit = 5) => {
  return getAllOrders().slice(0, limit)
}

export const getOrdersByStatus = (status) => {
  const orders = getStoredOrders()
  return orders.filter(o => o.status === status)
}

export const formatOrderDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const getStatusBadgeClass = (status) => {
  const classes = {
    pending: 'status-pending',
    processing: 'status-processing',
    shipped: 'status-shipped',
    delivered: 'status-delivered',
    cancelled: 'status-cancelled'
  }
  return classes[status] || 'status-pending'
}
