
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Calendar, User, AlertTriangle } from "lucide-react";
import { useAuth } from "@/context/auth";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { differenceInDays } from "date-fns";

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success';
  icon: React.ReactNode;
  date: string;
}

const SalonNotificationCenter = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchNotifications = async () => {
      try {
        setLoading(true);
        
        // Fetch user's job posts to check for expirations
        const { data: posts, error: postsError } = await supabase
          .from('posts')
          .select('id, title, expires_at')
          .eq('user_id', user.id)
          .eq('post_type', 'job')
          .eq('status', 'active');
          
        if (postsError) throw postsError;
        
        const notificationsArray: Notification[] = [];
        
        // Check for expiring posts (within 3 days)
        posts?.forEach(post => {
          const expiryDate = new Date(post.expires_at);
          const daysUntilExpiry = differenceInDays(expiryDate, new Date());
          
          if (daysUntilExpiry <= 3 && daysUntilExpiry >= 0) {
            notificationsArray.push({
              id: `expire-${post.id}`,
              message: `Your post "${post.title}" expires in ${daysUntilExpiry} day${daysUntilExpiry !== 1 ? 's' : ''}`,
              type: 'warning',
              icon: <Calendar className="h-4 w-4 text-amber-500" />,
              date: new Date().toISOString()
            });
          }
        });
        
        // Add a mock notification about new applicants (you would replace this with real data)
        notificationsArray.push({
          id: 'new-applicants',
          message: 'You received 2 new applicants today',
          type: 'success',
          icon: <User className="h-4 w-4 text-green-500" />,
          date: new Date().toISOString()
        });
        
        // Add information about boosting profile
        notificationsArray.push({
          id: 'boost-reminder',
          message: 'Boost your profile for 3x more visibility',
          type: 'info',
          icon: <Bell className="h-4 w-4 text-blue-500" />,
          date: new Date().toISOString()
        });
        
        setNotifications(notificationsArray);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [user]);

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-serif flex items-center">
          <Bell className="h-5 w-5 mr-2 text-blue-500" />
          Notification Center
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4 mb-1"></div>
                  <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : notifications.length > 0 ? (
          <div className="space-y-3">
            {notifications.map(notification => (
              <div key={notification.id} className="flex items-start gap-3 pb-2 border-b border-gray-100 last:border-b-0">
                <div className={`p-2 rounded-full mt-1 ${
                  notification.type === 'warning' 
                    ? 'bg-amber-100' 
                    : notification.type === 'success'
                      ? 'bg-green-100'
                      : 'bg-blue-100'
                }`}>
                  {notification.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-800">{notification.message}</p>
                  <p className="text-xs text-gray-500">Just now</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <AlertTriangle className="h-8 w-8 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">No notifications at this time</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SalonNotificationCenter;
