
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CustomerBooking } from './types';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { useSafeAsync } from '@/hooks/useSafeHook';

export const useCustomerBookings = () => {
  const { user } = useAuth();

  const { data: bookings, isLoading: loading, error, execute: refreshBookings } = useSafeAsync<CustomerBooking[]>(
    async () => {
      if (!user) throw new Error("User not authenticated");
      
      // Get bookings directly without trying to join with artist
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id, 
          created_at, 
          date_requested, 
          time_requested, 
          status, 
          note,
          service_id,
          service:service_id (id, title, price),
          recipient_id
        `)
        .eq('sender_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      if (!data) {
        return [];
      }
      
      // Now we need to fetch artist details separately
      const enhancedBookings = await Promise.all(data.map(async (booking) => {
        let artistData = null;
        
        // Fetch artist (recipient) details
        if (booking.recipient_id) {
          try {
            const { data: artist, error: artistError } = await supabase
              .from('users')
              .select('id, full_name, avatar_url')
              .eq('id', booking.recipient_id)
              .single();
              
            if (!artistError && artist) {
              artistData = artist;
            }
          } catch (error) {
            console.warn(`Failed to fetch artist data for booking ${booking.id}:`, error);
            // Don't throw here, just continue with null artist data
          }
        }
        
        // Create the booking object with the right structure
        return {
          id: booking.id,
          created_at: booking.created_at,
          date_requested: booking.date_requested,
          time_requested: booking.time_requested,
          status: booking.status || undefined,
          note: booking.note || undefined,
          service_id: booking.service_id || undefined,
          service: booking.service,
          artist: artistData // May be null if not found
        } as CustomerBooking;
      }));
      
      return enhancedBookings;
    },
    [user?.id],
    {
      fallbackData: [],
      onError: (error) => {
        console.error('Error fetching bookings:', error);
        toast.error('Could not load your bookings. Please try again later.');
      }
    }
  );

  return { 
    bookings: bookings || [], 
    loading, 
    error: error?.message || null,
    refresh: refreshBookings
  };
};
