
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { useOwnerDashboardData } from "@/hooks/useOwnerDashboardData";
import { SalonDashboardHeader } from "@/components/dashboard/salon/SalonDashboardHeader";
import { BookingAnalyticsPanel } from "@/components/dashboard/salon/BookingAnalyticsPanel";
import { StaffPerformanceTable } from "@/components/dashboard/salon/StaffPerformanceTable";
import { JobsListingsPanel } from "@/components/dashboard/salon/JobsListingsPanel";
import { CreditUsageTable } from "@/components/dashboard/salon/CreditUsageTable";
import { ProfileCompletionGuard } from "@/components/profile/guards/ProfileCompletionGuard";
import { useAuth } from "@/context/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const OwnerDashboard = () => {
  const { userRole } = useAuth();
  const { 
    salons, 
    currentSalon, 
    jobs, 
    listings, 
    staff, 
    bookingAnalytics, 
    creditTransactions, 
    isLoading, 
    error, 
    selectSalon, 
    refetchAllData,
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
            <SalonDashboardHeader 
              salons={salons}
              currentSalon={currentSalon}
              onSalonSelect={selectSalon}
              onRefresh={refetchAllData}
              isLoading={isLoading}
              dateRangeFilter={dateRangeFilter}
              onDateRangeChange={setDateRangeFilter}
            />
            
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
              <BookingAnalyticsPanel 
                data={bookingAnalytics}
                isLoading={isLoading}
              />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <JobsListingsPanel 
                  jobs={jobs}
                  listings={listings}
                  isLoading={isLoading}
                />
                
                <StaffPerformanceTable
                  staff={staff}
                  isLoading={isLoading}
                />
              </div>
              
              <CreditUsageTable
                transactions={creditTransactions}
                isLoading={isLoading}
              />
            </div>
          </motion.div>
        </div>
      </ProfileCompletionGuard>
    </Layout>
  );
};

export default OwnerDashboard;
