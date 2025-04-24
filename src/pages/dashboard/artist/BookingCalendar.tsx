
import React from "react";
import Layout from "@/components/layout/Layout";
import ArtistBookingCalendar from "@/components/dashboard/artist/calendar/ArtistBookingCalendar";
import PageTransition from "@/components/shared/PageTransition";
import { ProfileCompletionProvider } from "@/context/profile/ProfileCompletionProvider";

const BookingCalendar = () => {
  return (
    <Layout>
      <PageTransition>
        <ProfileCompletionProvider>
          <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
            <ArtistBookingCalendar />
          </div>
        </ProfileCompletionProvider>
      </PageTransition>
    </Layout>
  );
};

export default BookingCalendar;
