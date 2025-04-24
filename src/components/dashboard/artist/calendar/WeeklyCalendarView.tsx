
import React, { useState } from 'react';
import { format, addDays, startOfWeek, isSameDay } from 'date-fns';
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import DayColumn from './DayColumn';
import { Booking } from "@/types/booking";
import BookingModal from "./BookingModal";

interface WeeklyCalendarViewProps {
  currentDate: Date;
  bookings: Booking[];
}

// Mock data for bookings
const mockBookings: Booking[] = [
  {
    id: '1',
    sender_id: '',
    recipient_id: '',
    client_name: 'Emma Thompson',
    service_name: 'Gel Manicure',
    date_requested: '2025-04-26',
    time_requested: '10:00 AM',
    status: 'pending',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    sender_id: '',
    recipient_id: '',
    client_name: 'Michael Chen',
    service_name: 'Full Set Acrylic',
    date_requested: '2025-04-25',
    time_requested: '2:30 PM',
    status: 'completed',
    created_at: new Date().toISOString()
  },
  {
    id: '3',
    sender_id: '',
    recipient_id: '',
    client_name: 'Jessica Brown',
    service_name: 'Pedicure + Nail Art',
    date_requested: '2025-04-27',
    time_requested: '3:15 PM',
    status: 'pending',
    created_at: new Date().toISOString()
  },
];

const WeeklyCalendarView: React.FC<WeeklyCalendarViewProps> = ({
  currentDate,
  bookings = mockBookings
}) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  
  // Get week days starting from Monday
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowBookingModal(true);
  };

  const handleEmptySlotClick = (day: Date, hour: number) => {
    setSelectedDay(day);
    setSelectedHour(hour);
    setSelectedBooking(null);
    setShowBookingModal(true);
  };

  const getBookingsForDay = (day: Date) => {
    return bookings.filter(booking => {
      if (!booking.date_requested) return false;
      
      const bookingDate = new Date(booking.date_requested);
      return isSameDay(bookingDate, day);
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex overflow-x-auto hide-scrollbar pb-2">
        <div className="min-w-full grid grid-cols-7 gap-2">
          {weekDays.map((day, index) => (
            <DayColumn 
              key={day.toString()}
              day={day}
              bookings={getBookingsForDay(day)}
              isToday={isSameDay(day, new Date())}
              onBookingClick={handleBookingClick}
              onEmptySlotClick={(hour) => handleEmptySlotClick(day, hour)}
            />
          ))}
        </div>
      </div>

      <BookingModal
        open={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        existingBooking={selectedBooking ? selectedBooking : selectedDay ? {
          date: selectedDay,
          time: selectedHour ? new Date(selectedDay).setHours(selectedHour) : undefined
        } : undefined}
      />
    </div>
  );
};

export default WeeklyCalendarView;
