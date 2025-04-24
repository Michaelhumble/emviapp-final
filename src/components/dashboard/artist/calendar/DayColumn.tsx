
import React from 'react';
import { motion } from 'framer-motion';
import { format, isToday } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Booking } from '@/types/booking';
import { cn } from '@/lib/utils';

interface DayColumnProps {
  day: Date;
  bookings: Booking[];
}

const DayColumn: React.FC<DayColumnProps> = ({ day, bookings }) => {
  const formattedDate = format(day, 'd');
  const formattedDay = format(day, 'EEE');
  const isCurrentDay = isToday(day);
  
  return (
    <div className="flex-1 min-w-[100px]">
      {/* Day header */}
      <div 
        className={cn(
          "py-2 px-3 text-center rounded-t-md border border-b-0",
          isCurrentDay 
            ? "bg-purple-100 border-purple-200" 
            : "bg-gray-50 border-gray-100"
        )}
      >
        <div className="font-medium text-sm">
          {formattedDay}
        </div>
        <div 
          className={cn(
            "text-xl font-semibold mt-1",
            isCurrentDay ? "text-purple-700" : "text-gray-700"
          )}
        >
          {formattedDate}
        </div>
      </div>
      
      {/* Bookings container */}
      <div 
        className={cn(
          "min-h-[400px] p-2 rounded-b-md border bg-white",
          isCurrentDay ? "border-purple-200" : "border-gray-100"
        )}
      >
        {bookings.length > 0 ? (
          <div className="space-y-2">
            {bookings.map((booking) => (
              <motion.div
                key={booking.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  "p-2 rounded-md border text-sm",
                  booking.status === 'confirmed'
                    ? "bg-blue-50 border-blue-100"
                    : booking.status === 'completed'
                    ? "bg-green-50 border-green-100"
                    : "bg-gray-50 border-gray-100"
                )}
              >
                <div className="font-medium truncate">
                  {booking.client_name || "Unnamed Client"}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {booking.time_requested || "No time"}
                </div>
                <div className="text-xs mt-1 truncate">
                  {booking.service_name || "No service"}
                </div>
                <div className="mt-1">
                  <Badge 
                    variant={
                      booking.status === 'confirmed' 
                        ? 'default'
                        : booking.status === 'completed'
                        ? 'secondary'
                        : 'outline'
                    }
                    className={
                      booking.status === 'completed' 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : booking.status === 'pending'
                        ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        : undefined
                    }
                  >
                    {booking.status}
                  </Badge>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            No bookings
          </div>
        )}
      </div>
    </div>
  );
};

export default DayColumn;
