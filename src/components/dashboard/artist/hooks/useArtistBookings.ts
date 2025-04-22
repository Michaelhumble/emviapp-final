
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export interface Booking {
  id: string;
  sender_id: string;
  recipient_id: string;
  client_name?: string;
  service_name?: string;
  date_requested?: string;
  time_requested?: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled';
  created_at: string;
  note?: string;
}

export const useArtistBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        
        if (!user?.id) return;
        
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            sender:sender_id(full_name),
            service:service_id(title)
          `)
          .eq('recipient_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        const formattedBookings: Booking[] = (data || []).map((booking: any) => ({
          id: booking.id,
          sender_id: booking.sender_id,
          recipient_id: booking.recipient_id,
          client_name: booking.sender?.full_name || 'Client',
          service_name: booking.service?.title || 'Service',
          date_requested: booking.date_requested,
          time_requested: booking.time_requested,
          status: validateStatus(booking.status),
          created_at: booking.created_at,
          note: booking.note
        }));
        
        setBookings(formattedBookings);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError(err as Error);
        toast.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };
    
    // Helper function to validate status
    const validateStatus = (status: string): Booking['status'] => {
      const validStatuses: Booking['status'][] = ['pending', 'accepted', 'declined', 'completed', 'cancelled'];
      return validStatuses.includes(status as Booking['status']) 
        ? status as Booking['status'] 
        : 'pending';
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
    handleAccept,
    handleDecline
  };
};
