
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Eye, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface LiveMetricsData {
  newUsersToday: number;
  newUsersThisWeek: number;
  mostViewedArtist: {
    id: string;
    name: string;
    views: number;
  } | null;
  mostActiveSalon: {
    id: string;
    name: string;
    activity: number;
  } | null;
}

const LiveMetrics = () => {
  const [metrics, setMetrics] = useState<LiveMetricsData>({
    newUsersToday: 0,
    newUsersThisWeek: 0,
    mostViewedArtist: null,
    mostActiveSalon: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiveMetrics = async () => {
      try {
        // Get new users today
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const { count: todayCount, error: todayError } = await supabase
          .from('users')
          .select('id', { count: 'exact', head: true })
          .gte('created_at', today.toISOString());
        
        // Get new users this week
        const weekStart = new Date();
        weekStart.setDate(weekStart.getDate() - 7);
        weekStart.setHours(0, 0, 0, 0);
        
        const { count: weekCount, error: weekError } = await supabase
          .from('users')
          .select('id', { count: 'exact', head: true })
          .gte('created_at', weekStart.toISOString());
        
        // For demonstration, we'll simulate most viewed artist and most active salon
        // In a real implementation, you would have these metrics tracked in their own tables
        
        // Get artist with most views (mock data - replace with real query)
        const { data: artists, error: artistsError } = await supabase
          .from('users')
          .select('id, full_name')
          .eq('role', 'artist')
          .limit(10);
        
        // Get salon with most bookings (mock data - replace with real query)
        const { data: salons, error: salonsError } = await supabase
          .from('users')
          .select('id, full_name, salon_name')
          .eq('role', 'salon')
          .limit(10);

        if (todayError || weekError || artistsError || salonsError) {
          console.error("Error fetching metrics", {
            todayError,
            weekError,
            artistsError,
            salonsError
          });
          return;
        }

        // Simulate a most viewed artist (in reality, you'd have this data in your database)
        let mostViewedArtist = null;
        if (artists && artists.length > 0) {
          const randomIndex = Math.floor(Math.random() * artists.length);
          mostViewedArtist = {
            id: artists[randomIndex].id,
            name: artists[randomIndex].full_name,
            views: Math.floor(Math.random() * 500) + 100 // Random view count between 100-600
          };
        }

        // Simulate a most active salon (in reality, you'd have this data in your database)
        let mostActiveSalon = null;
        if (salons && salons.length > 0) {
          const randomIndex = Math.floor(Math.random() * salons.length);
          mostActiveSalon = {
            id: salons[randomIndex].id,
            name: salons[randomIndex].salon_name || salons[randomIndex].full_name,
            activity: Math.floor(Math.random() * 50) + 10 // Random activity count between 10-60
          };
        }

        setMetrics({
          newUsersToday: todayCount || 0,
          newUsersThisWeek: weekCount || 0,
          mostViewedArtist,
          mostActiveSalon
        });
      } catch (error) {
        console.error("Error fetching live metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLiveMetrics();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Live Metrics</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className={`${loading ? 'animate-pulse' : ''}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
              New Users Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '-' : metrics.newUsersToday}</div>
            <p className="text-xs text-muted-foreground mt-1">Signups in the last 24 hours</p>
          </CardContent>
        </Card>
        
        <Card className={`${loading ? 'animate-pulse' : ''}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-green-600" />
              New Users This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '-' : metrics.newUsersThisWeek}</div>
            <p className="text-xs text-muted-foreground mt-1">Signups in the last 7 days</p>
          </CardContent>
        </Card>
        
        <Card className={`${loading ? 'animate-pulse' : ''}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Eye className="h-4 w-4 mr-2 text-purple-600" />
              Most Viewed Artist
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
            ) : metrics.mostViewedArtist ? (
              <>
                <div className="text-lg font-medium truncate">{metrics.mostViewedArtist.name}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metrics.mostViewedArtist.views} profile views
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No data available</p>
            )}
          </CardContent>
        </Card>
        
        <Card className={`${loading ? 'animate-pulse' : ''}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Activity className="h-4 w-4 mr-2 text-amber-600" />
              Most Active Salon
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="h-10 bg-gray-100 rounded animate-pulse"></div>
            ) : metrics.mostActiveSalon ? (
              <>
                <div className="text-lg font-medium truncate">{metrics.mostActiveSalon.name}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metrics.mostActiveSalon.activity} bookings/actions
                </p>
              </>
            ) : (
              <p className="text-sm text-muted-foreground">No data available</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveMetrics;
