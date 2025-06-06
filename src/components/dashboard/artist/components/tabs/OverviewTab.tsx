
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
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { 
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

const OverviewTab = ({ stats, isLoadingStats, bookings, isLoadingBookings }: OverviewTabProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/40 to-indigo-50/30 relative">
      {/* Sophisticated Background Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(139,92,246,0.05)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(99,102,241,0.04)_0%,transparent_50%)] pointer-events-none" />
      
      {/* Floating Orb Effects */}
      <div className="absolute top-10 left-[15%] w-64 h-64 bg-gradient-to-r from-purple-200/20 to-indigo-200/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-[10%] w-80 h-80 bg-gradient-to-r from-pink-200/15 to-purple-200/15 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-7xl mx-auto px-6 py-8 space-y-8"
      >
        {/* Goal Card with Enhanced Design */}
        <motion.div 
          variants={itemVariants}
          className="group relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl border border-white/60 shadow-xl hover:shadow-2xl transition-all duration-500 p-6">
            <YourNextGoalCard />
          </div>
        </motion.div>

        {/* Stats Grid with Glass Morphism */}
        <motion.div 
          variants={itemVariants}
          className="group relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/15 to-purple-500/15 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000" />
          <div className="relative bg-white/70 backdrop-blur-2xl rounded-2xl border border-white/50 shadow-2xl hover:shadow-3xl transition-all duration-700 p-8">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-2xl opacity-60" />
            <StatsGrid stats={stats} isLoading={isLoadingStats} />
          </div>
        </motion.div>

        {/* Feature Preview Cards with Premium Styling */}
        <motion.div 
          variants={itemVariants}
          className="group relative"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-1000" />
          <div className="relative">
            {/* Multi-layer background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-purple-50/80 to-indigo-50/60 rounded-2xl" />
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent rounded-2xl" />
            
            <div className="relative backdrop-blur-xl border border-white/40 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-700 p-8">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-2xl opacity-70" />
              <FeaturePreviewCards />
            </div>
          </div>
        </motion.div>

        {/* Feature Voting Survey with Elevated Design */}
        <motion.div 
          variants={itemVariants}
          className="group relative"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-rose-500/10 via-pink-500/10 to-purple-500/10 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition duration-1000" />
          <div className="relative">
            {/* Complex layered background */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50/70 via-white/60 to-purple-50/70 rounded-2xl" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(236,72,153,0.08)_0%,transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(139,92,246,0.06)_0%,transparent_70%)]" />
            
            <div className="relative backdrop-blur-2xl border border-white/50 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-700 p-8">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-500 rounded-t-2xl opacity-70" />
              <FeatureVotingSurvey />
            </div>
          </div>
        </motion.div>

        {/* Subtle Floating Elements */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-1/3 left-[5%] w-2 h-2 bg-purple-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3s' }} />
          <div className="absolute top-1/2 right-[8%] w-1.5 h-1.5 bg-indigo-400/40 rounded-full animate-bounce" style={{ animationDelay: '1.2s', animationDuration: '2.5s' }} />
          <div className="absolute bottom-1/3 left-[12%] w-3 h-3 bg-pink-400/20 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }} />
          <div className="absolute top-2/3 right-[15%] w-2.5 h-2.5 bg-rose-400/25 rounded-full animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '3.5s' }} />
        </div>
      </motion.div>
    </div>
  );
};

export default OverviewTab;
