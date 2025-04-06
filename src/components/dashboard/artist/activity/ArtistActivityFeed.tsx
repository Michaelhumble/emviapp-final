
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/auth';
import { ActivityLog } from '@/types/activity';
import { Scroll, AlertCircle } from 'lucide-react';
import ActivityIcon from './ActivityIcon';
import { formatDistanceToNow } from 'date-fns';

interface ArtistActivityFeedProps {
  limit?: number;
}

const ArtistActivityFeed = ({ limit = 5 }: ArtistActivityFeedProps) => {
  const { user } = useAuth();
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        setError(null);
        
        const { data, error } = await supabase
          .from('activity_log')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(limit);
          
        if (error) {
          throw error;
        }
        
        setActivities(data as ActivityLog[]);
      } catch (err) {
        console.error('Error fetching activity logs:', err);
        setError('Failed to load your activity feed');
      } finally {
        setLoading(false);
      }
    };
    
    fetchActivities();
  }, [user, limit]);
  
  const renderActivityList = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="h-5 w-24 bg-gray-200 animate-pulse rounded mb-2"></div>
          <div className="h-4 w-40 bg-gray-100 animate-pulse rounded"></div>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="flex items-center justify-center py-6 text-gray-500">
          <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
          <p>Could not load activity feed</p>
        </div>
      );
    }
    
    if (activities.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
          <Scroll className="h-10 w-10 mb-3 text-purple-300" />
          <p className="text-center max-w-sm">
            Your Emvi journey starts now. Take action and watch your story grow.
          </p>
        </div>
      );
    }
    
    return (
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-3 px-1 py-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="bg-white p-2 rounded-full shadow-sm border">
              <ActivityIcon activityType={activity.activity_type} />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-800">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-1">
                {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <Card className="border-purple-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-serif flex items-center">
          <Scroll className="h-5 w-5 mr-2 text-purple-500" />
          My Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {renderActivityList()}
      </CardContent>
    </Card>
  );
};

export default ArtistActivityFeed;
