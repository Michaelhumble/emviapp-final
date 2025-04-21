
import React from "react";
import { Calendar } from "lucide-react";
import CustomerBookingsTabContent from "../CustomerBookingsTabContent";
import BookingIncentiveBanner from "./BookingIncentiveBanner";

interface UpcomingAppointmentsProps {
  show: boolean;
  bookings: any[];
  loading: boolean;
  isMobile: boolean;
  onView: (id: string) => void;
  onReschedule: (id: string) => void;
  onCancel: (id: string) => void;
  currentCredits?: number;
}

const friendlyEmpty = {
  headline: "No beauty plans yet? Let's fix that.",
  body: "Schedule something wonderful with a top professional. Your beauty adventure begins here.",
  cta: "Explore Artists",
  ctaHref: "/explore/artists",
};

export default function UpcomingAppointments({
  show,
  bookings,
  loading,
  isMobile,
  onView,
  onReschedule,
  onCancel,
  currentCredits,
}: UpcomingAppointmentsProps) {
  if (!show) return null;

  const isEmpty = bookings.length === 0;

  return (
    <div className="mt-4">
      {isEmpty ? (
        <>
          <div className="flex flex-col items-center justify-center py-10 px-3 gap-3 bg-gradient-to-tr from-purple-50 via-indigo-50 to-pink-50 rounded-2xl border border-purple-100 shadow-sm">
            <Calendar className="h-10 w-10 text-purple-200 mb-2" />
            <h3 className="font-serif text-xl font-semibold text-emvi-dark text-center mb-1">
              <span role="img" aria-label="nail polish" className="emoji emoji-pop">💅</span> {friendlyEmpty.headline}
            </h3>
            <p className="text-gray-500 mb-3 text-center max-w-md text-sm">
              {friendlyEmpty.body}
            </p>
            <button
              className="rounded-full px-6 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-md hover:bg-purple-600 transition text-sm"
              onClick={() => (window.location.href = friendlyEmpty.ctaHref)}
            >
              {friendlyEmpty.cta}
            </button>
          </div>
          <BookingIncentiveBanner currentCredits={currentCredits} />
        </>
      ) : (
        <CustomerBookingsTabContent
          bookings={bookings}
          loading={loading}
          emptyType="upcoming"
          isMobile={isMobile}
          cardType="upcoming"
          onView={onView}
          onReschedule={onReschedule}
          onCancel={onCancel}
        />
      )}
    </div>
  );
}
