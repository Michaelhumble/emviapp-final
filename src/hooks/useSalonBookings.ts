import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSalon } from '@/context/salon';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

export interface SalonBooking {
  id: string;
  salon_id: string;
  artist_id: string;
  client_name: string;
  client_email?: string;
  client_phone?: string;
  service_name: string;
  booking_date: string;
  booking_time: string;
  duration_minutes: number;
  notes?: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export const useSalonBookings = () => {
  const [bookings, setBookings] = useState<SalonBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { currentSalon } = useSalon();
  const { user } = useAuth();

  // Fetch bookings
  const fetchBookings = async () => {
    if (!currentSalon?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('salon_bookings')
        .select('*')
        .eq('salon_id', currentSalon.id)
        .order('booking_date', { ascending: true })
        .order('booking_time', { ascending: true });

      if (error) throw error;
      setBookings(data || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(err instanceof Error ? err : new Error('Failed to fetch bookings'));
    } finally {
      setLoading(false);
    }
  };

  // Create new booking
  const createBooking = async (bookingData: {
    client_name: string;
    client_email?: string;
    client_phone?: string;
    service_name: string;
    booking_date: string;
    booking_time: string;
    duration_minutes?: number;
    notes?: string;
  }) => {
    if (!currentSalon?.id || !user?.id) {
      toast.error('No salon selected or user not authenticated');
      return false;
    }

    try {
      const { error } = await supabase
        .from('salon_bookings')
        .insert({
          ...bookingData,
          salon_id: currentSalon.id,
          artist_id: user.id,
          duration_minutes: bookingData.duration_minutes || 60,
          status: 'confirmed'
        });

      if (error) throw error;
      
      await fetchBookings(); // Refresh the list
      toast.success(`Booking created for ${bookingData.client_name}!`);
      return true;
    } catch (err) {
      console.error('Error creating booking:', err);
      toast.error('Failed to create booking');
      return false;
    }
  };

  // Update booking
  const updateBooking = async (bookingId: string, updates: Partial<SalonBooking>) => {
    try {
      const { error } = await supabase
        .from('salon_bookings')
        .update(updates)
        .eq('id', bookingId);

      if (error) throw error;
      
      await fetchBookings(); // Refresh the list
      toast.success('Booking updated successfully!');
      return true;
    } catch (err) {
      console.error('Error updating booking:', err);
      toast.error('Failed to update booking');
      return false;
    }
  };

  // Delete booking
  const deleteBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from('salon_bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId);

      if (error) throw error;
      
      await fetchBookings(); // Refresh the list
      toast.success('Booking cancelled successfully');
      return true;
    } catch (err) {
      console.error('Error cancelling booking:', err);
      toast.error('Failed to cancel booking');
      return false;
    }
  };

  // Get bookings for a specific date range
  const getBookingsForWeek = (startDate: Date, endDate: Date) => {
    const start = startDate.toISOString().split('T')[0];
    const end = endDate.toISOString().split('T')[0];
    
    return bookings.filter(booking => 
      booking.booking_date >= start && booking.booking_date <= end
    );
  };

  useEffect(() => {
    fetchBookings();
  }, [currentSalon?.id]);

  return {
    bookings,
    loading,
    error,
    createBooking,
    updateBooking,
    deleteBooking,
    getBookingsForWeek,
    refetch: fetchBookings
  };
};