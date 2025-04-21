import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import BookingsTabs from "./BookingsTabs";
import CustomerBookingsTabContent from "./CustomerBookingsTabContent";
import { useCustomerBookings } from "@/hooks/useCustomerBookings";
import { Calendar } from "lucide-react";
import { isNeedsAttention } from "./utils";

const friendlyEmpty = {
  upcoming: {
    title: "No upcoming bookings yet!",
    body: "Time to treat yourself? Your next beauty experience is just a tap away.",
    cta: "Book Now",
    ctaHref: "/explore/artists",
  },
  past: {
    title: "No past bookings",
    body: "Your completed appointments will appear here.",
    cta: "Find Services",
    ctaHref: "/explore/artists",
  },
  needsAttention: {
    title: "All clear!",
    body: "You're all set – no bookings need your action right now.",
    cta: "View Artists",
    ctaHref: "/explore/artists",
  },
};

export const CustomerBookingsCenter: React.FC = () => {
  const { bookings, loading, error } = useCustomerBookings();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "needs">("upcoming");

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

  function handleViewBooking(id: string) {
    window.location.href = `/bookings/${id}`;
  }

  function handleRescheduleBooking(id: string) {
    window.location.href = `/bookings/${id}/reschedule`;
  }

  function handleCancelBooking(id: string) {
    window.location.href = `/bookings/${id}/cancel`;
  }

  const isMobile = window.innerWidth < 768;

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
      count: past.length
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-0 sm:px-0 md:px-0 pt-2 mb-6">
      <h2 className="font-bold text-[1.4rem] sm:text-2xl mb-3 text-primary flex items-center gap-2">
        <Calendar className="h-6 w-6 text-primary" /> My Bookings
      </h2>
      <Tabs
        defaultValue="upcoming"
        value={activeTab}
        onValueChange={(tab) =>
          setActiveTab(tab as "upcoming" | "past" | "needs")
        }
        className="w-full"
      >
        <BookingsTabs
          tabs={tabs}
          value={activeTab}
          onValueChange={setActiveTab}
        />
        <TabsContent value="upcoming">
          <CustomerBookingsTabContent
            bookings={upcoming}
            loading={loading}
            emptyType="upcoming"
            isMobile={isMobile}
            cardType="upcoming"
            onView={handleViewBooking}
            onReschedule={handleRescheduleBooking}
            onCancel={handleCancelBooking}
          />
        </TabsContent>
        <TabsContent value="needs">
          <CustomerBookingsTabContent
            bookings={needsAttention}
            loading={loading}
            emptyType="needsAttention"
            isMobile={isMobile}
            cardType="upcoming"
            onView={handleViewBooking}
            onReschedule={handleRescheduleBooking}
            onCancel={handleCancelBooking}
          />
        </TabsContent>
        <TabsContent value="past">
          <CustomerBookingsTabContent
            bookings={past}
            loading={loading}
            emptyType="past"
            isMobile={isMobile}
            cardType="past"
            onView={handleViewBooking}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerBookingsCenter;
