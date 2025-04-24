
import React from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";

interface WeeklyCalendarViewProps {
  currentDate: Date;
  bookings: any[];
  onTimeSlotClick: (date: Date, hour: number) => void;
}

const WeeklyCalendarView: React.FC<WeeklyCalendarViewProps> = ({
  currentDate,
  bookings,
  onTimeSlotClick
}) => {
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 }); // Start week on Monday
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const businessHours = Array.from({ length: 12 }, (_, i) => i + 8); // 8 AM to 8 PM

  return (
    <div className="overflow-x-auto mt-8">
      <div className="min-w-[800px]">
        {/* Time column headers */}
        <div className="grid grid-cols-8 gap-1">
          <div className="p-2" /> {/* Empty corner cell */}
          {weekDays.map((day) => (
            <div
              key={day.toString()}
              className={cn(
                "p-3 text-center border-b border-purple-100/20",
                "bg-gradient-to-b from-purple-50 to-transparent"
              )}
            >
              <div className="font-medium text-purple-900">{format(day, 'EEE')}</div>
              <div className="text-sm text-purple-600">{format(day, 'MMM d')}</div>
            </div>
          ))}
        </div>

        {/* Time slots */}
        <div className="relative">
          {businessHours.map((hour) => (
            <div key={hour} className="grid grid-cols-8 gap-1">
              {/* Time label */}
              <div className="p-2 text-sm text-gray-500 text-right">
                {format(new Date().setHours(hour), 'h:mm a')}
              </div>

              {/* Day columns */}
              {weekDays.map((day) => {
                const currentSlotDate = new Date(day.setHours(hour));
                const hasBooking = bookings.some(
                  booking => 
                    new Date(booking.date_requested).getDate() === currentSlotDate.getDate() &&
                    new Date(booking.time_requested).getHours() === hour
                );

                return (
                  <motion.div
                    key={`${day}-${hour}`}
                    className={cn(
                      "h-16 border border-gray-100/50 relative group",
                      "transition-colors duration-200",
                      hasBooking ? "bg-purple-50" : "hover:bg-purple-50/50"
                    )}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => !hasBooking && onTimeSlotClick(currentSlotDate, hour)}
                  >
                    {hasBooking ? (
                      <div className="absolute inset-1 rounded bg-gradient-to-r from-purple-100 to-pink-100 p-2">
                        <div className="text-xs font-medium truncate">
                          {bookings.find(
                            b => 
                              new Date(b.date_requested).getDate() === currentSlotDate.getDate() &&
                              new Date(b.time_requested).getHours() === hour
                          )?.client_name}
                        </div>
                      </div>
                    ) : (
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center">
                        <Clock className="h-4 w-4 text-purple-400" />
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeeklyCalendarView;
