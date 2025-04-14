
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
        // First check if last_activity column exists
        const { data: columnsData } = await supabase
          .from('bookings')
          .select('*')
          .limit(1);
        
        // If last_activity doesn't exist, we'll use created_at instead
        const timeField = columnsData && 'last_activity' in columnsData[0] 
          ? 'last_activity' 
          : 'created_at';
        
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            id,
            service_id,
            created_at,
            services(title)
          `)
          .eq('sender_id', user.id)
          .eq('status', 'draft')
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (error || !data || data.length === 0) return;
        
        // Check if the booking was abandoned (created_at > 5 minutes ago)
        const lastActivity = new Date(data[0].created_at);
        const fiveMinutesAgo = new Date();
        fiveMinutesAgo.setMinutes(fiveMinutesAgo.getMinutes() - 5);
        
        if (lastActivity < fiveMinutesAgo) {
          setAbandonedBooking(data[0].id);
          
          // Set service name if available
          if (data[0].services?.title) {
            setServiceName(data[0].services.title);
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
