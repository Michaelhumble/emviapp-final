
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, UserPlus, Briefcase, Home, ShoppingBag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { formatDistanceToNow } from "date-fns";

interface RecentUser {
  id: string;
  full_name: string;
  role: string;
  created_at: string;
}

interface RecentItem {
  id: string;
  title: string;
  type: 'user' | 'job' | 'booth' | 'salon';
  actor_name: string;
  created_at: string;
}

const RecentActivity = () => {
  const [recentUsers, setRecentUsers] = useState<RecentUser[]>([]);
  const [recentItems, setRecentItems] = useState<RecentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentActivity = async () => {
      try {
        // Get recent users
        const { data: users, error: usersError } = await supabase
          .from('users')
          .select('id, full_name, role, created_at')
          .order('created_at', { ascending: false })
          .limit(5);
        
        // Get recent jobs - updated to use salon_id instead of user_id
        const { data: jobs, error: jobsError } = await supabase
          .from('jobs')
          .select('id, title, created_at, salon_id')
          .order('created_at', { ascending: false })
          .limit(3);
        
        // Get recent booth posts
        const { data: booths, error: boothsError } = await supabase
          .from('posts')
          .select('id, title, created_at, user_id')
          .eq('post_type', 'booth')
          .order('created_at', { ascending: false })
          .limit(3);
        
        // Get recent salon sales listings
        const { data: salonSales, error: salesError } = await supabase
          .from('salon_sales')
          .select('id, salon_name, created_at, user_id')
          .order('created_at', { ascending: false })
          .limit(3);

        if (usersError) {
          console.error("Error fetching recent users:", usersError);
        } else {
          setRecentUsers(users || []);
        }

        // Process jobs, booths, and salon sales into a combined timeline
        const combinedItems: RecentItem[] = [];
        
        // Add jobs to the timeline - updated to use salon_id
        if (!jobsError && jobs) {
          for (const job of jobs) {
            // Get the salon name who posted the job
            const { data: salonData } = await supabase
              .from('salons')
              .select('salon_name')
              .eq('id', job.salon_id)
              .single();
            
            combinedItems.push({
              id: job.id,
              title: job.title,
              type: 'job',
              actor_name: salonData?.salon_name || 'Unknown Salon',
              created_at: job.created_at
            });
          }
        }
        
        // Add booths to the timeline
        if (!boothsError && booths) {
          for (const booth of booths) {
            // Get the user name who posted the booth
            const { data: userData } = await supabase
              .from('users')
              .select('full_name')
              .eq('id', booth.user_id)
              .single();
            
            combinedItems.push({
              id: booth.id,
              title: booth.title,
              type: 'booth',
              actor_name: userData?.full_name || 'Unknown User',
              created_at: booth.created_at
            });
          }
        }
        
        // Add salon sales to the timeline
        if (!salesError && salonSales) {
          for (const sale of salonSales) {
            // Get the user name who posted the salon sale
            const { data: userData } = await supabase
              .from('users')
              .select('full_name')
              .eq('id', sale.user_id)
              .single();
            
            combinedItems.push({
              id: sale.id,
              title: sale.salon_name,
              type: 'salon',
              actor_name: userData?.full_name || 'Unknown User',
              created_at: sale.created_at
            });
          }
        }
        
        // Sort combined items by creation date (newest first)
        combinedItems.sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        
        setRecentItems(combinedItems.slice(0, 5));
      } catch (error) {
        console.error("Error fetching recent activity:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentActivity();
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <UserPlus className="h-5 w-5 text-blue-500" />;
      case 'job':
        return <Briefcase className="h-5 w-5 text-green-500" />;
      case 'booth':
        return <Home className="h-5 w-5 text-amber-500" />;
      case 'salon':
        return <ShoppingBag className="h-5 w-5 text-purple-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
      return 'recently';
    }
  };

  const getRoleBadgeClasses = (role: string) => {
    switch (role) {
      case 'artist':
        return 'bg-blue-100 text-blue-800';
      case 'salon':
      case 'owner':
        return 'bg-purple-100 text-purple-800';
      case 'customer':
        return 'bg-green-100 text-green-800';
      case 'admin':
        return 'bg-amber-100 text-amber-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Recent Activity</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card className={`${loading ? 'animate-pulse' : ''}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <UserPlus className="h-4 w-4 mr-2 text-blue-600" />
              New Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-9 bg-gray-100 rounded animate-pulse"></div>
                ))}
              </div>
            ) : recentUsers.length > 0 ? (
              <ul className="space-y-3">
                {recentUsers.map(user => (
                  <li key={user.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="font-medium">{user.full_name}</div>
                      <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${getRoleBadgeClasses(user.role)}`}>
                        {user.role}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(user.created_at)}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground italic">No recent users found</p>
            )}
          </CardContent>
        </Card>
        
        {/* Recent Activity */}
        <Card className={`${loading ? 'animate-pulse' : ''}`}>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium flex items-center">
              <Clock className="h-4 w-4 mr-2 text-purple-600" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-9 bg-gray-100 rounded animate-pulse"></div>
                ))}
              </div>
            ) : recentItems.length > 0 ? (
              <ul className="space-y-3">
                {recentItems.map(item => (
                  <li key={item.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                    <div className="flex items-center">
                      <span className="mr-2">{getActivityIcon(item.type)}</span>
                      <div>
                        <div className="font-medium">{item.title}</div>
                        <div className="text-xs text-muted-foreground">
                          by {item.actor_name}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(item.created_at)}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground italic">No recent activity found</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RecentActivity;

