
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/auth";
import { startOfMonth, endOfMonth } from "date-fns";

export interface ArtistAssignmentStats {
  thisMonthBookings: number;
  completed: number;
  canceled: number;
  pending: number;
  totalHours: number;
  estimatedTips: number;
  servicesPerformed: number;
  mostPopularService?: { title: string; count: number } | null;
  loading: boolean;
}

export function useArtistAssignmentStats() {
  const { userProfile, user } = useAuth();
  const [stats, setStats] = useState<ArtistAssignmentStats>({
    thisMonthBookings: 0,
    completed: 0,
    canceled: 0,
    pending: 0,
    totalHours: 0,
    estimatedTips: 0,
    servicesPerformed: 0,
    mostPopularService: null,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    async function fetchStats() {
      // Only for in-salon artists
      if (!user?.id || userProfile?.role !== "artist" || userProfile?.independent) {
        setStats(s => ({ ...s, loading: false }));
        return;
      }

      setStats(s => ({ ...s, loading: true }));
      const monthStart = startOfMonth(new Date());
      const monthEnd = endOfMonth(new Date());

      // Fetch bookings where this artist is the recipient, for this month
      const { data: bookings, error } = await supabase
        .from("bookings")
        .select(`id, status, created_at, date_requested, time_requested, service:service_id(id, title, price, duration_minutes)`)
        .eq("recipient_id", user.id)
        .gte("created_at", monthStart.toISOString())
        .lte("created_at", monthEnd.toISOString());

      if (error || !bookings) {
        setStats(s => ({ ...s, loading: false }));
        return;
      }

      // Filter bookings by status
      const completedBookings = bookings.filter((b: any) => b.status === "completed");
      const canceledBookings = bookings.filter((b: any) => b.status === "cancelled");
      const pendingBookings = bookings.filter((b: any) => b.status === "pending");
      const allValidBookings = bookings.filter((b: any) => b.status && !["declined"].includes(b.status));

      // Hours: sum booked duration (if available), else default to 1 hour per booking
      let totalMinutes = 0;
      let performedServiceMap: Record<string, { title: string, count: number }> = {};

      completedBookings.forEach((b: any) => {
        const dur = Number(b.service?.duration_minutes) || 60;
        totalMinutes += dur;

        if (b.service?.title) {
          if (!performedServiceMap[b.service.title]) {
            performedServiceMap[b.service.title] = { title: b.service.title, count: 1 };
          } else {
            performedServiceMap[b.service.title].count += 1;
          }
        }
      });

      // Find most popular
      let mostPopularService: { title: string, count: number } | null = null;
      for (let [_, v] of Object.entries(performedServiceMap)) {
        if (!mostPopularService || v.count > mostPopularService.count) {
          mostPopularService = v;
        }
      }

      // Estimate tips: placeholder (10% of service price for completed this month)
      let estimatedTips = 0;
      completedBookings.forEach((b: any) => {
        if (typeof b.service?.price === "number") {
          estimatedTips += b.service.price * 0.10;
        }
      });

      if (!cancelled) {
        setStats({
          thisMonthBookings: allValidBookings.length,
          completed: completedBookings.length,
          canceled: canceledBookings.length,
          pending: pendingBookings.length,
          totalHours: Math.round(totalMinutes / 60),
          estimatedTips: Math.round(estimatedTips),
          servicesPerformed: completedBookings.length,
          mostPopularService,
          loading: false,
        });
      }
    }

    fetchStats();
    return () => { cancelled = true; };
    // eslint-disable-next-line
  }, [user?.id, userProfile?.role, userProfile?.independent]);

  return stats;
}
