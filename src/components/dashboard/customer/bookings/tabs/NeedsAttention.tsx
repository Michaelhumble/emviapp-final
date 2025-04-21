
import React from "react";
import CustomerBookingsTabContent from "../CustomerBookingsTabContent";

interface NeedsAttentionProps {
  show: boolean;
  bookings: any[];
  loading: boolean;
  isMobile: boolean;
  onView: (id: string) => void;
  onReschedule: (id: string) => void;
  onCancel: (id: string) => void;
}

const friendlyEmpty = {
  headline: "Everything's on track!",
  body: "No bookings need your attention right now.",
  cta: "View Artists",
  ctaHref: "/explore/artists",
};

export default function NeedsAttention({
  show,
  bookings,
  loading,
  isMobile,
  onView,
  onReschedule,
  onCancel
}: NeedsAttentionProps) {
  if (!show) return null;

  return (
    <div className="mt-6">
      <CustomerBookingsTabContent
        bookings={bookings}
        loading={loading}
        emptyType="needsAttention"
        isMobile={isMobile}
        cardType="upcoming"
        onView={onView}
        onReschedule={onReschedule}
        onCancel={onCancel}
        emptyStateProps={{
          icon: "calendar-check",
          headline: friendlyEmpty.headline,
          body: friendlyEmpty.body,
          cta: friendlyEmpty.cta,
          ctaHref: friendlyEmpty.ctaHref,
        }}
      />
    </div>
  );
}
