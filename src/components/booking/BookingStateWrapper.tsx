
import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface BookingStateWrapperProps {
  loading?: boolean;
  error?: Error | null;
  children: React.ReactNode;
  loadingComponent?: React.ReactNode;
  emptyMessage?: string;
  isEmpty?: boolean;
}

export const BookingStateWrapper = ({
  loading,
  error,
  children,
  loadingComponent,
  emptyMessage = "No bookings found",
  isEmpty,
}: BookingStateWrapperProps) => {
  if (loading) {
    return loadingComponent || <div>Loading...</div>;
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {error.message || "We couldn't load the booking information. Please try again later."}
        </AlertDescription>
      </Alert>
    );
  }

  if (isEmpty) {
    return (
      <Alert>
        <AlertDescription>{emptyMessage}</AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
};
