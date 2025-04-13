
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, Building2, Home, BadgePercent } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface UserStats {
  totalArtists: number;
  totalSalons: number;
  totalJobs: number;
  totalBooths: number;
  totalSalonSales: number;
}

const UserOverview = () => {
  const [stats, setStats] = useState<UserStats>({
    totalArtists: 0,
    totalSalons: 0,
    totalJobs: 0,
    totalBooths: 0,
    totalSalonSales: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        // Get artists count
        const { count: artistsCount, error: artistsError } = await supabase
          .from('users')
          .select('id', { count: 'exact', head: true })
          .eq('role', 'artist');

        // Get salons count
        const { count: salonsCount, error: salonsError } = await supabase
          .from('users')
          .select('id', { count: 'exact', head: true })
          .eq('role', 'salon');
        
        // Get jobs count
        const { count: jobsCount, error: jobsError } = await supabase
          .from('jobs')
          .select('id', { count: 'exact', head: true });
        
        // Get booth listings count (posts with type "booth")
        const { count: boothsCount, error: boothsError } = await supabase
          .from('posts')
          .select('id', { count: 'exact', head: true })
          .eq('post_type', 'booth');
        
        // Get salon-for-sale count
        const { count: salonSalesCount, error: salonSalesError } = await supabase
          .from('salon_sales')
          .select('id', { count: 'exact', head: true });

        if (artistsError || salonsError || jobsError || boothsError || salonSalesError) {
          console.error("Error fetching stats", {
            artistsError,
            salonsError,
            jobsError,
            boothsError,
            salonSalesError
          });
          return;
        }

        setStats({
          totalArtists: artistsCount || 0,
          totalSalons: salonsCount || 0,
          totalJobs: jobsCount || 0,
          totalBooths: boothsCount || 0,
          totalSalonSales: salonSalesCount || 0,
        });
      } catch (error) {
        console.error("Error fetching user statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">User Overview</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className={`${loading ? 'animate-pulse' : ''}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Users className="h-4 w-4 mr-2 text-blue-600" />
              Total Artists
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '-' : stats.totalArtists}</div>
            <p className="text-xs text-muted-foreground mt-1">Registered nail artists</p>
          </CardContent>
        </Card>
        
        <Card className={`${loading ? 'animate-pulse' : ''}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Building2 className="h-4 w-4 mr-2 text-purple-600" />
              Total Salons
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '-' : stats.totalSalons}</div>
            <p className="text-xs text-muted-foreground mt-1">Registered salon businesses</p>
          </CardContent>
        </Card>
        
        <Card className={`${loading ? 'animate-pulse' : ''}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Briefcase className="h-4 w-4 mr-2 text-green-600" />
              Total Jobs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '-' : stats.totalJobs}</div>
            <p className="text-xs text-muted-foreground mt-1">Job listings posted</p>
          </CardContent>
        </Card>
        
        <Card className={`${loading ? 'animate-pulse' : ''}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <Home className="h-4 w-4 mr-2 text-amber-600" />
              Booth Listings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '-' : stats.totalBooths}</div>
            <p className="text-xs text-muted-foreground mt-1">Available booth rentals</p>
          </CardContent>
        </Card>
        
        <Card className={`${loading ? 'animate-pulse' : ''}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center">
              <BadgePercent className="h-4 w-4 mr-2 text-rose-600" />
              Salons For Sale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{loading ? '-' : stats.totalSalonSales}</div>
            <p className="text-xs text-muted-foreground mt-1">Salon marketplace listings</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserOverview;
