
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Notification } from '@/types/notification';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

// Since there's no actual 'notifications' table in the schema, 
// we're using a mock implementation for demonstration
export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();

  // Mock fetch notifications from a local array
  const fetchNotifications = useCallback(async () => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    setLoading(true);
    try {
      // This would normally fetch from Supabase, but we'll use mock data
      // for now since the notifications table doesn't exist yet
      const mockNotifications: Notification[] = [
        {
          id: '1',
          message: 'Welcome to EmviApp!',
          type: 'info',
          createdAt: new Date().toISOString(),
          isRead: false,
          link: '/dashboard',
        },
        {
          id: '2',
          message: 'Complete your profile to get more visibility',
          type: 'info',
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          isRead: false,
        },
        {
          id: '3',
          message: 'You received a new booking request',
          type: 'success',
          createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          isRead: true,
          link: '/messages',
        }
      ];

      // Calculate unread count
      const unread = mockNotifications.filter(n => !n.isRead).length;

      setNotifications(mockNotifications);
      setUnreadCount(unread);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Mock marking a notification as read
  const markAsRead = useCallback(async (id: string) => {
    if (!user) return;

    try {
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

  // Mock marking all notifications as read
  const markAllAsRead = useCallback(async () => {
    if (!user) return;

    try {
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

  // Set up initial fetch
  useEffect(() => {
    if (!user) return;
    fetchNotifications();
  }, [user, fetchNotifications]);

  return {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markAsRead,
    markAllAsRead
  };
};
