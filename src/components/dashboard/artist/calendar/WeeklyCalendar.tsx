
import { motion } from "framer-motion";
import { format, addDays, startOfWeek, isSameDay, parseISO } from "date-fns";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react";
import { DayColumn } from "./DayColumn";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useArtistCalendar } from "@/hooks/useArtistCalendar";
import { Booking } from "@/components/dashboard/artist/types/ArtistDashboardTypes";
import ArtistBookingDialog from "./ArtistBookingDialog";
import BlockTimeDialog from "./BlockTimeDialog";
import { Skeleton } from "@/components/ui/skeleton";

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

  // Fixed event handlers for button clicks
  const handleAddBookingClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    openAddBookingDialog();
  };

  const handlePreviousWeekClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    goToPreviousWeek();
  };

  const handleTodayClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    goToToday();
  };

  const handleNextWeekClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    goToNextWeek();
  };

  const handleBlockTimeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    openBlockTimeDialog();
  };

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
    <Card className="shadow-sm border-gray-100/50">
      <CardHeader className="pb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-xl flex items-center">
            <CalendarDays className="h-5 w-5 mr-2 text-primary" />
            Calendar
          </CardTitle>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handlePreviousWeekClick}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleTodayClick}
            >
              Today
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleNextWeekClick}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pb-6">
        <div className="mb-4 flex flex-col sm:flex-row justify-between gap-2">
          <div className="font-medium text-muted-foreground mb-2">
            {format(weekDays[0], "MMMM d")} - {format(weekDays[6], "MMMM d, yyyy")}
          </div>
          
          <div className="flex space-x-2">
            <Button size="sm" onClick={handleAddBookingClick}>
              <Plus className="h-4 w-4 mr-1.5" />
              Add Booking
            </Button>
            <Button size="sm" variant="outline" onClick={handleBlockTimeClick}>
              <Clock className="h-4 w-4 mr-1.5" />
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
      <ArtistBookingDialog
        isOpen={isBookingDialogOpen}
        onClose={() => setIsBookingDialogOpen(false)}
        onSave={saveAppointment}
        onDelete={deleteAppointment}
        booking={selectedBooking}
        isEditing={!!selectedBooking}
      />
      
      {/* Block Time Dialog */}
      <BlockTimeDialog
        isOpen={isBlockTimeDialogOpen}
        onClose={() => setIsBlockTimeDialogOpen(false)}
        onSave={saveBlockedTime}
        onDelete={deleteBlockedTime}
        blockedTime={selectedBlockedTime}
        isEditing={!!selectedBlockedTime}
      />
    </Card>
  );
};
