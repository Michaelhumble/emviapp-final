
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import RoleDashboardLayout from "@/components/dashboard/RoleDashboardLayout";
import DashboardRouteProtection from "@/components/dashboard/DashboardRouteProtection";
import { UserRole } from "@/context/auth/types";
import SalonDashboardBanner from "@/components/dashboard/salon/SalonDashboardBanner";
import SalonQuickStats from "@/components/dashboard/salon/SalonQuickStats";
import SalonReferralCard from "@/components/dashboard/salon/SalonReferralCard";
import SalonDashboardActionButtons from "@/components/dashboard/salon/SalonDashboardActionButtons";
import SalonCreditStatus from "@/components/dashboard/salon/SalonCreditStatus";
import SalonPostedJobsSection from "@/components/dashboard/salon/SalonPostedJobsSection";
import SalonBoostStatus from "@/components/dashboard/salon/SalonBoostStatus";
import SalonCreditPromotion from "@/components/dashboard/salon/SalonCreditPromotion";
import TopLocalArtists from "@/components/dashboard/salon/TopLocalArtists";
import { useAuth } from "@/context/auth";

const SalonDashboard = () => {
  const { userProfile } = useAuth();
  
  useEffect(() => {
    document.title = "Salon Dashboard | EmviApp";
    console.log("[Salon Dashboard] Component mounted");
  }, []);
  
  // Define allowed roles for this dashboard
  const allowedRoles: UserRole[] = ['salon', 'owner'];
  
  return (
    <Layout>
      <motion.div 
        className="min-h-screen bg-gradient-to-b from-white to-blue-50/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <DashboardRouteProtection allowedRoles={allowedRoles} dashboardType="Salon">
          <div className="container px-4 mx-auto py-12">
            <RoleDashboardLayout>
              <div className="space-y-8">
                {/* Salon Welcome Banner with Vietnamese text */}
                <SalonDashboardBanner userName={userProfile?.salon_name || userProfile?.full_name} />
                
                {/* Salon Boost Status */}
                <SalonBoostStatus />
                
                {/* Salon Quick Stats */}
                <SalonQuickStats />
                
                {/* Action Buttons with Vietnamese text */}
                <SalonDashboardActionButtons />
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* NEW: Credit Promotion Card */}
                  <div className="lg:col-span-1">
                    <SalonCreditPromotion />
                  </div>
                  
                  {/* Referral Center with Vietnamese text */}
                  <div id="referral-card" className="lg:col-span-1">
                    <SalonReferralCard />
                  </div>
                  
                  {/* NEW: Top Local Artists widget */}
                  <div className="lg:col-span-1">
                    <TopLocalArtists />
                  </div>
                </div>
                
                {/* Credit Status Card */}
                <SalonCreditStatus />
                
                {/* Posted Jobs Section */}
                <SalonPostedJobsSection />
              </div>
            </RoleDashboardLayout>
          </div>
        </DashboardRouteProtection>
      </motion.div>
    </Layout>
  );
};

export default SalonDashboard;
