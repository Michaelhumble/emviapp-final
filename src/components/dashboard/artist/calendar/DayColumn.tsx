
import React from 'react';
import { format, isSameDay } from 'date-fns';
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
import { Booking } from "@/types/booking";

interface DayColumnProps {
  day: Date;
  bookings: Booking[];
  isToday?: boolean;
  onBookingClick?: (booking: Booking) => void;
  onEmptySlotClick?: (hour: number) => void;
}

const DayColumn: React.FC<DayColumnProps> = ({ 
  day, 
  bookings, 
  isToday,
  onBookingClick,
  onEmptySlotClick
}) => {
  const navigate = useNavigate();
  const businessHours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM
  
  const getBookingsForHour = (hour: number) => {
    return bookings.filter(booking => {
      if (!booking.time_requested) return false;
      
      const timeMatch = booking.time_requested.includes(`${hour % 12 || 12}:`) && 
        ((hour < 12 && booking.time_requested.includes('AM')) || 
         (hour >= 12 && booking.time_requested.includes('PM')));
      
      return timeMatch;
    });
  };
  
  return (
    <div className={cn(
      "flex-1 min-w-[100px] border border-gray-100 rounded-lg overflow-hidden",
      isToday && "border-purple-200 shadow-sm"
    )}>
      {/* Day header */}
      <div className={cn(
        "p-2 text-center border-b",
        isToday ? "bg-gradient-to-b from-purple-50 to-transparent" : "bg-gray-50/50"
      )}>
        <div className={cn("font-medium", isToday && "text-purple-700")}>{format(day, 'EEE')}</div>
        <div className="text-sm text-gray-600">{format(day, 'MMM d')}</div>
      </div>
      
      {/* Time slots */}
      <div className="divide-y divide-gray-100">
        {businessHours.map((hour) => {
          const hourBookings = getBookingsForHour(hour);
          const hasBooking = hourBookings.length > 0;
          
          return (
            <motion.div
              key={`${day.toISOString()}-${hour}`}
              className={cn(
                "p-1 h-16 relative group cursor-pointer",
                "transition-colors duration-200",
                hasBooking ? "" : "hover:bg-purple-50/30"
              )}
              whileHover={{ scale: 1.01 }}
              onClick={() => !hasBooking && onEmptySlotClick && onEmptySlotClick(hour)}
            >
              <div className="absolute top-0 left-0 text-[10px] text-gray-400 px-1">
                {format(new Date().setHours(hour), 'h:mm a')}
              </div>
              
              {hasBooking ? (
                hourBookings.map((booking, idx) => (
                  <motion.div 
                    key={booking.id}
                    className="mt-3 mx-1 h-11 rounded bg-gradient-to-r from-purple-100 to-pink-100 p-1 shadow-sm border border-purple-200/50 overflow-hidden"
                    whileHover={{ scale: 1.02, y: -1 }}
                    onClick={() => onBookingClick && onBookingClick(booking)}
                  >
                    <div className="text-xs font-medium text-purple-900 truncate">
                      {booking.client_name || "Client"}
                    </div>
                    <div className="text-[10px] text-gray-600 truncate">
                      {booking.service_name || booking.service_type || "Service"}
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="h-full flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="w-5 h-5 rounded-full border border-dashed border-purple-300 group-hover:border-purple-500 flex items-center justify-center">
                    <div className="w-1 h-1 bg-purple-300 group-hover:bg-purple-500 rounded-full"></div>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default DayColumn;
