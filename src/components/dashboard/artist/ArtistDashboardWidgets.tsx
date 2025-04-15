
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  loading?: boolean;
  prefix?: string;
  suffix?: string;
}

const StatCard = ({ title, value, description, loading = false, prefix = '', suffix = '' }: StatCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
            <span className="text-muted-foreground">Loading...</span>
          </div>
        ) : (
          <div className="text-2xl font-bold">
            {prefix}{value.toLocaleString()}{suffix}
          </div>
        )}
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

// Types for dashboard stats
interface DashboardStats {
  booking_count: number;
  completed_services: number;
  total_earnings: number;
  average_rating: number;
  referral_count: number;
  repeat_client_percentage: number;
}

// Types for earnings data
interface EarningsData {
  monthly_earnings: Array<{month: string, amount: number}>;
  total_earnings: number;
  pending_payouts: number;
}

const ArtistDashboardWidgets = () => {
  const { user, userProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Fetch artist stats
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['artist-stats', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      // Since the RPC function doesn't exist, we'll use a mock or direct query
      try {
        // For now, returning mock data instead of calling a non-existent RPC
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
        return {
          booking_count: 0,
          completed_services: 0,
          total_earnings: 0,
          average_rating: 0,
          referral_count: 0,
          repeat_client_percentage: 0
        };
      }
    },
    enabled: !!user?.id
  });

  // Fetch recent bookings
  const { data: recentBookings, isLoading: isLoadingBookings } = useQuery({
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
        
        // Add mock service_name, appointment_time, and price for now
        return (data || []).map(booking => ({
          ...booking,
          service_name: "Nail Service",
          appointment_time: booking.date_requested + " " + booking.time_requested,
          price: 45 // Mock price
        }));
      } catch (error) {
        console.error("Error fetching recent bookings:", error);
        return [];
      }
    },
    enabled: !!user?.id
  });

  // Fetch earnings data
  const { data: earningsData, isLoading: isLoadingEarnings } = useQuery({
    queryKey: ['earnings-data', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      try {
        // Mock data instead of calling a non-existent RPC
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
        return {
          monthly_earnings: [],
          total_earnings: 0,
          pending_payouts: 0
        };
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
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest bookings and client interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoadingBookings ? (
                <div className="flex items-center justify-center h-[200px]">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : recentBookings && recentBookings.length > 0 ? (
                <div className="space-y-4">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center">
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {booking.service_name || "Nail Service"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(booking.appointment_time).toLocaleString()}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        ${booking.price || 0}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No recent bookings found
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Performance</CardTitle>
              <CardDescription>
                Your client satisfaction metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Rating</span>
                      <span className="text-sm font-medium">
                        {stats?.average_rating?.toFixed(1) || "N/A"} / 5.0
                      </span>
                    </div>
                    <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary" 
                        style={{ 
                          width: `${((stats?.average_rating || 0) / 5) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Repeat Clients</span>
                      <span className="text-sm font-medium">
                        {stats?.repeat_client_percentage || 0}%
                      </span>
                    </div>
                    <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary" 
                        style={{ 
                          width: `${stats?.repeat_client_percentage || 0}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="earnings" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            title="Total Earnings"
            value={earningsData?.total_earnings || 0}
            description="Lifetime earnings"
            loading={isLoadingEarnings}
            prefix="$"
          />
          <StatCard
            title="Pending Payout"
            value={earningsData?.pending_payouts || 0}
            description="To be paid out"
            loading={isLoadingEarnings}
            prefix="$"
          />
          <StatCard
            title="This Month"
            value={
              earningsData?.monthly_earnings?.[0]?.amount || 0
            }
            description="Current month earnings"
            loading={isLoadingEarnings}
            prefix="$"
          />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Earnings History</CardTitle>
            <CardDescription>
              Your earnings over the past 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoadingEarnings ? (
              <div className="flex items-center justify-center h-[300px]">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="h-[300px]">
                {/* Chart would go here - using placeholder for now */}
                <div className="flex items-end justify-between h-full pt-6">
                  {(earningsData?.monthly_earnings || Array(6).fill({ month: '', amount: 0 }))
                    .slice(0, 6)
                    .map((month, i) => (
                      <div key={i} className="flex flex-col items-center">
                        <div 
                          className="w-12 bg-primary rounded-t-md" 
                          style={{ 
                            height: `${Math.max(
                              (month.amount / (Math.max(...(earningsData?.monthly_earnings || []).map(m => m.amount)) || 1)) * 200, 
                              20
                            )}px` 
                          }}
                        ></div>
                        <span className="text-xs mt-2">{month.month || `Month ${i+1}`}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="calendar" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
            <CardDescription>
              Your schedule for the next 7 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              Calendar view will be available soon
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default ArtistDashboardWidgets;
