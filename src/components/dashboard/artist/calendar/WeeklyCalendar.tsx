
import { motion } from "framer-motion";
import { format, addDays, startOfWeek, isSameDay, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { DayColumn } from "./DayColumn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useArtistCalendar } from "@/hooks/useArtistCalendar";
import { Booking } from "@/components/dashboard/artist/types/ArtistDashboardTypes";

export const WeeklyCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start from Monday
  const { 
    appointments, 
    isLoadingAppointments, 
    isLoadingBlockedTimes 
  } = useArtistCalendar();
  const loading = isLoadingAppointments || isLoadingBlockedTimes;

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getBookingsForDay = (day: Date) => {
    return appointments.filter((booking) => {
      if (booking.start_time) {
        // Use start_time instead of date_requested
        const bookingDate = parseISO(booking.start_time);
        return isSameDay(bookingDate, day);
      }
      return false;
    }).map(booking => {
      // Convert from API format to our Booking type
      return {
        id: booking.id,
        sender_id: booking.customer_id || '',
        recipient_id: booking.artist_id || '',
        client_name: booking.customer_name || 'Client',
        service_name: booking.services?.title || 'Service',
        date_requested: booking.start_time || '',
        time_requested: booking.start_time ? format(parseISO(booking.start_time), 'h:mm a') : '',
        status: booking.status as 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled',
        created_at: booking.created_at || new Date().toISOString()
      } as Booking;
    });
  };

  return (
    <Card className="shadow-sm border-gray-100/50 bg-gradient-to-br from-white to-gray-50/30">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-xl font-playfair flex items-center">
            <CalendarDays className="h-5 w-5 mr-2 text-primary" />
            Calendar
          </CardTitle>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentDate(d => addDays(d, -7))}
              className="bg-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentDate(new Date())}
              className="bg-white"
            >
              Today
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setCurrentDate(d => addDays(d, 7))}
              className="bg-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="font-medium text-muted-foreground mb-4">
          {format(weekStart, "MMMM d")} - {format(addDays(weekStart, 6), "MMMM d, yyyy")}
        </div>
        
        {loading ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="text-muted-foreground">Loading calendar...</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <motion.div 
              className="flex gap-2 min-w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {weekDays.map((day, i) => (
                <DayColumn
                  key={i}
                  day={day}
                  bookings={getBookingsForDay(day)}
                  isToday={isSameDay(day, new Date())}
                />
              ))}
            </motion.div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
