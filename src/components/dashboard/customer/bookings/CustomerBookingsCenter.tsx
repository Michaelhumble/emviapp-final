
import React, { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import BookingsTabs from "./BookingsTabs";
import { useCustomerBookings } from "@/hooks/useCustomerBookings";
import { Calendar } from "lucide-react";
import { isNeedsAttention } from "./utils";
// Import new subcomponents
import UpcomingAppointments from "./tabs/UpcomingAppointments";
import NeedsAttention from "./tabs/NeedsAttention";
import PastAppointments from "./tabs/PastAppointments";
import CancelledAppointments from "./tabs/CancelledAppointments";

const motivationalSubline =
  "Track your appointments, rewards, and favorite pros — all in one calming space.";

export const CustomerBookingsCenter: React.FC = () => {
  const { bookings, loading, error } = useCustomerBookings();
  const [activeTab, setActiveTab] = useState<
    "upcoming" | "past" | "needs" | "canceled"
  >("upcoming");

  const now = new Date();

  const upcoming = bookings
    .filter(
      (b) =>
        (b.status === "pending" || b.status === "confirmed") &&
        (!b.date_requested ||
          new Date(b.date_requested) >= new Date(new Date().toDateString()))
    )
    .sort((a, b) => {
      if (a.date_requested && b.date_requested) {
        return (
          new Date(a.date_requested).getTime() -
          new Date(b.date_requested).getTime()
        );
      }
      return 0;
    });

  const past = bookings
    .filter((b) => b.status === "completed")
    .sort((a, b) => {
      if (a.date_requested && b.date_requested) {
        return (
          new Date(b.date_requested).getTime() -
          new Date(a.date_requested).getTime()
        );
      }
      return 0;
    });

  const needsAttention = bookings
    .filter((b) => isNeedsAttention(b.status))
    .sort((a, b) => {
      if (a.status === "pending") return -1;
      if (b.status === "pending") return 1;
      return 0;
    });

  const canceled = bookings
    .filter((b) => b.status === "cancelled")
    .sort((a, b) => {
      if (a.date_requested && b.date_requested) {
        return (
          new Date(b.date_requested).getTime() -
          new Date(a.date_requested).getTime()
        );
      }
      return 0;
    });

  function handleViewBooking(id: string) {
    window.location.href = `/bookings/${id}`;
  }

  function handleRescheduleBooking(id: string) {
    window.location.href = `/bookings/${id}/reschedule`;
  }

  function handleCancelBooking(id: string) {
    window.location.href = `/bookings/${id}/cancel`;
  }

  const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;

  const tabs = [
    {
      value: "upcoming",
      label: "Upcoming",
      count: upcoming.length,
    },
    {
      value: "needs",
      label: "Needs Attention",
      count: needsAttention.length,
      hasAttention: needsAttention.length > 0,
    },
    {
      value: "past",
      label: "Past",
      count: past.length,
    },
    {
      value: "canceled",
      label: "Canceled",
      count: canceled.length,
    },
  ];

  const handleTabChange = (value: string) => {
    if (
      value === "upcoming" ||
      value === "past" ||
      value === "needs" ||
      value === "canceled"
    ) {
      setActiveTab(value);
    }
  };

  return (
    <section className="w-full max-w-3xl mx-auto">
      <div className="mb-1 flex flex-col items-center sm:items-start sm:flex-row gap-2 sm:gap-3">
        <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-emvi-dark flex items-center gap-2">
          <Calendar className="h-7 w-7 text-purple-500" />
          Your Beauty Calendar
        </h2>
      </div>
      <div className="mb-6 mt-1 text-base sm:text-lg text-gray-600 font-light text-center sm:text-left">
        {motivationalSubline}
      </div>
      <div className="bg-white rounded-2xl shadow-lg border border-purple-50 p-6 pt-5 space-y-4">
        <Tabs
          defaultValue="upcoming"
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <BookingsTabs tabs={tabs} value={activeTab} onValueChange={handleTabChange} />

          <UpcomingAppointments
            show={activeTab === "upcoming"}
            bookings={upcoming}
            loading={loading}
            isMobile={isMobile}
            onView={handleViewBooking}
            onReschedule={handleRescheduleBooking}
            onCancel={handleCancelBooking}
          />
          <NeedsAttention
            show={activeTab === "needs"}
            bookings={needsAttention}
            loading={loading}
            isMobile={isMobile}
            onView={handleViewBooking}
            onReschedule={handleRescheduleBooking}
            onCancel={handleCancelBooking}
          />
          <PastAppointments
            show={activeTab === "past"}
            bookings={past}
            loading={loading}
            isMobile={isMobile}
            onView={handleViewBooking}
            onReschedule={handleRescheduleBooking}
          />
          <CancelledAppointments
            show={activeTab === "canceled"}
            bookings={canceled}
            loading={loading}
            isMobile={isMobile}
            onView={handleViewBooking}
          />
        </Tabs>
      </div>
    </section>
  );
};

export default CustomerBookingsCenter;
