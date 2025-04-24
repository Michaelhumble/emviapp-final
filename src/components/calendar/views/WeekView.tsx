
import React from "react";
import { format, isSameDay } from "date-fns";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Booking } from "@/types/booking";
import { cn } from "@/lib/utils";

interface WeekViewProps {
  weekDays: Date[];
  bookings: Booking[];
  isLoading?: boolean;
  onBookingClick?: (booking: Booking) => void;
  onTimeSlotClick?: (day: Date, hour: number) => void;
}

const WeekView: React.FC<WeekViewProps> = ({
  weekDays,
  bookings,
  isLoading = false,
  onBookingClick,
  onTimeSlotClick,
}) => {
  const businessHours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM
  
  const getBookingsForDay = (day: Date) => {
    return bookings.filter(booking => {
      if (!booking.date_requested) return false;
      
      const bookingDate = new Date(booking.date_requested);
      return isSameDay(bookingDate, day);
    });
  };
  
  const getBookingsForHour = (day: Date, hour: number) => {
    const dayBookings = getBookingsForDay(day);
    
    return dayBookings.filter(booking => {
      if (!booking.time_requested) return false;
      
      const timeMatch = booking.time_requested.includes(`${hour % 12 || 12}:`) && 
        ((hour < 12 && booking.time_requested.includes('AM')) || 
         (hour >= 12 && booking.time_requested.includes('PM')));
      
      return timeMatch;
    });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex-1">
            <Skeleton className="h-10 w-full rounded-t-md mb-2" />
            <Skeleton className="h-[400px] w-full rounded-b-md" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <motion.div 
        className="grid grid-cols-7 gap-2 min-w-[700px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {weekDays.map((day, dayIdx) => {
          const isToday = isSameDay(day, new Date());
          
          return (
            <div 
              key={dayIdx}
              className={cn(
                "flex flex-col min-h-[600px] border border-gray-100 rounded-lg overflow-hidden",
                isToday && "border-purple-200 shadow-sm"
              )}
            >
              {/* Day header */}
              <div 
                className={cn(
                  "p-2 text-center border-b",
                  isToday ? "bg-gradient-to-b from-purple-50 to-transparent" : "bg-gray-50/50"
                )}
              >
                <div className={cn(
                  "font-medium",
                  isToday && "text-purple-700"
                )}>
                  {format(day, 'EEE')}
                </div>
                <div className="text-sm text-gray-600">{format(day, 'MMM d')}</div>
              </div>
              
              {/* Time slots */}
              <div className="flex-grow divide-y divide-gray-100">
                {businessHours.map((hour) => {
                  const hourBookings = getBookingsForHour(day, hour);
                  const hasBookings = hourBookings.length > 0;
                  
                  return (
                    <motion.div
                      key={`${day.toISOString()}-${hour}`}
                      className={cn(
                        "p-1 h-16 relative group cursor-pointer",
                        "transition-colors duration-200",
                        hasBookings ? "" : "hover:bg-purple-50/30"
                      )}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => !hasBookings && onTimeSlotClick && onTimeSlotClick(day, hour)}
                    >
                      <div className="absolute top-0 left-0 text-[10px] text-gray-400 px-1">
                        {format(new Date().setHours(hour), 'h:mm a')}
                      </div>
                      
                      {hasBookings ? (
                        hourBookings.map((booking) => (
                          <motion.div 
                            key={booking.id}
                            className="mt-3 mx-1 h-11 rounded bg-gradient-to-r from-purple-100 to-pink-100 p-1 shadow-sm border border-purple-200/50 overflow-hidden"
                            whileHover={{ scale: 1.02, y: -1 }}
                            onClick={(e) => {
                              e.stopPropagation();
                              onBookingClick && onBookingClick(booking);
                            }}
                          >
                            <div className="text-xs font-medium text-purple-900 truncate">
                              {booking.client_name || "Client"}
                            </div>
                            <div className="text-[10px] text-gray-600 truncate">
                              {booking.service_name || "Service"}
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
        })}
      </motion.div>
    </div>
  );
};

export default WeekView;
