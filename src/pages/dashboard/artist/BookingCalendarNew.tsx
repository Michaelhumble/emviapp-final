import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  CalendarClock,
  Clock,
  User,
  CheckCircle,
  XCircle,
  MessageSquare,
  Plus,
  Download,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  Calendar as CalendarIcon
} from 'lucide-react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { useArtistBookings } from '@/hooks/useArtistBookings';
import { useAuth } from '@/context/auth';
import { useCalendarSync } from '@/hooks/useCalendarSync';
// import BookingDetailsDialog from '@/components/booking/BookingDetailsDialog';
// import ManualBookingDialog from '@/components/booking/ManualBookingDialog';
// import AvailabilitySettings from '@/components/booking/AvailabilitySettings';
import { toast } from 'sonner';

const ArtistBookingCalendarNew = () => {
  const { userProfile } = useAuth();
  const { bookings, loading, updateBookingStatus, createManualBooking } = useArtistBookings();
  const { exportToIcal, addToGoogleCalendar } = useCalendarSync();
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<'calendar' | 'weekly' | 'list'>('calendar');
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showManualBooking, setShowManualBooking] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);
  const [acceptsBookings, setAcceptsBookings] = useState(userProfile?.accepts_bookings || false);

  // Filter bookings
  const todayBookings = bookings.filter(booking => 
    isSameDay(new Date(booking.date_requested), new Date())
  );
  
  const selectedDateBookings = bookings.filter(booking => 
    isSameDay(new Date(booking.date_requested), selectedDate)
  );

  const pendingBookings = bookings.filter(booking => booking.status === 'pending');
  const upcomingBookings = bookings.filter(booking => 
    booking.status === 'accepted' && 
    new Date(`${booking.date_requested}T${booking.time_requested}`) > new Date()
  );

  // Week view data
  const getWeekDays = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  const weekDays = getWeekDays(selectedDate);

  const handleStatusUpdate = async (bookingId: string, status: 'accepted' | 'declined') => {
    const success = await updateBookingStatus(bookingId, status);
    if (success && selectedBooking?.id === bookingId) {
      setSelectedBooking({ ...selectedBooking, status });
    }
  };

  const handleManualBooking = async (data: any) => {
    const success = await createManualBooking(data);
    if (success) {
      setShowManualBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <CalendarClock className="h-12 w-12 animate-pulse text-purple-500 mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your calendar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-playfair">Your Booking Calendar</CardTitle>
              <p className="text-muted-foreground">
                Manage appointments, availability, and client bookings
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={acceptsBookings} 
                  onCheckedChange={setAcceptsBookings}
                />
                <Label>Accept Bookings</Label>
              </div>
              <Button 
                variant="outline" 
                onClick={() => setShowAvailability(true)}
              >
                <CalendarClock className="h-4 w-4 mr-2" />
                Availability
              </Button>
              <Button 
                onClick={() => setShowManualBooking(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Booking
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Today</p>
                <p className="text-2xl font-bold">{todayBookings.length}</p>
              </div>
              <CalendarIcon className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-amber-600">{pendingBookings.length}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-2xl font-bold text-green-600">{upcomingBookings.length}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{bookings.length}</p>
              </div>
              <User className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calendar Views */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <Tabs value={view} onValueChange={(v) => setView(v as any)}>
              <TabsList>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => exportToIcal(bookings)}
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <Tabs value={view}>
            {/* Calendar View */}
            <TabsContent value="calendar">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    className="rounded-md border"
                  />
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4">
                    {format(selectedDate, 'EEEE, MMMM d, yyyy')}
                  </h3>
                  
                  {selectedDateBookings.length > 0 ? (
                    <div className="space-y-3">
                      {selectedDateBookings.map((booking) => (
                        <Card 
                          key={booking.id}
                          className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => setSelectedBooking(booking)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback>
                                  {booking.client_name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{booking.client_name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {booking.service_name}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium">{booking.time_requested}</p>
                              <Badge 
                                variant={
                                  booking.status === 'pending' ? 'secondary' :
                                  booking.status === 'accepted' ? 'default' :
                                  booking.status === 'declined' ? 'destructive' :
                                  'outline'
                                }
                              >
                                {booking.status}
                              </Badge>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No appointments for this date</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            {/* Weekly View */}
            <TabsContent value="weekly">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">
                    Week of {format(weekDays[0], 'MMM d')} - {format(weekDays[6], 'MMM d, yyyy')}
                  </h3>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedDate(addDays(selectedDate, -7))}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedDate(addDays(selectedDate, 7))}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-7 gap-2">
                  {weekDays.map((day, i) => {
                    const dayBookings = bookings.filter(booking => 
                      isSameDay(new Date(booking.date_requested), day)
                    );
                    
                    return (
                      <Card key={i} className="h-48">
                        <div className="p-2 border-b">
                          <p className="text-xs font-medium text-center">
                            {format(day, 'EEE')}
                          </p>
                          <p className="text-lg font-bold text-center">
                            {format(day, 'd')}
                          </p>
                        </div>
                        <div className="p-2 space-y-1 overflow-y-auto max-h-32">
                          {dayBookings.map((booking) => (
                            <div
                              key={booking.id}
                              className={`text-xs p-1 rounded cursor-pointer ${
                                booking.status === 'accepted' 
                                  ? 'bg-green-100 text-green-800'
                                  : booking.status === 'pending'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-gray-100 text-gray-800'
                              }`}
                              onClick={() => setSelectedBooking(booking)}
                            >
                              <p className="font-medium">{booking.time_requested}</p>
                              <p className="truncate">{booking.client_name}</p>
                            </div>
                          ))}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            {/* List View */}
            <TabsContent value="list">
              <div className="space-y-4">
                {bookings.length > 0 ? (
                  bookings.map((booking) => (
                    <Card key={booking.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarFallback>
                              {booking.client_name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{booking.client_name}</p>
                            <p className="text-sm text-muted-foreground">
                              {booking.service_name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(booking.date_requested), 'PPP')} at {booking.time_requested}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge 
                            variant={
                              booking.status === 'pending' ? 'secondary' :
                              booking.status === 'accepted' ? 'default' :
                              booking.status === 'declined' ? 'destructive' :
                              'outline'
                            }
                          >
                            {booking.status}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            <MessageSquare className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <CalendarIcon className="h-16 w-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-medium mb-2">No bookings yet</h3>
                    <p className="text-muted-foreground mb-4">
                      When clients book appointments, they'll appear here
                    </p>
                    <Button onClick={() => setShowManualBooking(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Booking
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Booking Details Dialog */}
      {selectedBooking && (
        <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Booking Details</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p><strong>Client:</strong> {selectedBooking.client_name}</p>
              <p><strong>Service:</strong> {selectedBooking.service_name}</p>
              <p><strong>Date:</strong> {format(new Date(selectedBooking.date_requested), 'PPP')}</p>
              <p><strong>Time:</strong> {selectedBooking.time_requested}</p>
              {selectedBooking.note && <p><strong>Notes:</strong> {selectedBooking.note}</p>}
              {selectedBooking.status === 'pending' && (
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handleStatusUpdate(selectedBooking.id, 'accepted')}
                    className="flex-1"
                  >
                    Accept
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => handleStatusUpdate(selectedBooking.id, 'declined')}
                    className="flex-1"
                  >
                    Decline
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ArtistBookingCalendarNew;