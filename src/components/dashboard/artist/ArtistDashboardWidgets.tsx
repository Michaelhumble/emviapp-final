
import { useState } from "react";
import { useAuth } from "@/context/auth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import StatCard from "./components/StatCard";
import RecentActivity from "./components/RecentActivity";
import PerformanceMetrics from "./components/PerformanceMetrics";
import EarningsSection from "./components/EarningsSection";
import { DashboardStats, EarningsData, BookingWithDetails } from "./types/ArtistDashboardTypes";
import { useTypedQuery } from "@/hooks/useTypedQuery";

const ArtistDashboardWidgets = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  const { data: stats, isLoading: isLoadingStats } = useTypedQuery<DashboardStats | null>({
    queryKey: ['artist-stats', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
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
        return null;
      }
    },
    enabled: !!user?.id
  });

  const { data: recentBookings, isLoading: isLoadingBookings } = useTypedQuery<BookingWithDetails[]>({
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
  
  const { data: earningsData, isLoading: isLoadingEarnings } = useTypedQuery<EarningsData | null>({
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
