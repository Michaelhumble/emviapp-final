
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useBookingSystem } from './useBookingSystem';
import BookingList from './BookingList';
import BookingModal from './BookingModal';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import './calendar.css';

interface BookingCalendarProps {
  className?: string;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ className = '' }) => {
  const {
    bookings,
    selectedDate,
    setSelectedDate,
    getBookingsForDate,
    addBooking,
    updateBookingStatus,
    loading,
    error
  } = useBookingSystem();

  const [showModal, setShowModal] = useState(false);

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleAddBooking = () => {
    setShowModal(true);
  };

  // Get bookings for the selected date
  const filteredBookings = selectedDate ? getBookingsForDate(selectedDate) : [];

  // Function to get content for calendar tile
  const getTileContent = ({ date }: { date: Date }) => {
    const dateBookings = getBookingsForDate(date);
    if (dateBookings.length > 0) {
      return (
        <div className="booking-dot-container">
          <div className="booking-dot" />
          {dateBookings.length > 1 && (
            <span className="booking-count">{dateBookings.length}</span>
          )}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="animate-pulse text-purple-600">Loading bookings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-4 border border-red-200 rounded bg-red-50">
        Error: {error}
      </div>
    );
  }

  return (
    <div className={`booking-calendar-container ${className}`}>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-playfair text-gray-900">Appointment Calendar</h2>
            <Button 
              onClick={handleAddBooking}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white border-0"
            >
              New Booking
            </Button>
          </div>
          
          <div className="calendar-wrapper p-2 bg-white rounded-lg border border-purple-100 shadow-sm">
            <Calendar
              onChange={handleDateClick}
              value={selectedDate}
              tileContent={getTileContent}
              className="custom-calendar"
            />
          </div>
        </div>

        <div className="md:w-1/2">
          <div className="mb-4">
            <h2 className="text-xl font-playfair text-gray-900">
              {selectedDate ? (
                `Bookings for ${format(selectedDate, 'MMMM d, yyyy')}`
              ) : (
                'Select a date to see bookings'
              )}
            </h2>
          </div>
          
          <div className="max-h-96 overflow-y-auto p-4 bg-white rounded-lg border border-purple-100 shadow-sm">
            {selectedDate ? (
              <BookingList 
                bookings={filteredBookings} 
                onStatusChange={updateBookingStatus}
              />
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Select a date on the calendar to view bookings</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <BookingModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onSave={addBooking}
        defaultDate={selectedDate || new Date()}
      />
    </div>
  );
};

export default BookingCalendar;
