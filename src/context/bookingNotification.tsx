
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BookingNotification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  timestamp: Date;
}

interface BookingNotificationContextType {
  notifications: BookingNotification[];
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void;
  removeNotification: (id: string) => void;
}

const BookingNotificationContext = createContext<BookingNotificationContextType | undefined>(undefined);

export const useBookingNotification = () => {
  const context = useContext(BookingNotificationContext);
  if (!context) {
    throw new Error('useBookingNotification must be used within a BookingNotificationProvider');
  }
  return context;
};

interface BookingNotificationProviderProps {
  children: ReactNode;
}

export const BookingNotificationProvider: React.FC<BookingNotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<BookingNotification[]>([]);

  const addNotification = (message: string, type: 'success' | 'error' | 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    const notification: BookingNotification = {
      id,
      message,
      type,
      timestamp: new Date()
    };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      removeNotification(id);
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  return (
    <BookingNotificationContext.Provider value={{
      notifications,
      addNotification,
      removeNotification
    }}>
      {children}
    </BookingNotificationContext.Provider>
  );
};
