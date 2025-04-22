
import { CalendarDays } from "lucide-react";

export const EmptyAppointments = () => {
  return (
    <div className="text-center py-8 px-4">
      <div className="mb-4 flex justify-center">
        <CalendarDays className="h-12 w-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-medium mb-2">
        No appointments yet
      </h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        Your next client is just around the corner! Keep sharing your profile to get booked.
      </p>
    </div>
  );
};
