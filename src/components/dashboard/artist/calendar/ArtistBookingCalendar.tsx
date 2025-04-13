
import React from "react";
import { motion } from "framer-motion";
import { format, isSameDay, parseISO } from "date-fns";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Plus,
  CalendarOff,
  CalendarX,
  User,
  Loader2
} from "lucide-react";
import { useArtistCalendar } from "@/hooks/useArtistCalendar";
import ArtistBookingDialog from "./ArtistBookingDialog";
import BlockTimeDialog from "./BlockTimeDialog";
import { Skeleton } from "@/components/ui/skeleton";

const ArtistBookingCalendar = () => {
  const {
    currentDate,
    weekDays,
    appointments,
    blockedTimes,
    isLoadingAppointments,
    isLoadingBlockedTimes,
    selectedBooking,
    selectedBlockedTime,
    isBookingDialogOpen,
    isBlockTimeDialogOpen,
    goToPreviousWeek,
    goToNextWeek,
    goToToday,
    openAddBookingDialog,
    openEditBookingDialog,
    openBlockTimeDialog,
    openEditBlockedTimeDialog,
    setIsBookingDialogOpen,
    setIsBlockTimeDialogOpen,
    saveAppointment,
    saveBlockedTime,
    deleteAppointment,
    deleteBlockedTime
  } = useArtistCalendar();

  // Format time (e.g. "10:00 AM")
  const formatTime = (dateString: string) => {
    return format(parseISO(dateString), "h:mm a");
  };

  // Get appointments for a specific day
  const getAppointmentsForDay = (date: Date) => {
    return appointments.filter(appointment => 
      isSameDay(parseISO(appointment.start_time), date)
    );
  };

  // Get blocked times for a specific day
  const getBlockedTimesForDay = (date: Date) => {
    return blockedTimes.filter(blockedTime => 
      isSameDay(parseISO(blockedTime.start_time), date)
    );
  };

  // Determine if a day is empty (no appointments or blocked times)
  const isDayEmpty = (date: Date) => {
    return getAppointmentsForDay(date).length === 0 && getBlockedTimesForDay(date).length === 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8"
    >
      <Card className="border shadow-sm">
        <CardHeader className="pb-2">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
            <div>
              <CardTitle className="text-xl font-serif">Booking Calendar</CardTitle>
              <CardDescription>
                Manage your appointments and availability
              </CardDescription>
            </div>
            <div className="flex mt-4 sm:mt-0 gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={openAddBookingDialog}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Booking
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={openBlockTimeDialog}
              >
                <CalendarOff className="h-4 w-4 mr-2" />
                Block Time
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Calendar Navigation */}
          <div className="flex justify-between items-center mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={goToPreviousWeek}
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={goToToday}
              >
                Today
              </Button>
              <h3 className="text-lg font-medium">
                {format(weekDays[0], "MMM d")} - {format(weekDays[6], "MMM d, yyyy")}
              </h3>
            </div>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1"
              onClick={goToNextWeek}
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Week Calendar View */}
          {isLoadingAppointments || isLoadingBlockedTimes ? (
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={index} className="border rounded-md overflow-hidden">
                  <Skeleton className="h-12 w-full" />
                  <div className="p-2">
                    <Skeleton className="h-20 w-full mb-2" />
                    <Skeleton className="h-20 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-7 gap-3">
              {weekDays.map((day, index) => {
                const dayAppointments = getAppointmentsForDay(day);
                const dayBlockedTimes = getBlockedTimesForDay(day);
                const isEmpty = isDayEmpty(day);
                
                return (
                  <div key={index} className="border rounded-md overflow-hidden">
                    {/* Day Header */}
                    <div className={`p-2 text-center border-b ${
                      isSameDay(day, new Date()) 
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'bg-gray-50 text-gray-600'
                    }`}>
                      <p className="text-sm font-medium">
                        {format(day, "EEE")}
                      </p>
                      <p className="text-lg font-bold">
                        {format(day, "d")}
                      </p>
                    </div>
                    
                    {/* Day Content */}
                    <div className="p-2 min-h-[150px] max-h-[300px] overflow-y-auto">
                      {isEmpty ? (
                        <div className="h-full flex items-center justify-center">
                          <p className="text-gray-400 text-xs text-center">No appointments</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {/* Appointments */}
                          {dayAppointments.map(appointment => (
                            <div 
                              key={appointment.id}
                              onClick={() => openEditBookingDialog(appointment)}
                              className={`border-l-4 rounded-r p-2 text-xs cursor-pointer transition-colors ${
                                appointment.status === 'confirmed' 
                                  ? 'border-green-500 bg-green-50 hover:bg-green-100'
                                  : appointment.status === 'cancelled'
                                  ? 'border-red-500 bg-red-50 hover:bg-red-100'
                                  : 'border-amber-500 bg-amber-50 hover:bg-amber-100'
                              }`}
                            >
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-medium">
                                  {formatTime(appointment.start_time)}
                                </span>
                                <Badge variant="outline" className="bg-white">
                                  {formatTime(appointment.end_time)}
                                </Badge>
                              </div>
                              <p className="font-medium truncate">
                                {appointment.services?.title || "Appointment"}
                              </p>
                              <div className="flex items-center text-gray-600 text-xs mt-1">
                                <User className="h-3 w-3 mr-1" />
                                {appointment.customer_name || "Client"}
                              </div>
                            </div>
                          ))}
                          
                          {/* Blocked Times */}
                          {dayBlockedTimes.map(blockedTime => (
                            <div 
                              key={blockedTime.id}
                              onClick={() => openEditBlockedTimeDialog(blockedTime)}
                              className="border-l-4 border-gray-500 bg-gray-100 rounded-r p-2 text-xs cursor-pointer hover:bg-gray-200 transition-colors"
                            >
                              <div className="flex justify-between items-center mb-1">
                                <span className="font-medium">
                                  {formatTime(blockedTime.start_time)}
                                </span>
                                <Badge variant="outline" className="bg-white text-gray-700">
                                  {formatTime(blockedTime.end_time)}
                                </Badge>
                              </div>
                              <p className="font-medium flex items-center">
                                <CalendarX className="h-3 w-3 mr-1" />
                                Blocked
                              </p>
                              {blockedTime.reason && (
                                <p className="text-gray-600 mt-1 truncate">{blockedTime.reason}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          {/* Tips */}
          <div className="mt-4 text-sm text-gray-500">
            <p className="text-center">Click on any appointment or blocked time to edit or delete.</p>
          </div>
        </CardContent>
      </Card>
      
      {/* Booking Dialog */}
      <ArtistBookingDialog
        isOpen={isBookingDialogOpen}
        onClose={() => setIsBookingDialogOpen(false)}
        onSave={saveAppointment}
        booking={selectedBooking}
        isEditing={!!selectedBooking}
      />
      
      {/* Block Time Dialog */}
      <BlockTimeDialog
        isOpen={isBlockTimeDialogOpen}
        onClose={() => setIsBlockTimeDialogOpen(false)}
        onSave={saveBlockedTime}
        blockedTime={selectedBlockedTime}
        isEditing={!!selectedBlockedTime}
      />
    </motion.div>
  );
};

export default ArtistBookingCalendar;
