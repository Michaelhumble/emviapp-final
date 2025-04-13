
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, parseISO, isFuture, isPast } from 'date-fns';
import { toast } from 'sonner';

interface Booking {
  id: string;
  service_type: string;
  date_requested: string;
  time_requested: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  note: string;
  location: string;
  recipient_details: {
    full_name: string;
    avatar_url: string | null;
  };
  sender_details: {
    full_name: string;
    avatar_url: string | null;
  };
}

const MyBookingsPage = () => {
  const { user, userProfile } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState("upcoming");
  
  useEffect(() => {
    if (user?.id) {
      fetchBookings();
    }
  }, [user]);
  
  const fetchBookings = async () => {
    if (!user?.id) return;
    
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          service_type,
          date_requested,
          time_requested,
          status,
          note,
          location,
          recipient:recipient_id (
            full_name,
            avatar_url
          ),
          sender:sender_id (
            full_name,
            avatar_url
          )
        `)
        .or(`sender_id.eq.${user.id},recipient_id.eq.${user.id}`)
        .order('date_requested', { ascending: false });
      
      if (error) throw error;
      
      // Use type assertion to fix deep type instantiation issue
      const typedData = data as any[];
      
      // Map the data to the correct interface
      const processedBookings: Booking[] = typedData.map(booking => ({
        id: booking.id,
        service_type: booking.service_type,
        date_requested: booking.date_requested,
        time_requested: booking.time_requested,
        status: booking.status,
        note: booking.note,
        location: booking.location || 'Not specified',
        recipient_details: {
          full_name: booking.recipient?.full_name || 'Unknown',
          avatar_url: booking.recipient?.avatar_url
        },
        sender_details: {
          full_name: booking.sender?.full_name || 'Unknown',
          avatar_url: booking.sender?.avatar_url
        }
      }));
      
      setBookings(processedBookings);
      
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load your bookings');
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (id: string, status: 'confirmed' | 'cancelled' | 'completed') => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', id);
      
      if (error) throw error;
      
      // Update the local state
      setBookings(prev => 
        prev.map(booking => 
          booking.id === id ? { ...booking, status } : booking
        )
      );
      
      toast.success(`Booking ${status} successfully`);
    } catch (error) {
      console.error('Error updating booking:', error);
      toast.error('Failed to update booking');
    }
  };
  
  const getUpcomingBookings = () => {
    return bookings.filter(booking => {
      try {
        const bookingDate = parseISO(`${booking.date_requested}T${booking.time_requested}`);
        return isFuture(bookingDate) && booking.status !== 'cancelled';
      } catch (error) {
        console.error('Date parsing error:', error);
        return false;
      }
    });
  };
  
  const getPastBookings = () => {
    return bookings.filter(booking => {
      try {
        const bookingDate = parseISO(`${booking.date_requested}T${booking.time_requested}`);
        return isPast(bookingDate) || booking.status === 'cancelled';
      } catch (error) {
        console.error('Date parsing error:', error);
        return false;
      }
    });
  };
  
  const formatBookingDate = (dateStr: string) => {
    try {
      return format(parseISO(dateStr), 'EEE, MMM d, yyyy');
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateStr;
    }
  };
  
  const formatBookingTime = (timeStr: string) => {
    try {
      const [hours, minutes] = timeStr.split(':');
      const hour = parseInt(hours);
      const period = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${period}`;
    } catch (error) {
      console.error('Error formatting time:', error);
      return timeStr;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-300">Pending</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="bg-green-50 text-green-800 border-green-300">Confirmed</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-300">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-800 border-red-300">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getOtherParty = (booking: Booking) => {
    // Use userProfile?.full_name instead of user?.full_name
    const isSender = booking.sender_details?.full_name === userProfile?.full_name;
    return isSender ? booking.recipient_details : booking.sender_details;
  };
  
  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
        
        <Tabs defaultValue="upcoming" value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past & Cancelled</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            {loading ? (
              <div className="text-center py-10">Loading your bookings...</div>
            ) : getUpcomingBookings().length === 0 ? (
              <div className="text-center py-10">
                <p className="text-lg text-muted-foreground mb-4">You don't have any upcoming bookings</p>
                <Button>Book an Appointment</Button>
              </div>
            ) : (
              <div className="space-y-6">
                {getUpcomingBookings().map((booking) => (
                  <Card key={booking.id} className="overflow-hidden">
                    <div className={`h-2 ${booking.status === 'confirmed' ? 'bg-green-500' : booking.status === 'pending' ? 'bg-yellow-500' : 'bg-blue-500'}`} />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">{booking.service_type}</h3>
                          <p className="text-sm text-muted-foreground">
                            with {getOtherParty(booking)?.full_name}
                          </p>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          {formatBookingDate(booking.date_requested)}
                          <Clock className="h-4 w-4 ml-4 mr-2 text-muted-foreground" />
                          {formatBookingTime(booking.time_requested)}
                        </div>
                        
                        {booking.location && (
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            {booking.location}
                          </div>
                        )}
                        
                        {booking.note && (
                          <div className="mt-4 p-3 bg-muted/50 rounded-md text-sm">
                            {booking.note}
                          </div>
                        )}
                        
                        {booking.status === 'pending' && (
                          <div className="flex space-x-3 mt-4">
                            <Button 
                              size="sm" 
                              onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                            >
                              Confirm
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                        
                        {booking.status === 'confirmed' && (
                          <div className="flex space-x-3 mt-4">
                            <Button 
                              size="sm"
                              onClick={() => updateBookingStatus(booking.id, 'completed')}
                            >
                              Mark as Completed
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            >
                              Cancel
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="past">
            {loading ? (
              <div className="text-center py-10">Loading your bookings...</div>
            ) : getPastBookings().length === 0 ? (
              <div className="text-center py-10">
                <p className="text-lg text-muted-foreground">You don't have any past bookings</p>
              </div>
            ) : (
              <div className="space-y-6">
                {getPastBookings().map((booking) => (
                  <Card key={booking.id} className="overflow-hidden">
                    <div className={`h-2 ${booking.status === 'completed' ? 'bg-blue-500' : 'bg-red-500'}`} />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">{booking.service_type}</h3>
                          <p className="text-sm text-muted-foreground">
                            with {getOtherParty(booking)?.full_name}
                          </p>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          {formatBookingDate(booking.date_requested)}
                          <Clock className="h-4 w-4 ml-4 mr-2 text-muted-foreground" />
                          {formatBookingTime(booking.time_requested)}
                        </div>
                        
                        {booking.location && (
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            {booking.location}
                          </div>
                        )}
                        
                        {booking.note && (
                          <div className="mt-4 p-3 bg-muted/50 rounded-md text-sm">
                            {booking.note}
                          </div>
                        )}
                        
                        {booking.status === 'completed' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-4"
                          >
                            Leave a Review
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MyBookingsPage;
