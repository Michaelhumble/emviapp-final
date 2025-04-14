
import React from 'react';
import { format, isSameDay, parseISO } from 'date-fns';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Booking, AvailabilityRecord } from '@/types/calendar';
import { CalendarX, Clock } from 'lucide-react';

interface CalendarWeekViewProps {
  weekDates: Date[];
  bookings: Booking[];
  availability: AvailabilityRecord[];
  userRole: string;
  onCreateAvailability: (dayOfWeek: string, startTime: string, endTime: string) => Promise<any>;
  onUpdateAvailability: (id: string, startTime: string, endTime: string) => Promise<any>;
  onDeleteAvailability: (id: string) => Promise<void>;
}

const HOURS = Array.from({ length: 13 }, (_, i) => i + 8); // 8am to 8pm

const CalendarWeekView: React.FC<CalendarWeekViewProps> = ({
  weekDates,
  bookings,
  availability,
  userRole,
  onCreateAvailability,
  onUpdateAvailability,
  onDeleteAvailability
}) => {
  // Helper to check if a booking is at a specific day and hour
  const getBookingsForDayAndHour = (day: Date, hour: number) => {
    return bookings.filter(booking => {
      const bookingDate = parseISO(booking.start_time);
      const bookingHour = bookingDate.getHours();
      return isSameDay(bookingDate, day) && bookingHour === hour;
    });
  };
  
  // Helper to check if there's availability for a specific day and hour
  const isTimeAvailable = (day: Date, hour: number) => {
    const dayOfWeek = format(day, 'EEEE').toLowerCase();
    
    return availability.some(avail => {
      // Check if the day matches
      if (avail.day_of_week.toLowerCase() !== dayOfWeek) return false;
      
      // Parse start and end hours
      const startHour = parseInt(avail.start_time.split(':')[0]);
      const endHour = parseInt(avail.end_time.split(':')[0]);
      
      // Check if hour is within range
      return hour >= startHour && hour < endHour;
    });
  };
  
  // Render empty state for no bookings
  if (!bookings.length) {
    return (
      <div className="text-center py-10 border rounded-md bg-gray-50">
        <CalendarX className="h-10 w-10 mx-auto text-gray-400 mb-2" />
        <h3 className="font-medium text-gray-700 mb-1">No Bookings Found</h3>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          You have no bookings scheduled for this week. 
          {userRole === 'artist' && (
            <>
              <br />
              <span className="block mt-1">
                Set your availability to allow clients to book with you.
              </span>
            </>
          )}
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-8 gap-1 h-[600px] overflow-auto border rounded-md">
      {/* Time labels column */}
      <div className="col-span-1 bg-gray-50 border-r">
        <div className="h-10 border-b"></div> {/* Empty cell above day headers */}
        {HOURS.map(hour => (
          <div key={hour} className="h-12 flex items-center justify-center text-sm text-gray-500 border-b">
            {hour % 12 === 0 ? "12" : hour % 12}:00 {hour >= 12 ? "PM" : "AM"}
          </div>
        ))}
      </div>
      
      {/* Day columns */}
      <div className="col-span-7 grid grid-cols-7 gap-0">
        {/* Day headers */}
        {weekDates.map((date, i) => (
          <div
            key={i}
            className={`h-10 flex flex-col items-center justify-center border-b ${
              isSameDay(date, new Date()) ? "bg-blue-50" : ""
            }`}
          >
            <span className="text-sm font-medium">{format(date, 'EEE')}</span>
            <span className="text-xs text-gray-500">{format(date, 'MMM d')}</span>
          </div>
        ))}
        
        {/* Time grid cells */}
        {HOURS.map(hour => (
          <React.Fragment key={hour}>
            {weekDates.map((date, dateIndex) => {
              const bookingsForTimeSlot = getBookingsForDayAndHour(date, hour);
              const isAvailable = isTimeAvailable(date, hour);
              
              return (
                <div
                  key={`${hour}-${dateIndex}`}
                  className={`h-12 border-b border-r p-1 ${
                    isSameDay(date, new Date()) ? "bg-blue-50/30" : ""
                  }`}
                >
                  {bookingsForTimeSlot.length > 0 ? (
                    // Render bookings
                    <div className="h-full">
                      {bookingsForTimeSlot.map((booking, i) => (
                        <HoverCard key={booking.id}>
                          <HoverCardTrigger asChild>
                            <div 
                              className={`text-xs rounded p-1 mb-1 cursor-pointer truncate ${
                                booking.status === 'confirmed' 
                                  ? 'bg-green-100 text-green-800 border border-green-200'
                                  : booking.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                                  : 'bg-blue-100 text-blue-800 border border-blue-200'
                              }`}
                            >
                              {booking.customer_name || 'Unnamed'}
                            </div>
                          </HoverCardTrigger>
                          <HoverCardContent className="w-64 p-3">
                            <h4 className="font-medium mb-1">{booking.customer_name || 'Unnamed'}</h4>
                            <div className="text-sm text-gray-500 mb-1">
                              {format(parseISO(booking.start_time), 'h:mm a')} - 
                              {booking.end_time && ` ${format(parseISO(booking.end_time), 'h:mm a')}`}
                            </div>
                            <div className="text-xs bg-gray-100 rounded p-1 mb-1">
                              {booking.service_name || 'No service selected'}
                            </div>
                            <div className={`text-xs px-2 py-1 rounded-full inline-block ${
                              booking.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800'
                                : booking.status === 'pending'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {booking.status || 'Status unknown'}
                            </div>
                            {booking.notes && (
                              <div className="text-xs text-gray-600 mt-2 border-t pt-1">
                                Note: {booking.notes}
                              </div>
                            )}
                          </HoverCardContent>
                        </HoverCard>
                      ))}
                    </div>
                  ) : isAvailable ? (
                    // Render available time
                    <div className="h-full w-full bg-green-50 border border-dashed border-green-200 rounded-sm p-1">
                      <div className="text-xs text-green-800 flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> Available
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
      
      {/* Add mobile responsive message at the bottom */}
      <div className="col-span-8 sm:hidden mt-4 text-center p-2 bg-blue-50 rounded-md text-sm text-blue-700">
        Tip: Rotate your device horizontally for a better calendar view.
      </div>
    </div>
  );
};

export default CalendarWeekView;
