
import React from "react";
import { RefreshCw } from "lucide-react";
import EmviLogo from "@/components/branding/EmviLogo";

const BookingLoadingState: React.FC = () => {
  return (
    <div className="py-12 text-center">
      <div className="flex flex-col items-center justify-center">
        <EmviLogo size="small" showText={false} className="mb-4" />
        <RefreshCw className="h-8 w-8 animate-spin mx-auto text-blue-500 mb-2" />
        <p className="text-gray-500">Loading bookings...</p>
      </div>
    </div>
  );
};

export default BookingLoadingState;
