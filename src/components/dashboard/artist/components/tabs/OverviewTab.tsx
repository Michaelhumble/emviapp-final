
import { motion } from "framer-motion";
import StatsGrid from "../StatsGrid";
import YourNextGoalCard from "../../sections/YourNextGoalCard";
import { DashboardStats } from "../../types/ArtistDashboardTypes";
import { Booking } from "@/types/booking";
import FeaturePreviewCards from "../FeaturePreviewCards";
import FeatureVotingSurvey from "../FeatureVotingSurvey";

interface OverviewTabProps {
  stats: DashboardStats;
  isLoadingStats: boolean;
  bookings: Booking[];
  isLoadingBookings: boolean;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 }
  }
};

const OverviewTab = ({ stats, isLoadingStats, bookings, isLoadingBookings }: OverviewTabProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/30 via-blue-50/20 to-pink-50/30 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-transparent to-blue-100/20 backdrop-blur-3xl" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-200/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 space-y-8 p-6"
      >
        <motion.div 
          variants={itemVariants}
          className="backdrop-blur-xl bg-white/40 rounded-3xl border border-white/20 shadow-2xl p-6 hover:shadow-3xl transition-all duration-500 hover:bg-white/50"
        >
          <YourNextGoalCard />
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="backdrop-blur-xl bg-gradient-to-br from-white/50 to-white/30 rounded-3xl border border-white/20 shadow-2xl p-6 hover:shadow-3xl transition-all duration-500 hover:bg-white/60"
        >
          <StatsGrid stats={stats} isLoading={isLoadingStats} />
        </motion.div>

        {/* Feature Preview Cards Section */}
        <motion.div 
          variants={itemVariants}
          className="backdrop-blur-xl bg-gradient-to-br from-purple-50/60 to-blue-50/40 rounded-3xl border border-white/30 shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 hover:scale-[1.01]"
        >
          <div className="relative">
            {/* Glassmorphism overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-3xl" />
            <div className="relative z-10">
              <FeaturePreviewCards />
            </div>
          </div>
        </motion.div>

        {/* Feature Voting Survey Section */}
        <motion.div 
          variants={itemVariants}
          className="backdrop-blur-xl bg-gradient-to-br from-pink-50/60 to-purple-50/40 rounded-3xl border border-white/30 shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 hover:scale-[1.01]"
        >
          <div className="relative">
            {/* Premium glassmorphism effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent rounded-3xl" />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-3xl animate-pulse opacity-50" />
            <div className="relative z-10">
              <FeatureVotingSurvey />
            </div>
          </div>
        </motion.div>

        {/* Premium floating particles effect */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-purple-300/30 rounded-full animate-bounce delay-300" />
          <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-blue-300/40 rounded-full animate-bounce delay-700" />
          <div className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-pink-300/20 rounded-full animate-bounce delay-1000" />
        </div>
      </motion.div>
    </div>
  );
};

export default OverviewTab;
