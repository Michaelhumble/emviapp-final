
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export function useBookingNotifications() {
  const { user } = useAuth();
  const [subscribed, setSubscribed] = useState(false);
  
  useEffect(() => {
    if (!user) return;
    
    // Subscribe to booking notifications
    const channel = supabase
      .channel(`booking-notifications-${user.id}`)
      .on('broadcast', { event: 'booking' }, (payload) => {
        console.log('Received booking notification:', payload);
        
        if (payload.type === 'new_booking') {
          toast.success('New booking received!');
        } else if (payload.type === 'booking_updated') {
          toast.info('A booking has been updated');
        } else if (payload.type === 'booking_cancelled') {
          toast.error('A booking has been cancelled');
        }
      })
      .subscribe();
      
    setSubscribed(true);
    
    // Cleanup function
    return () => {
      supabase.removeChannel(channel);
      setSubscribed(false);
    };
  }, [user]);
  
  return { subscribed };
}
