
import { useState, useEffect } from "react";
import { supabaseBypass } from "@/types/supabase-bypass";
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
        const { data, error: fetchError } = await supabaseBypass
          .from("bookings")
          .select("id, client_name, service_type, date_requested, time_requested, status, note")
          .eq("recipient_id", user.id as any)
          .in("status", ["pending", "accepted"] as any) 
          .order("date_requested", { ascending: true })
          .order("time_requested", { ascending: true })
          .limit(5);

        if (fetchError) throw fetchError;

        const mappedBookings = (data || [] as any[]).map((booking: any) => ({
          id: booking?.id || '',
          client_name: booking?.client_name || null,
          service_type: booking?.service_type || null,
          appointment_date: booking?.date_requested || null,
          appointment_time: booking?.time_requested || null,
          date_requested: booking?.date_requested || null,
          time_requested: booking?.time_requested || null,
          status: (booking?.status || 'pending') as 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled',
          note: booking?.note || null
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
  }, [user?.id]);

  return { bookings, loading, error };
}
