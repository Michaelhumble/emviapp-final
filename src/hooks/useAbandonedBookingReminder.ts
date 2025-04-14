
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';

export const useAbandonedBookingReminder = () => {
  const { user } = useAuth();
  const [abandonedBooking, setAbandonedBooking] = useState<string | null>(null);
  const [serviceName, setServiceName] = useState<string>('your appointment');
  
  useEffect(() => {
    if (!user) return;
    
    const checkForAbandonedBookings = async () => {
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            id,
            service_id,
            last_activity,
            services(title)
          `)
          .eq('sender_id', user.id)
          .eq('status', 'draft')
          .order('last_activity', { ascending: false })
          .limit(1)
          .single();
        
        if (error || !data) return;
        
        // Check if the booking was abandoned (last activity > 5 minutes ago)
        const lastActivity = new Date(data.last_activity);
        const fiveMinutesAgo = new Date();
        fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
        
        if (lastActivity < fiveMinutesAgo) {
          setAbandonedBooking(data.id);
          
          // Set service name if available
          if (data.services?.title) {
            setServiceName(data.services.title);
          }
        }
      } catch (err) {
        // No abandoned bookings, or error occurred
        console.log('No abandoned bookings found');
      }
    };
    
    // Check on first load
    checkForAbandonedBookings();
    
    // Check every 5 minutes
    const interval = setInterval(checkForAbandonedBookings, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [user]);
  
  const dismissAbandonedBooking = () => {
    setAbandonedBooking(null);
  };
  
  return { abandonedBooking, serviceName, dismissAbandonedBooking };
};
