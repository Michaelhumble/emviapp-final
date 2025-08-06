import { useEffect } from 'react';
import { analytics } from '@/lib/analytics';

interface BookingConversionTrackerProps {
  event: 'booking_started' | 'booking_completed' | 'booking_abandoned';
  artistId?: string;
  serviceType?: string;
  bookingValue?: number;
  metadata?: Record<string, any>;
}

export const BookingConversionTracker: React.FC<BookingConversionTrackerProps> = ({
  event,
  artistId,
  serviceType,
  bookingValue,
  metadata = {}
}) => {
  useEffect(() => {
    // Track booking funnel events
    const trackingData = {
      artist_id: artistId,
      service_type: serviceType,
      booking_value: bookingValue,
      timestamp: new Date().toISOString(),
      ...metadata
    };

    // Send to analytics using correct method
    switch (event) {
      case 'booking_started':
        analytics.trackEvent({
          action: 'booking_started',
          category: 'ecommerce',
          label: serviceType || 'beauty_service',
          value: bookingValue || 0,
          custom_parameters: trackingData
        });
        break;
      case 'booking_completed':
        if (artistId && serviceType && bookingValue) {
          analytics.trackBookingCreated({
            bookingId: `booking_${Date.now()}`,
            serviceType,
            servicePrice: bookingValue,
            artistId
          });
        }
        break;
      case 'booking_abandoned':
        analytics.trackEvent({
          action: 'booking_abandoned',
          category: 'ecommerce',
          label: serviceType || 'beauty_service',
          custom_parameters: trackingData
        });
        break;
    }

    // Google Analytics 4 events for conversion tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      switch (event) {
        case 'booking_started':
          (window as any).gtag('event', 'begin_checkout', {
            currency: 'USD',
            value: bookingValue || 0,
            items: [{
              item_id: artistId,
              item_name: serviceType || 'Beauty Service',
              category: 'booking',
              quantity: 1,
              price: bookingValue || 0
            }]
          });
          break;
          
        case 'booking_completed':
          (window as any).gtag('event', 'purchase', {
            transaction_id: `booking_${Date.now()}`,
            currency: 'USD',
            value: bookingValue || 0,
            items: [{
              item_id: artistId,
              item_name: serviceType || 'Beauty Service',
              category: 'booking',
              quantity: 1,
              price: bookingValue || 0
            }]
          });
          break;
          
        case 'booking_abandoned':
          (window as any).gtag('event', 'abandon_cart', {
            currency: 'USD',
            value: bookingValue || 0
          });
          break;
      }
    }

    // Facebook Pixel tracking (if available)
    if (typeof window !== 'undefined' && (window as any).fbq) {
      switch (event) {
        case 'booking_started':
          (window as any).fbq('track', 'InitiateCheckout', {
            value: bookingValue || 0,
            currency: 'USD'
          });
          break;
          
        case 'booking_completed':
          (window as any).fbq('track', 'Purchase', {
            value: bookingValue || 0,
            currency: 'USD'
          });
          break;
      }
    }

    console.log(`📊 Booking conversion tracked: ${event}`, trackingData);
  }, [event, artistId, serviceType, bookingValue, metadata]);

  return null; // This is a tracking component, no UI
};