
import React from "react";
import { AppointmentCard } from "./AppointmentCard";
import type { Appointment } from "@/hooks/calendar/useAppointments";

interface DayColumnProps {
  day: Date;
  appointments: Appointment[];
}

export const DayColumn: React.FC<DayColumnProps> = ({ day, appointments }) => {
  return (
    <div className="flex-1 border-l relative min-h-full">
      {/* Hour grid lines */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="h-20 border-b" />
      ))}
      
      {/* Appointment cards */}
      <div className="absolute inset-0 p-1">
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            appointment={appointment}
          />
        ))}
      </div>
    </div>
  );
};
