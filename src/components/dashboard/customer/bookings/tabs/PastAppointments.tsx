
import React from "react";
import CustomerBookingsTabContent from "../CustomerBookingsTabContent";
import BookingIncentiveBanner from "./BookingIncentiveBanner";

interface PastAppointmentsProps {
  show: boolean;
  bookings: any[];
  loading: boolean;
  isMobile: boolean;
  onView: (id: string) => void;
  onReschedule: (id: string) => void;
  currentCredits?: number;
}

const emojiSpan = (label: string, emoji: string) => (
  <span role="img" aria-label={label} className="emoji">
    {emoji}
  </span>
);

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
  onReschedule,
  currentCredits,
}: PastAppointmentsProps) {
  if (!show) return null;

  const isEmpty = bookings.length === 0;

  return (
    <div className="mt-6">
      {isEmpty ? (
        <>
          <CustomerBookingsTabContent
            bookings={bookings}
            loading={loading}
            emptyType="past"
            isMobile={isMobile}
            cardType="past"
            onView={onView}
            onReschedule={onReschedule}
            emptyStateProps={{
              icon: emojiSpan("clock", "🕓"),
              headline: (
                <>
                  {emojiSpan("clock", "🕓")} No past appointments
                </>
              ),
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
          emptyType="past"
          isMobile={isMobile}
          cardType="past"
          onView={onView}
          onReschedule={onReschedule}
        />
      )}
    </div>
  );
}
