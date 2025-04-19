
import React from "react";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface WeeklyCalendarViewProps {
  currentDate: Date;
  bookings: Array<any>;
  blockedTimes: Array<any>;
  onSelectTimeSlot: (date: Date, hour: number) => void;
}

const WeeklyCalendarView: React.FC<WeeklyCalendarViewProps> = ({
  currentDate,
  bookings,
  blockedTimes,
  onSelectTimeSlot
}) => {
  // Generate weekly calendar
  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 1 });
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => 
    addDays(startOfCurrentWeek, i)
  );
  
  // Business hours (9 AM to 6 PM)
  const hours = Array.from({ length: 10 }, (_, i) => i + 9);
  
  // Helper to check if a time slot has a booking
  const hasBooking = (date: Date, hour: number) => {
    const timeString = `${hour}:00`;
    return bookings.some(booking => 
      isSameDay(new Date(booking.date_requested), date) && 
      booking.time_requested === timeString
    );
  };
  
  // Helper to check if a time slot is blocked
  const isBlocked = (date: Date, hour: number) => {
    return blockedTimes.some(block => 
      isSameDay(new Date(block.start_time), date) && 
      new Date(block.start_time).getHours() <= hour &&
      new Date(block.end_time).getHours() > hour
    );
  };

  return (
    <div className="overflow-auto">
      <div className="grid grid-cols-8 gap-1 min-w-[800px]">
        {/* Time column */}
        <div className="col-span-1">
          <div className="h-12"></div> {/* Empty cell for alignment */}
          {hours.map(hour => (
            <div 
              key={`time-${hour}`} 
              className="h-16 flex items-center justify-center text-sm text-gray-500"
            >
              {format(new Date().setHours(hour), 'h a')}
            </div>
          ))}
        </div>
        
        {/* Days columns */}
        {daysOfWeek.map(day => (
          <div key={day.toString()} className="col-span-1">
            <div className="h-12 text-center py-2 font-medium">
              <div>{format(day, "EEE")}</div>
              <div className="text-xs text-gray-500">{format(day, "MMM d")}</div>
            </div>
            
            {hours.map(hour => (
              <div 
                key={`${day}-${hour}`} 
                className="h-16 border border-gray-100 relative"
              >
                {hasBooking(day, hour) ? (
                  <Card className="absolute inset-1 bg-blue-100 border-blue-200 p-1 text-xs overflow-hidden">
                    <div className="font-medium">Booked</div>
                    <div className="truncate">{format(new Date().setHours(hour), 'h:mm a')}</div>
                  </Card>
                ) : isBlocked(day, hour) ? (
                  <Card className="absolute inset-1 bg-gray-100 border-gray-200 p-1 text-xs overflow-hidden">
                    <div className="font-medium">Unavailable</div>
                  </Card>
                ) : (
                  <Button
                    variant="ghost"
                    className="absolute inset-0 h-full w-full p-0 rounded-none hover:bg-blue-50"
                    onClick={() => onSelectTimeSlot(day, hour)}
                  >
                    <span className="sr-only">
                      Select {format(day, "EEE MMM d")} at {format(new Date().setHours(hour), 'h a')}
                    </span>
                  </Button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendarView;
