
import React from 'react';
import { useCustomerBookings } from './useCustomerBookings';
import BookingsLoadingState from './BookingsLoadingState';
import BookingsErrorState from './BookingsErrorState';
import BookingsList from './BookingsList';

const CustomerBookingsSection = () => {
  const { bookings, loading, error } = useCustomerBookings();

  if (loading) {
    return <BookingsLoadingState />;
  }

  if (error) {
    return <BookingsErrorState />;
  }

  return <BookingsList bookings={bookings} />;
};

export default CustomerBookingsSection;
