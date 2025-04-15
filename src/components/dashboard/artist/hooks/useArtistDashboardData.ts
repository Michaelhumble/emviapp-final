
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { DashboardStats, BookingWithDetails, EarningsData } from "../types/ArtistDashboardTypes";
import { useTypedQuery } from "@/hooks/useTypedQuery";

/**
 * Hook to fetch data for the artist dashboard
 * This version uses explicit type annotations to avoid deep instantiation errors
 */
export const useArtistDashboardData = (activeTab: string) => {
  const { user } = useAuth();

  // Use useTypedQuery which has simpler type inference
  const statsQuery = useTypedQuery<DashboardStats, Error>({
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
    enabled: !!user?.id
  });

  const bookingsQuery = useTypedQuery<BookingWithDetails[], Error>({
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
    enabled: !!user?.id
  });

  const earningsQuery = useTypedQuery<EarningsData, Error>({
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
    enabled: !!user?.id && activeTab === "earnings"
  });

  // No need for type assertions anymore since we're using the typed query hook
  return {
    stats: statsQuery.data,
    isLoadingStats: statsQuery.isLoading,
    recentBookings: bookingsQuery.data || [],
    isLoadingBookings: bookingsQuery.isLoading,
    earningsData: earningsQuery.data,
    isLoadingEarnings: earningsQuery.isLoading
  };
};
