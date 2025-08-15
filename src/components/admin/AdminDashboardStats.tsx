import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Users, UserCheck, Building2, Calendar, Briefcase, TrendingUp } from 'lucide-react';

interface DashboardStats {
  total_users: number;
  total_artists: number;
  total_customers: number;
  total_salons: number;
  total_bookings: number;
  active_jobs: number;
  users_today: number;
  users_this_week: number;
  users_this_month: number;
}

export const AdminDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data, error } = await supabase.rpc('get_admin_dashboard_stats');
        
        if (error) {
          console.error('Error fetching admin stats:', error);
          return;
        }
        
        if (data && typeof data === 'object' && !Array.isArray(data)) {
          setStats(data as unknown as DashboardStats);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!stats) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground">Failed to load dashboard statistics.</p>
        </CardContent>
      </Card>
    );
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.total_users.toLocaleString(),
      icon: Users,
      description: `+${stats.users_today} today`
    },
    {
      title: 'Artists',
      value: stats.total_artists.toLocaleString(),
      icon: UserCheck,
      description: 'Professional artists'
    },
    {
      title: 'Customers',
      value: stats.total_customers.toLocaleString(),
      icon: Users,
      description: 'Active customers'
    },
    {
      title: 'Salon Owners',
      value: stats.total_salons.toLocaleString(),
      icon: Building2,
      description: 'Business accounts'
    },
    {
      title: 'Total Bookings',
      value: stats.total_bookings.toLocaleString(),
      icon: Calendar,
      description: 'All time bookings'
    },
    {
      title: 'Active Jobs',
      value: stats.active_jobs.toLocaleString(),
      icon: Briefcase,
      description: 'Currently posted'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <Card key={`stat-${stat.title}-${index}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Growth Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.users_today}
              </div>
              <p className="text-sm text-muted-foreground">New Users Today</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats.users_this_week}
              </div>
              <p className="text-sm text-muted-foreground">New Users This Week</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {stats.users_this_month}
              </div>
              <p className="text-sm text-muted-foreground">New Users This Month</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};