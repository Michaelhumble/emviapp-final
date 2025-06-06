
import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";
import { Booking } from "@/types/booking";

export function useArtistBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("bookings")
        .select("id, client_name, service_type, date_requested, appointment_time, status")
        .eq("recipient_id", user.id)
        .order("date_requested", { ascending: false })
        .order("appointment_time", { ascending: false });

      if (fetchError) throw fetchError;

      const mapped: Booking[] = (data || []).map((b) => ({
        id: b.id,
        sender_id: '',
        recipient_id: user.id,
        client_name: b.client_name,
        service_type: b.service_type,
        appointment_date: b.date_requested,
        appointment_time: b.appointment_time,
        date_requested: b.date_requested,
        time_requested: b.appointment_time,
        service_name: b.service_type,
        status: b.status as 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled',
        created_at: new Date().toISOString(),
      }));

      setBookings(mapped);
    } catch (err) {
      setError("Failed to load bookings, please try again.");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  const handleAccept = async (bookingId: string) => {
    if (!user?.id) return;
    
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "accepted" })
        .eq("id", bookingId)
        .eq("recipient_id", user.id);
      
      if (error) throw error;
      
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
      const { error } = await supabase
        .from("bookings")
        .update({ status: "declined" })
        .eq("id", bookingId)
        .eq("recipient_id", user.id);
      
      if (error) throw error;
      
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

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings, user?.id]);

  const refresh = fetchBookings;

  return { bookings, loading, error, refresh, handleAccept, handleDecline };
}
