
import React from "react";
import { motion } from "framer-motion";
import ArtistMotivationalQuote from "../../ArtistMotivationalQuote";
import ProfileHighlights from "../../ProfileHighlights";
import NextMilestoneProgress from "../../NextMilestoneProgress";
import ArtistBookingsPanel from "../../ArtistBookingsPanel";
import DailyInspiration from "../../DailyInspiration";
import { DashboardStats } from "../../types/ArtistDashboardTypes";
import { Booking } from "../../types/ArtistDashboardTypes";

interface OverviewTabProps {
  stats: DashboardStats | null;
  isLoadingStats: boolean;
  bookings: Booking[];
  isLoadingBookings: boolean;
}

const OverviewTab = ({ stats, isLoadingStats, bookings, isLoadingBookings }: OverviewTabProps) => {
  // Transform DashboardStats to ProfileHighlights format
  const profileStats = stats ? {
    rating: stats.average_rating || 0,
    clients: stats.booking_count || 0,
    completionRate: stats.repeat_client_percentage || 100,
    responseTime: "< 24hrs",
    repeatClients: stats.repeat_client_percentage || 0,
    experience: "Professional"
  } : {
    rating: 0,
    clients: 0,
    completionRate: 100,
    responseTime: "< 24hrs",
    repeatClients: 0,
    experience: "New Artist"
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <ArtistMotivationalQuote />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ProfileHighlights stats={profileStats} isLoading={isLoadingStats} />
          <ArtistBookingsPanel />
        </div>
        
        <div className="space-y-6">
          <NextMilestoneProgress />
          <DailyInspiration />
        </div>
      </div>
    </motion.div>
  );
};

export default OverviewTab;
