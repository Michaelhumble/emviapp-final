
import { useState, useEffect } from "react";
import { supabaseBypass } from "@/types/supabase-bypass";
import { useAuth } from "@/context/auth";
import { CustomerBooking } from "@/components/dashboard/customer/bookings/types";
import { toast } from "sonner";

/**
 * Fetches booking history for the current user, filtered for completed/cancelled/no-show only.
 */
export function useCustomerBookingHistory() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<CustomerBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      // Get bookings with completed/cancelled/no-show status for the user
      const { data, error } = await supabaseBypass
        .from("bookings")
        .select(
          `
            id,
            created_at,
            date_requested,
            time_requested,
            status,
            note,
            service_id,
            service:service_id (id, title, price),
            recipient_id
          `
        )
        .eq("sender_id", user.id as any)
        .in("status", ["completed", "cancelled", "no-show"] as any)
        .order("date_requested", { ascending: false })
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (!data) {
        setBookings([]);
        return;
      }

      // Fetch each recipient artist's details
      const bookingsWithArtist = await Promise.all(
        (data as any[]).map(async (booking: any) => {
          let artistData = null;
          if (booking?.recipient_id) {
            const { data: artist, error: artistError } = await supabaseBypass
              .from("profiles")
              .select("id, full_name, avatar_url")
              .eq("id", booking.recipient_id as any)
              .maybeSingle();
            if (!artistError && artist) {
              artistData = artist;
            }
          }
          return {
            ...booking,
            artist: artistData,
          };
        })
      );
      setBookings(bookingsWithArtist);
    } catch (err) {
      setError("Failed to load your booking history. Please try again.");
      toast.error("Could not load booking history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
    // eslint-disable-next-line
  }, [user]);

  return { bookings, loading, error, refetch: fetchBookings };
}
