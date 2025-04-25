
import StatsGrid from "../StatsGrid";
import MainGrid from "../MainGrid";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import ProfileCompletionWarning from "../overview/ProfileCompletionWarning";
import { demoStats, demoBookings } from "../../utils/demoData";

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
  const hasError = !stats && !isLoadingStats;
  const finalStats = stats || demoStats;
  const finalBookings = bookings || demoBookings;

  return (
    <div className="space-y-6">
      <ProfileCompletionWarning />
      
      {hasError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Alert variant="destructive" className="bg-red-50 border-red-100">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Some data couldn't be loaded. Showing preview content instead.
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

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
        stats={finalStats}
        isLoading={isLoadingStats} 
      />
      
      <MainGrid 
        bookings={finalBookings}
        isLoadingBookings={isLoadingBookings}
        stats={finalStats}
      />
    </div>
  );
};

export default OverviewTab;
