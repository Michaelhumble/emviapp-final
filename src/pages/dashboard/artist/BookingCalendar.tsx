
import React from "react";
import Layout from "@/components/layout/Layout";
import ArtistBookingCalendar from "@/components/dashboard/artist/calendar/ArtistBookingCalendar";
import PageTransition from "@/components/shared/PageTransition";

const BookingCalendar = () => {
  return (
    <Layout>
      <PageTransition>
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
          <ArtistBookingCalendar />
        </div>
      </PageTransition>
    </Layout>
  );
};

export default BookingCalendar;
