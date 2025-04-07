
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import { useAuth } from "@/context/auth";
import SalonDashboardBanner from "@/components/dashboard/salon/SalonDashboardBanner";
import SalonQuickStats from "@/components/dashboard/salon/SalonQuickStats";
import SalonReferralCard from "@/components/dashboard/salon/SalonReferralCard";
import SalonDashboardActionButtons from "@/components/dashboard/salon/SalonDashboardActionButtons";
import SalonCreditStatus from "@/components/dashboard/salon/SalonCreditStatus";
import SalonOwnerDashboardWidgets from "@/components/dashboard/salon/SalonOwnerDashboardWidgets";

const SalonDashboard = () => {
  const { userProfile } = useAuth();
  
  useEffect(() => {
    document.title = "Salon Dashboard | EmviApp";
    // Add console log to debug
    console.log("Salon Dashboard rendered with profile:", userProfile);
  }, [userProfile]);
  
  return (
    <Layout>
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-white to-blue-50/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container px-4 mx-auto py-12">
          <RoleDashboardLayout>
            <div className="space-y-8">
              {/* Salon Welcome Banner with Vietnamese text */}
              <SalonDashboardBanner userName={userProfile?.salon_name || userProfile?.full_name} />
              
              {/* Salon Quick Stats */}
              <SalonQuickStats />
              
              {/* Action Buttons */}
              <SalonDashboardActionButtons />
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Credit Status Card */}
                <SalonCreditStatus />
                
                {/* Referral Center with Vietnamese text */}
                <SalonReferralCard />
              </div>
              
              {/* Salon Owner Dashboard Widgets */}
              <SalonOwnerDashboardWidgets />
            </div>
          </RoleDashboardLayout>
        </div>
      </motion.div>
    </Layout>
  );
};

export default SalonDashboard;
