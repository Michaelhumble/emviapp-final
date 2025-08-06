
import { useState, useEffect, useCallback } from "react";
import { supabaseBypass } from "@/types/supabase-bypass";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

export interface BookingCounts {
  pending: number;
  accepted: number;
  completed: number;
  declined: number;
  cancelled: number;
  total: number;
}

export interface Booking {
  id: string;
  sender_id: string;
  recipient_id: string;
  client_name?: string;
  client_avatar?: string;
  service_id?: string;
  service_name?: string;
  date_requested?: string;
  time_requested?: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled';
  note?: string;
  created_at: string;
}

export const useArtistBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [serviceTypes, setServiceTypes] = useState<string[]>([]);
  const { user } = useAuth();
  
  const fetchBookings = useCallback(async () => {
    if (!user?.id) {
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Fetch real bookings from Supabase
      const { data, error: fetchError } = await supabaseBypass
        .from("bookings")
        .select("*")
        .eq("recipient_id", user.id)
        .order("date_requested", { ascending: false })
        .order("time_requested", { ascending: false });
      
      if (fetchError) throw fetchError;
      
      // Convert database status strings to our enum type
      const typedBookings = (data || []).map(booking => ({
        ...booking,
        status: booking.status as 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled'
      }));
      
      setBookings(typedBookings);
      
      // Extract unique service types
      const uniqueServiceTypes = Array.from(
        new Set(
          (data || [])
            .filter(booking => booking.service_type)
            .map(booking => booking.service_type as string)
        )
      );
      
      setServiceTypes(uniqueServiceTypes as string[]);
    } catch (err: any) {
      console.error('Error fetching bookings:', err);
      setError("Failed to load bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);
  
  useEffect(() => {
    fetchBookings();
    
    // Set up real-time subscription for bookings table changes
    const subscription = supabaseBypass
      .channel('bookings_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings',
          filter: `recipient_id=eq.${user?.id}`
        },
        () => {
          // Refetch bookings when data changes
          fetchBookings();
        }
      )
      .subscribe();

    return () => {
      supabaseBypass.removeChannel(subscription);
    };
  }, [user?.id, fetchBookings]);
  
  const handleAccept = async (bookingId: string) => {
    if (!user?.id) return;
    
    try {
      const { error } = await supabaseBypass
        .from("bookings")
        .update({ status: "accepted" })
        .eq("id", bookingId)
        .eq("recipient_id", user.id);
      
      if (error) throw error;
      
      // Update local state
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'accepted' as const } 
          : booking
      ));
      
      toast.success('Booking accepted successfully');
    } catch (err) {
      console.error('Error accepting booking:', err);
      toast.error('Failed to accept booking');
    }
  };
  
  const handleDecline = async (bookingId: string) => {
    if (!user?.id) return;
    
    try {
      const { error } = await supabaseBypass
        .from("bookings")
        .update({ status: "declined" })
        .eq("id", bookingId)
        .eq("recipient_id", user.id);
      
      if (error) throw error;
      
      // Update local state
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: 'declined' as const } 
          : booking
      ));
      
      toast.success('Booking declined');
    } catch (err) {
      console.error('Error declining booking:', err);
      toast.error('Failed to decline booking');
    }
  };
  
  // Calculate booking counts
  const calculateCounts = (): BookingCounts => {
    const pending = bookings.filter(b => b.status === 'pending').length;
    const accepted = bookings.filter(b => b.status === 'accepted').length;
    const completed = bookings.filter(b => b.status === 'completed').length;
    const declined = bookings.filter(b => b.status === 'declined').length;
    const cancelled = bookings.filter(b => b.status === 'cancelled').length;
    const total = bookings.length;
    
    return {
      pending,
      accepted,
      completed,
      declined,
      cancelled,
      total
    };
  };
  
  return {
    bookings,
    loading,
    error,
    refresh: fetchBookings,
    handleAccept,
    handleDecline,
    serviceTypes,
    counts: calculateCounts()
  };
};
