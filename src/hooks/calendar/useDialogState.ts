
import { useState } from 'react';
import { Appointment } from './useAppointments';
import { BlockedTime } from './useBlockedTimes';

export const useDialogState = () => {
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isBlockTimeDialogOpen, setIsBlockTimeDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Appointment | null>(null);
  const [selectedBlockedTime, setSelectedBlockedTime] = useState<BlockedTime | null>(null);
  
  const openAddBookingDialog = () => {
    setSelectedBooking(null);
    setIsBookingDialogOpen(true);
  };
  
  const openEditBookingDialog = (booking: Appointment) => {
    setSelectedBooking(booking);
    setIsBookingDialogOpen(true);
  };
  
  const openBlockTimeDialog = () => {
    setSelectedBlockedTime(null);
    setIsBlockTimeDialogOpen(true);
  };
  
  const openEditBlockedTimeDialog = (blockedTime: BlockedTime) => {
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
    openAddBookingDialog,
    openEditBookingDialog,
    openBlockTimeDialog,
    openEditBlockedTimeDialog
  };
};
