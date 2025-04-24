
import React from 'react';
import { Booking } from './types';
import { format, parseISO } from 'date-fns';

interface BookingListProps {
  bookings: Booking[];
  onStatusChange?: (id: string, status: Booking['status']) => void;
}

const BookingList: React.FC<BookingListProps> = ({ 
  bookings, 
  onStatusChange 
}) => {
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'completed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (bookings.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No bookings for this date.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookings.map((booking) => (
        <div 
          key={booking.id}
          className="p-4 border border-purple-100 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">{booking.clientName}</h3>
              <p className="text-sm text-gray-600">{booking.serviceName}</p>
            </div>
            <span 
              className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusClass(booking.status)} border`}
            >
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </span>
          </div>
          
          <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {booking.date}
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {booking.time}
            </div>
          </div>
          
          {booking.notes && (
            <p className="mt-2 text-sm text-gray-500 italic">"{booking.notes}"</p>
          )}
          
          {onStatusChange && (
            <div className="mt-3 flex space-x-2">
              {booking.status === 'pending' && (
                <button
                  onClick={() => onStatusChange(booking.id, 'confirmed')}
                  className="text-xs px-2 py-1 bg-green-50 text-green-700 hover:bg-green-100 rounded border border-green-200 transition-colors"
                >
                  Confirm
                </button>
              )}
              {booking.status === 'confirmed' && (
                <button
                  onClick={() => onStatusChange(booking.id, 'completed')}
                  className="text-xs px-2 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded border border-blue-200 transition-colors"
                >
                  Mark Completed
                </button>
              )}
              {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                <button
                  onClick={() => onStatusChange(booking.id, 'cancelled')}
                  className="text-xs px-2 py-1 bg-red-50 text-red-700 hover:bg-red-100 rounded border border-red-200 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BookingList;
