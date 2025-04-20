
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, TrendingUp, Calendar } from "lucide-react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { addMonths, format, startOfMonth } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type EarningsPeriod = {
  period: string;
  earnings: number;
  bookings: number;
};

const EarningsTab = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [monthlyEarnings, setMonthlyEarnings] = useState<EarningsPeriod[]>([]);
  const [totalStats, setTotalStats] = useState({
    totalEarnings: 0,
    totalBookings: 0,
    pendingEarnings: 0,
  });

  useEffect(() => {
    const fetchEarnings = async () => {
      if (!user?.id) return;

      try {
        setLoading(true);
        
        // For demo, generate sample data since we don't have real payment data yet
        // In a real implementation, this would fetch from completed_bookings table
        const { data: bookings, error } = await supabase
          .from("bookings")
          .select(`
            id, 
            status,
            service:service_id (title, price),
            date_requested
          `)
          .eq("recipient_id", user.id);
        
        if (error) throw error;
        
        // Generate data for the last 6 months
        const currentMonth = new Date();
        const monthlyData: EarningsPeriod[] = [];
        let totalEarnings = 0;
        let totalBookings = 0;
        let pendingEarnings = 0;
        
        for (let i = 5; i >= 0; i--) {
          const monthDate = startOfMonth(addMonths(currentMonth, -i));
          const monthStr = format(monthDate, "MMM");
          
          const monthBookings = bookings?.filter(b => {
            if (!b.date_requested) return false;
            const bookingDate = new Date(b.date_requested);
            return bookingDate.getMonth() === monthDate.getMonth() && 
                   bookingDate.getFullYear() === monthDate.getFullYear();
          }) || [];
          
          // Calculate completed bookings and earnings
          const completedBookings = monthBookings.filter(b => b.status === "completed");
          const monthlyBookingCount = completedBookings.length;
          
          // Sum up earnings from service prices
          const earnings = completedBookings.reduce((sum, b) => sum + (b.service?.price || 0), 0);
          
          // Add to totals
          totalEarnings += earnings;
          totalBookings += monthlyBookingCount;
          
          // Calculate pending earnings (from non-completed bookings with price)
          const pendingBookings = monthBookings.filter(b => b.status !== "completed" && b.status !== "cancelled");
          const pendingAmount = pendingBookings.reduce((sum, b) => sum + (b.service?.price || 0), 0);
          pendingEarnings += pendingAmount;
          
          monthlyData.push({
            period: monthStr,
            earnings: earnings,
            bookings: monthlyBookingCount
          });
        }
        
        setMonthlyEarnings(monthlyData);
        setTotalStats({
          totalEarnings,
          totalBookings,
          pendingEarnings
        });
      } catch (error) {
        console.error("Error fetching earnings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEarnings();
  }, [user?.id]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="shadow-sm border border-amber-100 bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Total Earnings</p>
                {loading ? (
                  <Skeleton className="h-8 w-24 mt-1" />
                ) : (
                  <p className="text-2xl font-bold">{formatCurrency(totalStats.totalEarnings)}</p>
                )}
              </div>
              <div className="bg-amber-100 p-2 rounded-full">
                <DollarSign className="h-5 w-5 text-amber-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border border-amber-100 bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Completed Bookings</p>
                {loading ? (
                  <Skeleton className="h-8 w-24 mt-1" />
                ) : (
                  <p className="text-2xl font-bold">{totalStats.totalBookings}</p>
                )}
              </div>
              <div className="bg-green-100 p-2 rounded-full">
                <Calendar className="h-5 w-5 text-green-700" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border border-amber-100 bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">Pending Earnings</p>
                {loading ? (
                  <Skeleton className="h-8 w-24 mt-1" />
                ) : (
                  <p className="text-2xl font-bold">{formatCurrency(totalStats.pendingEarnings)}</p>
                )}
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <TrendingUp className="h-5 w-5 text-blue-700" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Earnings Chart */}
      <Card className="shadow-sm border border-amber-100 bg-white">
        <CardHeader>
          <CardTitle>Monthly Earnings</CardTitle>
          <CardDescription>Your earnings over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyEarnings}
                  margin={{
                    top: 5,
                    right: 5,
                    left: 5,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="period" />
                  <YAxis 
                    tickFormatter={(value) => `$${value}`}
                    width={45}
                  />
                  <Tooltip
                    formatter={(value: number) => [`$${value}`, 'Earnings']}
                    labelFormatter={(label) => `Month: ${label}`}
                  />
                  <Bar
                    dataKey="earnings"
                    fill="#f59e0b"
                    radius={[4, 4, 0, 0]}
                    name="Earnings"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Earnings Details - Coming Soon */}
      <Card className="shadow-sm border border-amber-100 bg-white">
        <CardHeader>
          <CardTitle>Payout Information</CardTitle>
          <CardDescription>
            Setup your banking details for direct payouts
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-6">
          <div className="bg-muted/20 rounded-lg p-6">
            <DollarSign className="h-12 w-12 text-muted-foreground/50 mx-auto mb-3" />
            <h3 className="text-lg font-medium mb-2">Payout Setup Coming Soon</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              We're working on enabling direct payouts to your bank account.
              This feature will be available in the near future.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsTab;
