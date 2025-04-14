
import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNotificationContext } from '@/context/notification';

export interface NotificationPayload {
  type: 'booking_created' | 'booking_updated' | 'booking_cancelled' | 'booking_reminder' | 'booking_pending' | 'message_received' | 'credits_low' | 'weekly_summary' | 'profile_incomplete';
  message: string;
  details?: Record<string, any>;
  link?: string;
}

export const useNotificationSystem = () => {
  const { user, userProfile } = useAuth();
  const { fetchNotifications } = useNotificationContext();
  const [initialized, setInitialized] = useState(false);

  // Function to send a notification
  const sendNotification = useCallback(async (notification: NotificationPayload) => {
    if (!user) return;

    try {
      // Insert into notifications table
      const { error } = await supabase
        .from('notifications')
        .insert({
          user_id: user.id,
          type: notification.type,
          message: notification.message,
          is_read: false,
          link: notification.link || null,
          metadata: notification.details || {}
        });

      if (error) throw error;

      // Show toast notification
      toast(notification.message, {
        action: notification.link ? {
          label: "View",
          onClick: () => window.location.href = notification.link || '#',
        } : undefined,
        duration: 5000,
      });

      // Refresh notification list
      fetchNotifications();

    } catch (err) {
      console.error('Error sending notification:', err);
    }
  }, [user, fetchNotifications]);

  // Set up listener for booking changes
  useEffect(() => {
    if (!user || initialized) return;

    // Set up subscription to the user's notifications
    const channel = supabase
      .channel('notification-alerts')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'notifications',
          filter: `user_id=eq.${user.id}`
        }, 
        (payload) => {
          // Show toast for new notifications
          const notif = payload.new as any;
          toast(notif.message, {
            duration: 5000,
            action: notif.link ? {
              label: "View",
              onClick: () => window.location.href = notif.link || '#',
            } : undefined,
          });
        })
      .subscribe();

    // Check for low credits
    const checkLowCredits = async () => {
      try {
        if (userProfile && 'credits' in userProfile && userProfile.credits !== null) {
          const credits = userProfile.credits as number;
          
          // Low credits threshold
          if (credits < 3) {
            // Only notify once per day
            const lastLowCreditAlert = localStorage.getItem('last_low_credit_alert');
            const shouldAlert = !lastLowCreditAlert || 
              (new Date().getTime() - new Date(lastLowCreditAlert).getTime() > 24 * 60 * 60 * 1000);
              
            if (shouldAlert) {
              sendNotification({
                type: 'credits_low',
                message: '⚠️ Your Emvi credits are running low. Consider earning more to unlock premium features.',
                link: '/dashboard'
              });
              
              localStorage.setItem('last_low_credit_alert', new Date().toISOString());
            }
          }
        }
      } catch (err) {
        console.error('Error checking credits:', err);
      }
    };
    
    // Check for incomplete profile
    const checkIncompleteProfile = async () => {
      try {
        // Simple check based on empty fields that are important
        if (
          userProfile && 
          (!userProfile.full_name || 
           !userProfile.location || 
           !userProfile.avatar_url || 
           (userProfile.role === 'artist' && !userProfile.specialty))
        ) {
          // Only notify once per week
          const lastProfileAlert = localStorage.getItem('last_profile_alert');
          const shouldAlert = !lastProfileAlert || 
            (new Date().getTime() - new Date(lastProfileAlert).getTime() > 7 * 24 * 60 * 60 * 1000);
            
          if (shouldAlert) {
            sendNotification({
              type: 'profile_incomplete',
              message: '✏️ Your profile is incomplete. Complete it to get more visibility and bookings.',
              link: '/profile/edit'
            });
            
            localStorage.setItem('last_profile_alert', new Date().toISOString());
          }
        }
      } catch (err) {
        console.error('Error checking profile:', err);
      }
    };
    
    // Run checks
    checkLowCredits();
    checkIncompleteProfile();
    
    // Check weekly
    const weeklyChecks = setInterval(() => {
      checkLowCredits();
      checkIncompleteProfile();
    }, 7 * 24 * 60 * 60 * 1000);

    setInitialized(true);

    // Cleanup subscription
    return () => {
      supabase.removeChannel(channel);
      clearInterval(weeklyChecks);
    };
  }, [user, initialized, fetchNotifications, sendNotification, userProfile]);

  // Function to send booking reminder
  const sendBookingReminder = useCallback(async (userId: string, bookingId: string, bookingTime: string, customerName: string, serviceName: string) => {
    // Convert strings to dates for time calculation
    const bookingDate = new Date(bookingTime);
    const now = new Date();
    
    // Calculate hours difference
    const hoursDiff = Math.round((bookingDate.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    // Only send if it's approximately 3 hours before
    if (hoursDiff >= 2 && hoursDiff <= 4) {
      try {
        const { error } = await supabase
          .from('notifications')
          .insert({
            user_id: userId,
            type: 'booking_reminder',
            message: `Reminder: You have a booking with ${customerName} for ${serviceName} in ${hoursDiff} hours`,
            is_read: false,
            metadata: { booking_id: bookingId }
          });

        if (error) throw error;
      } catch (err) {
        console.error('Error sending booking reminder:', err);
      }
    }
  }, []);

  return {
    sendNotification,
    sendBookingReminder
  };
};
