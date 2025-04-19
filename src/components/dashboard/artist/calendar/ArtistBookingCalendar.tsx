
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { format, addWeeks, subWeeks } from 'date-fns';
import { useArtistCalendar } from "@/hooks/useArtistCalendar";
import { BookingStateWrapper } from "@/components/booking/BookingStateWrapper";
import WeeklyCalendarView from './WeeklyCalendarView';
import ArtistBookingDialog from './ArtistBookingDialog';
import BlockTimeDialog from './BlockTimeDialog';

const ArtistBookingCalendar = () => {
  const {
    currentDate,
    appointments,
    blockedTimes,
    isLoadingAppointments,
    isLoadingBlockedTimes,
    appointmentsError,
    blockedTimesError,
    isBookingDialogOpen,
    isBlockTimeDialogOpen,
    selectedBooking,
    selectedBlockedTime,
    setIsBookingDialogOpen,
    setIsBlockTimeDialogOpen,
    goToPreviousWeek,
    goToNextWeek,
    goToToday,
    openAddBookingDialog,
    openEditBookingDialog,
    openBlockTimeDialog,
    openEditBlockedTimeDialog,
    saveAppointment,
    saveBlockedTime,
    deleteAppointment,
    deleteBlockedTime
  } = useArtistCalendar();

  // Combine errors if any exist
  const error = appointmentsError || blockedTimesError || null;
  
  // Handle selecting a time slot on the calendar
  const handleSelectTimeSlot = (date: Date, hour: number) => {
    // Create a date object with the selected hour
    const selectedDate = new Date(date);
    selectedDate.setHours(hour, 0, 0, 0);
    
    // Check if this time is already booked or blocked
    const isBooked = appointments.some(apt => 
      format(new Date(apt.start_time), "yyyy-MM-dd HH:00") === format(selectedDate, "yyyy-MM-dd HH:00")
    );
    
    const isBlocked = blockedTimes.some(block =>
      format(new Date(block.start_time), "yyyy-MM-dd HH:00") === format(selectedDate, "yyyy-MM-dd HH:00")
    );
    
    if (!isBooked && !isBlocked) {
      // Open booking dialog with this time slot
      openAddBookingDialog(selectedDate);
    }
  };

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

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="text-xl font-serif">Booking Calendar</CardTitle>
            <CardDescription>Manage your schedule and client appointments</CardDescription>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePreviousWeekClick}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <Button variant="outline" size="sm" onClick={handleTodayClick}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={handleNextWeekClick}>
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4 flex flex-col sm:flex-row justify-between gap-2">
          <div className="flex gap-2">
            <Button size="sm" onClick={handleAddBookingClick}>
              <Plus className="h-4 w-4 mr-1" /> Add Booking
            </Button>
            <Button size="sm" variant="outline" onClick={handleBlockTimeClick}>
              Block Time
            </Button>
          </div>
          
          <div className="text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4 inline mr-1" />
            {format(currentDate, "MMMM d, yyyy")}
          </div>
        </div>
        
        <BookingStateWrapper
          loading={isLoadingAppointments || isLoadingBlockedTimes}
          error={error ? new Error(error.message) : null}
          loadingComponent={<div className="min-h-[500px] flex items-center justify-center">Loading calendar data...</div>}
        >
          <WeeklyCalendarView
            currentDate={currentDate}
            bookings={appointments}
            blockedTimes={blockedTimes}
            onSelectTimeSlot={handleSelectTimeSlot}
          />
        </BookingStateWrapper>
      </CardContent>
      
      {/* Dialogs */}
      <ArtistBookingDialog
        isOpen={isBookingDialogOpen}
        onClose={() => setIsBookingDialogOpen(false)}
        onSave={saveAppointment}
        onDelete={deleteAppointment}
        booking={selectedBooking}
        isEditing={!!selectedBooking}
      />
      
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

export default ArtistBookingCalendar;
