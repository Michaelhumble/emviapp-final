
import React from "react";
import { Loader } from "lucide-react";

interface CalendarLoadingStateProps {
  message?: string;
}

const CalendarLoadingState = ({ message = "Loading calendar..." }: CalendarLoadingStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-white/80 rounded-lg p-8 border border-gray-100">
      <Loader className="h-8 w-8 animate-spin text-purple-600 mb-4" />
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default CalendarLoadingState;
