import { createContext, useContext, useState, useEffect } from 'react'
import { initializeAdminUser } from '../data/users'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeAdminUser()
    const storedUser = localStorage.getItem('shophub_current_user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('shophub_current_user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('shophub_current_user')
  }

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates }
    setUser(updatedUser)
    localStorage.setItem('shophub_current_user', JSON.stringify(updatedUser))
    
    const users = JSON.parse(localStorage.getItem('shophub_users') || '[]')
    const index = users.findIndex(u => u.id === user.id)
    if (index !== -1) {
      users[index] = { ...users[index], ...updates }
      localStorage.setItem('shophub_users', JSON.stringify(users))
    }
  }

  const isAdmin = () => user?.role === 'admin'

  const value = {
    user,
    loading,
    login,
    logout,
    updateUser,
    isAdmin,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
