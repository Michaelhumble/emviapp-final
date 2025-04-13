import React, { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Bell, Calendar, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookings } from "../hooks/useBookings";
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
  };

  // Don't show banner if no reminders needed
  if (todaysBookings === 0 && overdueBookings === 0) {
    return null;
  }

  return (
    <div className={`flex flex-col sm:flex-row gap-2 ${className}`}>
      {todaysBookings > 0 && (
        <Alert className="py-2 px-3 border-blue-200 bg-blue-50 flex-1">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-600 flex-shrink-0" />
            <AlertDescription className="text-xs text-blue-700 m-0 flex-grow">
              <span className="font-semibold">{todaysBookings}</span> booking{todaysBookings > 1 ? 's' : ''} today
              <Button 
                variant="link" 
                className="p-0 h-auto ml-1 text-xs text-blue-700 font-medium"
                onClick={handleViewBookings}
              >
                View
              </Button>
            </AlertDescription>
          </div>
        </Alert>
      )}

      {overdueBookings > 0 && (
        <Alert className="py-2 px-3 border-amber-200 bg-amber-50 flex-1">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-600 flex-shrink-0" />
            <AlertDescription className="text-xs text-amber-700 m-0 flex-grow">
              <span className="font-semibold">{overdueBookings}</span> overdue booking{overdueBookings > 1 ? 's' : ''}
              <Button 
                variant="link" 
                className="p-0 h-auto ml-1 text-xs text-amber-700 font-medium"
                onClick={handleViewBookings}
              >
                Manage
              </Button>
            </AlertDescription>
          </div>
        </Alert>
      )}
    </div>
  );
};

export default BookingRemindersBanner;
