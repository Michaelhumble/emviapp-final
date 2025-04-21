
import React, { useMemo } from "react";
import { useCustomerBookings } from "@/hooks/useCustomerBookings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, isPast, isToday, addDays } from "date-fns";
import { CustomerBooking } from "./types";
import BookingTimeline from "./BookingTimeline";
import NextAppointmentCard from "./NextAppointmentCard";
import SmartReminderCard from "./SmartReminderCard";
import MissedAppointmentCard from "./MissedAppointmentCard";

const CustomerBookingsSection: React.FC = () => {
  const { bookings, loading, error } = useCustomerBookings();

  const { 
    upcomingBookings, 
    pastBookings, 
    inProgressBookings,
    canceledBookings,
    nextAppointment,
    missedBookings,
    lastCompletedService
  } = useMemo(() => {
    const now = new Date();
    const upcoming: CustomerBooking[] = [];
    const past: CustomerBooking[] = [];
    const inProgress: CustomerBooking[] = [];
    const canceled: CustomerBooking[] = [];
    const missed: CustomerBooking[] = [];
    
    let next: CustomerBooking | null = null;
    let lastCompleted: CustomerBooking | null = null;

    // Process all bookings
    bookings.forEach(booking => {
      const bookingDate = booking.date_requested ? new Date(booking.date_requested) : null;
      
      // Cancelled bookings
      if (booking.status === "cancelled") {
        canceled.push(booking);
        return;
      }
      
      // Completed bookings
      if (booking.status === "completed") {
        past.push(booking);
        if (!lastCompleted || (bookingDate && lastCompleted.date_requested && 
            new Date(bookingDate) > new Date(lastCompleted.date_requested))) {
          lastCompleted = booking;
        }
        return;
      }
      
      // Handle bookings with dates
      if (bookingDate) {
        // Today's bookings are "in progress"
        if (isToday(bookingDate)) {
          inProgress.push(booking);
          return;
        }
        
        // Future bookings are "upcoming"
        if (bookingDate > now) {
          upcoming.push(booking);
          
          // Find next appointment
          if (!next || (next.date_requested && bookingDate < new Date(next.date_requested))) {
            next = booking;
          }
          return;
        }
        
        // Past date with status not completed or cancelled = missed
        if (isPast(bookingDate) && booking.status !== "completed" && booking.status !== "cancelled") {
          missed.push(booking);
          return;
        }
      }
      
      // Default - put in past if we can't determine
      past.push(booking);
    });

    // Sort upcoming by date (closest first)
    upcoming.sort((a, b) => {
      if (!a.date_requested || !b.date_requested) return 0;
      return new Date(a.date_requested).getTime() - new Date(b.date_requested).getTime();
    });
    
    // Sort past by date (most recent first)
    past.sort((a, b) => {
      if (!a.date_requested || !b.date_requested) return 0;
      return new Date(b.date_requested).getTime() - new Date(a.date_requested).getTime();
    });

    return {
      upcomingBookings: upcoming,
      pastBookings: past,
      inProgressBookings: inProgress,
      canceledBookings: canceled,
      missedBookings: missed,
      nextAppointment: next,
      lastCompletedService: lastCompleted
    };
  }, [bookings]);

  // Determine if we should show the smart reminder
  const showSmartReminder = useMemo(() => {
    if (!lastCompletedService || !lastCompletedService.date_requested) return false;
    
    const lastServiceDate = new Date(lastCompletedService.date_requested);
    const now = new Date();
    const fourWeeksAgo = addDays(now, -28);
    
    // Show reminder if last service was more than 4 weeks ago
    return lastServiceDate < fourWeeksAgo;
  }, [lastCompletedService]);

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto mb-6">
        <CardContent className="py-6">
          <div className="flex flex-col space-y-4 animate-pulse">
            <div className="h-8 w-2/3 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto mb-6">
        <CardContent className="py-6">
          <div className="text-red-500 text-center">
            <p>Something went wrong loading your bookings. Please try again later.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto mb-6 shadow-sm border-gray-100">
      <CardHeader className="pb-0">
        <CardTitle className="text-xl font-semibold text-gray-800">My Bookings</CardTitle>
      </CardHeader>
      <CardContent className="pb-6">
        {nextAppointment && (
          <NextAppointmentCard booking={nextAppointment} className="mb-6" />
        )}
        
        {missedBookings.length > 0 && (
          <MissedAppointmentCard 
            booking={missedBookings[0]} 
            className="mb-6" 
          />
        )}
        
        {showSmartReminder && lastCompletedService && (
          <SmartReminderCard 
            lastService={lastCompletedService} 
            className="mb-6" 
          />
        )}
        
        <BookingTimeline 
          upcomingBookings={upcomingBookings}
          inProgressBookings={inProgressBookings}
          pastBookings={pastBookings}
          canceledBookings={canceledBookings}
        />
      </CardContent>
    </Card>
  );
};

export default CustomerBookingsSection;
