
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
          {/* Premium beauty empty card */}
          <div className="flex flex-col items-center justify-center py-10 px-2 sm:px-7 gap-3 rounded-[2rem] border border-purple-100 shadow-lg bg-[radial-gradient(ellipse_110%_100%_at_50%_40%,rgba(202,174,255,0.10)_10%,rgba(166,193,235,0.10)_80%,#fff_100%)] animate-fade-in">
            <Calendar className="h-10 w-10 text-purple-400 mb-2" />
            <h3 className="font-serif text-2xl font-semibold text-emvi-dark text-center mb-1">
              {friendlyEmpty.headline}
            </h3>
            <p className="text-gray-500 mb-4 text-center max-w-md text-base">
              {friendlyEmpty.body}
            </p>
            <button
              className="rounded-full px-8 py-2 mt-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg hover:bg-purple-600 transition text-base"
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
