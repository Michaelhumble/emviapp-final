
import { useBookingNotifications } from '@/hooks/useBookingNotifications';
import FallbackBoundary from '@/components/error-handling/FallbackBoundary';
import { useState, useEffect } from 'react';

export const BookingNotificationProvider = () => {
  const [error, setError] = useState<Error | null>(null);
  const { subscribed } = useBookingNotifications();

  // Handle any errors during setup
  useEffect(() => {
    if (!subscribed) {
      console.warn("[BookingNotificationProvider] Subscription not established or failed");
    }
  }, [subscribed]);

  return (
    <FallbackBoundary 
      onError={(err) => {
        console.error("[BookingNotificationProvider] Error:", err);
        setError(err);
      }}
      errorMessage="Booking notifications system encountered an issue"
    >
      {/* Don't render a Toaster here, we already have one in App.tsx */}
      {null}
    </FallbackBoundary>
  );
};

export default BookingNotificationProvider;
