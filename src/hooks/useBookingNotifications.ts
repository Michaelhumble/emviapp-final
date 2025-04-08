
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { useCustomerNotifications } from './notifications/useCustomerNotifications';
import { useArtistNotifications } from './notifications/useArtistNotifications';

interface BookingChangePayload {
  new: {
    id: string;
    sender_id: string;
    recipient_id: string;
    status: string;
    date_requested: string;
    time_requested: string;
    service_id?: string;
  };
  old?: {
    status?: string;
  };
}

/**
 * Hook to listen for booking changes and display notifications
 */
export const useBookingNotifications = () => {
  const { user } = useAuth();
  const { handleNewBookingCreated, handleBookingStatusChange } = useCustomerNotifications();
  const { handleNewBookingReceived, handleBookingStatusChange: handleArtistBookingStatusChange } = useArtistNotifications();

  useEffect(() => {
    if (!user) return;

    // Set up channel for bookings where user is involved
    const channel = supabase
      .channel('booking-notifications')
      // Listen for new bookings created by this user (customer creating booking)
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'bookings',
          filter: `sender_id=eq.${user.id}`
        }, 
        async (payload) => {
          const booking = payload.new as BookingChangePayload['new'];
          await handleNewBookingCreated(booking);
        })
      // Listen for new bookings where user is the recipient (artist receiving booking)
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'bookings',
          filter: `recipient_id=eq.${user.id}`
        }, 
        async (payload) => {
          const booking = payload.new as BookingChangePayload['new'];
          await handleNewBookingReceived(booking);
        })
      // Listen for updates to bookings created by this user (customer's booking updated)
      .on('postgres_changes', 
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'bookings',
          filter: `sender_id=eq.${user.id}`
        }, 
        async (payload: BookingChangePayload) => {
          await handleBookingStatusChange(payload.new, payload.old?.status);
        })
      // Listen for updates to bookings where user is the recipient (artist's booking updated)
      .on('postgres_changes', 
        { 
          event: 'UPDATE', 
          schema: 'public', 
          table: 'bookings',
          filter: `recipient_id=eq.${user.id}`
        }, 
        async (payload: BookingChangePayload) => {
          await handleArtistBookingStatusChange(payload.new, payload.old?.status);
        })
      .subscribe();

    // Cleanup function
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return null; // This hook doesn't return anything, it just sets up listeners
};
