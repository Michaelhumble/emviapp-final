
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/auth";
import Layout from "@/components/layout/Layout";
import { ArtistDataProvider } from "@/components/dashboard/artist/context/ArtistDataContext";
import ArtistDashboard from "@/components/dashboard/artist/ArtistDashboard";
import ArtistAvailabilityManager from "@/components/dashboard/artist/ArtistAvailabilityManager";
import DashboardGreeting from "@/components/dashboard/common/DashboardGreeting";
import { useBookingNotifications } from "@/hooks/useBookingNotifications";
import { Toaster } from "sonner";
import UpcomingAppointments from "@/components/dashboard/common/UpcomingAppointments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

const ArtistDashboardPage = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  
  // Initialize booking notifications
  const bookingNotifications = useBookingNotifications();
  
  useEffect(() => {
    document.title = "Artist Dashboard | EmviApp";
    
    const savedTab = localStorage.getItem('artist_dashboard_tab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    localStorage.setItem('artist_dashboard_tab', value);
  };

  return (
    <Layout>
      <ArtistDataProvider>
        <div className="container mx-auto px-4 py-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-8">
              {/* Add personalized greeting */}
              <DashboardGreeting className="mb-6" />
              
              {/* Add upcoming appointments section */}
              <UpcomingAppointments dashboardType="artist" />
              
              <Tabs value={activeTab} onValueChange={handleTabChange}>
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="bookings">Bookings</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="earnings">Earnings</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-8">
                  <ArtistDashboard />
                  <ArtistAvailabilityManager />
                </TabsContent>
                
                <TabsContent value="bookings" className="space-y-8">
                  <UpcomingAppointments dashboardType="artist" />
                  <ArtistAvailabilityManager />
                </TabsContent>
                
                <TabsContent value="services" className="space-y-8">
                  {/* Artist services section will be added here */}
                </TabsContent>
                
                <TabsContent value="earnings" className="space-y-8">
                  {/* Artist earnings section will be added here */}
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </div>
      </ArtistDataProvider>
      
      {/* Add Toaster for notifications */}
      <Toaster />
    </Layout>
  );
};

export default ArtistDashboardPage;
