
import React from "react";
import { format } from "date-fns";
import { DayColumn } from "./DayColumn";
import type { Appointment } from "@/hooks/calendar/useAppointments";

interface WeeklyCalendarProps {
  weekDays: Date[];
  appointments: Appointment[];
}

export const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ weekDays, appointments }) => {
  // Business hours from 9 AM to 6 PM
  const hours = Array.from({ length: 10 }, (_, i) => i + 9);

  return (
    <div className="relative">
      {/* Time labels */}
      <div className="flex">
        <div className="w-16 flex-shrink-0" /> {/* Space for time labels */}
        <div className="flex flex-1">
          {weekDays.map((day) => (
            <div key={day.toString()} className="flex-1 border-l text-center py-2 font-playfair">
              <div className="text-sm font-medium">{format(day, "EEE")}</div>
              <div className="text-xs text-muted-foreground">{format(day, "MMM d")}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex relative min-h-[600px]">
        {/* Time slots */}
        <div className="w-16 flex-shrink-0">
          {hours.map((hour) => (
            <div key={hour} className="h-20 border-b relative">
              <span className="absolute -top-3 left-2 text-xs text-muted-foreground">
                {format(new Date().setHours(hour, 0), "ha")}
              </span>
            </div>
          ))}
        </div>

        {/* Day columns */}
        <div className="flex flex-1">
          {weekDays.map((day) => (
            <DayColumn
              key={day.toString()}
              day={day}
              appointments={appointments.filter(apt => 
                format(new Date(apt.start_time), "yyyy-MM-dd") === format(day, "yyyy-MM-dd")
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
