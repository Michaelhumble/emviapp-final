
import React, { createContext, useState, ReactNode } from 'react';
import { Toast, ToastDescription, ToastTitle, ToastClose } from '@/components/ui/toast';

export interface ToastOptions {
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive' | 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export interface ToastContextType {
  toast: (options: ToastOptions) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<(ToastOptions & { id: number })[]>([]);
  let toastId = 0;

  const toast = (options: ToastOptions) => {
    const id = toastId++;
    setToasts((prev) => [...prev, { ...options, id }]);
    
    if (options.duration !== Infinity) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, options.duration || 5000);
    }
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            variant={toast.variant}
          >
            <div className="grid gap-1">
              {toast.title && <ToastTitle>{toast.title}</ToastTitle>}
              {toast.description && <ToastDescription>{toast.description}</ToastDescription>}
            </div>
            <ToastClose onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))} />
          </Toast>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
