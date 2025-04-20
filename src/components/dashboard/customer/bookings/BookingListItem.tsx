
import React from 'react';
import { CalendarCheck, Clock, MapPin } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent } from '@/components/ui/card';
import { CustomerBooking } from './types';

interface BookingListItemProps {
  booking: CustomerBooking;
}

const BookingListItem = ({ booking }: BookingListItemProps) => {
  return (
    <Card className="w-full transition-all duration-200 hover:shadow-md">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col space-y-3">
          <div className="flex justify-between items-start">
            <h3 className="font-medium text-lg">
              {booking.service?.title || "Booking Request"}
            </h3>
            <span className={`
              px-3 py-1.5 rounded-full text-xs font-medium
              ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
              ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
              ${booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
              ${booking.status === 'completed' ? 'bg-blue-100 text-blue-800' : ''}
            `}>
              {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1) || 'Pending'}
            </span>
          </div>

          <div className="text-base text-gray-600 flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{booking.artist?.full_name || "Artist to be assigned"}</span>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            {booking.date_requested && (
              <span className="flex items-center gap-1.5">
                <CalendarCheck className="h-4 w-4" />
                {format(new Date(booking.date_requested), 'MMM d, yyyy')}
              </span>
            )}
            {booking.time_requested && (
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {booking.time_requested}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingListItem;
