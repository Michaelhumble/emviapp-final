
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";

export interface ArtistBooking {
  id: string;
  client_name?: string | null;
  service_type?: string | null;
  appointment_date?: string | null;
  appointment_time?: string | null;
  status: string;
}

export function useArtistUpcomingBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<ArtistBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;

    async function fetchBookings() {
      setLoading(true);
      setError(null);

      try {
        // Only pull future or today bookings with non-cancelled status
        const { data, error: fetchError } = await supabase
          .from("bookings")
          .select("id, client_name, service_type, date_requested, appointment_time, status")
          .eq("recipient_id", user.id)
          .in("status", ["pending", "accepted", "confirmed"]) // Only show relevant statuses
          .order("date_requested", { ascending: true });

        if (fetchError) throw fetchError;

        const today = new Date();
        const filtered = (data || [])
          .filter((b) => {
            if (!b.date_requested) return true;
            // Only show today or future
            const bookingDate = new Date(b.date_requested);
            bookingDate.setHours(0,0,0,0);
            today.setHours(0,0,0,0);
            return bookingDate >= today;
          })
          .map((b) => ({
            id: b.id,
            client_name: b.client_name,
            service_type: b.service_type,
            appointment_date: b.date_requested,
            appointment_time: b.appointment_time,
            status: b.status,
          }));

        if (!cancelled) setBookings(filtered);
      } catch (err: any) {
        if (!cancelled) setError("Failed to load bookings, please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchBookings();
    return () => { cancelled = true; };
  }, [user?.id]);

  return { bookings, loading, error };
}

