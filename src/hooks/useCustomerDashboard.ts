
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { CustomerBooking } from '@/components/dashboard/customer/bookings/types';
import { toast } from 'sonner';

export interface CustomerFavorite {
  id: string;
  name: string;
  avatar_url?: string;
  type: 'artist' | 'salon';
  specialty?: string;
  location?: string;
}

export const useCustomerDashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<CustomerBooking[]>([]);
  const [favorites, setFavorites] = useState<CustomerFavorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        setError(null);
        
        // Fetch bookings
        const { data: bookingsData, error: bookingsError } = await supabase
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
          .eq('sender_id', user.id)
          .order('date_requested', { ascending: true })
          .order('created_at', { ascending: false });
        
        if (bookingsError) throw bookingsError;
        
        // Fetch artist details for each booking
        let enhancedBookings = [];
        if (bookingsData && bookingsData.length > 0) {
          enhancedBookings = await Promise.all(bookingsData.map(async (booking) => {
            let artistData = null;
            
            if (booking.recipient_id) {
              const { data: artist, error: artistError } = await supabase
                .from('users')
                .select('id, full_name, avatar_url')
                .eq('id', booking.recipient_id)
                .single();
                
              if (!artistError && artist) {
                artistData = artist;
              }
            }
            
            return {
              ...booking,
              artist: artistData
            } as CustomerBooking;
          }));
        }
        
        // Try to fetch favorites (saved artists)
        const { data: favoritesData, error: favoritesError } = await supabase
          .from('saved_artists')
          .select(`
            id,
            artist:artist_id (id, full_name, avatar_url, specialty, location)
          `)
          .eq('viewer_id', user.id);
          
        if (favoritesError) {
          console.error('Error fetching favorites:', favoritesError);
          // Continue execution - favorites are not critical
        }
        
        const formattedFavorites: CustomerFavorite[] = [];
        
        if (favoritesData && favoritesData.length > 0) {
          favoritesData.forEach(item => {
            if (item.artist) {
              formattedFavorites.push({
                id: item.id,
                name: item.artist.full_name,
                avatar_url: item.artist.avatar_url,
                type: 'artist',
                specialty: item.artist.specialty,
                location: item.artist.location
              });
            }
          });
        }
        
        setBookings(enhancedBookings);
        setFavorites(formattedFavorites);
      } catch (error) {
        console.error('Error fetching customer dashboard data:', error);
        setError('Failed to load your dashboard. Please try again later.');
        toast.error('Could not load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, [user]);

  return { 
    bookings, 
    upcomingBookings: bookings.filter(b => b.status !== 'completed' && b.status !== 'cancelled').slice(0, 3),
    previousBookings: bookings.filter(b => b.status === 'completed'),
    favorites, 
    loading, 
    error 
  };
};
