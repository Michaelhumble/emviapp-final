
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEarningsData } from "./useEarningsData";
import { formatCurrency } from "@/lib/utils";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { DollarSign, Calendar, TrendingUp } from "lucide-react";

export const SalonEarningsSection = () => {
  const { monthlyStats, loading, error } = useEarningsData();

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>Failed to load earnings data. Please try again.</p>
      </div>
    );
  }

  const chartData = monthlyStats.artistPerformance.map(item => ({
    name: item.artist_name,
    earnings: Number(item.total_revenue)
  }));

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <h3 className="text-sm font-medium text-muted-foreground">Total Earnings</h3>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold">
                {loading ? "..." : formatCurrency(monthlyStats.totalEarnings)}
              </p>
              <p className="text-xs text-muted-foreground">This Month</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-blue-500" />
              <h3 className="text-sm font-medium text-muted-foreground">Total Bookings</h3>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold">
                {loading ? "..." : monthlyStats.totalBookings}
              </p>
              <p className="text-xs text-muted-foreground">This Month</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-purple-500" />
              <h3 className="text-sm font-medium text-muted-foreground">Average Per Booking</h3>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold">
                {loading ? "..." : formatCurrency(monthlyStats.totalBookings ? 
                  monthlyStats.totalEarnings / monthlyStats.totalBookings : 0)}
              </p>
              <p className="text-xs text-muted-foreground">This Month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trend</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-[300px] flex items-center justify-center">
              Loading...
            </div>
          ) : chartData.length > 0 ? (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="earnings" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              No earnings data yet—let's get some clients!
            </div>
          )}
        </CardContent>
      </Card>

      {/* Top Performing Artists */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Artists</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : monthlyStats.artistPerformance.length > 0 ? (
            <div className="space-y-4">
              {monthlyStats.artistPerformance
                .sort((a, b) => Number(b.total_revenue) - Number(a.total_revenue))
                .map((artist) => (
                <div key={artist.artist_id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">{artist.artist_name}</p>
                    <p className="text-sm text-muted-foreground">{artist.booking_count} bookings</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(Number(artist.total_revenue))}</p>
                    <p className="text-sm text-muted-foreground">revenue</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No artist performance data available yet.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
