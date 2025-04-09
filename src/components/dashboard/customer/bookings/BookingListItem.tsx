
import React from 'react';
import { CalendarCheck, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { CustomerBooking } from './types';

interface BookingListItemProps {
  booking: CustomerBooking;
}

const BookingListItem = ({ booking }: BookingListItemProps) => {
  return (
    <div
      className="flex justify-between items-center border rounded-lg p-4 hover:bg-gray-50 transition-colors"
    >
      <div>
        <h3 className="font-medium">
          {booking.service?.title || "Booking Request"}
        </h3>
        <p className="text-sm text-gray-600">
          {booking.artist?.full_name || "Artist"}
        </p>
        <div className="flex items-center gap-2 mt-1">
          {booking.date_requested && (
            <span className="text-xs text-gray-500 flex items-center">
              <CalendarCheck className="h-3 w-3 mr-1" />
              {format(new Date(booking.date_requested), 'MMM d, yyyy')}
            </span>
          )}
          {booking.time_requested && (
            <span className="text-xs text-gray-500 flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              {booking.time_requested}
            </span>
          )}
        </div>
      </div>
      <div>
        <span className={`
          px-2 py-1 rounded-full text-xs font-medium
          ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : ''}
          ${booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
          ${booking.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
          ${booking.status === 'completed' ? 'bg-blue-100 text-blue-800' : ''}
        `}>
          {booking.status?.charAt(0).toUpperCase() + booking.status?.slice(1) || 'Pending'}
        </span>
      </div>
    </div>
  );
};

export default BookingListItem;
