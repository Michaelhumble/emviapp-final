
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { startOfMonth, endOfMonth, isSameMonth, parseISO } from "date-fns";

// Type for the metrics
export interface FreelancerEarningsStatsData {
  totalBookings: number;
  estimatedEarnings: number;
  newClients: number;
  totalServices: number;
  loading: boolean;
}

function onlyUnique<T>(value: T, index: number, self: T[]): boolean {
  return self.indexOf(value) === index;
}

// Hook for data logic
export function useFreelancerEarningsStats() {
  const { user } = useAuth();
  const [stats, setStats] = useState<FreelancerEarningsStatsData>({
    totalBookings: 0,
    estimatedEarnings: 0,
    newClients: 0,
    totalServices: 0,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    async function fetchStats() {
      if (!user?.id) {
        setStats((s) => ({ ...s, loading: false }));
        return;
      }
      setStats((s) => ({ ...s, loading: true }));

      const monthStart = startOfMonth(new Date());
      const monthEnd = endOfMonth(new Date());

      try {
        // Fetch bookings for this freelancer as artist
        const { data: bookings, error: bookingError } = await supabase
          .from("bookings")
          .select(`
            id,
            created_at,
            sender_id,
            status,
            service_id,
            recipient_id,
            service:service_id(id, price)
          `)
          .eq("recipient_id", user.id)
          .gte("created_at", monthStart.toISOString())
          .lte("created_at", monthEnd.toISOString());

        if (bookingError) throw bookingError;

        // Only count valid/accepted bookings for stats
        const validBookings = (bookings || []).filter(
          (b) =>
            (b.status !== "cancelled" && b.status !== "declined") &&
            b.status // exclude null/malformed
        );

        // Earnings: sum service prices for completed bookings this month
        let estimatedEarnings = 0;
        validBookings.forEach((b: any) => {
          // Only count where price is defined
          if (b.service && typeof b.service.price === "number" && (b.status === "completed" || b.status === "accepted")) {
            estimatedEarnings += b.service.price;
          }
        });

        // New clients: count distinct sender_ids in monthly bookings
        const newClientIds = validBookings
          .map((b: any) => b.sender_id)
          .filter(Boolean)
          .filter(onlyUnique);

        // Fetch count of all offered services for freelancer
        const { data: servicesData, error: serviceError } = await supabase
          .from("services")
          .select("id")
          .eq("user_id", user.id);

        if (serviceError) throw serviceError;

        if (!cancelled) {
          setStats({
            totalBookings: validBookings.length,
            estimatedEarnings,
            newClients: newClientIds.length,
            totalServices: (servicesData || []).length,
            loading: false,
          });
        }
      } catch (e) {
        if (!cancelled) {
          setStats({
            totalBookings: 0,
            estimatedEarnings: 0,
            newClients: 0,
            totalServices: 0,
            loading: false,
          });
        }
      }
    }
    fetchStats();
    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  return stats;
}
