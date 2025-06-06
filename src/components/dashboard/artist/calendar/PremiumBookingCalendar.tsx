import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ChevronLeft, ChevronRight, Clock, User } from 'lucide-react';
import { format, startOfWeek, addDays, isSameDay, addWeeks, subWeeks } from 'date-fns';
import { motion } from 'framer-motion';
import { useArtistBookings } from '@/hooks/artist/useArtistBookings';
import { Booking } from '@/types/booking';

const PremiumBookingCalendar = () => {
  const { bookings, loading } = useArtistBookings();
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getBookingsForDay = (date: Date) => {
    return bookings.filter(booking => {
      if (!booking.date_requested) return false;
      const bookingDate = new Date(booking.date_requested);
      return isSameDay(bookingDate, date);
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'declined': return 'bg-red-100 text-red-800 border-red-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Calendar View</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentWeek(subWeeks(currentWeek, 1))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentWeek(new Date())}
          >
            Today
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentWeek(addWeeks(currentWeek, 1))}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Week of {format(weekStart, 'MMMM d, yyyy')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-4">
            {weekDays.map((day) => {
              const dayBookings = getBookingsForDay(day);
              const isToday = isSameDay(day, new Date());
              
              return (
                <div
                  key={day.toISOString()}
                  className={`border rounded-lg p-3 min-h-[200px] ${
                    isToday ? 'border-purple-300 bg-purple-50' : 'border-gray-200'
                  }`}
                >
                  <div className="font-medium text-sm mb-2">
                    <div className={isToday ? 'text-purple-700' : 'text-gray-700'}>
                      {format(day, 'EEE')}
                    </div>
                    <div className={`text-lg ${isToday ? 'text-purple-900' : 'text-gray-900'}`}>
                      {format(day, 'd')}
                    </div>
                  </div>

                  <div className="space-y-2">
                    {dayBookings.map((booking) => (
                      <motion.div
                        key={booking.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={`p-2 rounded text-xs border ${getStatusColor(booking.status)}`}
                      >
                        <div className="flex items-center gap-1 mb-1">
                          <User className="h-3 w-3" />
                          <span className="font-medium truncate">
                            {booking.client_name || 'Client'}
                          </span>
                        </div>
                        
                        {(booking.time_requested || booking.appointment_time) && (
                          <div className="flex items-center gap-1 mb-1">
                            <Clock className="h-3 w-3" />
                            <span>{booking.time_requested || booking.appointment_time}</span>
                          </div>
                        )}
                        
                        <div className="truncate">
                          {booking.service_name || booking.service_type || 'Service'}
                        </div>
                        
                        <Badge 
                          variant="secondary" 
                          className="text-xs mt-1"
                        >
                          {booking.status}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>

                  {dayBookings.length === 0 && (
                    <div className="text-xs text-gray-400 text-center mt-8">
                      No bookings
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {bookings.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings scheduled</h3>
            <p className="text-gray-500">
              Your calendar is empty. Bookings will appear here once clients start scheduling.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default PremiumBookingCalendar;
