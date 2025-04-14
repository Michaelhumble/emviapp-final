
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { useNotificationContext } from '@/context/notification';

export const useBookingReminders = () => {
  const { user, userProfile } = useAuth();
  const { sendNotification } = useNotificationContext();
  const [initialized, setInitialized] = useState(false);
  
  // Check for upcoming bookings that need reminders
  useEffect(() => {
    if (!user || initialized) return;
    
    const checkUpcomingBookings = async () => {
      try {
        // Get current time
        const now = new Date();
        // Calculate 3 hours from now
        const threeHoursFromNow = new Date(now.getTime() + (3 * 60 * 60 * 1000));
        const fourHoursFromNow = new Date(now.getTime() + (4 * 60 * 60 * 1000));
        
        // Format dates for Supabase query
        const minTime = threeHoursFromNow.toISOString();
        const maxTime = fourHoursFromNow.toISOString();
        
        // Query for artist's or customer's bookings in the 3-4 hour window
        const { data, error } = await supabase
          .from('bookings')
          .select('*, services(title)')
          .or(`recipient_id.eq.${user.id},sender_id.eq.${user.id}`)
          .eq('status', 'accepted')
          .eq('reminder_sent', false)
          .gte('date_requested', new Date().toISOString().split('T')[0])
          .lt('time_requested', maxTime)
          .gt('time_requested', minTime);
          
        if (error) {
          console.error('Error checking upcoming bookings:', error);
          return;
        }
        
        // Process booking reminders
        if (data && data.length > 0) {
          for (const booking of data) {
            // Determine if user is artist or customer
            const isArtist = booking.recipient_id === user.id;
            
            // Get the other party's info
            const otherPartyId = isArtist ? booking.sender_id : booking.recipient_id;
            
            // Get other party's name
            const { data: otherPartyData } = await supabase
              .from('users')
              .select('full_name')
              .eq('id', otherPartyId)
              .single();
              
            const otherPartyName = otherPartyData?.full_name || 'someone';
            const serviceName = booking.services?.title || 'a service';
            
            // Create reminder message based on role
            const message = isArtist
              ? `📅 Reminder: You have an appointment with ${otherPartyName} for ${serviceName} in about 3 hours`
              : `📅 Reminder: Your appointment for ${serviceName} is coming up in about 3 hours`;
            
            // Show toast reminder
            toast(message, {
              duration: 8000,
              action: {
                label: "View",
                onClick: () => window.location.href = '/dashboard',
              },
            });
            
            // Create notification
            await sendNotification({
              type: 'booking_reminder',
              message,
              details: {
                booking_id: booking.id,
                service: serviceName,
                other_party: otherPartyName
              },
              link: '/dashboard'
            });
            
            // Mark reminder as sent
            await supabase
              .from('bookings')
              .update({ 
                reminder_sent: true,
                reminder_sent_at: new Date().toISOString()
              })
              .eq('id', booking.id);
          }
        }
        
        // Also check for pending bookings older than 24 hours
        const oneDayAgo = new Date(now.getTime() - (24 * 60 * 60 * 1000)).toISOString();
        
        const { data: pendingData, error: pendingError } = await supabase
          .from('bookings')
          .select('*, services(title)')
          .eq('recipient_id', user.id) // Only for artists
          .eq('status', 'pending')
          .lt('created_at', oneDayAgo);
          
        if (pendingError) {
          console.error('Error checking pending bookings:', pendingError);
          return;
        }
        
        // If the user is an artist and has pending bookings older than 24h
        if (
          (userProfile?.role === 'artist' || userProfile?.role === 'owner') && 
          pendingData && 
          pendingData.length > 0
        ) {
          // Only send this once a day
          const lastPendingReminder = localStorage.getItem('last_pending_reminder');
          const shouldSendReminder = !lastPendingReminder || 
            (new Date().getTime() - new Date(lastPendingReminder).getTime() > 24 * 60 * 60 * 1000);
            
          if (shouldSendReminder) {
            toast(`You have ${pendingData.length} pending booking request(s) waiting for your response`, {
              duration: 8000,
              action: {
                label: "Review",
                onClick: () => window.location.href = '/dashboard',
              },
            });
            
            // Create notification
            await sendNotification({
              type: 'booking_pending',
              message: `🕒 You have ${pendingData.length} pending booking request(s) that need your attention`,
              details: {
                count: pendingData.length
              },
              link: '/dashboard'
            });
            
            // Update localStorage to prevent duplicate reminders
            localStorage.setItem('last_pending_reminder', new Date().toISOString());
          }
        }
      } catch (err) {
        console.error('Error in booking reminders check:', err);
      }
    };
    
    // Run immediately and then every 15 minutes
    checkUpcomingBookings();
    const interval = setInterval(checkUpcomingBookings, 15 * 60 * 1000);
    
    setInitialized(true);
    
    return () => clearInterval(interval);
  }, [user, userProfile, initialized, sendNotification]);
  
  return { initialized };
};
