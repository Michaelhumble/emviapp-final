
import React from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import type { Appointment } from "@/hooks/calendar/useAppointments";

interface AppointmentCardProps {
  appointment: Appointment;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({ appointment }) => {
  // Calculate position and height based on time
  const startMinutes = new Date(appointment.start_time).getHours() * 60 + 
                      new Date(appointment.start_time).getMinutes();
  const durationMinutes = appointment.duration_minutes || 60;
  
  // Each hour block is 80px tall (h-20)
  const topPosition = ((startMinutes - 9 * 60) / 60) * 80;
  const height = (durationMinutes / 60) * 80;

  return (
    <Card 
      className="absolute left-1 right-1 bg-emvi-accent/10 border-l-4 border-l-emvi-accent p-2 overflow-hidden hover:bg-emvi-accent/20 transition-colors cursor-pointer"
      style={{
        top: `${topPosition}px`,
        height: `${height}px`,
      }}
    >
      <div className="text-xs font-medium font-inter truncate">
        {appointment.customer_name || "No name"}
      </div>
      {appointment.services?.title && (
        <div className="text-xs text-muted-foreground truncate">
          {appointment.services.title}
        </div>
      )}
      <div className="text-xs text-muted-foreground">
        {format(new Date(appointment.start_time), "h:mm a")}
      </div>
    </Card>
  );
};
