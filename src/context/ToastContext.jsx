import { createContext, useContext, useState, useCallback } from 'react'
import { useAuth } from './AuthContext'

const ToastContext = createContext()

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within ToastProvider')
  }
  return context
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id))
    }, 3000)
  }, [])

  const hideToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      <>
        {children}
        <div className="toast-container">
          {toasts.map(toast => (
            <div 
              key={toast.id} 
              className={`toast show bg-${toast.type === 'success' ? 'success' : toast.type === 'error' ? 'danger' : 'info'} text-white`}
              role="alert"
              onClick={() => hideToast(toast.id)}
            >
              <div className="toast-body d-flex align-items-center gap-2">
                <i className={`fa fa-${toast.type === 'success' ? 'check-circle' : toast.type === 'error' ? 'exclamation-circle' : 'info-circle'}`}></i>
                {toast.message}
              </div>
            </div>
          ))}
        </div>
      </>
    </ToastContext.Provider>
  )
}
