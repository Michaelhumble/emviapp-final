
import { useState, useCallback } from 'react';

export const useDialogState = () => {
  // Booking dialog state
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  
  // Block time dialog state
  const [isBlockTimeDialogOpen, setIsBlockTimeDialogOpen] = useState(false);
  const [selectedBlockedTime, setSelectedBlockedTime] = useState<any | null>(null);
  
  const openAddBookingDialog = useCallback((date?: Date) => {
    const defaultBooking = date ? {
      start_time: date.toISOString(),
      end_time: new Date(date.getTime() + 60 * 60 * 1000).toISOString(),
      status: 'pending'
    } : null;
    
    setSelectedBooking(defaultBooking);
    setIsBookingDialogOpen(true);
  }, []);
  
  const openEditBookingDialog = useCallback((booking: any) => {
    setSelectedBooking(booking);
    setIsBookingDialogOpen(true);
  }, []);
  
  const openBlockTimeDialog = useCallback((date?: Date) => {
    const defaultBlockedTime = date ? {
      start_time: date.toISOString(),
      end_time: new Date(date.getTime() + 60 * 60 * 1000).toISOString()
    } : null;
    
    setSelectedBlockedTime(defaultBlockedTime);
    setIsBlockTimeDialogOpen(true);
  }, []);
  
  const openEditBlockedTimeDialog = useCallback((blockedTime: any) => {
    setSelectedBlockedTime(blockedTime);
    setIsBlockTimeDialogOpen(true);
  }, []);
  
  return {
    isBookingDialogOpen,
    isBlockTimeDialogOpen,
    selectedBooking,
    selectedBlockedTime,
    setIsBookingDialogOpen,
    setIsBlockTimeDialogOpen,
    openAddBookingDialog,
    openEditBookingDialog,
    openBlockTimeDialog,
    openEditBlockedTimeDialog
  };
};
