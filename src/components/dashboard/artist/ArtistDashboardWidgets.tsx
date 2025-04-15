
import { useState } from "react";
import { useAuth } from "@/context/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import StatCard from "./components/StatCard";
import RecentActivity from "./components/RecentActivity";
import PerformanceMetrics from "./components/PerformanceMetrics";
import EarningsSection from "./components/EarningsSection";
import { DashboardStats, EarningsData, BookingWithDetails } from "./types/ArtistDashboardTypes";
import { useSafeQuery } from "@/hooks/useSafeQuery";
import FallbackBoundary from "@/components/error-handling/FallbackBoundary";
import SimpleLoadingFallback from "@/components/error-handling/SimpleLoadingFallback";

const ArtistDashboardWidgets = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  const { data: stats, isLoading: isLoadingStats } = useSafeQuery<DashboardStats>({
    queryKey: ['artist-stats', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");
      
      try {
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
        throw error;
      }
    },
    enabled: !!user?.id,
    fallbackData: {
      booking_count: 0,
      completed_services: 0,
      total_earnings: 0,
      average_rating: 0,
      referral_count: 0,
      repeat_client_percentage: 0
    },
    context: "artist-dashboard-stats"
  });

  const { data: recentBookings, isLoading: isLoadingBookings } = useSafeQuery<BookingWithDetails[]>({
    queryKey: ['recent-bookings', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");
      
      try {
        const { data, error } = await supabase
          .from('bookings')
          .select('*')
          .eq('artist_id', user.id)
          .order('created_at', { ascending: false })
          .limit(5);
        
        if (error) throw error;
        
        return (data || []).map(booking => ({
          ...booking,
          service_name: "Nail Service",
          appointment_time: booking.date_requested + " " + booking.time_requested,
          price: 45
        })) as BookingWithDetails[];
      } catch (error) {
        console.error("Error fetching recent bookings:", error);
        throw error;
      }
    },
    enabled: !!user?.id,
    fallbackData: [],
    context: "artist-dashboard-bookings"
  });
  
  const { data: earningsData, isLoading: isLoadingEarnings } = useSafeQuery<EarningsData>({
    queryKey: ['earnings-data', user?.id],
    queryFn: async () => {
      if (!user?.id) throw new Error("User not authenticated");
      
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
        throw error;
      }
    },
    enabled: !!user?.id && activeTab === "earnings",
    fallbackData: {
      monthly_earnings: [],
      total_earnings: 0,
      pending_payouts: 0
    },
    context: "artist-dashboard-earnings"
  });

  return (
    <FallbackBoundary>
      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <FallbackBoundary>
              <StatCard
                title="Bookings"
                value={stats?.booking_count || 0}
                description="Total bookings"
                loading={isLoadingStats}
              />
            </FallbackBoundary>
            <FallbackBoundary>
              <StatCard
                title="Services"
                value={stats?.completed_services || 0}
                description="Completed services"
                loading={isLoadingStats}
              />
            </FallbackBoundary>
            <FallbackBoundary>
              <StatCard
                title="Earnings"
                value={stats?.total_earnings || 0}
                description="Total earnings"
                loading={isLoadingStats}
                prefix="$"
              />
            </FallbackBoundary>
            <FallbackBoundary>
              <StatCard
                title="Referrals"
                value={stats?.referral_count || 0}
                description="Client referrals"
                loading={isLoadingStats}
              />
            </FallbackBoundary>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <FallbackBoundary>
              <RecentActivity 
                bookings={recentBookings || []}
                isLoading={isLoadingBookings}
              />
            </FallbackBoundary>
            <FallbackBoundary>
              <PerformanceMetrics stats={stats} />
            </FallbackBoundary>
          </div>
        </TabsContent>
        
        <TabsContent value="earnings" className="space-y-4">
          <FallbackBoundary>
            <EarningsSection 
              earningsData={earningsData}
              isLoading={isLoadingEarnings}
            />
          </FallbackBoundary>
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-4">
          <div className="text-center py-12 text-muted-foreground">
            Calendar view will be available soon
          </div>
        </TabsContent>
      </Tabs>
    </FallbackBoundary>
  );
};

export default ArtistDashboardWidgets;
