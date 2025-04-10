
import { useBookingNotifications } from '@/hooks/useBookingNotifications';

export const BookingNotificationProvider = () => {
  // Set up booking notification listeners
  useBookingNotifications();

  // Don't render a Toaster here, we already have one in App.tsx
  return null;
};
