
import { useState } from "react";
import { useAuth } from "@/context/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatCard from "./components/StatCard";
import RecentActivity from "./components/RecentActivity";
import PerformanceMetrics from "./components/PerformanceMetrics";
import EarningsSection from "./components/EarningsSection";
import { DashboardStats, EarningsData, BookingWithDetails } from "./types/ArtistDashboardTypes";

const ArtistDashboardWidgets = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Fetch artist stats with explicit typing to avoid deep instantiation
  const { data: stats, isLoading: isLoadingStats } = useQuery<DashboardStats | null>({
    queryKey: ['artist-stats', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      try {
        // Since this is mock data, we're explicitly returning a typed object
        const mockStats: DashboardStats = {
          booking_count: 12,
          completed_services: 8,
          total_earnings: 560,
          average_rating: 4.7,
          referral_count: 3,
          repeat_client_percentage: 65
        };
        
        return mockStats;
      } catch (error) {
        console.error("Error fetching artist stats:", error);
        return null;
      }
    },
    enabled: !!user?.id
  });

  // Define type for the booking query result to avoid deep instantiation
  type BookingsQueryResult = BookingWithDetails[];

  // Fetch recent bookings with explicit typing
  const { data: recentBookings, isLoading: isLoadingBookings } = useQuery<BookingsQueryResult>({
    queryKey: ['recent-bookings', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('artist_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (error) throw error;
        
        // Type-safe mapping of the data
        return (data || []).map(booking => ({
          ...booking,
          service_name: "Nail Service",
          appointment_time: booking.date_requested + " " + booking.time_requested,
          price: 45
        })) as BookingWithDetails[];
      } catch (error) {
        console.error("Error fetching recent bookings:", error);
        return [];
      }
    },
    enabled: !!user?.id
  });

  // Define the type for earnings data with a type alias to avoid infinite type instantiation
  type EarningsQueryResult = EarningsData | null;
  
  // Fetch earnings data with explicit typing
  const { data: earningsData, isLoading: isLoadingEarnings } = useQuery<EarningsQueryResult>({
    queryKey: ['earnings-data', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      try {
        const mockEarningsData: EarningsData = {
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
        
        return mockEarningsData;
      } catch (error) {
        console.error("Error fetching earnings data:", error);
        return null;
      }
    },
    enabled: !!user?.id && activeTab === "earnings"
  });

  return (
    <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="earnings">Earnings</TabsTrigger>
        <TabsTrigger value="calendar">Calendar</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Bookings"
            value={stats?.booking_count || 0}
            description="Total bookings"
            loading={isLoadingStats}
          />
          <StatCard
            title="Services"
            value={stats?.completed_services || 0}
            description="Completed services"
            loading={isLoadingStats}
          />
          <StatCard
            title="Earnings"
            value={stats?.total_earnings || 0}
            description="Total earnings"
            loading={isLoadingStats}
            prefix="$"
          />
          <StatCard
            title="Referrals"
            value={stats?.referral_count || 0}
            description="Client referrals"
            loading={isLoadingStats}
          />
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <RecentActivity 
            bookings={recentBookings || []}
            isLoading={isLoadingBookings}
          />
          <PerformanceMetrics stats={stats} />
        </div>
      </TabsContent>
      
      <TabsContent value="earnings" className="space-y-4">
        <EarningsSection 
          earningsData={earningsData}
          isLoading={isLoadingEarnings}
        />
      </TabsContent>
      
      <TabsContent value="calendar" className="space-y-4">
        <div className="text-center py-12 text-muted-foreground">
          Calendar view will be available soon
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default ArtistDashboardWidgets;
