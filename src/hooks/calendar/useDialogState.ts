
import { useState } from 'react';

export const useDialogState = () => {
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isBlockTimeDialogOpen, setIsBlockTimeDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [selectedBlockedTime, setSelectedBlockedTime] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Open the add booking dialog with an optional selected date
  const openAddBookingDialog = (date?: Date) => {
    setSelectedBooking(null);
    if (date) {
      setSelectedDate(date);
    }
    setIsBookingDialogOpen(true);
  };

  // Open the edit booking dialog with a specific booking
  const openEditBookingDialog = (booking: any) => {
    setSelectedBooking(booking);
    setIsBookingDialogOpen(true);
  };

  // Open the block time dialog
  const openBlockTimeDialog = () => {
    setSelectedBlockedTime(null);
    setIsBlockTimeDialogOpen(true);
  };

  // Open the edit blocked time dialog with a specific blocked time
  const openEditBlockedTimeDialog = (blockedTime: any) => {
    setSelectedBlockedTime(blockedTime);
    setIsBlockTimeDialogOpen(true);
  };

  return {
    isBookingDialogOpen,
    setIsBookingDialogOpen,
    isBlockTimeDialogOpen,
    setIsBlockTimeDialogOpen,
    selectedBooking,
    selectedBlockedTime,
    selectedDate,
    openAddBookingDialog,
    openEditBookingDialog,
    openBlockTimeDialog,
    openEditBlockedTimeDialog
  };
};
