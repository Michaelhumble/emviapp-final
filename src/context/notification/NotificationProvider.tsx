
import { createContext, useContext, ReactNode } from 'react';
import { useNotifications } from '@/hooks/useNotifications';
import { Notification } from '@/types/notification';

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const notificationService = useNotifications();
  
  return (
    <NotificationContext.Provider value={notificationService}>
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
