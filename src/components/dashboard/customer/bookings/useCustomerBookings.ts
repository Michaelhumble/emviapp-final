
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { CustomerBooking } from './types';

export const useCustomerBookings = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['customer-bookings', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id, 
          created_at, 
          date_requested, 
          time_requested,
          status, 
          note,
          service_id,
          service:service_id (id, title, price),
          artist:recipient_id (id, full_name, avatar_url)
        `)
        .eq('sender_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Transform data to handle potential errors with the artist relation
      return (data || []).map(item => {
        // Check if artist is an error object (has 'error' property)
        if (item.artist && typeof item.artist === 'object' && 'error' in item.artist) {
          const booking: CustomerBooking = {
            ...item,
            artist: null
          };
          return booking;
        }
        return item as CustomerBooking;
      });
    },
    enabled: !!user,
  });
};
