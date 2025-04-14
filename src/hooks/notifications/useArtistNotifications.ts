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

export const useArtistNotifications = () => {
  const handleNewBookingReceived = async (booking: Booking) => {
    toast.info("New booking request received!", {
      description: "You have a new booking request waiting for your confirmation",
      action: {
        label: "View",
        onClick: () => window.location.href = "/dashboard"
      },
      duration: 5000,
    });
  };

  const handleBookingStatusChange = async (booking: Booking, previousStatus?: string) => {
    if (!previousStatus || previousStatus === booking.status) return;

    switch (booking.status) {
      case "cancelled":
        toast.info("A booking has been cancelled by the customer", {
          description: "The customer has cancelled their booking"
        });
        break;
      default:
        // Other status changes might not need notifications for artists
        break;
    }
  };

  return {
    handleNewBookingReceived,
    handleBookingStatusChange
  };
};
