
import { useBookingNotifications } from '@/hooks/useBookingNotifications';
import { Toaster } from 'sonner';

export const BookingNotificationProvider = () => {
  // Set up booking notification listeners
  useBookingNotifications();

  return (
    <>
      <Toaster position="top-right" />
    </>
  );
};
