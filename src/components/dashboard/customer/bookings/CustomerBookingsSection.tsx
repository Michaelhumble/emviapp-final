
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from '@/context/auth';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { CalendarCheck, Clock, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface Booking {
  id: string;
  created_at: string;
  date_requested?: string | null;
  time_requested?: string | null;
  status?: string;
  note?: string;
  service_id?: string;
  service?: {
    id: string;
    title: string;
    price: number;
  } | null;
  artist?: {
    id: string;
    full_name: string;
    avatar_url?: string;
  } | null;
}

const CustomerBookingsSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const { data: bookings, isLoading, error } = useQuery({
    queryKey: ['customer-bookings', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id, 
          created_at, 
          date_requested, 
          time_requested,
          status, 
          note,
          service_id,
          service:service_id (id, title, price),
          artist:recipient_id (id, full_name, avatar_url)
        `)
        .eq('sender_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Transform data to handle potential errors with the artist relation
      return (data || []).map(item => {
        // If artist is an error object, replace with null
        if (item.artist && 'error' in item.artist) {
          return {
            ...item,
            artist: null
          };
        }
        return item;
      }) as Booking[];
    },
    enabled: !!user,
  });

  if (isLoading) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarCheck className="h-5 w-5 text-pink-500" />
            Your Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2].map((i) => (
              <div key={i} className="flex justify-between border rounded-lg p-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div>
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    console.error("Error loading bookings:", error);
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <XCircle className="h-5 w-5 text-red-500" />
            Booking Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-red-500">Unable to load your bookings. Please try again later.</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (!bookings || bookings.length === 0) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarCheck className="h-5 w-5 text-pink-500" />
            Your Bookings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">You don't have any bookings yet.</p>
            <Button onClick={() => navigate('/explore/artists')}>
              Explore Artists
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarCheck className="h-5 w-5 text-pink-500" />
          Your Bookings
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings?.map((booking) => (
            <div 
              key={booking.id}
              className="flex justify-between items-center border rounded-lg p-4 hover:bg-gray-50 transition-colors"
            >
              <div>
                <h3 className="font-medium">
                  {booking.service?.title || "Booking Request"}
                </h3>
                <p className="text-sm text-gray-600">
                  {booking.artist?.full_name || "Artist"}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {booking.date_requested && (
                    <span className="text-xs text-gray-500 flex items-center">
                      <CalendarCheck className="h-3 w-3 mr-1" />
                      {format(new Date(booking.date_requested), 'MMM d, yyyy')}
                    </span>
                  )}
                  {booking.time_requested && (
                    <span className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {booking.time_requested}
                    </span>
                  )}
                </div>
              </div>
              <div>
                <span className={`
                  px-2 py-1 rounded-full text-xs font-medium
                  ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
                  ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                  ${booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                  ${booking.status === 'completed' ? 'bg-blue-100 text-blue-800' : ''}
                `}>
                  {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1) || 'Pending'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CustomerBookingsSection;
