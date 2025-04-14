
import React from 'react';
import { format, isSameDay, parseISO } from 'date-fns';
import { 
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Booking, AvailabilityRecord } from '@/types/calendar';
import { CalendarX, Clock } from 'lucide-react';

interface CalendarDayViewProps {
  currentDate: Date;
  bookings: Booking[];
  availability: AvailabilityRecord[];
  userRole: string;
  onCreateAvailability: (dayOfWeek: string, startTime: string, endTime: string) => Promise<void>;
  onUpdateAvailability: (id: string, startTime: string, endTime: string) => Promise<void>;
  onDeleteAvailability: (id: string) => Promise<void>;
}

const HOURS = Array.from({ length: 13 }, (_, i) => i + 8); // 8am to 8pm

const CalendarDayView: React.FC<CalendarDayViewProps> = ({
  currentDate,
  bookings,
  availability,
  userRole,
  onCreateAvailability,
  onUpdateAvailability,
  onDeleteAvailability
}) => {
  // Filter bookings for the current day
  const bookingsForDay = bookings.filter(booking => {
    const bookingDate = parseISO(booking.start_time);
    return isSameDay(bookingDate, currentDate);
  });
  
  // Helper to check if there's availability for the current day and hour
  const isTimeAvailable = (hour: number) => {
    const dayOfWeek = format(currentDate, 'EEEE').toLowerCase();
    
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
  
  // Helper to get bookings for a specific hour
  const getBookingsForHour = (hour: number) => {
    return bookingsForDay.filter(booking => {
      const bookingDate = parseISO(booking.start_time);
      const bookingHour = bookingDate.getHours();
      return bookingHour === hour;
    });
  };
  
  // Render empty state for no bookings
  if (!bookingsForDay.length) {
    return (
      <div className="text-center py-10 border rounded-md bg-gray-50">
        <CalendarX className="h-10 w-10 mx-auto text-gray-400 mb-2" />
        <h3 className="font-medium text-gray-700 mb-1">No Bookings Found</h3>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          You have no bookings scheduled for {format(currentDate, 'EEEE, MMMM d')}.
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
    <div className="border rounded-md">
      <div className="bg-blue-50 p-3 border-b">
        <h3 className="font-medium">{format(currentDate, 'EEEE, MMMM d, yyyy')}</h3>
        <p className="text-sm text-gray-500">
          {bookingsForDay.length} booking{bookingsForDay.length !== 1 ? 's' : ''} scheduled
        </p>
      </div>
      
      <div className="divide-y">
        {HOURS.map(hour => {
          const bookingsForHour = getBookingsForHour(hour);
          const isAvailable = isTimeAvailable(hour);
          
          return (
            <div key={hour} className="flex p-2 hover:bg-gray-50">
              <div className="w-20 flex-shrink-0 text-gray-500 text-sm py-2">
                {hour % 12 === 0 ? "12" : hour % 12}:00 {hour >= 12 ? "PM" : "AM"}
              </div>
              
              <div className="flex-grow">
                {bookingsForHour.length > 0 ? (
                  // Render bookings
                  bookingsForHour.map(booking => (
                    <HoverCard key={booking.id}>
                      <HoverCardTrigger asChild>
                        <div className={`mb-2 p-2 rounded text-sm cursor-pointer ${
                          booking.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : booking.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}>
                          <div className="font-medium">{booking.customer_name || 'Unnamed'}</div>
                          <div className="text-xs">
                            {booking.service_name || 'No service selected'}
                          </div>
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
                  ))
                ) : isAvailable ? (
                  // Render available time
                  <div className="h-full w-full bg-green-50 border border-dashed border-green-200 rounded p-2">
                    <div className="text-xs text-green-800 flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> Available
                    </div>
                  </div>
                ) : (
                  <div className="h-8"></div> // Empty space
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarDayView;
