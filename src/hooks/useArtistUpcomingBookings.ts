
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { toast } from "sonner";

export interface BookingData {
  id: string;
  client_name?: string | null;
  service_type?: string | null;
  appointment_date?: string | null;
  appointment_time?: string | null;
  date_requested?: string | null;
  time_requested?: string | null;
  status: 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled';
  note?: string | null;
}

export function useArtistUpcomingBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBookings() {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Get upcoming bookings (status = pending, accepted)
        const { data, error: fetchError } = await supabase
          .from("bookings")
          .select("id, client_name, service_type, date_requested, time_requested, status, note")
          .eq("recipient_id", user.id)
          .in("status", ["pending", "accepted"]) 
          .order("date_requested", { ascending: true })
          .order("time_requested", { ascending: true })
          .limit(5);

        if (fetchError) throw fetchError;

        const mappedBookings = (data || []).map((booking) => ({
          id: booking.id,
          client_name: booking.client_name,
          service_type: booking.service_type,
          appointment_date: booking.date_requested,
          appointment_time: booking.time_requested,
          date_requested: booking.date_requested,
          time_requested: booking.time_requested,
          status: booking.status,
          note: booking.note
        }));

        setBookings(mappedBookings);
      } catch (err: any) {
        console.error("Error fetching bookings:", err);
        setError("Failed to fetch bookings. Please try again.");
        toast.error("Error loading bookings");
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
    
    // Set up real-time subscription for bookings table changes
    const subscription = supabase
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
      supabase.removeChannel(subscription);
    };
  }, [user?.id]);

  return { bookings, loading, error };
}
