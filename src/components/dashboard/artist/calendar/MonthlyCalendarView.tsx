
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isToday } from "date-fns";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import BookingModal from './BookingModal';
import { toast } from "sonner";

// Mock data for bookings
const mockBookings = [
  {
    id: '1',
    clientName: 'Emma Thompson',
    serviceId: '4',
    serviceName: 'Bridal Makeup',
    date: '2025-05-15T00:00:00.000Z',
    time: '2025-05-15T14:00:00.000Z',
    price: 250,
    status: 'confirmed',
    paymentStatus: 'paid',
    notes: 'Wedding at Grand Hotel'
  },
  {
    id: '2',
    clientName: 'Sarah Johnson',
    serviceId: '1',
    serviceName: 'Makeup Session',
    date: '2025-05-10T00:00:00.000Z',
    time: '2025-05-10T10:30:00.000Z',
    price: 120,
    status: 'completed',
    paymentStatus: 'paid',
    notes: 'Corporate photoshoot'
  },
  {
    id: '3',
    clientName: 'Jessica Brown',
    serviceId: '3',
    serviceName: 'Full Glam Package',
    date: '2025-05-20T00:00:00.000Z',
    time: '2025-05-20T16:00:00.000Z',
    price: 200,
    status: 'confirmed',
    paymentStatus: 'unpaid',
    notes: 'Birthday party'
  },
];

const MonthlyCalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Add days from previous and next month to fill the calendar grid
  const startDay = monthStart.getDay(); // 0 for Sunday, 1 for Monday, etc.
  const endDay = 6 - monthEnd.getDay();
  
  const prevMonthDays = startDay > 0 
    ? Array.from({ length: startDay }, (_, i) => 
        new Date(monthStart.getFullYear(), monthStart.getMonth(), -i)
      ).reverse()
    : [];
  
  const nextMonthDays = endDay > 0
    ? Array.from({ length: endDay }, (_, i) =>
        new Date(monthEnd.getFullYear(), monthEnd.getMonth() + 1, i + 1)
      )
    : [];
  
  const allDays = [...prevMonthDays, ...daysInMonth, ...nextMonthDays];
  
  const getBookingsForDay = (day: Date) => {
    return mockBookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      return isSameDay(bookingDate, day);
    });
  };
  
  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };
  
  const handleAddBooking = (date: Date) => {
    setSelectedDate(date);
    setShowBookingModal(true);
  };
  
  const handleBookingClick = (booking: any) => {
    setSelectedBooking(booking);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        <Button 
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-sm hover:shadow-md transition-shadow"
          onClick={() => handleAddBooking(new Date())}
        >
          <Plus className="mr-1 h-4 w-4" /> New Appointment
        </Button>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center p-2 text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
        
        {allDays.map((day, index) => {
          const bookings = getBookingsForDay(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          const isDayToday = isToday(day);
          
          return (
            <Card
              key={index}
              className={cn(
                "min-h-[120px] p-2 relative",
                !isCurrentMonth && "opacity-50 bg-gray-50",
                isDayToday && "border-purple-300",
                "hover:border-purple-300 transition-colors cursor-pointer"
              )}
              onClick={() => handleAddBooking(day)}
            >
              <div className={cn(
                "text-right text-sm mb-1",
                isDayToday && "font-bold text-purple-700",
                !isCurrentMonth && "text-gray-400"
              )}>
                {format(day, 'd')}
              </div>
              
              <div className="space-y-1">
                {bookings.slice(0, 3).map((booking, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="text-xs p-1 bg-purple-50 rounded border border-purple-100 truncate cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBookingClick(booking);
                    }}
                  >
                    {format(new Date(booking.time), 'h:mm a')} - {booking.clientName}
                  </motion.div>
                ))}
                
                {bookings.length > 3 && (
                  <div className="text-xs text-gray-500 text-center">
                    +{bookings.length - 3} more
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
      
      <BookingModal
        open={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        existingBooking={selectedDate ? { date: selectedDate } : undefined}
      />
      
      {selectedBooking && (
        <BookingModal
          open={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          existingBooking={selectedBooking}
        />
      )}
    </div>
  );
};

export default MonthlyCalendarView;
