
import { useState, useEffect, useCallback } from "react";
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

      const mapped = (data || []).map((b) => ({
        id: b.id,
        client_name: b.client_name,
        service_type: b.service_type,
        appointment_date: b.date_requested,
        appointment_time: b.appointment_time,
        status: b.status,
      }));

      setBookings(mapped);
    } catch (err) {
      setError("Failed to load bookings, please try again.");
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings, user?.id]);

  // Expose a refresh function for modal to call after add
  const refresh = fetchBookings;

  return { bookings, loading, error, refresh };
}
