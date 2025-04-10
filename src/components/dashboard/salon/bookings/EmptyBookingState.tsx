
import React from "react";
import { Calendar, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyBookingStateProps {
  message?: string;
  showReset?: boolean;
  onReset?: () => void;
}

const EmptyBookingState: React.FC<EmptyBookingStateProps> = ({ 
  message = "No bookings yet. Your calendar will appear here when clients book you.",
  showReset = false,
  onReset
}) => {
  return (
    <div className="py-12 text-center">
      <div className="bg-blue-50 rounded-lg p-8 max-w-2xl mx-auto">
        <Calendar className="h-12 w-12 text-blue-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium mb-2">Your Calendar is Empty</h3>
        <p className="text-gray-600 mb-4">{message}</p>
        
        {showReset && onReset && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onReset}
            className="mt-2"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyBookingState;
