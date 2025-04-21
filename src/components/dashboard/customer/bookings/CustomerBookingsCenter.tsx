
import React, { useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import BookingsTabs from "./BookingsTabs";
import CustomerBookingsTabContent from "./CustomerBookingsTabContent";
import { useCustomerBookings } from "@/hooks/useCustomerBookings";
import { Calendar } from "lucide-react";
import { isNeedsAttention } from "./utils";

const friendlyEmpty = {
  upcoming: {
    title: "No upcoming bookings yet",
    body: "You deserve a moment of peace — book your next beauty session now.",
    cta: "Book Now",
    ctaHref: "/explore/artists",
  },
  past: {
    title: "You haven't had any appointments yet",
    body: "Your beauty story is about to begin. Save your favorite moments here.",
    cta: "Explore Services",
    ctaHref: "/explore/artists",
  },
  needsAttention: {
    title: "All good here!",
    body: "You're all set – no bookings need your attention right now.",
    cta: "View Artists",
    ctaHref: "/explore/artists",
  },
  canceled: {
    title: "No canceled appointments",
    body: "Your schedule is clear. We're here when you're ready to book again.",
    cta: "Browse Services",
    ctaHref: "/explore/artists",
  }
};

export const CustomerBookingsCenter: React.FC = () => {
  const { bookings, loading, error } = useCustomerBookings();
  const [activeTab, setActiveTab] = useState<"upcoming" | "past" | "needs" | "canceled">("upcoming");

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
    {
      value: "canceled",
      label: "Canceled",
      count: canceled.length
    },
  ];

  // Type safety handler function to convert between the types
  const handleTabChange = (value: string) => {
    // Only set the state if the value is one of the allowed types
    if (value === "upcoming" || value === "past" || value === "needs" || value === "canceled") {
      setActiveTab(value);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="font-serif text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          <Calendar className="h-6 w-6 text-purple-500" /> 
          Your Beauty Calendar
        </h2>
        <Tabs
          defaultValue="upcoming"
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <BookingsTabs
            tabs={tabs}
            value={activeTab}
            onValueChange={handleTabChange}
          />
          <TabsContent value="upcoming" className="mt-4">
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
          <TabsContent value="needs" className="mt-4">
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
          <TabsContent value="past" className="mt-4">
            <CustomerBookingsTabContent
              bookings={past}
              loading={loading}
              emptyType="past"
              isMobile={isMobile}
              cardType="past"
              onView={handleViewBooking}
              onReschedule={handleRescheduleBooking}
            />
          </TabsContent>
          <TabsContent value="canceled" className="mt-4">
            <CustomerBookingsTabContent
              bookings={canceled}
              loading={loading}
              emptyType="canceled"
              isMobile={isMobile}
              cardType="canceled"
              onView={handleViewBooking}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerBookingsCenter;
