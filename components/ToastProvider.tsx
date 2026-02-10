'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info, AlertCircle, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  type: ToastType
  message: string
  description?: string
}

interface ToastContextType {
  showToast: (type: ToastType, message: string, description?: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((type: ToastType, message: string, description?: string) => {
    const id = Math.random().toString(36).substring(7)
    const newToast: Toast = { id, type, message, description }
    
    setToasts((prev) => [...prev, newToast])
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 5000)
  }, [])

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const getIcon = (type: ToastType) => {
    const iconClass = 'h-5 w-5'
    switch (type) {
      case 'success':
        return <CheckCircle className={`${iconClass} text-green-500`} />
      case 'error':
        return <XCircle className={`${iconClass} text-red-500`} />
      case 'warning':
        return <AlertCircle className={`${iconClass} text-yellow-500`} />
      case 'info':
        return <Info className={`${iconClass} text-blue-500`} />
    }
  }

  const getStyles = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'border-green-500/20 bg-green-500/10'
      case 'error':
        return 'border-red-500/20 bg-red-500/10'
      case 'warning':
        return 'border-yellow-500/20 bg-yellow-500/10'
      case 'info':
        return 'border-blue-500/20 bg-blue-500/10'
    }
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`pointer-events-auto flex items-start gap-3 rounded-2xl border ${getStyles(
                toast.type
              )} p-4 shadow-lg backdrop-blur-sm max-w-sm`}
            >
              <div className="flex-shrink-0 mt-0.5">{getIcon(toast.type)}</div>
              
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-foreground">
                  {toast.message}
                </div>
                {toast.description && (
                  <div className="mt-1 text-xs text-muted-foreground">
                    {toast.description}
                  </div>
                )}
              </div>
              
              <button
                onClick={() => removeToast(toast.id)}
                className="flex-shrink-0 rounded-lg p-1 transition-colors hover:bg-background/50"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
