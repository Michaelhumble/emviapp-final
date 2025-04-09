
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import BookingListItem from './BookingListItem';
import { CustomerBooking } from './types';

interface BookingsListProps {
  bookings: CustomerBooking[] | undefined;
}

const BookingsList = ({ bookings }: BookingsListProps) => {
  const navigate = useNavigate();
  
  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 mb-4">You don't have any bookings yet.</p>
        <Button onClick={() => navigate('/explore/artists')}>
          Explore Artists
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <BookingListItem key={booking.id} booking={booking} />
      ))}
    </div>
  );
};

export default BookingsList;
