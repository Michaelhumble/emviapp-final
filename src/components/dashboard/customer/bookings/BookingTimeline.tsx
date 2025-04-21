
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CustomerBooking } from "./types";
import BookingCard from "./BookingCard";

interface BookingTimelineProps {
  upcomingBookings: CustomerBooking[];
  inProgressBookings: CustomerBooking[];
  pastBookings: CustomerBooking[];
  canceledBookings: CustomerBooking[];
}

const BookingTimeline: React.FC<BookingTimelineProps> = ({
  upcomingBookings,
  inProgressBookings,
  pastBookings,
  canceledBookings
}) => {
  const [activeTab, setActiveTab] = useState<"upcoming" | "progress" | "past" | "canceled">("upcoming");

  const tabData = [
    { 
      id: "upcoming", 
      label: "Upcoming", 
      count: upcomingBookings.length,
      bookings: upcomingBookings,
      emptyMessage: "You have no upcoming appointments.",
      emptyCta: "Schedule your next appointment!"
    },
    { 
      id: "progress", 
      label: "Today", 
      count: inProgressBookings.length,
      bookings: inProgressBookings,
      emptyMessage: "No appointments scheduled for today.",
      emptyCta: "Enjoy your day!"
    },
    { 
      id: "past", 
      label: "Past", 
      count: pastBookings.length,
      bookings: pastBookings,
      emptyMessage: "You haven't completed any appointments yet.",
      emptyCta: "Book your first appointment!"
    },
    { 
      id: "canceled", 
      label: "Canceled", 
      count: canceledBookings.length,
      bookings: canceledBookings,
      emptyMessage: "No canceled appointments.",
      emptyCta: "Great job keeping your appointments!"
    }
  ];

  return (
    <div className="mt-4">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <TabsList className="grid grid-cols-4 mb-4">
          {tabData.map(tab => (
            <TabsTrigger 
              key={tab.id} 
              value={tab.id}
              className="relative"
            >
              {tab.label}
              {tab.count > 0 && (
                <span className="ml-1.5 text-xs font-normal text-primary/80">
                  ({tab.count})
                </span>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {tabData.map(tab => (
          <TabsContent key={tab.id} value={tab.id} className="space-y-4">
            {tab.bookings.length === 0 ? (
              <div className="text-center py-8 px-4">
                <p className="text-gray-500 mb-2">{tab.emptyMessage}</p>
                <p className="text-gray-400 text-sm">{tab.emptyCta}</p>
              </div>
            ) : (
              tab.bookings.map(booking => (
                <BookingCard 
                  key={booking.id} 
                  booking={booking} 
                  type={tab.id as "upcoming" | "progress" | "past" | "canceled"}
                />
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default BookingTimeline;
