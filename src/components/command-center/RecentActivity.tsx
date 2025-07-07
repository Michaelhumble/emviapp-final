
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Briefcase, Users, DollarSign } from 'lucide-react';

const RecentActivity = () => {
  const { data: recentJobs, isLoading } = useQuery({
    queryKey: ['recent-jobs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('id, title, created_at, status')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    }
  });

  const { data: recentBookings, isLoading: bookingsLoading } = useQuery({
    queryKey: ['recent-bookings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('bookings')
        .select('id, client_name, created_at, status')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) throw error;
      return data;
    }
  });

  if (isLoading || bookingsLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-100 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Recent Jobs */}
          <div>
            <h4 className="font-medium text-sm text-gray-600 mb-2 flex items-center gap-1">
              <Briefcase className="h-4 w-4" />
              Recent Job Postings
            </h4>
            <div className="space-y-2">
              {recentJobs?.map((job) => (
                <div key={job.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <p className="text-sm font-medium">{job.title}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(job.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    {job.status}
                  </span>
                </div>
              ))}
              {(!recentJobs || recentJobs.length === 0) && (
                <p className="text-sm text-gray-500">No recent job postings</p>
              )}
            </div>
          </div>

          {/* Recent Bookings */}
          <div>
            <h4 className="font-medium text-sm text-gray-600 mb-2 flex items-center gap-1">
              <Users className="h-4 w-4" />
              Recent Bookings
            </h4>
            <div className="space-y-2">
              {recentBookings?.map((booking) => (
                <div key={booking.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div>
                    <p className="text-sm font-medium">{booking.client_name || 'New Booking'}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(booking.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    booking.status === 'accepted' ? 'bg-green-100 text-green-800' :
                    booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              ))}
              {(!recentBookings || recentBookings.length === 0) && (
                <p className="text-sm text-gray-500">No recent bookings</p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
