
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
  note?: string; // Added note property as optional
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
        
        // Transform raw booking data to match our Booking interface
        const formattedBookings: Booking[] = (data || []).map(booking => ({
          id: booking.id,
          sender_id: booking.sender_id,
          recipient_id: booking.recipient_id,
          client_name: booking.client_name || 'Client', // Use client_name if available or default to 'Client'
          service_name: booking.service_name || 'Service', // Use service_name if available or default to 'Service'
          date_requested: booking.date_requested,
          time_requested: booking.time_requested,
          // Ensure status is one of the expected values
          status: validateStatus(booking.status),
          created_at: booking.created_at,
          note: booking.note // Include the note field
        }));
        
        setBookings(formattedBookings);
        
        // Extract service types
        const services = [...new Set(formattedBookings.map(booking => booking.service_name) || [])];
        setServiceTypes(services.filter(Boolean) as string[]);
        
        // Calculate counts
        const pendingCount = formattedBookings.filter(booking => booking.status === 'pending').length || 0;
        const acceptedCount = formattedBookings.filter(booking => booking.status === 'accepted').length || 0;
        const completedCount = formattedBookings.filter(booking => booking.status === 'completed').length || 0;
        
        setCounts({
          pending: pendingCount,
          accepted: acceptedCount,
          completed: completedCount,
          total: formattedBookings.length || 0
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
  
  // Helper function to validate status is one of the expected values
  const validateStatus = (status: string): Booking['status'] => {
    const validStatuses: Booking['status'][] = ['pending', 'accepted', 'declined', 'completed', 'cancelled'];
    return validStatuses.includes(status as Booking['status']) 
      ? (status as Booking['status']) 
      : 'pending'; // Default to pending if invalid status
  };
  
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
