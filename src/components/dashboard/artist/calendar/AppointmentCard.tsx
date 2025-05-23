
import { format, parseISO } from "date-fns";
import { Phone } from "lucide-react";
import { cn } from "@/lib/utils";

interface Appointment {
  id: string;
  start_time: string;
  customer_name?: string;
  services?: {
    title?: string;
  };
  status: string;
  is_manual?: boolean;
  duration_minutes?: number;
}

interface AppointmentCardProps {
  appointment: Appointment;
  onClick: () => void;
}

export const AppointmentCard = ({ appointment, onClick }: AppointmentCardProps) => {
  const isManual = appointment.is_manual;
  const startTime = parseISO(appointment.start_time);
  
  return (
    <div
      onClick={onClick}
      className={cn(
        "absolute left-1 right-1 rounded-md px-2 py-1 shadow-sm cursor-pointer transition-all hover:shadow-md",
        isManual 
          ? "bg-purple-50 border border-purple-200" 
          : appointment.status === "confirmed"
            ? "bg-green-50 border border-green-200"
            : "bg-amber-50 border border-amber-200"
      )}
      style={{
        top: `${(startTime.getHours() - 6) * 60 + startTime.getMinutes()}px`,
        height: `${appointment.duration_minutes || 60}px`
      }}
    >
      <div className="text-xs font-medium truncate">
        {format(startTime, "h:mm a")}
      </div>
      <div className="text-xs font-medium truncate">
        {appointment.services?.title || "Service"}
      </div>
      <div className="text-xs truncate flex items-center gap-1">
        {isManual && <Phone className="h-3 w-3 text-purple-500" />}
        {appointment.customer_name || "Client"}
      </div>
    </div>
  );
};
