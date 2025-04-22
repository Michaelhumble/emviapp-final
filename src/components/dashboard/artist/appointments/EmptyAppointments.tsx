
import { CalendarClock } from "lucide-react";

export const EmptyAppointments = () => {
  return (
    <div className="py-8 text-center">
      <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-purple-50">
        <CalendarClock className="h-8 w-8 text-purple-500" />
      </div>
      <h3 className="text-lg font-medium mb-2">No appointments yet</h3>
      <p className="text-gray-500 max-w-md mx-auto">
        No appointments yet — but your next client is just around the corner! 
        Keep sharing your profile to get booked.
      </p>
    </div>
  );
};
