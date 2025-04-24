
import React from "react";
import Layout from "@/components/layout/Layout";
import EmviCalendar from "@/components/calendar/EmviCalendar";
import PageTransition from "@/components/shared/PageTransition";
import { ProfileCompletionProvider } from "@/context/profile/ProfileCompletionProvider";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Mock bookings data
const MOCK_BOOKINGS = [
  {
    id: "1",
    client_name: "Emma Thompson",
    service_name: "Bridal Makeup",
    date_requested: "2025-04-26",
    time_requested: "2:00 PM",
    status: "confirmed" as const,
    note: "Wedding at Grand Hotel",
    price: 150
  },
  {
    id: "2",
    client_name: "Sarah Johnson",
    service_name: "Makeup Session",
    date_requested: "2025-04-27",
    time_requested: "10:30 AM",
    status: "completed" as const,
    note: "Corporate photoshoot",
    price: 85
  },
  {
    id: "3",
    client_name: "Jessica Brown",
    service_name: "Full Glam Package",
    date_requested: "2025-04-29",
    time_requested: "4:00 PM",
    status: "pending" as const,
    note: "Birthday party",
    price: 200
  },
  {
    id: "4",
    client_name: "Amanda Lee",
    service_name: "Natural Look",
    date_requested: "2025-04-24",
    time_requested: "11:00 AM",
    status: "pending" as const,
    price: 75
  },
  {
    id: "5",
    client_name: "Michelle Davis",
    service_name: "Bridal Makeup",
    date_requested: "2025-04-30",
    time_requested: "1:00 PM",
    status: "confirmed" as const,
    note: "Pre-wedding photoshoot",
    price: 150
  }
];

const BookingCalendar = () => {
  const handleAddBooking = (booking: any) => {
    console.log("Adding booking:", booking);
    toast.success("Booking successfully created");
    // In a real app, this would make an API call to add the booking
  };
  
  const handleUpdateBooking = (booking: any) => {
    console.log("Updating booking:", booking);
    toast.success("Booking successfully updated");
    // In a real app, this would make an API call to update the booking
  };
  
  const handleDeleteBooking = (id: string) => {
    console.log("Deleting booking:", id);
    toast.success("Booking successfully deleted");
    // In a real app, this would make an API call to delete the booking
  };
  
  const handleDateChange = (startDate: Date, endDate: Date) => {
    console.log("Date range changed:", { startDate, endDate });
    // In a real app, this would fetch bookings for the new date range
  };

  return (
    <Layout>
      <PageTransition>
        <ProfileCompletionProvider>
          <motion.div 
            className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-6 px-4 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-7xl mx-auto">
              <EmviCalendar 
                role="artist"
                bookings={MOCK_BOOKINGS}
                onAddBooking={handleAddBooking}
                onUpdateBooking={handleUpdateBooking}
                onDeleteBooking={handleDeleteBooking}
                onDateChange={handleDateChange}
              />
            </div>
          </motion.div>
        </ProfileCompletionProvider>
      </PageTransition>
    </Layout>
  );
};

export default BookingCalendar;
