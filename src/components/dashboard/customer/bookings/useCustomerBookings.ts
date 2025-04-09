
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CustomerBooking } from './types';
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
        
        // Define explicit type for the raw data to prevent excessive type instantiation
        type BookingRawData = {
          id: string;
          created_at: string;
          date_requested: string | null;
          time_requested: string | null;
          status: string | null;
          note: string | null;
          service_id: string | null;
          service: {
            id: string;
            title: string;
            price: number;
          } | null;
          artist: {
            id: string;
            full_name: string;
            avatar_url?: string;
          } | null;
        };
        
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
            artist:artist_id (id, full_name, avatar_url)
          `)
          .eq('customer_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        // Transform the data to ensure it matches the CustomerBooking type
        const typedBookings: CustomerBooking[] = (data as BookingRawData[]).map(item => {
          // Create the booking object with default null for artist
          const booking: CustomerBooking = {
            id: item.id,
            created_at: item.created_at,
            date_requested: item.date_requested,
            time_requested: item.time_requested,
            status: item.status || undefined,
            note: item.note || undefined,
            service_id: item.service_id || undefined,
            service: item.service,
            artist: null // Default to null
          };
          
          // Only set artist if it's a valid object with the expected properties
          if (
            item.artist && 
            typeof item.artist === 'object' && 
            !('error' in item.artist) && 
            item.artist !== null
          ) {
            // After the check above, we know item.artist is not null
            booking.artist = {
              id: item.artist.id,
              full_name: item.artist.full_name,
              avatar_url: item.artist.avatar_url
            };
          }
          
          return booking;
        });
        
        setBookings(typedBookings);
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
