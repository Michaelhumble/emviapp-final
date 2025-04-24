
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

const WeeklyCalendarView: React.FC<WeeklyCalendarViewProps> = ({
  currentDate,
  bookings = []
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
          id: '',
          status: 'pending',
          date: selectedDay,
          time: selectedHour ? selectedHour : undefined
        } : undefined}
      />
    </div>
  );
};

export default WeeklyCalendarView;
