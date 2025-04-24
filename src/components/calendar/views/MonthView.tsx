
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  isToday
} from "date-fns";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Booking } from "@/types/booking";

interface MonthViewProps {
  currentDate: Date;
  bookings: Booking[];
  isLoading?: boolean;
  onBookingClick?: (booking: Booking) => void;
  onDateClick?: (date: Date) => void;
}

const MonthView: React.FC<MonthViewProps> = ({
  currentDate,
  bookings,
  isLoading = false,
  onBookingClick,
  onDateClick,
}) => {
  const [viewDate, setViewDate] = useState(currentDate);
  
  const monthStart = startOfMonth(viewDate);
  const monthEnd = endOfMonth(viewDate);
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
    return bookings.filter(booking => {
      if (!booking.date_requested) return false;
      
      const bookingDate = new Date(booking.date_requested);
      return isSameDay(bookingDate, day);
    });
  };
  
  const handlePrevMonth = () => {
    setViewDate(subMonths(viewDate, 1));
  };
  
  const handleNextMonth = () => {
    setViewDate(addMonths(viewDate, 1));
  };
  
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-8 w-24" />
        </div>
        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 42 }).map((_, i) => (
            <Skeleton key={i} className="h-28 w-full rounded-md" />
          ))}
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" onClick={handlePrevMonth} className="h-8 w-8 rounded-full p-0">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-medium font-serif">
            {format(viewDate, 'MMMM yyyy')}
          </h2>
          <Button variant="outline" size="icon" onClick={handleNextMonth} className="h-8 w-8 rounded-full p-0">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center p-2 text-sm font-medium text-gray-500">
            {day}
          </div>
        ))}
        
        {allDays.map((day, index) => {
          const dayBookings = getBookingsForDay(day);
          const isCurrentMonth = isSameMonth(day, viewDate);
          const isDayToday = isToday(day);
          
          return (
            <Card
              key={index}
              className={cn(
                "min-h-[100px] p-2 relative transition-colors",
                !isCurrentMonth && "opacity-50 bg-gray-50",
                isDayToday && "border-purple-300",
                "hover:border-purple-300 cursor-pointer"
              )}
              onClick={() => onDateClick && onDateClick(day)}
            >
              <div className={cn(
                "text-right text-sm mb-1",
                isDayToday && "font-bold text-purple-700",
                !isCurrentMonth && "text-gray-400"
              )}>
                {format(day, 'd')}
              </div>
              
              <div className="space-y-1">
                {dayBookings.slice(0, 3).map((booking, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="text-xs p-1 bg-purple-50 rounded border border-purple-100 truncate"
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookingClick && onBookingClick(booking);
                    }}
                  >
                    <div className="truncate">
                      {booking.time_requested || ''} {booking.client_name || 'Client'}
                    </div>
                  </motion.div>
                ))}
                
                {dayBookings.length > 3 && (
                  <div className="text-xs text-gray-500 text-center mt-1">
                    +{dayBookings.length - 3} more
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MonthView;
