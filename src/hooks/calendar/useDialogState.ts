
import { useState } from 'react';

export const useDialogState = () => {
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [selectedBlockedTime, setSelectedBlockedTime] = useState<any>(null);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isBlockTimeDialogOpen, setIsBlockTimeDialogOpen] = useState(false);
  
  const openAddBookingDialog = () => {
    setSelectedBooking(null);
    setIsBookingDialogOpen(true);
  };
  
  const openEditBookingDialog = (booking: any) => {
    setSelectedBooking(booking);
    setIsBookingDialogOpen(true);
  };
  
  const openBlockTimeDialog = () => {
    setSelectedBlockedTime(null);
    setIsBlockTimeDialogOpen(true);
  };
  
  const openEditBlockedTimeDialog = (blockedTime: any) => {
    setSelectedBlockedTime(blockedTime);
    setIsBlockTimeDialogOpen(true);
  };

  return {
    selectedBooking,
    selectedBlockedTime,
    isBookingDialogOpen,
    isBlockTimeDialogOpen,
    setIsBookingDialogOpen,
    setIsBlockTimeDialogOpen,
    openAddBookingDialog,
    openEditBookingDialog,
    openBlockTimeDialog,
    openEditBlockedTimeDialog
  };
};
