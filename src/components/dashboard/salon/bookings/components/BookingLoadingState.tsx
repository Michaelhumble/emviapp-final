
import React from "react";
import { RefreshCw } from "lucide-react";

const BookingLoadingState: React.FC = () => {
  return (
    <div className="py-12 text-center">
      <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-500 mb-2" />
      <p className="text-gray-500">Loading bookings...</p>
    </div>
  );
};

export default BookingLoadingState;
