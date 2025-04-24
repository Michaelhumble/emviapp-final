
import { useState } from 'react';
import { Booking } from '@/types/booking';

export interface BlockedTime {
  id: string;
  start_time: string;
  end_time: string;
  notes?: string;
}

export const useDialogState = () => {
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isBlockTimeDialogOpen, setIsBlockTimeDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedBlockedTime, setSelectedBlockedTime] = useState<BlockedTime | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const openAddBookingDialog = (date?: Date) => {
    setSelectedDate(date || null);
    setSelectedBooking(null);
    setIsBookingDialogOpen(true);
  };

  const openEditBookingDialog = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsBookingDialogOpen(true);
  };

  const openBlockTimeDialog = (date?: Date, blockedTime?: BlockedTime) => {
    setSelectedDate(date || null);
    setSelectedBlockedTime(blockedTime || null);
    setIsBlockTimeDialogOpen(true);
  };

  return {
    isBookingDialogOpen,
    setIsBookingDialogOpen,
    isBlockTimeDialogOpen,
    setIsBlockTimeDialogOpen,
    selectedBooking,
    setSelectedBooking,
    selectedBlockedTime,
    setSelectedBlockedTime,
    selectedDate,
    openAddBookingDialog,
    openEditBookingDialog,
    openBlockTimeDialog
  };
};
