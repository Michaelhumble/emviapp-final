
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { useNotificationContext } from '@/context/notification';

export const useBookingNotifications = () => {
  const { user } = useAuth();
  const { sendNotification } = useNotificationContext();
  
  useEffect(() => {
    if (!user) return;
    
    // Subscribe to booking status changes
    const channel = supabase
      .channel('booking-updates')
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'bookings',
        filter: `recipient_id=eq.${user.id}`
      }, (payload) => {
        const oldStatus = payload.old.status;
        const newStatus = payload.new.status;
        
        // Only notify on status changes
        if (oldStatus === newStatus) return;
        
        // Create different notifications based on status
        if (newStatus === 'confirmed') {
          sendNotification({
            type: 'success',
            message: 'A booking has been confirmed',
            link: '/dashboard',
            details: { bookingId: payload.new.id }
          });
        } else if (newStatus === 'cancelled') {
          sendNotification({
            type: 'error',
            message: 'A booking has been cancelled',
            link: '/dashboard',
            details: { bookingId: payload.new.id }
          });
        } else if (newStatus === 'completed') {
          sendNotification({
            type: 'success',
            message: 'A booking has been marked as completed',
            link: '/dashboard',
            details: { bookingId: payload.new.id }
          });
        }
      })
      .subscribe();
    
    // Cleanup subscription on unmount
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, sendNotification]);
};
