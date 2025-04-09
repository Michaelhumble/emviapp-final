
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarCheck, XCircle } from 'lucide-react';
import { useCustomerBookings } from './useCustomerBookings';
import BookingsLoadingState from './BookingsLoadingState';
import BookingsErrorState from './BookingsErrorState';
import BookingsList from './BookingsList';

const CustomerBookingsSection = () => {
  const { data: bookings, isLoading, error } = useCustomerBookings();

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalendarCheck className="h-5 w-5 text-pink-500" />
          Your Bookings
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <BookingsLoadingState />
        ) : error ? (
          <BookingsErrorState />
        ) : (
          <BookingsList bookings={bookings} />
        )}
      </CardContent>
    </Card>
  );
};

export default CustomerBookingsSection;
