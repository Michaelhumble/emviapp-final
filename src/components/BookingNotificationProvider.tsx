
import { useBookingNotifications } from '@/hooks/useBookingNotifications';
import { useAbandonedBookingReminder } from '@/hooks/useAbandonedBookingReminder';
import { useRebookingReminder } from '@/hooks/useRebookingReminder';
import { AbandonedBookingReminder } from '@/components/booking/AbandonedBookingReminder';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const BookingNotificationProvider = () => {
  // Set up booking notification listeners
  useBookingNotifications();
  
  // Set up abandoned booking reminder
  const { 
    abandonedBooking, 
    serviceName, 
    dismissAbandonedBooking 
  } = useAbandonedBookingReminder();
  
  // Set up rebooking reminder
  const {
    shouldShowReminder,
    artistName,
    artistId,
    lastBookingDate,
    dismissReminder
  } = useRebookingReminder();
  
  // Don't show reminders on the booking page
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(true);
  
  useEffect(() => {
    // Don't show notifications on booking or checkout pages
    if (
      location.pathname.includes('/booking') || 
      location.pathname.includes('/checkout')
    ) {
      setShowNotifications(false);
    } else {
      setShowNotifications(true);
    }
  }, [location]);
  
  if (!showNotifications) return null;
  
  return (
    <>
      {abandonedBooking && (
        <AbandonedBookingReminder 
          bookingId={abandonedBooking}
          serviceName={serviceName}
          onDismiss={dismissAbandonedBooking}
        />
      )}
    </>
  );
};
