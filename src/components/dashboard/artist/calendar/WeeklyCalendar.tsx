
import { motion } from "framer-motion";
import { format, addDays, startOfWeek, isSameDay, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Plus, X } from "lucide-react";
import { DayColumn } from "./DayColumn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useArtistCalendar } from "@/hooks/useArtistCalendar";
import { Booking } from "@/components/dashboard/artist/types/ArtistDashboardTypes";
import { Skeleton } from "@/components/ui/skeleton";
import BookingModal from "./BookingModal";

export const WeeklyCalendar = () => {
  const { 
    currentDate,
    weekDays,
    appointments, 
    blockedTimes,
    isLoadingAppointments, 
    isLoadingBlockedTimes,
    goToPreviousWeek,
    goToNextWeek,
    goToToday,
    selectedBooking,
    selectedBlockedTime,
    isBookingDialogOpen,
    isBlockTimeDialogOpen,
    setIsBookingDialogOpen,
    setIsBlockTimeDialogOpen,
    openAddBookingDialog,
    openBlockTimeDialog,
    saveAppointment,
    saveBlockedTime,
    deleteAppointment,
    deleteBlockedTime
  } = useArtistCalendar();
  
  const loading = isLoadingAppointments || isLoadingBlockedTimes;

  // Mock data for bookings (we'll integrate with appointments/API data later)
  const mockBookings = [
    {
      id: '1',
      client_name: 'Emma Thompson',
      service_name: 'Bridal Makeup',
      date_requested: '2025-04-26',
      time_requested: '2:00 PM',
      status: 'confirmed',
      note: 'Wedding at Grand Hotel'
    },
    {
      id: '2',
      client_name: 'Sarah Johnson',
      service_name: 'Makeup Session',
      date_requested: '2025-04-27',
      time_requested: '10:30 AM',
      status: 'completed',
      note: 'Corporate photoshoot'
    },
    {
      id: '3',
      client_name: 'Jessica Brown',
      service_name: 'Full Glam Package',
      date_requested: '2025-04-28',
      time_requested: '4:00 PM',
      status: 'pending',
      note: 'Birthday party'
    },
  ];

  const getBookingsForDay = (day: Date) => {
    return mockBookings.filter((booking) => {
      if (booking.date_requested) {
        const bookingDate = new Date(booking.date_requested);
        return isSameDay(bookingDate, day);
      }
      return false;
    }) as Booking[];
  };

  return (
    <Card className="shadow-sm border-gray-100/50">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="font-medium text-muted-foreground">
            {format(weekDays[0], "MMMM d")} - {format(weekDays[6], "MMMM d, yyyy")}
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={goToPreviousWeek}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={goToToday}
            >
              Today
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={goToNextWeek}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-6">
        <div className="mb-4 flex flex-col sm:flex-row justify-between gap-2">
          <CardTitle className="text-lg flex items-center">
            <CalendarDays className="h-5 w-5 mr-2 text-primary" />
            Weekly View
          </CardTitle>
          
          <div className="flex space-x-2">
            <Button 
              size="sm" 
              onClick={() => openAddBookingDialog()}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-sm hover:shadow-md transition-shadow"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Add Booking
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => openBlockTimeDialog()}
              className="border-purple-200"
            >
              <X className="h-4 w-4 mr-1.5" />
              Block Time
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-7 gap-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex-1">
                <Skeleton className="h-10 w-full rounded-t-md mb-2" />
                <Skeleton className="h-[400px] w-full rounded-b-md" />
              </div>
            ))}
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
      
      {/* Booking Dialog */}
      <BookingModal
        open={isBookingDialogOpen}
        onClose={() => setIsBookingDialogOpen(false)}
        existingBooking={selectedBooking}
      />
    </Card>
  );
};
