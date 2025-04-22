
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export interface Booking {
  id: string;
  sender_id: string;
  recipient_id: string;
  client_name: string;
  service_name: string;
  date_requested: string;
  time_requested: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled';
  created_at: string;
}

export interface BookingCounts {
  pending: number;
  accepted: number;
  completed: number;
  total: number;
}

export const useArtistBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [counts, setCounts] = useState<BookingCounts>({
    pending: 0,
    accepted: 0,
    completed: 0,
    total: 0
  });
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        
        if (!user?.id) return;
        
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('recipient_id', user.id)
          .order('created_at', { ascending: false });
          
        if (error) throw error;
        
        setBookings(data || []);
        
        // Extract service types
        const services = [...new Set(data?.map(booking => booking.service_name) || [])];
        setServiceTypes(services.filter(Boolean) as string[]);
        
        // Calculate counts
        const pendingCount = data?.filter(booking => booking.status === 'pending').length || 0;
        const acceptedCount = data?.filter(booking => booking.status === 'accepted').length || 0;
        const completedCount = data?.filter(booking => booking.status === 'completed').length || 0;
        
        setCounts({
          pending: pendingCount,
          accepted: acceptedCount,
          completed: completedCount,
          total: data?.length || 0
        });
        
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, [user?.id]);
  
  const handleAccept = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'accepted' })
        .eq('id', bookingId);
        
      if (error) throw error;
      
      // Update local state
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'accepted' } 
            : booking
        )
      );
      
      // Update counts
      setCounts(prev => ({
        ...prev,
        pending: prev.pending - 1,
        accepted: prev.accepted + 1
      }));
      
      toast.success('Booking accepted successfully');
    } catch (err) {
      console.error('Error accepting booking:', err);
      toast.error('Failed to accept booking');
    }
  };
  
  const handleDecline = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'declined' })
        .eq('id', bookingId);
        
      if (error) throw error;
      
      // Update local state
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'declined' } 
            : booking
        )
      );
      
      // Update counts
      setCounts(prev => ({
        ...prev,
        pending: prev.pending - 1
      }));
      
      toast.success('Booking declined');
    } catch (err) {
      console.error('Error declining booking:', err);
      toast.error('Failed to decline booking');
    }
  };
  
  return {
    bookings,
    loading,
    error,
    counts,
    serviceTypes,
    handleAccept,
    handleDecline
  };
};
