
import React from 'react';
import { format } from 'date-fns';
import { Booking } from '@/types/booking';
import { Badge } from '@/components/ui/badge';

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
  // Filter bookings for the current month
  const currentMonthBookings = bookings.filter((booking) => {
    if (!booking.date_requested) return false;
    const bookingDate = new Date(booking.date_requested);
    return bookingDate.getMonth() === currentDate.getMonth() && 
           bookingDate.getFullYear() === currentDate.getFullYear();
  });
  
  // Sort bookings by date and time
  const sortedBookings = [...currentMonthBookings].sort((a, b) => {
    if (!a.date_requested || !b.date_requested) return 0;
    const dateA = new Date(a.date_requested);
    const dateB = new Date(b.date_requested);
    
    if (dateA.getTime() !== dateB.getTime()) {
      return dateA.getTime() - dateB.getTime();
    }
    
    return (a.time_requested || '').localeCompare(b.time_requested || '');
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge className="bg-blue-100 hover:bg-blue-100 text-blue-800 border-blue-200">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-50 hover:bg-yellow-50 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'completed':
        return <Badge className="bg-green-50 hover:bg-green-50 text-green-800 border-green-200">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-gray-50 hover:bg-gray-50 text-gray-800 border-gray-200">Cancelled</Badge>;
      default:
        return <Badge className="bg-gray-50 hover:bg-gray-50 text-gray-800 border-gray-200">{status}</Badge>;
    }
  };

  return (
    <div className="p-4 bg-white">
      {sortedBookings.length > 0 ? (
        <div className="divide-y">
          {sortedBookings.map((booking) => (
            <div key={booking.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between">
              <div className="mb-2 sm:mb-0">
                <div className="flex items-center">
                  <div className="text-sm font-medium">{booking.client_name}</div>
                  <div className="ml-2">
                    {getStatusBadge(booking.status)}
                  </div>
                </div>
                <div className="text-sm text-gray-500">{booking.service_name}</div>
              </div>
              
              <div className="flex items-center mt-2 sm:mt-0">
                <div className="text-sm text-gray-600 mr-4">
                  {booking.date_requested ? format(new Date(booking.date_requested), 'MMM d, yyyy') : 'N/A'} at {booking.time_requested || 'N/A'}
                </div>
                <div className="text-sm font-medium">${booking.price || 0}</div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-gray-500">
          <p>No bookings found for {format(currentDate, 'MMMM yyyy')}</p>
        </div>
      )}
    </div>
  );
};

export default ListView;
