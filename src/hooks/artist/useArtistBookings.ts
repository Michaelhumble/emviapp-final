
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useArtistBookings = (artistId: string | undefined) => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [isLoadingBookings, setIsLoadingBookings] = useState(true);

  const fetchBookings = async () => {
    if (!artistId) return;
    
    try {
      setIsLoadingBookings(true);
      const { data } = await supabase
        .from('bookings')
        .select('*')
        .eq('recipient_id', artistId)
        .order('created_at', { ascending: false });
        
      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setIsLoadingBookings(false);
    }
  };

  return { bookings, isLoadingBookings, fetchBookings };
};
