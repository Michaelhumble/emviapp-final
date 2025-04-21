
import React from "react";
import CustomerBookingsTabContent from "../CustomerBookingsTabContent";
import BookingIncentiveBanner from "./BookingIncentiveBanner";

interface CancelledAppointmentsProps {
  show: boolean;
  bookings: any[];
  loading: boolean;
  isMobile: boolean;
  onView: (id: string) => void;
  currentCredits?: number;
}

const friendlyEmpty = {
  headline: "No canceled appointments",
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
  currentCredits,
}: CancelledAppointmentsProps) {
  if (!show) return null;

  const isEmpty = bookings.length === 0;

  return (
    <div className="mt-6">
      {isEmpty ? (
        <>
          <CustomerBookingsTabContent
            bookings={bookings}
            loading={loading}
            emptyType="canceled"
            isMobile={isMobile}
            cardType="canceled"
            onView={onView}
            emptyStateProps={{
              icon: "calendar-x",
              headline: friendlyEmpty.headline,
              body: friendlyEmpty.body,
              cta: friendlyEmpty.cta,
              ctaHref: friendlyEmpty.ctaHref,
            }}
          />
          <BookingIncentiveBanner currentCredits={currentCredits} />
        </>
      ) : (
        <CustomerBookingsTabContent
          bookings={bookings}
          loading={loading}
          emptyType="canceled"
          isMobile={isMobile}
          cardType="canceled"
          onView={onView}
        />
      )}
    </div>
  );
}
