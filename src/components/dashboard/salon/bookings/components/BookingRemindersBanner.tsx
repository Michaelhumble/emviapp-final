
import React, { useEffect, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bell, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookings } from "../hooks/useBookings";
import { format } from "date-fns";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface BookingRemindersBannerProps {
  className?: string;
}

const BookingRemindersBanner: React.FC<BookingRemindersBannerProps> = ({ className }) => {
  const { bookings } = useBookings();
  const navigate = useNavigate();
  const [todaysBookings, setTodaysBookings] = useState<number>(0);
  const [overdueBookings, setOverdueBookings] = useState<number>(0);

  useEffect(() => {
    if (!bookings.length) return;

    // Get today's date (without time)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Count today's bookings
    const todayCount = bookings.filter(booking => {
      if (!booking.date) return false;
      const bookingDate = new Date(booking.date);
      bookingDate.setHours(0, 0, 0, 0);
      return bookingDate.getTime() === today.getTime();
    }).length;

    // Count overdue bookings (past date, not completed or cancelled)
    const overdueCount = bookings.filter(booking => {
      if (!booking.date) return false;
      const bookingDate = new Date(booking.date);
      bookingDate.setHours(0, 0, 0, 0);
      return (
        bookingDate.getTime() < today.getTime() && 
        booking.status !== "completed" && 
        booking.status !== "cancelled" &&
        booking.status !== "declined"
      );
    }).length;

    setTodaysBookings(todayCount);
    setOverdueBookings(overdueCount);
  }, [bookings]);

  const handleViewBookings = () => {
    navigate("/dashboard/salon?tab=bookings");
    toast.info("Navigated to bookings tab");
  };

  // Don't show banner if no reminders needed
  if (todaysBookings === 0 && overdueBookings === 0) {
    return null;
  }

  return (
    <div className={className}>
      {todaysBookings > 0 && (
        <Alert className="mb-4 border-blue-200 bg-blue-50">
          <Calendar className="h-5 w-5 text-blue-600" />
          <AlertTitle className="ml-2 text-blue-800">
            Bookings Today
          </AlertTitle>
          <AlertDescription className="ml-2 text-blue-700">
            You have {todaysBookings} booking{todaysBookings > 1 ? 's' : ''} scheduled for today.
            <Button 
              variant="link" 
              className="p-0 h-auto ml-2 text-blue-700 font-semibold"
              onClick={handleViewBookings}
            >
              View bookings
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {overdueBookings > 0 && (
        <Alert className="mb-4 border-amber-200 bg-amber-50">
          <AlertCircle className="h-5 w-5 text-amber-600" />
          <AlertTitle className="ml-2 text-amber-800">
            Overdue Bookings
          </AlertTitle>
          <AlertDescription className="ml-2 text-amber-700">
            You have {overdueBookings} booking{overdueBookings > 1 ? 's' : ''} that are overdue and need attention.
            <Button 
              variant="link" 
              className="p-0 h-auto ml-2 text-amber-700 font-semibold"
              onClick={handleViewBookings}
            >
              Manage now
            </Button>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default BookingRemindersBanner;
