
import { toast } from "sonner";

interface Booking {
  id: string;
  sender_id: string;
  recipient_id: string;
  status: string;
  date_requested?: string;
  time_requested?: string;
  service_id?: string;
}

export const useCustomerNotifications = () => {
  const handleNewBookingCreated = async (booking: Booking) => {
    toast.success("Booking request sent successfully! You'll be notified when it's confirmed.");
  };

  const handleBookingStatusChange = async (booking: Booking, previousStatus?: string) => {
    if (!previousStatus || previousStatus === booking.status) return;

    switch (booking.status) {
      case "confirmed":
        toast.success("Your booking has been confirmed!", {
          description: "Check your bookings page for details",
          action: {
            label: "View",
            onClick: () => window.location.href = "/my-bookings"
          }
        });
        break;
      case "cancelled":
        toast.error("Your booking has been cancelled", {
          description: "The service provider has cancelled your booking"
        });
        break;
      case "completed":
        toast.success("Your booking has been marked as completed", {
          description: "Thanks for using our service!",
        });
        break;
      default:
        toast.info(`Your booking status has been updated to ${booking.status}`);
        break;
    }
  };

  return {
    handleNewBookingCreated,
    handleBookingStatusChange
  };
};
