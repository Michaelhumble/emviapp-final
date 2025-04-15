
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
  
  // Avoid deep type instantiation by explicitly typing the query result
  type StatsQueryResult = { data: DashboardStats | null; isLoading: boolean };
  
  // Create the stats query with manual typing to avoid deep instantiation
  const statsQuery = useQuery({
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
  }) as StatsQueryResult;

  // Extract the stats data and loading state
  const stats = statsQuery.data;
  const isLoadingStats = statsQuery.isLoading;

  // Define type for the booking query result manually
  type BookingsQueryResult = { data: BookingWithDetails[]; isLoading: boolean };

  // Create the bookings query with manual typing
  const bookingsQuery = useQuery({
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
  }) as BookingsQueryResult;

  // Extract the bookings data and loading state
  const recentBookings = bookingsQuery.data;
  const isLoadingBookings = bookingsQuery.isLoading;
  
  // Define the type for earnings query result manually
  type EarningsQueryResult = { data: EarningsData | null; isLoading: boolean };
  
  // Create the earnings query with manual typing
  const earningsQuery = useQuery({
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
  }) as EarningsQueryResult;

  // Extract the earnings data and loading state
  const earningsData = earningsQuery.data;
  const isLoadingEarnings = earningsQuery.isLoading;

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
