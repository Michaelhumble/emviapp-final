
import React from "react";
import CustomerBookingsTabContent from "../CustomerBookingsTabContent";

interface CancelledAppointmentsProps {
  show: boolean;
  bookings: any[];
  loading: boolean;
  isMobile: boolean;
  onView: (id: string) => void;
}

const friendlyEmpty = {
  title: "No canceled appointments",
  body: "Your schedule is clear. Time to book something fun!",
  cta: "Browse Artists",
  ctaHref: "/explore/artists",
};

export default function CancelledAppointments({
  show,
  bookings,
  loading,
  isMobile,
  onView,
}: CancelledAppointmentsProps) {
  if (!show) return null;

  return (
    <div className="mt-6">
      <CustomerBookingsTabContent
        bookings={bookings}
        loading={loading}
        emptyType="canceled"
        isMobile={isMobile}
        cardType="canceled"
        onView={onView}
        emptyStateProps={{
          icon: "calendar-x",
          headline: friendlyEmpty.title,
          body: friendlyEmpty.body,
          cta: friendlyEmpty.cta,
          ctaHref: friendlyEmpty.ctaHref,
        }}
      />
    </div>
  );
}
