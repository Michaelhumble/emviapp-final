
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";

interface Booking {
  id: string;
  client_name: string;
  service_type: string;
  date_requested: string;
  time_requested: string;
  status: string;
  created_at: string;
}

const SalonBookingOverview = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    pending: 0,
    confirmed: 0,
    completed: 0,
    total: 0
  });

  console.log('🟪 SalonBookingOverview component loaded');

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('recipient_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      
      const bookingData = data || [];
      setBookings(bookingData);
      
      // Calculate stats
      const pending = bookingData.filter(b => b.status === 'pending').length;
      const confirmed = bookingData.filter(b => b.status === 'confirmed').length;
      const completed = bookingData.filter(b => b.status === 'completed').length;
      
      setStats({
        pending,
        confirmed,
        completed,
        total: bookingData.length
      });
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case 'cancelled': return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Card className="border-green-100">
      <CardHeader>
        <CardTitle className="text-xl font-serif flex items-center">
          <Calendar className="h-5 w-5 mr-2 text-green-500" />
          Booking Overview
        </CardTitle>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-2 mt-4">
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-600">{stats.pending}</div>
            <div className="text-xs text-gray-500">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">{stats.confirmed}</div>
            <div className="text-xs text-gray-500">Confirmed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">{stats.completed}</div>
            <div className="text-xs text-gray-500">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-700">{stats.total}</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {loading ? (
          <div className="text-center py-6">
            <Calendar className="h-8 w-8 animate-pulse mx-auto mb-2 text-green-500" />
            <p>Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-green-200 rounded-lg">
            <Calendar className="h-12 w-12 text-green-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings yet</h3>
            <p className="text-gray-500">Your upcoming appointments will appear here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {bookings.slice(0, 5).map((booking) => (
              <div key={booking.id} className="border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-medium">{booking.client_name || 'Client'}</span>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status?.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{booking.service_type}</p>
                    <div className="flex items-center text-xs text-gray-400">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{booking.date_requested} at {booking.time_requested}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {getStatusIcon(booking.status)}
                  </div>
                </div>
              </div>
            ))}
            
            <div className="text-center pt-4">
              <Button variant="outline" size="sm">
                View All Bookings →
              </Button>
            </div>
          </div>
        )}
        
        {/* Debug marker */}
        <div className="mt-4 text-xs text-green-500 border-t pt-2">
          🟪 Booking Overview Component | Bookings: {bookings.length} | Stats Calculated
        </div>
      </CardContent>
    </Card>
  );
};

export default SalonBookingOverview;
