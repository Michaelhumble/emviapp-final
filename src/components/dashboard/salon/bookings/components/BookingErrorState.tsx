
import React from "react";
import { Button } from "@/components/ui/button";

interface BookingErrorStateProps {
  error: string;
  onRetry: () => void;
}

const BookingErrorState: React.FC<BookingErrorStateProps> = ({ error, onRetry }) => {
  return (
    <div className="py-12 text-center">
      <div className="bg-red-50 p-4 rounded-lg">
        <p className="text-red-600">{error}</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={onRetry}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default BookingErrorState;
