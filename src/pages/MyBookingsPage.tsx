
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/auth';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import Layout from '@/components/layout/Layout';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Calendar, Clock, MessageSquare, X, Check } from 'lucide-react';
import { format } from 'date-fns';

// Define interfaces for our data types
interface Booking {
  id: string;
  provider_name: string;
  provider_id: string;
  service_type: string;
  date: string | null;
  time: string;
  status: string;
  notes: string;
  created_at: string;
}

interface BookingResponse {
  id: string;
  customer_id: string;
  date: string | null;
  time: string;
  status: string;
  notes: string;
  created_at: string;
  service_type: string;
  recipient_id: string; // Changed from provider_id to match database column
  users: {
    full_name: string;
  } | null;
}

const MyBookingsPage = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      // Get bookings with provider name join
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          recipient_id,
          service_type,
          date,
          time,
          status,
          notes,
          created_at,
          users:recipient_id(full_name)
        `)
        .eq('customer_id', user!.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform data to our Booking interface with type safety
      if (data) {
        const formattedBookings: Booking[] = data.map((item: BookingResponse) => ({
          id: item.id,
          provider_name: item.users?.full_name || 'Unknown Provider',
          provider_id: item.recipient_id, // Using recipient_id instead of provider_id
          service_type: item.service_type || 'Unknown Service',
          date: item.date,
          time: item.time || '',
          status: item.status || 'pending',
          notes: item.notes || '',
          created_at: item.created_at
        }));

        setBookings(formattedBookings);
      }
    } catch (error: any) {
      console.error('Error fetching bookings:', error);
      toast.error('Failed to load your bookings');
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId: string) => {
    setCancelingId(bookingId);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', bookingId)
        .eq('customer_id', user!.id);

      if (error) throw error;

      toast.success('Booking cancelled successfully');
      // Update local state
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
      ));
    } catch (error: any) {
      console.error('Error cancelling booking:', error);
      toast.error('Failed to cancel booking');
    } finally {
      setCancelingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case 'confirmed':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Confirmed</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Cancelled</Badge>;
      case 'declined':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Declined</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-10 px-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">My Bookings</CardTitle>
            <CardDescription>
              View and manage your appointment requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">You don't have any bookings yet.</p>
                <Button className="mt-4" onClick={() => window.location.href = '/booking'}>
                  Book an Appointment
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.service_type}</TableCell>
                        <TableCell>{booking.provider_name}</TableCell>
                        <TableCell>
                          {booking.date ? (
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <Calendar className="mr-2 h-4 w-4" />
                                {format(new Date(booking.date), 'MMM d, yyyy')}
                              </div>
                              <div className="flex items-center text-muted-foreground">
                                <Clock className="mr-2 h-4 w-4" />
                                {booking.time}
                              </div>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">Not scheduled</span>
                          )}
                        </TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            {booking.status === 'pending' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => cancelBooking(booking.id)}
                                disabled={cancelingId === booking.id}
                              >
                                {cancelingId === booking.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <X className="h-4 w-4 mr-1" />
                                )}
                                Cancel
                              </Button>
                            )}
                            {booking.status === 'confirmed' && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="bg-green-50 hover:bg-green-100 text-green-700"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Confirmed
                              </Button>
                            )}
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4 mr-1" />
                              Notes
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default MyBookingsPage;
