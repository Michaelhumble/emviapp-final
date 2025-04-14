
import React, { useEffect } from "react";
import { useAuth } from "@/context/auth";
import Layout from "@/components/layout/Layout";
import { ArtistDataProvider } from "@/components/dashboard/artist/context/ArtistDataContext";
import ArtistDashboard from "@/components/dashboard/artist/ArtistDashboard";
import ArtistAvailabilityManager from "@/components/dashboard/artist/ArtistAvailabilityManager";
import DashboardGreeting from "@/components/dashboard/common/DashboardGreeting";
import { useBookingNotifications } from "@/hooks/useBookingNotifications";
import { Toaster } from "@/components/ui/toaster";

const ArtistDashboardPage = () => {
  const { user } = useAuth();
  
  // Initialize booking notifications
  const { subscribed } = useBookingNotifications();
  
  useEffect(() => {
    document.title = "Artist Dashboard | EmviApp";
  }, []);

  return (
    <Layout>
      <ArtistDataProvider>
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-8">
            {/* Add personalized greeting */}
            <DashboardGreeting className="mb-6" />
            <ArtistDashboard />
            <ArtistAvailabilityManager />
          </div>
        </div>
      </ArtistDataProvider>
      
      {/* Add Toaster for notifications */}
      <Toaster />
    </Layout>
  );
};

export default ArtistDashboardPage;
