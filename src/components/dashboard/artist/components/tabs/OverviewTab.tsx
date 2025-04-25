
import StatsGrid from "../StatsGrid";
import MainGrid from "../MainGrid";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "framer-motion";

const OverviewTab = ({ 
  stats, 
  isLoadingStats, 
  bookings, 
  isLoadingBookings 
}: { 
  stats: any;
  isLoadingStats: boolean;
  bookings: any[];
  isLoadingBookings: boolean;
}) => {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Alert className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
          <AlertDescription>
            Welcome! This is your dashboard preview. Customize it to make it yours.
          </AlertDescription>
        </Alert>
      </motion.div>

      <StatsGrid 
        stats={stats || {
          totalBookings: 0,
          totalEarnings: 0,
          totalClients: 0,
          rating: 5.0
        }} 
        isLoading={isLoadingStats} 
      />
      
      <MainGrid 
        bookings={bookings || []}
        isLoadingBookings={isLoadingBookings}
        stats={stats || {}}
      />
    </div>
  );
};

export default OverviewTab;
