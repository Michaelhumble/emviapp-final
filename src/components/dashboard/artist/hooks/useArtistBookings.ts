import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { Booking, BookingCounts } from "../types/ArtistDashboardTypes";

export const useArtistBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const [counts, setCounts] = useState<BookingCounts>({
    pending: 0,
    accepted: 0,
    completed: 0,
    total: 0
  });
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        if (!user) return;

        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            sender:sender_id(full_name, avatar_url),
            service:service_id(title)
          `)
          .eq('recipient_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;

        const formattedBookings: Booking[] = (data || []).map((booking: any) => ({
          id: booking.id,
          sender_id: booking.sender_id,
          recipient_id: booking.recipient_id,
          client_name: booking.sender?.full_name || 'Unknown Client',
          client_avatar: booking.sender?.avatar_url || '',
          service_id: booking.service_id,
          service_name: booking.service?.title || 'Custom Service',
          date_requested: booking.date_requested,
          time_requested: booking.time_requested,
          status: booking.status,
          note: booking.note,
          created_at: booking.created_at
        }));

        // Calculate booking counts
        const calculatedCounts: BookingCounts = {
          pending: formattedBookings.filter(b => b.status === 'pending').length,
          accepted: formattedBookings.filter(b => b.status === 'accepted').length,
          completed: formattedBookings.filter(b => b.status === 'completed').length,
          total: formattedBookings.length,
          declined: formattedBookings.filter(b => b.status === 'declined').length,
          cancelled: formattedBookings.filter(b => b.status === 'cancelled').length
        };

        setBookings(formattedBookings);
        setCounts(calculatedCounts);

        // Extract service types
        const uniqueServiceTypes = [...new Set(
          formattedBookings
            .map(b => b.service_name)
            .filter(Boolean)
        )];
        setServiceTypes(uniqueServiceTypes);

      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError(error as Error);
        toast.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user]);

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
    counts,
    serviceTypes,
    handleAccept,
    handleDecline
  };
};
