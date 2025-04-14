
import { createContext, useContext, ReactNode, useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Notification } from '@/types/notification';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

interface NotificationPayload {
  type: string;
  message: string;
  details?: Record<string, any>;
  link?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  sendNotification: (payload: NotificationPayload) => Promise<void>;
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
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();

  // Fetch notifications from Supabase
  const fetchNotifications = useCallback(async () => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    setLoading(true);
    try {
      // Get notifications for the current user
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (!data) {
        setNotifications([]);
        setUnreadCount(0);
        return;
      }
      
      // Map to our notification type
      const notificationsData: Notification[] = data.map(item => ({
        id: item.id,
        message: item.message,
        type: item.type as 'info' | 'warning' | 'success' | 'error',
        createdAt: item.created_at,
        isRead: item.is_read,
        link: item.link || undefined,
        metadata: item.metadata ? (typeof item.metadata === 'object' ? item.metadata : {}) : undefined
      }));
      
      // Calculate unread count
      const unread = notificationsData.filter(n => !n.isRead).length;

      setNotifications(notificationsData);
      setUnreadCount(unread);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Mark a notification as read
  const markAsRead = useCallback(async (id: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('id', id);

      if (error) throw error;
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => 
          notification.id === id 
            ? { ...notification, isRead: true } 
            : notification
        )
      );
      
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }, [user]);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('notifications')
        .update({ is_read: true })
        .eq('user_id', user.id)
        .eq('is_read', false);

      if (error) throw error;
      
      // Update local state
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, isRead: true }))
      );
      
      setUnreadCount(0);
      toast.success('All notifications marked as read');
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  }, [user]);

  // Send a notification
  const sendNotification = useCallback(async (payload: NotificationPayload) => {
    if (!user) return;

    try {
      // Map notification type to UI type
      let uiType: 'info' | 'warning' | 'success' | 'error' = 'info';
      
      if (payload.type.includes('error') || payload.type.includes('cancelled')) {
        uiType = 'error';
      } else if (payload.type.includes('success') || payload.type.includes('completed') || payload.type.includes('accepted')) {
        uiType = 'success';
      } else if (payload.type.includes('warning') || payload.type.includes('low') || payload.type.includes('pending')) {
        uiType = 'warning';
      }
      
      // Insert notification
      const { error } = await supabase
        .from('notifications')
        .insert({
          user_id: user.id,
          type: uiType,
          message: payload.message,
          is_read: false,
          link: payload.link || null,
          metadata: payload.details || {}
        });

      if (error) throw error;
      
      // Show toast notification
      toast(payload.message, {
        action: payload.link ? {
          label: "View",
          onClick: () => window.location.href = payload.link || '#',
        } : undefined,
        duration: 5000,
      });
      
      // Refresh notification list
      fetchNotifications();
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }, [user, fetchNotifications]);

  // Set up realtime subscription for new notifications
  useEffect(() => {
    if (!user) return;

    fetchNotifications();
    
    // Subscribe to changes in notifications table
    const channel = supabase
      .channel('notification-changes')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        }, 
        (payload) => {
          // Map new notification to our format
          const newNotification: Notification = {
            id: payload.new.id,
            message: payload.new.message,
            type: payload.new.type as 'info' | 'warning' | 'success' | 'error',
            createdAt: payload.new.created_at,
            isRead: payload.new.is_read,
            link: payload.new.link,
            metadata: payload.new.metadata ? (typeof payload.new.metadata === 'object' ? payload.new.metadata : {}) : undefined
          };
          
          // Add to local state
          setNotifications(prev => [newNotification, ...prev]);
          setUnreadCount(prev => prev + 1);

          // Show toast notification
          toast(newNotification.message, {
            position: 'top-right',
          });
        })
      .subscribe();

    // Cleanup function
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchNotifications]);

  const value = {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    sendNotification
  };
  
  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
