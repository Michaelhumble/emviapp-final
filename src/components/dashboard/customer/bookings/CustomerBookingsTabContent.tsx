
import React from "react";
import BookingCard from "./BookingCard";
import BookingsEmptyState, { EmptyType } from "./BookingsEmptyState";

interface CustomerBookingsTabContentProps {
  bookings: any[];
  loading: boolean;
  emptyType: EmptyType;
  isMobile: boolean;
  cardType: "upcoming" | "canceled" | "past";
  onView?: (id: string) => void;
  onReschedule?: (id: string) => void;
  onCancel?: (id: string) => void;
  emptyStateProps?: {
    icon: string;
    headline: string;
    body: string;
    cta: string;
    ctaHref: string;
  };
}

const CustomerBookingsTabContent: React.FC<CustomerBookingsTabContentProps> = ({
  bookings,
  loading,
  emptyType,
  isMobile,
  cardType,
  onView,
  onReschedule,
  onCancel,
  emptyStateProps,
}) => {
  if (loading) {
    return (
      <div className="text-center text-gray-400 py-10 animate-pulse">
        Loading your bookings…
      </div>
    );
  }

  if (!bookings || bookings.length === 0) {
    return <BookingsEmptyState type={emptyType} isMobile={isMobile} customProps={emptyStateProps} />;
  }

  return (
    <div className="flex flex-col gap-4">
      {bookings.map((booking) => (
        <BookingCard
          key={booking.id}
          booking={booking}
          type={cardType}
          // Only pass handlers if defined. TS supports undefined for optional props.
          {...(onView && { onView })}
          {...(onReschedule && { onReschedule })}
          {...(onCancel && { onCancel })}
        />
      ))}
    </div>
  );
};

export default CustomerBookingsTabContent;
