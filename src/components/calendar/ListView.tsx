
import React from 'react';
import { format, isSameDay, isAfter } from 'date-fns';
import { Booking } from '@/types/booking';

interface ListViewProps {
  currentDate: Date;
  bookings: Booking[];
  onUpdateBooking?: (booking: any) => void;
  onDeleteBooking?: (id: string) => void;
}

const ListView: React.FC<ListViewProps> = ({
  currentDate,
  bookings,
  onUpdateBooking,
  onDeleteBooking
}) => {
  // Sort bookings by date (most recent first)
  const sortedBookings = [...bookings].sort((a, b) => {
    const dateA = a.date_requested ? new Date(a.date_requested) : new Date();
    const dateB = b.date_requested ? new Date(b.date_requested) : new Date();
    
    // Compare dates first
    if (dateA.toDateString() !== dateB.toDateString()) {
      return dateA.getTime() - dateB.getTime();
    }
    
    // If dates are the same, compare times
    const timeA = a.time_requested || "";
    const timeB = b.time_requested || "";
    return timeA.localeCompare(timeB);
  });

  // Group bookings by date
  const groupedBookings = sortedBookings.reduce<Record<string, Booking[]>>((acc, booking) => {
    if (!booking.date_requested) return acc;
    
    const dateKey = booking.date_requested;
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    
    acc[dateKey].push(booking);
    return acc;
  }, {});

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="divide-y">
      {Object.keys(groupedBookings).length > 0 ? (
        Object.keys(groupedBookings).map((dateKey) => {
          const bookingsForDate = groupedBookings[dateKey];
          const bookingDate = new Date(dateKey);
          const isToday = isSameDay(bookingDate, new Date());
          const isPast = !isAfter(bookingDate, new Date()) && !isToday;
          
          return (
            <div key={dateKey} className={`p-4 ${isPast ? 'bg-gray-50/50' : ''}`}>
              <div className="flex items-center mb-3">
                <div className={`text-sm font-semibold ${isToday ? 'text-primary' : 'text-gray-700'}`}>
                  {isToday ? 'Today' : format(bookingDate, 'EEEE, MMMM d, yyyy')}
                </div>
                {isToday && (
                  <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded ml-2">
                    Today
                  </span>
                )}
              </div>
              
              <div className="space-y-3">
                {bookingsForDate.map((booking) => (
                  <div 
                    key={booking.id} 
                    className="bg-white rounded-lg border border-gray-200 p-3 flex flex-col sm:flex-row sm:items-center justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">
                          {booking.time_requested}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusBadgeClass(booking.status)}`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="text-sm font-medium">{booking.client_name}</div>
                      <div className="text-xs text-gray-600">{booking.service_name}</div>
                      {booking.note && (
                        <div className="text-xs text-gray-500 mt-1 italic">
                          "{booking.note}"
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center mt-2 sm:mt-0">
                      {booking.price && (
                        <div className="text-sm font-medium mr-4">
                          ${booking.price}
                        </div>
                      )}
                      
                      <div className="flex space-x-2">
                        {onUpdateBooking && (
                          <button 
                            className="text-xs px-3 py-1 border border-primary/20 text-primary rounded-md hover:bg-primary/10"
                            onClick={() => onUpdateBooking(booking)}
                          >
                            Edit
                          </button>
                        )}
                        
                        {onDeleteBooking && (
                          <button 
                            className="text-xs px-3 py-1 border border-red-300/20 text-red-500 rounded-md hover:bg-red-50"
                            onClick={() => onDeleteBooking(booking.id)}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <div className="p-10 text-center text-gray-500">
          No bookings found for this period
        </div>
      )}
    </div>
  );
};

export default ListView;
