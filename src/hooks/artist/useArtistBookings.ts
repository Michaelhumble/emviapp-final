
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";

export interface Booking {
  id: string;
  client_name?: string | null;
  service_type?: string | null;
  appointment_date?: string | null;
  appointment_time?: string | null;
  status: string;
}

export function useArtistBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    let cancelled = false;

    async function fetchBookings() {
      setLoading(true);
      setError(null);

      try {
        // Fetch all bookings for the current artist from Supabase
        const { data, error: fetchError } = await supabase
          .from("bookings")
          .select("id, client_name, service_type, date_requested, appointment_time, status")
          .eq("recipient_id", user.id)
          .order("date_requested", { ascending: false })
          .order("appointment_time", { ascending: false });

        if (fetchError) throw fetchError;

        // Transform data into correct structure
        const mapped = (data || []).map((b) => ({
          id: b.id,
          client_name: b.client_name,
          service_type: b.service_type,
          appointment_date: b.date_requested,
          appointment_time: b.appointment_time,
          status: b.status,
        }));

        if (!cancelled) setBookings(mapped);
      } catch (err) {
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
