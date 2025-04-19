
import { toast } from "sonner";

export const useBookingErrorHandler = () => {
  const handleBookingError = (error: unknown, fallbackMessage = "We couldn't process your booking request. Please try again later.") => {
    console.error("Booking error:", error);
    
    if (error instanceof Error) {
      // Handle specific error types
      if (error.message.includes("availability")) {
        toast.error("This time slot is no longer available. Please select another time.");
        return;
      }
      if (error.message.includes("permission")) {
        toast.error("You don't have permission to make this booking.");
        return;
      }
      toast.error(error.message);
      return;
    }
    
    toast.error(fallbackMessage);
  };

  return { handleBookingError };
};
