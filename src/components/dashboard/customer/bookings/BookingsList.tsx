
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import BookingListItem from './BookingListItem';
import { CustomerBooking } from './types';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';

interface BookingsListProps {
  bookings: CustomerBooking[] | undefined;
}

const BookingsList = ({ bookings }: BookingsListProps) => {
  const navigate = useNavigate();
  
  if (!bookings || bookings.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500 mb-6 text-center">No bookings yet</p>
          <Button 
            onClick={() => navigate('/explore/artists')}
            className="h-11 px-6"
          >
            Explore Artists
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      {bookings.map((booking) => (
        <BookingListItem key={booking.id} booking={booking} />
      ))}
    </div>
  );
};

export default BookingsList;
