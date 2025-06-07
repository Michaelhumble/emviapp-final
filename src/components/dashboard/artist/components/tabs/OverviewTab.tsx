
import React from "react";
import { motion } from "framer-motion";
import ArtistMotivationalQuote from "../../ArtistMotivationalQuote";
import ProfileHighlights from "../../ProfileHighlights";
import NextMilestoneProgress from "../../NextMilestoneProgress";
import ArtistBookingsPanel from "../../ArtistBookingsPanel";
import DailyInspiration from "../../DailyInspiration";
import OpenToOffersToggle from "../OpenToOffersToggle";
import AnalyticsBanner from "../AnalyticsBanner";
import { DashboardStats } from "../../types/ArtistDashboardTypes";
import { Booking } from "../../types/ArtistDashboardTypes";

interface OverviewTabProps {
  stats: DashboardStats | null;
  isLoadingStats: boolean;
  bookings: Booking[];
  isLoadingBookings: boolean;
}

const OverviewTab = ({ stats, isLoadingStats, bookings, isLoadingBookings }: OverviewTabProps) => {
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
          <AnalyticsBanner />
          <ProfileHighlights stats={stats} isLoading={isLoadingStats} />
          <ArtistBookingsPanel bookings={bookings} isLoading={isLoadingBookings} />
        </div>
        
        <div className="space-y-6">
          <OpenToOffersToggle />
          <NextMilestoneProgress />
          <DailyInspiration />
        </div>
      </div>
    </motion.div>
  );
};

export default OverviewTab;
