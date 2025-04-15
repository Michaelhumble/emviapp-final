
import { useAuth } from "@/context/auth";
import { useSafeQuery } from "@/hooks/useSafeQuery";
import { supabase } from "@/integrations/supabase/client";
import { DashboardStats, BookingWithDetails, EarningsData } from "../types/ArtistDashboardTypes";

export const useArtistDashboardData = (activeTab: string) => {
  const { user } = useAuth();

  const statsQuery = useSafeQuery({
    queryKey: ['artist-stats', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");
      return {
        booking_count: 12,
        completed_services: 8,
        total_earnings: 560,
        average_rating: 4.7,
        referral_count: 3,
        repeat_client_percentage: 65
      };
    },
    enabled: !!user?.id,
    context: "artist-dashboard-stats"
  });

  const bookingsQuery = useSafeQuery({
    queryKey: ['recent-bookings', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");
      
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('artist_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data || [];
    },
    enabled: !!user?.id,
    context: "artist-dashboard-bookings"
  });

  const earningsQuery = useSafeQuery({
    queryKey: ['earnings-data', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");
      
      return {
        monthly_earnings: [
          { month: 'Jan', amount: 420 },
          { month: 'Feb', amount: 380 },
          { month: 'Mar', amount: 560 },
          { month: 'Apr', amount: 490 },
          { month: 'May', amount: 610 },
          { month: 'Jun', amount: 550 }
        ],
        total_earnings: 3010,
        pending_payouts: 280
      };
    },
    enabled: !!user?.id && activeTab === "earnings",
    context: "artist-dashboard-earnings"
  });

  // Use type assertions to avoid excessive type depth
  const stats = statsQuery.data as DashboardStats;
  const recentBookings = (bookingsQuery.data || []) as BookingWithDetails[];
  const earningsData = earningsQuery.data as EarningsData;

  return {
    stats,
    isLoadingStats: statsQuery.isLoading,
    recentBookings,
    isLoadingBookings: bookingsQuery.isLoading,
    earningsData,
    isLoadingEarnings: earningsQuery.isLoading
  };
};
