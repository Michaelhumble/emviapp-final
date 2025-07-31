import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { analytics } from '@/lib/analytics';

export interface GuestBookingData {
  client_name: string;
  client_email: string;
  client_phone: string;
  service_id?: string;
  service_name: string;
  artist_id: string;
  date: string;
  time: string;
  notes?: string;
  price?: number;
}

export const useGuestBooking = () => {
  const [submitting, setSubmitting] = useState(false);

  const submitGuestBooking = async (bookingData: GuestBookingData) => {
    setSubmitting(true);
    
    try {
      // Create booking as guest user (sender_id = null for guest)
      const { data, error } = await supabase
        .from('bookings')
        .insert({
          sender_id: null, // Guest booking
          recipient_id: bookingData.artist_id,
          client_name: bookingData.client_name,
          service_id: bookingData.service_id || null,
          date_requested: bookingData.date,
          time_requested: bookingData.time,
          status: 'pending',
          note: bookingData.notes,
          metadata: {
            client_email: bookingData.client_email,
            client_phone: bookingData.client_phone,
            service_name: bookingData.service_name,
            price: bookingData.price,
            is_guest_booking: true
          }
        })
        .select()
        .single();

      if (error) throw error;

      // Send confirmation email via edge function
      try {
        const { error: emailError } = await supabase.functions.invoke('send-booking-confirmation', {
          body: {
            booking_id: data.id,
            client_email: bookingData.client_email,
            client_name: bookingData.client_name,
            service_name: bookingData.service_name,
            date: bookingData.date,
            time: bookingData.time,
            artist_id: bookingData.artist_id
          }
        });

        if (emailError) {
          console.warn('Failed to send confirmation email:', emailError);
          // Don't fail the booking if email fails
        }
      } catch (emailErr) {
        console.warn('Email service error:', emailErr);
      }

      // Track analytics for guest booking
      analytics.trackBookingCreated({
        bookingId: data.id,
        serviceType: bookingData.service_name,
        servicePrice: bookingData.price || 0,
        artistId: bookingData.artist_id
      });

      toast.success('Booking request sent successfully!', {
        description: 'You will receive a confirmation email shortly.'
      });

      return { success: true, booking_id: data.id };
    } catch (error) {
      console.error('Guest booking error:', error);
      toast.error('Failed to submit booking request. Please try again.');
      return { success: false, error };
    } finally {
      setSubmitting(false);
    }
  };

  const checkAvailability = async (artistId: string, date: string, time: string) => {
    try {
      // Check for existing bookings at the same time
      const { data: existingBookings, error } = await supabase
        .from('bookings')
        .select('id')
        .eq('recipient_id', artistId)
        .eq('date_requested', date)
        .eq('time_requested', time)
        .in('status', ['pending', 'accepted']);

      if (error) throw error;

      return existingBookings.length === 0;
    } catch (error) {
      console.error('Error checking availability:', error);
      return false;
    }
  };

  return {
    submitGuestBooking,
    checkAvailability,
    submitting
  };
};