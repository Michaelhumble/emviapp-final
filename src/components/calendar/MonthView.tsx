
import React from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameMonth, isSameDay } from 'date-fns';
import { Booking } from '@/types/booking';

interface MonthViewProps {
  currentDate: Date;
  bookings: Booking[];
  onUpdateBooking?: (booking: any) => void;
  onDeleteBooking?: (id: string) => void;
}

const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  bookings,
  onUpdateBooking,
  onDeleteBooking
}) => {
  // Get the first day of the month
  const monthStart = startOfMonth(currentDate);
  // Get the last day of the month
  const monthEnd = endOfMonth(currentDate);
  // Get the first day of the first week
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
  // Get the last day of the last week
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

  // Create an array of days for the calendar
  const calendarDays = [];
  let day = startDate;

  while (day <= endDate) {
    calendarDays.push(day);
    day = addDays(day, 1);
  }

  // Group calendar days into weeks
  const calendarWeeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    calendarWeeks.push(calendarDays.slice(i, i + 7));
  }

  // Get bookings for a specific day
  const getBookingsForDay = (date: Date) => {
    return bookings.filter((booking) => {
      if (!booking.date_requested) return false;
      const bookingDate = new Date(booking.date_requested);
      return isSameDay(bookingDate, date);
    });
  };

  return (
    <div className="border-t border-l">
      {/* Day header row */}
      <div className="grid grid-cols-7 bg-gray-50 sticky top-0 z-10">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
          <div key={day} className="py-2 text-center border-r border-b">
            <span className="text-xs font-medium text-gray-500">{day}</span>
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      {calendarWeeks.map((week, weekIndex) => (
        <div key={weekIndex} className="grid grid-cols-7">
          {week.map((day, dayIndex) => {
            const dayBookings = getBookingsForDay(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            return (
              <div
                key={dayIndex}
                className={`min-h-[100px] border-r border-b p-1 ${
                  !isCurrentMonth ? 'bg-gray-50/50 text-gray-400' : ''
                } ${isSameDay(day, new Date()) ? 'bg-blue-50/20' : ''}`}
              >
                <div className="text-right">
                  <span className={`text-xs inline-flex items-center justify-center rounded-full w-5 h-5 ${
                    isSameDay(day, new Date()) ? 'bg-primary text-white' : ''
                  }`}>
                    {format(day, 'd')}
                  </span>
                </div>
                {dayBookings.length > 0 && (
                  <div className="mt-1">
                    {dayBookings.slice(0, 2).map((booking) => (
                      <div
                        key={booking.id}
                        className={`text-xs p-1 mb-1 truncate rounded ${
                          booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                          booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {booking.time_requested}: {booking.client_name}
                      </div>
                    ))}
                    {dayBookings.length > 2 && (
                      <div className="text-xs text-gray-500 font-medium">
                        +{dayBookings.length - 2} more
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default MonthView;
