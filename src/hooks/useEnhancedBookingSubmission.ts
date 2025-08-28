import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { BookingRequest, BookingAnalyticsEvent, BookingCRMLead } from '@/lib/booking/types';

interface BookingSubmissionResult {
  success: boolean;
  booking_id?: string;
  error?: string;
}

export const useBookingSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitBooking = async (bookingRequest: BookingRequest): Promise<BookingSubmissionResult> => {
    setIsSubmitting(true);

    try {
      // First, validate the slot is still available
      const conflictCheck = await supabase.rpc('check_booking_conflicts', {
        p_artist_id: bookingRequest.artist_id,
        p_starts_at: bookingRequest.starts_at,
        p_ends_at: bookingRequest.ends_at
      });

      if (conflictCheck.error) {
        throw new Error('Failed to validate time slot availability');
      }

      if (conflictCheck.data) {
        throw new Error('This time slot is no longer available. Please select another time.');
      }

      // Create the booking with enhanced data
      const { data: bookingData, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          recipient_id: bookingRequest.artist_id,
          sender_id: null, // Guest booking
          service_id: bookingRequest.service_id,
          client_name: bookingRequest.client_name,
          client_email: bookingRequest.client_email,
          client_phone: bookingRequest.client_phone,
          starts_at: bookingRequest.starts_at,
          ends_at: bookingRequest.ends_at,
          date_requested: new Date(bookingRequest.starts_at).toISOString().split('T')[0],
          time_requested: new Date(bookingRequest.starts_at).toTimeString().slice(0, 5),
          status: 'pending',
          source: bookingRequest.source || 'web',
          note: bookingRequest.notes,
          metadata: {
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            user_agent: navigator.userAgent,
            submitted_at: new Date().toISOString()
          }
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      const bookingId = bookingData.id;

      // Send confirmation emails asynchronously
      try {
        await supabase.functions.invoke('send-booking-confirmation', {
          body: {
            booking_id: bookingId,
            booking_data: bookingData,
            client_email: bookingRequest.client_email,
            client_name: bookingRequest.client_name,
            artist_id: bookingRequest.artist_id
          }
        });
      } catch (emailError) {
        console.warn('Email notification failed:', emailError);
        // Don't fail the booking if email fails
      }

      // Fire analytics event
      try {
        const analyticsEvent: BookingAnalyticsEvent = {
          event_name: 'booking_submitted',
          artist_id: bookingRequest.artist_id,
          service_id: bookingRequest.service_id,
          source: bookingRequest.source || 'web',
          timestamp: new Date().toISOString()
        };

        // Send to GA4 if available
        if (typeof (window as any).gtag !== 'undefined') {
          (window as any).gtag('event', 'booking_submitted', {
            artist_id: bookingRequest.artist_id,
            service_id: bookingRequest.service_id,
            source: bookingRequest.source || 'web',
            value: 1
          });
        }
      } catch (analyticsError) {
        console.warn('Analytics tracking failed:', analyticsError);
      }

      // Send lead to HubSpot CRM
      try {
        const crmLead: BookingCRMLead = {
          email: bookingRequest.client_email,
          name: bookingRequest.client_name,
          phone: bookingRequest.client_phone,
          source: 'booking',
          artist_id: bookingRequest.artist_id,
          booking_date: bookingRequest.starts_at,
          metadata: {
            service_id: bookingRequest.service_id,
            notes: bookingRequest.notes,
            booking_id: bookingId
          }
        };

        await supabase.functions.invoke('hubspot-contact', {
          body: crmLead
        });
      } catch (crmError) {
        console.warn('CRM integration failed:', crmError);
        // Don't fail the booking if CRM fails
      }

      toast.success('Booking request sent successfully!');
      
      return {
        success: true,
        booking_id: bookingId
      };

    } catch (error) {
      console.error('Booking submission failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit booking request';
      toast.error(errorMessage);
      
      return {
        success: false,
        error: errorMessage
      };
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    submitBooking,
    isSubmitting
  };
};