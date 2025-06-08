
import React from "react";
import { motion } from "framer-motion";
import ArtistMotivationalQuote from "../../ArtistMotivationalQuote";
import ProfileHighlights from "../../ProfileHighlights";
import NextMilestoneProgress from "../../NextMilestoneProgress";
import ArtistBookingsPanel from "../../ArtistBookingsPanel";
import DailyInspiration from "../../DailyInspiration";
import ArtistQuickStats from "../../sections/ArtistQuickStats";
import ArtistGrowYourBusinessCard from "../../sections/ArtistGrowYourBusinessCard";
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
      {/* Premium Creator Empire Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 p-8 text-white shadow-2xl">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Your Creator Empire 👑</h1>
          <p className="text-purple-100 text-lg">Building your beauty business, one client at a time</p>
        </div>
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
      </div>

      {/* Enhanced Quick Stats with Achievements */}
      <ArtistQuickStats />
      
      {/* Motivational Quote with Premium Styling */}
      <ArtistMotivationalQuote />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Enhanced Business Growth Card */}
          <ArtistGrowYourBusinessCard />
          
          <ProfileHighlights stats={profileStats} />
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
