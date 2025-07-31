
import React, { useState, useEffect } from 'react';
import { supabaseBypass } from '@/types/supabase-bypass';
import { CustomerBooking } from './types';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';
import { useOptimizedQuery } from '@/hooks/useOptimizedQuery';

export const useCustomerBookings = () => {
  const { user } = useAuth();

  const { data: bookings, isLoading: loading, error, refetch: refreshBookings } = useOptimizedQuery({
    queryKey: ['customer-bookings', user?.id],
    queryFn: async () => {
      if (!user) throw new Error("User not authenticated");
      
      // Get bookings with optimized query
      const { data, error } = await supabaseBypass
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
        .order('created_at', { ascending: false })
        .limit(50); // Limit results for performance
      
      if (error) throw error;
      
      if (!data || data.length === 0) {
        return [];
      }
      
      // Batch fetch artist details to reduce requests
      const recipientIds = [...new Set(data.map((booking: any) => booking.recipient_id).filter(Boolean))];
      let artistsMap = new Map();
      
      if (recipientIds.length > 0) {
        try {
          const { data: artists, error: artistError } = await supabaseBypass
            .from('profiles')
            .select('id, full_name, avatar_url')
            .in('id', recipientIds);
            
          if (!artistError && artists) {
            artists.forEach(artist => artistsMap.set(artist.id, artist));
          }
        } catch (error) {
          console.warn('Failed to fetch artist data:', error);
        }
      }
      
      // Map bookings with artist data
      return data.map((booking: any) => ({
        id: booking.id,
        created_at: booking.created_at,
        date_requested: booking.date_requested,
        time_requested: booking.time_requested,
        status: booking.status || undefined,
        note: booking.note || undefined,
        service_id: booking.service_id || undefined,
        service: booking.service,
        artist: artistsMap.get(booking.recipient_id) || null
      } as CustomerBooking));
    },
    enabled: !!user,
    staleTime: 2 * 60 * 1000, // 2 minutes
    dedupe: true,
    throttle: 200,
  });

  // Handle errors with toast
  React.useEffect(() => {
    if (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Could not load your bookings. Please try again later.');
    }
  }, [error]);

  return { 
    bookings: bookings || [], 
    loading, 
    error: error?.message || null,
    refresh: refreshBookings
  };
};
