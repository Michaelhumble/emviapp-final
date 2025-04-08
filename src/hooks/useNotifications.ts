
import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Notification, NotificationResponse } from '@/types/notification';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();

  // Fetch notifications from the server
  const fetchNotifications = useCallback(async () => {
    if (!user) {
      setNotifications([]);
      setUnreadCount(0);
      return;
    }

    setLoading(true);
    try {
      // Fetch notifications from the database - using the activity_log table
      const { data, error } = await supabase
        .from('activity_log')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;

      // Format notifications
      const formattedNotifications: Notification[] = data.map(item => ({
        id: item.id,
        message: item.description,
        type: item.activity_type as 'info' | 'warning' | 'success' | 'error',
        createdAt: item.created_at,
        isRead: item.metadata?.is_read || false,
        link: item.metadata?.link,
        metadata: item.metadata
      }));

      // Calculate unread count
      const unread = formattedNotifications.filter(n => !n.isRead).length;

      setNotifications(formattedNotifications);
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
      const notification = notifications.find(n => n.id === id);
      if (!notification) return;
      
      // Update the metadata field to mark as read
      const { error } = await supabase
        .from('activity_log')
        .update({ 
          metadata: { 
            ...notification.metadata,
            is_read: true 
          } 
        })
        .eq('id', id)
        .eq('user_id', user.id);

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
  }, [user, notifications]);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    if (!user) return;

    try {
      // Update each unread notification
      const unreadNotifications = notifications.filter(n => !n.isRead);
      
      for (const notification of unreadNotifications) {
        await supabase
          .from('activity_log')
          .update({ 
            metadata: { 
              ...notification.metadata,
              is_read: true 
            } 
          })
          .eq('id', notification.id)
          .eq('user_id', user.id);
      }

      // Update local state
      setNotifications(prev => 
        prev.map(notification => ({ ...notification, isRead: true }))
      );
      
      setUnreadCount(0);
      toast.success('All notifications marked as read');
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  }, [user, notifications]);

  // Set up activity tracking
  useEffect(() => {
    if (!user) return;

    // Initial fetch
    fetchNotifications();

    // Set up subscription for real-time updates
    const channel = supabase
      .channel('activity-log-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'activity_log',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          const newItem = payload.new as any;
          
          // Format the new notification
          const newNotification: Notification = {
            id: newItem.id,
            message: newItem.description,
            type: newItem.activity_type || 'info',
            createdAt: newItem.created_at,
            isRead: newItem.metadata?.is_read || false,
            link: newItem.metadata?.link,
            metadata: newItem.metadata
          };

          // Update state with new notification
          setNotifications(prev => [newNotification, ...prev]);
          
          if (!newNotification.isRead) {
            setUnreadCount(prev => prev + 1);
          }

          // Show toast for new notification
          toast(newNotification.message, {
            description: 'You have a new notification',
            action: {
              label: 'View',
              onClick: () => markAsRead(newNotification.id)
            }
          });
        }
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchNotifications, markAsRead]);

  return {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markAsRead,
    markAllAsRead
  };
};
