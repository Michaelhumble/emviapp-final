
import React from "react";
import CustomerBookingsTabContent from "../CustomerBookingsTabContent";

interface PastAppointmentsProps {
  show: boolean;
  bookings: any[];
  loading: boolean;
  isMobile: boolean;
  onView: (id: string) => void;
  onReschedule: (id: string) => void;
}

const friendlyEmpty = {
  headline: "No past appointments",
  body: "Your journey is just beginning.",
  cta: "Get Started",
  ctaHref: "/explore/artists",
};

export default function PastAppointments({
  show,
  bookings,
  loading,
  isMobile,
  onView,
  onReschedule
}: PastAppointmentsProps) {
  if (!show) return null;

  return (
    <div className="mt-6">
      <CustomerBookingsTabContent
        bookings={bookings}
        loading={loading}
        emptyType="past"
        isMobile={isMobile}
        cardType="past"
        onView={onView}
        onReschedule={onReschedule}
        emptyStateProps={{
          icon: "calendar-clock",
          headline: friendlyEmpty.headline,
          body: friendlyEmpty.body,
          cta: friendlyEmpty.cta,
          ctaHref: friendlyEmpty.ctaHref,
        }}
      />
    </div>
  );
}
