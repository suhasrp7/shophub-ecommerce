import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedCart = localStorage.getItem('shophub_cart')
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart))
      } catch (e) {
        setCart([])
      }
    }
    setLoading(false)
  }, [])

  const saveCart = (newCart) => {
    setCart(newCart)
    try {
      localStorage.setItem('shophub_cart', JSON.stringify(newCart))
    } catch (e) {
      console.error('Error saving cart:', e)
    }
  }

  const addToCart = (product, quantity = 1) => {
    if (!product || !product.id) {
      console.error('Invalid product:', product)
      return
    }

    const productImage = product.images?.[0] || product.image || 'https://via.placeholder.com/100x100?text=No+Image'
    const existingIndex = cart.findIndex(item => item.product_id === product.id)
    
    if (existingIndex !== -1) {
      const updatedCart = [...cart]
      updatedCart[existingIndex] = {
        ...updatedCart[existingIndex],
        quantity: updatedCart[existingIndex].quantity + quantity
      }
      saveCart(updatedCart)
    } else {
      saveCart([...cart, {
        product_id: product.id,
        name: product.name,
        price: product.price,
        image: productImage,
        stock: product.stock,
        quantity: quantity
      }])
    }
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return
    const updatedCart = cart.map(item => 
      item.product_id === productId ? { ...item, quantity } : item
    )
    saveCart(updatedCart)
  }

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.product_id !== productId)
    saveCart(updatedCart)
  }

  const clearCart = () => {
    saveCart([])
  }

  const getCartCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const value = {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartCount,
    getCartTotal,
    loading
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}
