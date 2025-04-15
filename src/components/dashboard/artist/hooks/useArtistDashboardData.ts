
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

// Simple, flat interfaces to avoid deep type instantiation
export interface DashboardStats {
  booking_count: number;
  completed_services: number;
  total_earnings: number;
  average_rating: number;
  referral_count: number;
  repeat_client_percentage: number;
}

export interface MonthlyEarning {
  month: string;
  amount: number;
}

export interface EarningsData {
  monthly_earnings: MonthlyEarning[];
  total_earnings: number;
  pending_payouts: number;
}

export interface BookingWithDetails {
  id: string;
  sender_id: string;
  recipient_id: string;
  service_id?: string;
  service_name?: string;
  date_requested: string;
  time_requested: string;
  appointment_time?: string;
  status: string;
  created_at: string;
  price?: number;
  note?: string;
}

/**
 * Hook to fetch data for the artist dashboard
 * Uses simple flat interfaces to avoid deep type instantiation
 */
export const useArtistDashboardData = (activeTab: string) => {
  const { user } = useAuth();

  // Artist stats query
  const statsQuery = useQuery<DashboardStats, Error>({
    queryKey: ['artist-stats', user?.id],
    queryFn: async (): Promise<DashboardStats> => {
      if (!user?.id) throw new Error("User not authenticated");
      
      // Mock data for now - could be replaced with actual API call
      const mockStats: DashboardStats = {
        booking_count: 12,
        completed_services: 8,
        total_earnings: 560,
        average_rating: 4.7,
        referral_count: 3,
        repeat_client_percentage: 65
      };
      
      return mockStats;
    },
    enabled: !!user?.id
  });

  // Recent bookings query
  const bookingsQuery = useQuery<BookingWithDetails[], Error>({
    queryKey: ['recent-bookings', user?.id],
    queryFn: async (): Promise<BookingWithDetails[]> => {
      if (!user?.id) throw new Error("User not authenticated");
      
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('artist_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (error) throw error;
        
        // Convert to our flat BookingWithDetails type
        const typedData: BookingWithDetails[] = data ? data.map(item => ({
          id: item.id,
          sender_id: item.sender_id,
          recipient_id: item.recipient_id,
          service_id: item.service_id,
          service_name: 'Service', // Could fetch this separately if needed
          date_requested: item.date_requested,
          time_requested: item.time_requested || '',
          status: item.status,
          created_at: item.created_at,
          price: 0, // Default value
          note: item.note
        })) : [];
        
        return typedData;
      } catch (err) {
        console.error("Error fetching bookings:", err);
        return []; // Return empty array on error
      }
    },
    enabled: !!user?.id
  });

  // Earnings data query
  const earningsQuery = useQuery<EarningsData, Error>({
    queryKey: ['earnings-data', user?.id],
    queryFn: async (): Promise<EarningsData> => {
      if (!user?.id) throw new Error("User not authenticated");
      
      // Mock data for now
      const mockEarnings: EarningsData = {
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
      
      return mockEarnings;
    },
    enabled: !!user?.id && activeTab === "earnings"
  });

  // Return a simple, flat object with query results
  return {
    stats: statsQuery.data || null,
    isLoadingStats: statsQuery.isLoading,
    recentBookings: bookingsQuery.data || [],
    isLoadingBookings: bookingsQuery.isLoading,
    earningsData: earningsQuery.data || null,
    isLoadingEarnings: earningsQuery.isLoading
  };
};
