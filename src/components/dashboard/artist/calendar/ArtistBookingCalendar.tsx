import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Plus } from "lucide-react";
import { useArtistCalendar } from "@/hooks/useArtistCalendar";
import { format, parseISO } from 'date-fns';
import ArtistBookingDialog from './ArtistBookingDialog';
import BlockTimeDialog from './BlockTimeDialog';

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

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle className="text-xl font-serif">Booking Calendar</CardTitle>
            <CardDescription>Manage your schedule and client appointments</CardDescription>
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={goToNextWeek}>
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-col sm:flex-row justify-between gap-2">
          <div className="flex gap-2">
            <Button size="sm" onClick={openAddBookingDialog}>
              <Plus className="h-4 w-4 mr-1" /> Add Booking
            </Button>
            <Button size="sm" variant="outline" onClick={openBlockTimeDialog}>
              <Clock className="h-4 w-4 mr-1" /> Block Time
            </Button>
          </div>
        </div>

        {/* Week view header */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {weekDays.map((day, index) => (
            <div 
              key={index} 
              className={`text-center py-1 font-medium ${
                format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') 
                  ? 'bg-primary/10 text-primary rounded-md'
                  : ''
              }`}
            >
              <div>{format(day, 'E')}</div>
              <div className="text-sm">{format(day, 'MMM d')}</div>
            </div>
          ))}
        </div>

        {/* Week view grid */}
        <div className="grid grid-cols-7 gap-1 h-[500px] overflow-auto">
          {weekDays.map((day, dayIndex) => (
            <div 
              key={dayIndex} 
              className={`border rounded-md overflow-auto ${
                format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd') 
                  ? 'border-primary/30 bg-primary/5'
                  : 'border-gray-200'
              }`}
            >
              {/* Appointments for the day */}
              <div className="p-1">
                {appointments
                  .filter(appointment => format(parseISO(appointment.start_time), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))
                  .map((appointment) => (
                    <div 
                      key={appointment.id}
                      onClick={() => openEditBookingDialog(appointment)}
                      className="mb-1 p-1 bg-blue-100 border border-blue-200 rounded cursor-pointer hover:bg-blue-200 transition-colors text-xs"
                    >
                      <div className="font-medium">
                        {format(parseISO(appointment.start_time), 'h:mm a')} - {format(parseISO(appointment.end_time), 'h:mm a')}
                      </div>
                      <div className="truncate">{appointment.customer_name || 'No name'}</div>
                      <div className="truncate text-blue-700">{appointment.status}</div>
                    </div>
                  ))
                }
                
                {/* Blocked times for the day */}
                {blockedTimes
                  .filter(blocked => format(parseISO(blocked.start_time), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))
                  .map((blocked) => (
                    <div 
                      key={blocked.id}
                      onClick={() => openEditBlockedTimeDialog(blocked)}
                      className="mb-1 p-1 bg-gray-100 border border-gray-200 rounded cursor-pointer hover:bg-gray-200 transition-colors text-xs"
                    >
                      <div className="font-medium">
                        {format(parseISO(blocked.start_time), 'h:mm a')} - {format(parseISO(blocked.end_time), 'h:mm a')}
                      </div>
                      <div className="truncate text-gray-600">Blocked{blocked.reason ? `: ${blocked.reason}` : ''}</div>
                    </div>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Booking Dialog */}
      <ArtistBookingDialog
        isOpen={isBookingDialogOpen}
        onClose={() => setIsBookingDialogOpen(false)}
        onSave={async (bookingData) => {
          await saveAppointment(bookingData);
        }}
        booking={selectedBooking}
        isEditing={!!selectedBooking}
        onDelete={async (id) => {
          await deleteAppointment(id);
        }}
      />

      {/* Block Time Dialog */}
      <BlockTimeDialog
        isOpen={isBlockTimeDialogOpen}
        onClose={() => setIsBlockTimeDialogOpen(false)}
        onSave={async (data) => {
          await saveBlockedTime(data);
        }}
        blockedTime={selectedBlockedTime}
        isEditing={!!selectedBlockedTime}
      />
    </Card>
  );
};

export default ArtistBookingCalendar;
