// 🚀 REAL-TIME BOOKING HOOK - Universal Dashboard Sync
// Powers instant updates across ALL dashboards

import { useState, useEffect, useCallback } from 'react';
import { bookingEngine, BookingEvent } from '@/lib/bookingEngine';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { analytics } from '@/lib/analytics';
import { toast } from 'sonner';

export interface BookingData {
  id: string;
  sender_id: string;
  recipient_id: string;
  service_id?: string;
  date_requested: string;
  time_requested: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'no_show';
  note?: string;
  created_at: string;
  updated_at: string;
  payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
  amount_paid?: number;
  service?: {
    id: string;
    name: string;
    price: number;
    duration?: number;
  };
  customer?: {
    id: string;
    full_name: string;
    email: string;
    avatar_url?: string;
  };
  artist?: {
    id: string;
    full_name: string;
    email: string;
    avatar_url?: string;
  };
}

export interface UseRealTimeBookingsReturn {
  bookings: BookingData[];
  loading: boolean;
  error: string | null;
  createBooking: (bookingData: any) => Promise<{ success: boolean; booking?: any; payment_intent?: any; error?: string }>;
  updateBooking: (bookingId: string, updates: Partial<BookingData>) => Promise<boolean>;
  cancelBooking: (bookingId: string, reason?: string) => Promise<boolean>;
  refreshBookings: () => Promise<void>;
  stats: {
    total: number;
    pending: number;
    confirmed: number;
    completed: number;
    cancelled: number;
  };
}

export const useRealTimeBookings = (
  userRole: 'customer' | 'artist' | 'salon' | 'all' = 'all'
): UseRealTimeBookingsReturn => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 📊 Calculate stats
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  };

  // 🔄 Fetch bookings based on user role
  const fetchBookings = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      let query = supabase
        .from('bookings')
        .select(`
          id,
          sender_id,
          recipient_id,
          service_id,
          date_requested,
          time_requested,
          status,
          note,
          created_at,
          updated_at,
          payment_status,
          amount_paid,
          service:service_id (
            id,
            name,
            price,
            duration
          )
        `)
        .order('created_at', { ascending: false });

      // Filter based on user role
      switch (userRole) {
        case 'customer':
          query = query.eq('sender_id', user.id);
          break;
        case 'artist':
          query = query.eq('recipient_id', user.id);
          break;
        case 'salon':
          // Get bookings for salon artists
          const { data: salonStaff } = await supabase
            .from('salon_staff')
            .select('user_id')
            .eq('salon_id', user.id);
          
          if (salonStaff && salonStaff.length > 0) {
            const artistIds = salonStaff.map(s => s.user_id).filter(Boolean);
            query = query.in('recipient_id', artistIds);
          }
          break;
        case 'all':
          query = query.or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`);
          break;
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      // Enhance with customer/artist details
      const enhancedBookings = await Promise.all(
        (data || []).map(async (booking: any) => {
          const enhanced: any = { ...booking };

          // Fetch customer details
          if (booking.sender_id) {
            const { data: customer } = await supabase
              .from('profiles')
              .select('id, full_name, email, avatar_url')
              .eq('id', booking.sender_id)
              .single();
            enhanced.customer = customer;
          }

          // Fetch artist details
          if (booking.recipient_id) {
            const { data: artist } = await supabase
              .from('profiles')
              .select('id, full_name, email, avatar_url')
              .eq('id', booking.recipient_id)
              .single();
            enhanced.artist = artist;
          }

          return enhanced;
        })
      );

      setBookings(enhancedBookings);
      
      // Track analytics
      analytics.trackEvent({
        action: 'bookings_loaded',
        category: 'dashboard',
        label: userRole,
        custom_parameters: {
          booking_count: enhancedBookings.length,
          user_role: userRole
        }
      });

    } catch (err: any) {
      console.error('❌ Failed to fetch bookings:', err);
      setError(err.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  }, [user, userRole]);

  // 🔄 Real-time sync
  useEffect(() => {
    if (!user) return;

    fetchBookings();

    // Listen for real-time booking events
    const handleBookingEvent = (eventData: any) => {
      console.log('📡 Real-time booking event received:', eventData);
      
      // Refresh bookings on any change
      fetchBookings();

      // Show toast notifications
      if (eventData.type === 'booking_created') {
        toast.success('New booking received!');
      } else if (eventData.type === 'booking_cancelled') {
        toast.info('Booking was cancelled');
      } else if (eventData.type === 'booking_confirmed') {
        toast.success('Booking confirmed!');
      }
    };

    bookingEngine.on('booking_event', handleBookingEvent);

    return () => {
      // Cleanup is handled by the booking engine
    };
  }, [user, fetchBookings]);

  // 💳 Create booking with payment
  const createBooking = useCallback(async (bookingData: {
    artist_id: string;
    service_id: string;
    date_requested: string;
    time_requested: string;
    note?: string;
  }) => {
    if (!user) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const result = await bookingEngine.createBookingWithPayment({
        customer_id: user.id,
        artist_id: bookingData.artist_id,
        service_id: bookingData.service_id,
        date_requested: bookingData.date_requested,
        time_requested: bookingData.time_requested,
        note: bookingData.note
      });

      if (result.conflicts.length > 0) {
        return {
          success: false,
          error: result.conflicts.map(c => c.message).join(', ')
        };
      }

      // Refresh bookings after creation
      await fetchBookings();

      return {
        success: true,
        booking: result.booking,
        payment_intent: result.payment_intent
      };
    } catch (err: any) {
      console.error('❌ Failed to create booking:', err);
      return { success: false, error: err.message };
    }
  }, [user, fetchBookings]);

  // ✏️ Update booking
  const updateBooking = useCallback(async (bookingId: string, updates: Partial<BookingData>) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update(updates)
        .eq('id', bookingId);

      if (error) throw error;

      // Real-time will handle the update, but refresh for immediate feedback
      await fetchBookings();

      analytics.trackEvent({
        action: 'booking_updated',
        category: 'booking_management',
        label: updates.status || 'unknown',
        custom_parameters: {
          booking_id: bookingId,
          updates: Object.keys(updates)
        }
      });

      return true;
    } catch (err: any) {
      console.error('❌ Failed to update booking:', err);
      toast.error('Failed to update booking');
      return false;
    }
  }, [fetchBookings]);

  // ❌ Cancel booking
  const cancelBooking = useCallback(async (bookingId: string, reason?: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ 
          status: 'cancelled',
          note: reason ? `Cancelled: ${reason}` : 'Cancelled by user'
        })
        .eq('id', bookingId);

      if (error) throw error;

      toast.success('Booking cancelled successfully');

      analytics.trackEvent({
        action: 'booking_cancelled',
        category: 'booking_management',
        label: reason || 'user_request',
        custom_parameters: {
          booking_id: bookingId,
          cancellation_reason: reason
        }
      });

      return true;
    } catch (err: any) {
      console.error('❌ Failed to cancel booking:', err);
      toast.error('Failed to cancel booking');
      return false;
    }
  }, []);

  return {
    bookings,
    loading,
    error,
    createBooking,
    updateBooking,
    cancelBooking,
    refreshBookings: fetchBookings,
    stats
  };
};