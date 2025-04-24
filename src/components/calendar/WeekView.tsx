
import React from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { Booking } from '@/types/booking';

interface WeekViewProps {
  currentDate: Date;
  bookings: Booking[];
  onUpdateBooking?: (booking: any) => void;
  onDeleteBooking?: (id: string) => void;
}

const WeekView: React.FC<WeekViewProps> = ({
  currentDate,
  bookings,
  onUpdateBooking,
  onDeleteBooking
}) => {
  // Get the start of the week (Monday) for the current date
  const startOfTheWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  
  // Create an array of 7 days starting from Monday
  const weekDays = Array.from({ length: 7 }).map((_, index) => {
    return addDays(startOfTheWeek, index);
  });

  // Get bookings for each day of the week
  const getBookingsForDay = (date: Date) => {
    return bookings.filter((booking) => {
      if (!booking.date_requested) return false;
      const bookingDate = new Date(booking.date_requested);
      return isSameDay(bookingDate, date);
    });
  };

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 border-blue-200 text-blue-800';
      case 'pending':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'completed':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'cancelled':
        return 'bg-gray-50 border-gray-200 text-gray-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-7 border-t border-l">
      {/* Day headers */}
      {weekDays.map((day, index) => (
        <div
          key={index}
          className="py-2 px-1 text-center border-r border-b bg-gray-50 sticky top-0 z-10"
        >
          <div className="text-xs font-medium text-gray-500">
            {format(day, 'EEE')}
          </div>
          <div className={`text-sm font-semibold ${isSameDay(day, new Date()) ? 'text-primary' : 'text-gray-700'}`}>
            {format(day, 'd')}
          </div>
        </div>
      ))}
      
      {/* Calendar cells with bookings */}
      {weekDays.map((day, dayIndex) => {
        const dayBookings = getBookingsForDay(day);
        return (
          <div
            key={dayIndex}
            className={`min-h-[400px] border-r border-b p-2 ${
              isSameDay(day, new Date()) ? 'bg-blue-50/20' : ''
            }`}
          >
            {dayBookings.length > 0 ? (
              <div className="space-y-2">
                {dayBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className={`p-2 rounded text-sm border ${getBookingStatusColor(
                      booking.status
                    )}`}
                  >
                    <div className="font-medium">{booking.time_requested}</div>
                    <div className="truncate">{booking.client_name}</div>
                    <div className="text-xs truncate">{booking.service_name}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-full text-sm text-gray-400">
                No bookings
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WeekView;
