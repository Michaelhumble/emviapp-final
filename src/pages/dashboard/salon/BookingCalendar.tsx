
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import EmviCalendar from "@/components/calendar/EmviCalendar";
import PageTransition from "@/components/shared/PageTransition";
import { SalonProvider } from "@/context/salon";
import { motion } from "framer-motion";
import { toast } from "sonner";

// Mock bookings data for salon
const MOCK_SALON_BOOKINGS = [
  {
    id: "101",
    client_name: "Robert Johnson",
    service_name: "Hair Styling",
    date_requested: "2025-04-26",
    time_requested: "1:00 PM",
    status: "confirmed" as const,
    note: "Wedding preparation",
    price: 120
  },
  {
    id: "102",
    client_name: "Jennifer Smith",
    service_name: "Full Service Package",
    date_requested: "2025-04-25",
    time_requested: "10:00 AM",
    status: "completed" as const,
    price: 250
  },
  {
    id: "103",
    client_name: "Michael Wilson",
    service_name: "Beard Trim",
    date_requested: "2025-04-28",
    time_requested: "3:30 PM",
    status: "pending" as const,
    price: 45
  },
  {
    id: "104",
    client_name: "Lisa Brown",
    service_name: "Hair Coloring",
    date_requested: "2025-04-29",
    time_requested: "11:00 AM",
    status: "confirmed" as const,
    note: "Special occasion",
    price: 180
  },
  {
    id: "105",
    client_name: "David Miller",
    service_name: "Haircut",
    date_requested: "2025-04-24",
    time_requested: "4:00 PM",
    status: "pending" as const,
    price: 65
  }
];

const SalonBookingCalendar = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState(MOCK_SALON_BOOKINGS);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleAddBooking = (booking: any) => {
    console.log("Adding salon booking:", booking);
    toast.success("Salon booking successfully created");
    
    // In a real app, this would make an API call to add the booking
    // For now, let's add it to our local state
    const newBooking = {
      ...booking,
      id: `temp-${Date.now()}`,
      status: "pending" as const
    };
    
    setBookings(prev => [...prev, newBooking]);
  };
  
  const handleUpdateBooking = (booking: any) => {
    console.log("Updating salon booking:", booking);
    toast.success("Salon booking successfully updated");
    
    // Update in our local state
    setBookings(prev => prev.map(b => b.id === booking.id ? booking : b));
  };
  
  const handleDeleteBooking = (id: string) => {
    console.log("Deleting salon booking:", id);
    toast.success("Salon booking successfully deleted");
    
    // Remove from our local state
    setBookings(prev => prev.filter(b => b.id !== id));
  };
  
  const handleDateChange = (startDate: Date, endDate: Date) => {
    console.log("Date range changed:", { startDate, endDate });
    // In a real app, this would fetch bookings for the new date range
  };

  return (
    <Layout>
      <PageTransition>
        <SalonProvider>
          <motion.div 
            className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-6 px-4 sm:px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-7xl mx-auto">
              <EmviCalendar 
                role="salon"
                bookings={bookings}
                onAddBooking={handleAddBooking}
                onUpdateBooking={handleUpdateBooking}
                onDeleteBooking={handleDeleteBooking}
                onDateChange={handleDateChange}
                isLoading={loading}
                error={error}
              />
            </div>
          </motion.div>
        </SalonProvider>
      </PageTransition>
    </Layout>
  );
};

export default SalonBookingCalendar;
