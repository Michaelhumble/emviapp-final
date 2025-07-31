import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { analytics } from '@/lib/analytics';

export interface ArtistBooking {
  id: string;
  sender_id: string;
  client_name: string;
  service_id?: string;
  service_name?: string;
  date_requested: string;
  time_requested: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled';
  note?: string;
  created_at: string;
  customer_phone?: string;
  customer_email?: string;
  duration_minutes?: number;
  price?: number;
}

export const useArtistBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<ArtistBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('bookings')
        .select(`
          id,
          sender_id,
          client_name,
          service_id,
          date_requested,
          time_requested,
          status,
          note,
          created_at,
          metadata
        `)
        .eq('recipient_id', user.id)
        .order('date_requested', { ascending: true })
        .order('time_requested', { ascending: true });

      if (fetchError) throw fetchError;

      // Fetch service details for bookings with service_id
      const serviceIds = data?.filter(b => b.service_id).map(b => b.service_id) || [];
      let servicesData: any[] = [];
      
      if (serviceIds.length > 0) {
        const { data: services, error: servicesError } = await supabase
          .from('services')
          .select('id, title, price, duration_minutes')
          .in('id', serviceIds);
        
        if (!servicesError) {
          servicesData = services || [];
        }
      }

      // Fetch customer details
      const customerIds = data?.map(b => b.sender_id).filter(Boolean) || [];
      let customersData: any[] = [];
      
      if (customerIds.length > 0) {
        const { data: customers, error: customersError } = await supabase
          .from('profiles')
          .select('id, full_name, phone, email')
          .in('id', customerIds);
        
        if (!customersError) {
          customersData = customers || [];
        }
      }

      // Map services and customers
      const servicesMap = new Map(servicesData.map(s => [s.id, s]));
      const customersMap = new Map(customersData.map(c => [c.id, c]));

      const formattedBookings: ArtistBooking[] = (data || []).map(booking => {
        const service = servicesMap.get(booking.service_id);
        const customer = customersMap.get(booking.sender_id);
        
        return {
          id: booking.id,
          sender_id: booking.sender_id,
          client_name: booking.client_name || customer?.full_name || 'Unknown Client',
          service_id: booking.service_id,
          service_name: service?.title || (booking.metadata as any)?.service_name || 'Service',
          date_requested: booking.date_requested,
          time_requested: booking.time_requested,
          status: booking.status as any,
          note: booking.note,
          created_at: booking.created_at,
          customer_phone: customer?.phone,
          customer_email: customer?.email,
          duration_minutes: service?.duration_minutes || 60,
          price: service?.price
        };
      });

      setBookings(formattedBookings);
    } catch (err) {
      console.error('Error fetching artist bookings:', err);
      setError(err instanceof Error ? err.message : 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  }, [user]);

  const updateBookingStatus = useCallback(async (
    bookingId: string, 
    newStatus: 'accepted' | 'declined' | 'completed'
  ) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId)
        .eq('recipient_id', user.id);

      if (error) throw error;

      // Update local state
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: newStatus }
          : booking
      ));

      // Track analytics
      analytics.trackEvent({
        action: 'booking_status_updated',
        category: 'booking_management',
        label: newStatus,
        custom_parameters: {
          booking_id: bookingId,
          new_status: newStatus,
          user_type: 'artist'
        }
      });

      toast.success(`Booking ${newStatus} successfully`);
      return true;
    } catch (err) {
      console.error('Error updating booking status:', err);
      toast.error('Failed to update booking status');
      return false;
    }
  }, [user]);

  const createManualBooking = useCallback(async (bookingData: {
    client_name: string;
    service_name: string;
    date: string;
    time: string;
    duration_minutes?: number;
    notes?: string;
    phone?: string;
    email?: string;
  }) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('bookings')
        .insert({
          sender_id: user.id, // Artist creating for themselves
          recipient_id: user.id,
          client_name: bookingData.client_name,
          date_requested: bookingData.date,
          time_requested: bookingData.time,
          status: 'accepted', // Manual bookings are auto-accepted
          note: bookingData.notes,
          metadata: {
            service_name: bookingData.service_name,
            duration_minutes: bookingData.duration_minutes || 60,
            is_manual: true,
            phone: bookingData.phone,
            email: bookingData.email
          }
        });

      if (error) throw error;

      // Refresh bookings
      await fetchBookings();

      // Track analytics
      analytics.trackEvent({
        action: 'manual_booking_created',
        category: 'booking_management',
        label: bookingData.service_name,
        custom_parameters: {
          service_name: bookingData.service_name,
          duration_minutes: bookingData.duration_minutes || 60,
          is_manual: true
        }
      });

      toast.success('Manual booking created successfully');
      return true;
    } catch (err) {
      console.error('Error creating manual booking:', err);
      toast.error('Failed to create manual booking');
      return false;
    }
  }, [user, fetchBookings]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Set up real-time updates
  useEffect(() => {
    if (!user) return;

    const channel = supabase.channel('artist-bookings')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings',
          filter: `recipient_id=eq.${user.id}`
        },
        () => {
          fetchBookings();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, fetchBookings]);

  return {
    bookings,
    loading,
    error,
    updateBookingStatus,
    createManualBooking,
    refreshBookings: fetchBookings
  };
};