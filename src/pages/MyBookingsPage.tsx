
import { useEffect, useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/auth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import AuthGuard from "@/components/auth/AuthGuard";
import { AlertCircle, Calendar, CheckCircle, Clock, Loader2, X } from "lucide-react";
import { useBookingNotifications } from "@/hooks/useBookingNotifications";
import { useNavigate } from "react-router-dom";

interface Provider {
  id: string;
  full_name: string;
}

interface Booking {
  id: string;
  provider: Provider;
  service_type: string;
  date_requested: string;
  time_requested: string;
  status: string;
  notes: string;
  created_at: string;
}

const MyBookingsPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");

  // Use the booking notifications hook
  useBookingNotifications();
  
  const fetchBookings = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          id,
          service_type,
          date_requested,
          time_requested,
          status,
          notes,
          created_at,
          provider:provider_id(id, full_name)
        `)
        .eq("customer_id", user.id);
      
      if (error) throw error;
      
      if (data) {
        setBookings(data as unknown as Booking[]);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load your bookings. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchBookings();
    
    // Set up a real-time subscription for booking updates
    if (user?.id) {
      const bookingsSubscription = supabase
        .channel('booking-changes')
        .on('postgres_changes', 
          { 
            event: '*', 
            schema: 'public', 
            table: 'bookings',
            filter: `customer_id=eq.${user.id}`
          }, 
          () => {
            fetchBookings();
          })
        .subscribe();
          
      return () => {
        supabase.removeChannel(bookingsSubscription);
      };
    }
    
    return () => {};
  }, [user]);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Confirmed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Cancelled</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const handleCancelBooking = async (bookingId: string) => {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "cancelled" })
        .eq("id", bookingId)
        .eq("customer_id", user?.id);
      
      if (error) throw error;
      
      toast.success("Booking cancelled successfully");
      fetchBookings();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      toast.error("Failed to cancel booking. Please try again.");
    }
  };
  
  const formatDate = (dateStr: string) => {
    if (!dateStr) return "N/A";
    try {
      return format(new Date(dateStr), "MMM d, yyyy");
    } catch (e) {
      return dateStr;
    }
  };
  
  // Filter bookings for the tabs
  const upcomingBookings = bookings.filter(booking => 
    ['pending', 'confirmed'].includes(booking.status) && 
    new Date(booking.date_requested) >= new Date()
  ).sort((a, b) => new Date(a.date_requested).getTime() - new Date(b.date_requested).getTime());
  
  const pastBookings = bookings.filter(booking => 
    booking.status === 'completed' || 
    new Date(booking.date_requested) < new Date()
  ).sort((a, b) => new Date(b.date_requested).getTime() - new Date(a.date_requested).getTime());
  
  const cancelledBookings = bookings.filter(booking => 
    booking.status === 'cancelled'
  ).sort((a, b) => new Date(b.date_requested).getTime() - new Date(a.date_requested).getTime());

  return (
    <Layout>
      <AuthGuard>
        <div className="container mx-auto py-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold flex items-center gap-2">
                <Calendar className="h-6 w-6 text-primary" />
                My Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 mb-8">
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>
                
                <TabsContent value="upcoming">
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : upcomingBookings.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Upcoming Bookings</h3>
                      <p className="text-gray-500 mb-4">You don't have any upcoming bookings scheduled.</p>
                      <Button onClick={() => navigate("/booking")}>Book an Appointment</Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {upcomingBookings.map((booking) => (
                        <div key={booking.id} className="border rounded-lg p-4 shadow-sm">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold">{booking.service_type}</h3>
                                {getStatusBadge(booking.status)}
                              </div>
                              <div className="text-gray-600 mb-1">
                                with <span className="font-medium">{booking.provider?.full_name}</span>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{formatDate(booking.date_requested)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{booking.time_requested}</span>
                                </div>
                              </div>
                              {booking.notes && (
                                <div className="mt-2 text-sm bg-gray-50 p-2 rounded border border-gray-100">
                                  <span className="font-medium">Notes:</span> {booking.notes}
                                </div>
                              )}
                            </div>
                            <div className="mt-4 md:mt-0">
                              {booking.status === "pending" && (
                                <Button 
                                  variant="outline" 
                                  className="border-red-200 hover:bg-red-50 hover:text-red-700"
                                  onClick={() => handleCancelBooking(booking.id)}
                                >
                                  <X className="h-4 w-4 mr-1" />
                                  Cancel
                                </Button>
                              )}
                              {booking.status === "confirmed" && (
                                <div className="flex items-center text-green-600">
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  <span className="text-sm">Confirmed</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="past">
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : pastBookings.length === 0 ? (
                    <div className="text-center py-8">
                      <Calendar className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Past Bookings</h3>
                      <p className="text-gray-500 mb-4">You don't have any past bookings.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {pastBookings.map((booking) => (
                        <div key={booking.id} className="border rounded-lg p-4 shadow-sm">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold">{booking.service_type}</h3>
                                {getStatusBadge(booking.status)}
                              </div>
                              <div className="text-gray-600 mb-1">
                                with <span className="font-medium">{booking.provider?.full_name}</span>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{formatDate(booking.date_requested)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{booking.time_requested}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="cancelled">
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : cancelledBookings.length === 0 ? (
                    <div className="text-center py-8">
                      <AlertCircle className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Cancelled Bookings</h3>
                      <p className="text-gray-500">You don't have any cancelled bookings.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cancelledBookings.map((booking) => (
                        <div key={booking.id} className="border rounded-lg p-4 shadow-sm opacity-70">
                          <div className="flex flex-col md:flex-row justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold">{booking.service_type}</h3>
                                {getStatusBadge(booking.status)}
                              </div>
                              <div className="text-gray-600 mb-1">
                                with <span className="font-medium">{booking.provider?.full_name}</span>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{formatDate(booking.date_requested)}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{booking.time_requested}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </AuthGuard>
    </Layout>
  );
};

export default MyBookingsPage;
