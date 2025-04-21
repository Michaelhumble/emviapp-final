
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useCustomerBookings } from "@/hooks/useCustomerBookings";
import CustomerBookingCard from "./bookings/CustomerBookingCard";
import { LoaderCircle } from "lucide-react";

const CustomerBookingHistory = () => {
  const [tab, setTab] = useState("upcoming");
  const { bookings, loading, error } = useCustomerBookings();

  // Divide bookings into upcoming and past
  const now = new Date();
  const upcoming = bookings.filter(
    (b) =>
      (b.status === "pending" || b.status === "confirmed") &&
      new Date(b.date_requested || "") >= new Date(now.toDateString())
  );
  const past = bookings.filter(
    (b) =>
      b.status === "completed" ||
      b.status === "cancelled" ||
      b.status === "no-show"
  );

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold mb-4 font-serif">My Bookings</h2>
      <Tabs value={tab} onValueChange={setTab} className="w-full">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <LoaderCircle className="animate-spin h-7 w-7 text-primary" />
            </div>
          ) : error ? (
            <div className="text-red-500 py-8 text-center">Error loading bookings.</div>
          ) : upcoming.length === 0 ? (
            <div className="text-gray-500 py-8 text-center">
              No upcoming bookings.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {upcoming.map((b) => (
                <CustomerBookingCard key={b.id} booking={b} isUpcoming />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="past">
          {loading ? (
            <div className="flex justify-center items-center py-10">
              <LoaderCircle className="animate-spin h-7 w-7 text-primary" />
            </div>
          ) : error ? (
            <div className="text-red-500 py-8 text-center">Error loading bookings.</div>
          ) : past.length === 0 ? (
            <div className="text-gray-500 py-8 text-center">
              No bookings yet. Book your first appointment!
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {past.map((b) => (
                <CustomerBookingCard key={b.id} booking={b} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerBookingHistory;
