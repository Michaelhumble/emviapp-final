
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useOwnerDashboardData } from "@/hooks/useOwnerDashboardData";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { ProfileCompletionGuard } from "@/components/profile/guards/ProfileCompletionGuard";
import { useAuth } from "@/context/auth";

// Temporary placeholder components until their implementations are fixed
const SalonDashboardHeader = () => <div>Salon Dashboard Header Placeholder</div>;
const BookingAnalyticsPanel = () => <div>Booking Analytics Panel Placeholder</div>;
const JobsListingsPanel = () => <div>Jobs Listings Panel Placeholder</div>;
const StaffPerformanceTable = () => <div>Staff Performance Table Placeholder</div>;
const CreditUsageTable = () => <div>Credit Usage Table Placeholder</div>;

const OwnerDashboard = () => {
  const { userRole } = useAuth();
  const { 
    stats, 
    isLoading, 
    error, 
    fetchDashboardData,
    dateRangeFilter,
    setDateRangeFilter
  } = useOwnerDashboardData();
  
  useEffect(() => {
    document.title = "Salon Owner Dashboard | EmviApp";
  }, []);
  
  return (
    <Layout>
      <ProfileCompletionGuard role={userRole || 'owner'}>
        <div className="container px-4 mx-auto py-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SalonDashboardHeader />
            
            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {error.message || "Failed to load dashboard data. Please try again."}
                </AlertDescription>
              </Alert>
            )}
            
            <div className="grid grid-cols-1 gap-6">
              <BookingAnalyticsPanel />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <JobsListingsPanel />
                <StaffPerformanceTable />
              </div>
              
              <CreditUsageTable />
            </div>
          </motion.div>
        </div>
      </ProfileCompletionGuard>
    </Layout>
  );
};

export default OwnerDashboard;
