
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      <motion.div variants={itemVariants}>
        <YourNextGoalCard />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatsGrid stats={stats} isLoading={isLoadingStats} />
      </motion.div>

      {/* Feature Preview Cards Section */}
      <motion.div variants={itemVariants}>
        <FeaturePreviewCards />
      </motion.div>

      {/* Feature Voting Survey Section */}
      <motion.div variants={itemVariants}>
        <FeatureVotingSurvey />
      </motion.div>
    </motion.div>
  );
};

export default OverviewTab;
