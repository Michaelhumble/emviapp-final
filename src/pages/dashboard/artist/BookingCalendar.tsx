
import React from "react";
import Layout from "@/components/layout/Layout";
import ArtistBookingCalendar from "@/components/dashboard/artist/calendar/ArtistBookingCalendar";
import PageTransition from "@/components/shared/PageTransition";
import { ProfileCompletionProvider } from "@/context/profile/ProfileCompletionProvider";
import { motion } from "framer-motion";

const BookingCalendar = () => {
  return (
    <Layout>
      <PageTransition>
        <ProfileCompletionProvider>
          <motion.div 
            className="min-h-screen bg-gradient-to-b from-white to-gray-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="py-6">
              <ArtistBookingCalendar />
            </div>
          </motion.div>
        </ProfileCompletionProvider>
      </PageTransition>
    </Layout>
  );
};

export default BookingCalendar;
