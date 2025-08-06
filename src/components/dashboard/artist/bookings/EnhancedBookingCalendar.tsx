import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { format, startOfWeek, addDays, addWeeks, subWeeks, isSameDay } from 'date-fns';
import { useArtistBookings } from '../hooks/useArtistBookings';
import { BookingRescheduleDialog } from './BookingRescheduleDialog';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/auth';
import { toast } from 'sonner';

const timeSlots = Array.from({ length: 22 }, (_, i) => {
  const hour = Math.floor(i / 2) + 9;
  const minute = i % 2 === 0 ? '00' : '30';
  return `${hour.toString().padStart(2, '0')}:${minute}`;
});

export const EnhancedBookingCalendar: React.FC = () => {
  const { user } = useAuth();
  const { bookings, refresh } = useArtistBookings();
  const [currentWeek, setCurrentWeek] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [weekBookings, setWeekBookings] = useState(bookings);

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  // Filter bookings for current week
  useEffect(() => {
    const filtered = bookings.filter(booking => {
      const bookingDate = new Date(booking.date_requested || booking.created_at);
      return weekDays.some(day => isSameDay(bookingDate, day));
    });
    setWeekBookings(filtered);
  }, [bookings, currentWeek]);

  const getBookingsForDay = (date: Date) => {
    return weekBookings.filter(booking => {
      const bookingDate = new Date(booking.date_requested || booking.created_at);
      return isSameDay(bookingDate, date);
    });
  };

  const getBookingsForTimeSlot = (date: Date, timeSlot: string) => {
    return getBookingsForDay(date).filter(booking => 
      booking.time_requested === timeSlot
    );
  };

  const handleReschedule = async (bookingId: string, newDate: Date, newTime: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({
          date_requested: format(newDate, 'yyyy-MM-dd'),
          time_requested: newTime
        })
        .eq('id', bookingId)
        .eq('recipient_id', user?.id);

      if (error) throw error;
      
      await refresh();
      toast.success('Booking rescheduled successfully');
    } catch (error) {
      console.error('Reschedule error:', error);
      throw error;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Weekly Calendar
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium min-w-[120px] text-center">
              {format(weekStart, 'MMM d')} - {format(addDays(weekStart, 6), 'MMM d, yyyy')}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header with days */}
            <div className="grid grid-cols-8 border-b bg-muted/30">
              <div className="p-2 text-xs font-medium text-muted-foreground">Time</div>
              {weekDays.map((day, index) => (
                <div key={index} className="p-2 text-center border-l">
                  <div className="text-xs font-medium text-muted-foreground">
                    {format(day, 'EEE')}
                  </div>
                  <div className="text-sm font-semibold">
                    {format(day, 'd')}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {getBookingsForDay(day).length} bookings
                  </div>
                </div>
              ))}
            </div>

            {/* Time slots */}
            <div className="max-h-[500px] overflow-y-auto">
              {timeSlots.map((timeSlot) => (
                <div key={timeSlot} className="grid grid-cols-8 border-b min-h-[60px]">
                  <div className="p-2 text-xs text-muted-foreground font-medium bg-muted/20">
                    {timeSlot}
                  </div>
                  {weekDays.map((day, dayIndex) => {
                    const dayBookings = getBookingsForTimeSlot(day, timeSlot);
                    return (
                      <div key={dayIndex} className="p-1 border-l min-h-[60px]">
                        {dayBookings.map((booking) => (
                          <div
                            key={booking.id}
                            className={`
                              p-2 rounded text-xs cursor-pointer hover:opacity-80 transition-opacity
                              ${getStatusColor(booking.status)}
                            `}
                            onClick={() => {
                              setSelectedBooking(booking);
                              setIsRescheduleOpen(true);
                            }}
                          >
                            <div className="font-medium truncate">
                              {booking.client_name}
                            </div>
                            <div className="truncate">
                              {booking.service_name}
                            </div>
                            <Badge className="mt-1 text-xs">
                              {booking.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>

      <BookingRescheduleDialog
        booking={selectedBooking}
        isOpen={isRescheduleOpen}
        onClose={() => {
          setIsRescheduleOpen(false);
          setSelectedBooking(null);
        }}
        onReschedule={handleReschedule}
      />
    </Card>
  );
};