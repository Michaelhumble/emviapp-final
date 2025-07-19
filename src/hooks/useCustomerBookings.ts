
import { useState, useEffect } from 'react';
import { supabaseBypass } from "@/types/supabase-bypass";
import { CustomerBooking } from '@/components/dashboard/customer/bookings/types';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export const useCustomerBookings = () => {
  const [bookings, setBookings] = useState<CustomerBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Get bookings directly without trying to join with artist
        const { data, error } = await supabaseBypass
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
            recipient_id
          `)
          .eq('sender_id', user.id as any)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        if (!data) {
          setBookings([]);
          return;
        }
        
        // Now we need to fetch artist details separately
        const enhancedBookings = await Promise.all((data as any[]).map(async (booking: any) => {
          let artistData = null;
          
          // Fetch artist (recipient) details
          if (booking?.recipient_id) {
            const { data: artist, error: artistError } = await supabaseBypass
              .from('profiles')
              .select('id, full_name, avatar_url')
              .eq('id', booking.recipient_id as any)
              .single();
              
            if (!artistError && artist) {
              artistData = artist;
            }
          }
          
          // Create the booking object with the right structure
          return {
            id: booking?.id,
            created_at: booking?.created_at,
            date_requested: booking?.date_requested,
            time_requested: booking?.time_requested,
            status: booking?.status || undefined,
            note: booking?.note || undefined,
            service_id: booking?.service_id || undefined,
            service: booking?.service,
            artist: artistData // May be null if not found
          } as CustomerBooking;
        }));
        
        setBookings(enhancedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to load bookings. Please try again later.');
        toast.error('Could not load your bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

  return { bookings, loading, error };
};
