
import React from 'react';
import { useCustomerDashboard } from '@/hooks/useCustomerDashboard';
import BookingsLoadingState from './BookingsLoadingState';
import BookingsErrorState from './BookingsErrorState';
import BookingsList from './BookingsList';

interface CustomerBookingsSectionProps {
  type: 'upcoming' | 'previous';
}

const CustomerBookingsSection = ({ type }: CustomerBookingsSectionProps) => {
  const { upcomingBookings, previousBookings, loading, error } = useCustomerDashboard();

  const bookings = type === 'upcoming' ? upcomingBookings : previousBookings;

  if (loading) {
    return <BookingsLoadingState />;
  }

  if (error) {
    return <BookingsErrorState />;
  }

  return <BookingsList bookings={bookings} />;
};

export default CustomerBookingsSection;
